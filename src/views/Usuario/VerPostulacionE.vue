<template>
    <header class="w-full flex justify-start items-center p-4 bg-gray-100 shadow-md">
        <button @click="goBack" class="text-xl p-2">
            <img aria-hidden="true" alt="back-arrow" src="https://openui.fly.dev/openui/24x24.svg?text=←"
                class="h-6 w-6 md:h-8 md:w-8" />
        </button>
    </header>

    <div class="container mx-auto p-4">
        <h1 class="text-3xl font-bold mb-6 text-gray-800">Postulaciones para la Empresa</h1>

        <div v-if="loading" class="text-center">
            <p class="text-gray-600">Cargando postulaciones...</p>
        </div>

        <div v-if="error" class="text-red-500 text-center">
            <p>Error al cargar las postulaciones: {{ error }}</p>
        </div>

        <div v-if="postulaciones.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div v-for="postulacion in postulaciones" :key="postulacion.posId"
                class="p-6 bg-white border border-gray-300 rounded-lg shadow-lg">
                <p class="text-lg font-semibold text-gray-800 mb-2">Detalle: {{ postulacion.posDetalle }}</p>
                <p class="text-gray-700 mb-4">Estado: <span :class="estadoClass(postulacion.posEstado)">
                        {{ formatEstado(postulacion.posEstado) }}</span></p>
                <p v-if="postulacion.publicacion" class="text-gray-700 mb-4">Publicación: {{
                    postulacion.publicacion.pubDetalle || 'No disponible' }}</p>
                <p v-else class="text-gray-700 mb-4">Publicación: No disponible</p>
                <p class="text-gray-700 mb-4">Usuario: {{ postulacion.usuario ? `${postulacion.usuario.usuNombres}
                    ${postulacion.usuario.usuApellidos}` : 'Desconocido' }}</p>

                <!-- Botones para ver información del usuario, atender y rechazar la postulación -->
                <div class="flex justify-between mt-4">
                    <!-- Manejo de caso en que `postulacion.usuario` puede ser undefined -->
                    <router-link
                        :to="{ name: 'VerDetalleUsuario', params: { usuId: postulacion.usuario ? postulacion.usuario.usuId : null } }"
                        class="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 inline-block">
                        Ver Información Usuario
                    </router-link>

                    <button @click="atenderPostulacion(postulacion.posId)"
                        class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
                        Atender Postulación
                    </button>
                    <button @click="rechazarPostulacion(postulacion.posId)"
                        class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
                        Rechazar Postulación
                    </button>
                </div>
            </div>
        </div>

        <p v-if="postulaciones.length === 0 && !loading" class="text-center text-gray-500">
            No hay postulaciones disponibles.
        </p>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'PostulPage',
    data() {
        return {
            comId: null,
            postulaciones: [],
            publicaciones: [],
            loading: true,
            error: null,
        };
    },
    mounted() {
        this.comId = this.$route.params.comId;
        this.fetchPostulaciones();
    },
    methods: {
        goBack() {
            this.$router.go(-1);
        },
        verInformacionUsuario(usuId) {
            if (usuId) {
                this.$router.push({ name: 'VerDetalleUsuario', params: { usuId } });
            } else {
                alert('Información del usuario no disponible.');
            }
        },
        async fetchPostulaciones() {
            try {
                const postulacionesResponse = await axios.get('http://172.24.0.11:5001/api/postulaciones');
                const postulaciones = postulacionesResponse.data
                    .filter(postulacion => postulacion.posEmpresa == this.comId)
                    .filter(postulacion => postulacion.posEstado === 'P') // Filtrar solo postulaciones con estado 'P'
                    .filter(postulacion => postulacion.posUsuario && postulacion.posDetalle); // Filtrar postulaciones con campos nulos

                const usuariosResponse = await axios.get('http://172.24.0.11:5001/api/usuario');
                const usuarios = usuariosResponse.data;

                const publicacionesResponse = await axios.get('http://172.24.0.11:5001/api/publicaciones');
                this.publicaciones = publicacionesResponse.data;

                const usuariosMap = usuarios.reduce((map, usuario) => {
                    map[usuario.usuId] = usuario;
                    return map;
                }, {});

                const publicacionesMap = this.publicaciones.reduce((map, publicacion) => {
                    map[publicacion.pubId] = publicacion;
                    return map;
                }, {});

                console.log('Usuarios Map:', usuariosMap);
                console.log('Postulaciones:', postulaciones);

                this.postulaciones = postulaciones.map(postulacion => ({
                    ...postulacion,
                    usuario: usuariosMap[postulacion.posUsuario] || {},
                    publicacion: publicacionesMap[postulacion.posPublicacion] || {} // Agregar la publicación
                }));

                console.log('Postulaciones con Datos Asociados:', this.postulaciones);
            } catch (err) {
                this.error = err.message || 'Error al cargar las postulaciones';
            } finally {
                this.loading = false;
            }
        },
        formatEstado(estado) {
            const estados = {
                'A': 'Aprobado',
                'P': 'Pendiente',
                'I': 'Inactivo',
                'R': 'Rechazado'
            };
            return estados[estado] || 'Desconocido';
        },
        estadoClass(estado) {
            const classes = {
                'A': 'text-green-600',
                'P': 'text-yellow-600',
                'I': 'text-gray-600',
                'R': 'text-red-600'
            };
            return classes[estado] || 'text-gray-600';
        },
        async atenderPostulacion(id) {
            try {
                // Encontrar la postulación que se está atendiendo
                const postulacion = this.postulaciones.find(p => p.posId === id);

                if (postulacion) {
                    // Actualizar la postulación
                    await axios.put(`http://172.24.0.11:5001/api/postulaciones/${id}`, {
                        posId: postulacion.posId,
                        posUsuario: postulacion.posUsuario,
                        posEmpresa: postulacion.posEmpresa,
                        posDetalle: 'Buenas tardes señor usuario, gracias por postular a nuestra empresa. Esperamos con ansia el día de su entrevista, lo llamaremos esta semana.',
                        posEstado: 'A'
                    });
                    this.fetchPostulaciones(); // Volver a cargar las postulaciones después de actualizar
                    alert('Postulación atendida correctamente'); // Mostrar mensaje de éxito
                } else {
                    this.error = 'Postulación no encontrada';
                }
            } catch (err) {
                this.error = err.message || 'Error al atender la postulación';
            }
        },
        async rechazarPostulacion(id) {
            try {
                // Encontrar la postulación que se está rechazando
                const postulacion = this.postulaciones.find(p => p.posId === id);

                if (postulacion) {
                    // Actualizar la postulación
                    await axios.put(`http://172.24.0.11:5001/api/postulaciones/${id}`, {
                        posId: postulacion.posId,
                        posUsuario: postulacion.posUsuario,
                        posEmpresa: postulacion.posEmpresa,
                        posDetalle: 'Buenas tardes señor usuario, gracias por postular a nuestra empresa. Lo sentimos pero no cumple con los requerimientos para el puesto de trabajo.',
                        posEstado: 'R'
                    });
                    this.fetchPostulaciones(); // Volver a cargar las postulaciones después de actualizar
                    alert('Postulación rechazada correctamente'); // Mostrar mensaje de éxito
                } else {
                    this.error = 'Postulación no encontrada';
                }
            } catch (err) {
                this.error = err.message || 'Error al rechazar la postulación';
            }
        }
    }
};
</script>

<style scoped>
/* Estilos específicos para PostulPage */
.container {
    max-width: 1200px;
    margin: 0 auto;
}
</style>
