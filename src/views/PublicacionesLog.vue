<template>
    <div class="bg-gradient-to-r from-pink-200 via-purple-200 to-blue-200 min-h-screen">
        <header class="flex justify-between items-center p-4 bg-white shadow">
            <img src="../assets/MultiEmpleo.png" alt="multitrabajos logo" class="h-10">
            <nav class="hidden md:flex space-x-4">
                <router-link to="/publicacioneslog" class="text-gray-700 hover:text-gray-900">Publicaciones</router-link>
                <router-link to="/" class="text-gray-700 hover:text-gray-900">Inicio</router-link>
            </nav>
            <div class="flex space-x-4">
                <router-link to="/register" class="bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700">Crear cuenta</router-link>
                <router-link to="/login" class="bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700">Ingresar</router-link>
            </div>
            <button class="md:hidden block">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6">
                    <path d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
            </button>
        </header>

        <div class="container mx-auto mt-8">
            <h1 class="text-2xl font-bold mb-6">Lista de Publicaciones</h1>

            <Alert v-if="showAlert" :message="alertMessage" @close="showAlert = false" />

            <div class="mb-4">
                <input v-model.number="filters.salario" type="number" placeholder="Filtrar por salario" class="border px-4 py-2 rounded">
                <input v-model="filters.tema" type="text" placeholder="Filtrar por tema" class="border px-4 py-2 rounded ml-4">
                <input v-model="filters.fecha" type="date" placeholder="Filtrar por fecha" class="border px-4 py-2 rounded ml-4">
            </div>

            <div v-if="filteredPublicaciones.length === 0" class="text-center">
                <p>No hay publicaciones disponibles.</p>
            </div>

            <div v-for="publicacion in paginatedPublicaciones" :key="publicacion.pubId" class="bg-white p-6 rounded-lg shadow-lg mb-6">
                <h2 class="text-xl font-bold mb-2">{{ publicacion.pubTitulo }}</h2>
                <p class="text-gray-700 mb-2"><strong>Tema:</strong> {{ publicacion.pubTema }}</p>
                <p class="text-gray-700 mb-2"><strong>Descripción:</strong> {{ publicacion.pubDescripcion }}</p>
                <p class="text-gray-700 mb-2"><strong>Salario:</strong> {{ publicacion.pubSalario }} USD</p>
                <p class="text-gray-700 mb-2"><strong>Fecha:</strong> {{ formatDate(publicacion.pubFecha) }}</p>
                <p class="text-gray-700 mb-2"><strong>Empresa:</strong> {{ getEmpresaNombre(publicacion.comId).nombre }}</p>
                <p class="text-gray-700 mb-2"><strong>Dirección:</strong> {{ getEmpresaNombre(publicacion.comId).direccion }}</p>

                <button @click="handlePostular(publicacion.pubId)" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Postular
                </button>
            </div>

            <div class="flex justify-center mt-6">
                <button v-for="page in totalPages" :key="page" @click="changePage(page)" :class="{'bg-blue-500 text-white': page === currentPage, 'bg-gray-300 text-gray-700': page !== currentPage}" class="px-4 py-2 rounded mx-1">
                    {{ page }}
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import Alert from '@/components/Alert.vue'; // Asegúrate de importar correctamente tu componente Alert

export default {
    name: 'PublicacionesLog',
    components: {
        Alert
    },
    data() {
        return {
            publicaciones: [],
            empresas: [],
            showAlert: false,
            alertMessage: '',
            currentPage: 1,
            pageSize: 5,
            filters: {
                salario: '',
                tema: '',
                fecha: ''
            }
        };
    },
    computed: {
        filteredPublicaciones() {
            const today = new Date().toISOString().split('T')[0];
            return this.publicaciones.filter(publicacion =>
                publicacion.pubEstado === 'A' &&
                (this.filters.salario ? publicacion.pubSalario <= this.filters.salario : true) &&
                (this.filters.tema ? publicacion.pubTema.toLowerCase().includes(this.filters.tema.toLowerCase()) : true) &&
                (this.filters.fecha ? this.formatDate(publicacion.pubFecha) === this.filters.fecha : new Date(publicacion.pubFecha) <= new Date(today))
            );
        },
        paginatedPublicaciones() {
            const start = (this.currentPage - 1) * this.pageSize;
            const end = start + this.pageSize;
            return this.filteredPublicaciones.slice(start, end);
        },
        totalPages() {
            return Math.ceil(this.filteredPublicaciones.length / this.pageSize);
        }
    },
    methods: {
        async fetchPublicaciones() {
            try {
                const response = await fetch('http://172.24.0.11:5001/api/publicaciones');
                if (response.ok) {
                    this.publicaciones = await response.json();
                } else {
                    console.error('Error al recuperar las publicaciones.');
                }
            } catch (error) {
                console.error('Error al conectarse a la API de publicaciones:', error);
            }
        },
        async fetchEmpresas() {
            try {
                const response = await fetch('http://172.24.0.11:5001/api/empresas');
                if (response.ok) {
                    this.empresas = await response.json();
                } else {
                    console.error('Error al recuperar las empresas.');
                }
            } catch (error) {
                console.error('Error al conectarse a la API de empresas:', error);
            }
        },
        formatDate(fecha) {
            const date = new Date(fecha);
            return date.toISOString().split('T')[0];  // Formato YYYY-MM-DD
        },
        getEmpresaNombre(comId) {
            const empresa = this.empresas.find(e => e.comId === comId);
            return empresa ? { nombre: empresa.comNombreEmpresa, direccion: empresa.comDireccion } : { nombre: 'Empresa desconocida', direccion: 'Dirección desconocida' };
        },
        handlePostular() {
            this.alertMessage = 'Por favor crearse una cuenta para poder postular.';
            this.showAlert = true;
            setTimeout(() => {
                this.$router.push('/login');
            }, 2000);
        },
        changePage(newPage) {
            if (newPage >= 1 && newPage <= this.totalPages) {
                this.currentPage = newPage;
            }
        }
    },
    async mounted() {
        await this.fetchPublicaciones();
        await this.fetchEmpresas();
    }
};
</script>

<style scoped>
.container {
    max-width: 800px;
}
</style>
