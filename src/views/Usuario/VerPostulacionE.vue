<template>
    <header class="w-full flex justify-start items-center p-4 bg-indigo-600 shadow-md">
        <button @click="goBack" class="text-xl p-2 text-white">
            <img aria-hidden="true" alt="back-arrow" src="https://openui.fly.dev/openui/24x24.svg?text=←"
                class="h-6 w-6 md:h-8 md:w-8" />
        </button>
    </header>

    <div class="container mx-auto p-4">
        <h1 class="text-4xl font-bold mb-6 text-gray-900">Postulaciones para la Empresa</h1>

        <!-- Filtro de búsqueda -->
        <div class="flex flex-col md:flex-row justify-between items-center mb-6">
            <select v-model="filterEstado"
                class="border border-gray-300 rounded-lg p-3 w-full md:w-1/2 lg:w-1/3 bg-gray-50 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
                <option value="">Todos los estados</option>
                <option value="A">Aprobado</option>
                <option value="P">Pendiente</option>
                <option value="R">Rechazado</option>
                <option value="I">Inactivo</option>
            </select>
            <input v-model="filterDetalle" type="text" placeholder="Buscar por detalle..."
                class="border border-gray-300 rounded-lg p-3 w-full md:w-1/2 lg:w-1/3 bg-gray-50 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 mt-4 md:mt-0" />
        </div>

        <div v-if="loading" class="text-center">
            <p class="text-gray-600">Cargando postulaciones...</p>
        </div>

        <div v-if="error" class="text-red-500 text-center">
            <p>Error al cargar las postulaciones: {{ error }}</p>
        </div>

        <!-- Mostrar postulaciones filtradas -->
        <div v-if="filteredPostulaciones.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div v-for="postulacion in filteredPostulaciones" :key="postulacion.posId"
                class="p-6 bg-white border border-gray-300 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                <p class="text-lg font-semibold text-gray-800 mb-2">Detalle: {{ postulacion.posDetalle }}</p>
                <p class="text-gray-700 mb-4">Estado: <span :class="estadoClass(postulacion.posEstado)">
                        {{ formatEstado(postulacion.posEstado) }}</span></p>
                <p class="text-gray-700 mb-4">Tema: {{ postulacion.publicacion ? postulacion.publicacion.pubTema : 'No disponible' }}</p>
                <p class="text-gray-700 mb-4">Publicación: {{ postulacion.publicacion ? postulacion.publicacion.pubDescripcion : 'No disponible' }}</p>
                <p class="text-gray-700 mb-4">Usuario: {{ postulacion.usuario ? `${postulacion.usuario.usuNombres} ${postulacion.usuario.usuApellidos}` : 'Desconocido' }}</p>

                <div v-if="postulacion.posEstado === 'P'" class="flex justify-between mt-4">
                    <router-link
                        :to="{ name: 'VerDetalleUsuario', params: { usuId: postulacion.usuario ? postulacion.usuario.usuId : null } }"
                        class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                        Ver Información Usuario
                    </router-link>

                    <button @click="atenderPostulacion(postulacion.posId)"
                        class="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
                        Atender Postulación
                    </button>
                    <button @click="rechazarPostulacion(postulacion.posId)"
                        class="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">
                        Rechazar Postulación
                    </button>
                </div>
            </div>
        </div>

        <p v-if="filteredPostulaciones.length === 0 && !loading && !error" class="text-center text-gray-500">
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
            filterEstado: '',
            filterDetalle: '',
            loading: true,
            error: null,
        };
    },
    mounted() {
        this.comId = this.$route.params.comId;
        this.fetchPostulaciones();
    },
    computed: {
        filteredPostulaciones() {
            return this.postulaciones.filter(postulacion => {
                const matchesEstado = this.filterEstado ? postulacion.posEstado === this.filterEstado : true;
                const matchesDetalle = this.filterDetalle ? postulacion.posDetalle.toLowerCase().includes(this.filterDetalle.toLowerCase()) : true;
                return matchesEstado && matchesDetalle;
            });
        }
    },
    methods: {
        goBack() {
            this.$router.go(-1);
        },
        async fetchPostulaciones() {
            try {
                const postulacionesResponse = await axios.get('http://172.24.0.11:5001/api/postulaciones');
                const postulaciones = postulacionesResponse.data;

                const usuariosResponse = await axios.get('http://172.24.0.11:5001/api/usuario');
                const usuarios = usuariosResponse.data;

                const publicacionesResponse = await axios.get('http://172.24.0.11:5001/api/publicaciones');
                this.publicaciones = publicacionesResponse.data;

                const filteredPostulaciones = postulaciones.filter(postulacion => postulacion.posEmpresa == this.comId);

                const publicacionesMap = this.publicaciones.reduce((map, publicacion) => {
                    map[publicacion.pubId] = publicacion;
                    return map;
                }, {});

                this.postulaciones = filteredPostulaciones.map(postulacion => ({
                    ...postulacion,
                    usuario: usuarios.find(usuario => usuario.usuId === postulacion.posUsuario) || {},
                    publicacion: publicacionesMap[postulacion.posPublicacion] || {}
                }));
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
        async atenderPostulacion(id) {
            try {
                const postulacion = this.postulaciones.find(p => p.posId === id);

                if (postulacion && postulacion.posEstado === 'P') {
                    await axios.put(`http://172.24.0.11:5001/api/postulaciones/${id}`, {
                        posId: postulacion.posId,
                        posUsuario: postulacion.posUsuario,
                        posEmpresa: postulacion.posEmpresa,
                        posDetalle: 'Buenas tardes señor usuario, gracias por postular a nuestra empresa. Esperamos con ansia el día de su entrevista, lo llamaremos esta semana.',
                        posEstado: 'A'
                    });
                    this.fetchPostulaciones();
                    alert('Postulación atendida correctamente');
                } else {
                    this.error = 'Postulación no encontrada o no está en estado pendiente';
                }
            } catch (err) {
                this.error = err.message || 'Error al atender la postulación';
            }
        },
        async rechazarPostulacion(id) {
            try {
                const postulacion = this.postulaciones.find(p => p.posId === id);

                if (postulacion && postulacion.posEstado === 'P') {
                    await axios.put(`http://172.24.0.11:5001/api/postulaciones/${id}`, {
                        posId: postulacion.posId,
                        posUsuario: postulacion.posUsuario,
                        posEmpresa: postulacion.posEmpresa,
                        posDetalle: 'Buenas tardes señor usuario, lamentablemente su postulación ha sido rechazada.',
                        posEstado: 'R'
                    });
                    this.fetchPostulaciones();
                    alert('Postulación rechazada correctamente');
                } else {
                    this.error = 'Postulación no encontrada o no está en estado pendiente';
                }
            } catch (err) {
                this.error = err.message || 'Error al rechazar la postulación';
            }
        },
        estadoClass(estado) {
            const classes = {
                'A': 'text-green-600',
                'P': 'text-blue-600',
                'I': 'text-gray-600',
                'R': 'text-red-600'
            };
            return classes[estado] || 'text-gray-600';
        }
    }
};
</script>


<style scoped>
/* Agregar estilos personalizados aquí */

.header-button {
    background-color: #4a4a4a;
    /* Color de fondo para los botones de la cabecera */
    border-radius: 0.375rem;
    /* Bordes redondeados */
    padding: 0.5rem;
    /* Espaciado interno */
}

.card {
    background-color: #ffffff;
    /* Color de fondo de la tarjeta */
    border: 1px solid #e2e8f0;
    /* Borde de la tarjeta */
    border-radius: 0.375rem;
    /* Bordes redondeados */
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    /* Sombra de la tarjeta */
}

.card:hover {
    box-shadow: 0 8px 12px rgba(0, 0, 0, 0.2);
    /* Sombra más grande al pasar el ratón sobre la tarjeta */
}
</style>
