<template>
    <!-- Encabezado y botón de retroceso -->
    <header class="w-full flex justify-start items-center p-4 bg-gray-200 shadow-md">
        <button class="text-xl p-2">
            <router-link to="/dashempresas" class="text-gray-800 hover:text-gray-600">
                <img aria-hidden="true" alt="back-arrow" src="https://openui.fly.dev/openui/24x24.svg?text=←"
                    class="h-6 w-6 md:h-8 md:w-8" />
            </router-link>
        </button>
    </header>
    <div class="container mx-auto p-6">
        <h1 class="text-4xl text-blue-600 font-serif mb-8">Detalles del Usuario</h1>
  
        <!-- Estado de carga y error -->
        <div v-if="loading" class="text-center mb-6">
            <p class="text-gray-700 text-xl">Cargando detalles del usuario...</p>
        </div>
        <div v-if="error" class="text-red-600 text-center mb-6">
            <p class="text-lg">Error al cargar los detalles del usuario: <span class="font-medium">{{ error }}</span></p>
        </div>
  
        <!-- Detalles del usuario -->
        <div v-if="user" class="bg-white border border-gray-300 rounded-lg shadow-md p-6 mb-8">
            <div class="space-y-4">
                <div class="flex items-center">
                    <span class="w-32 text-blue-600 font-serif">Nombre:</span>
                    <p class="text-gray-900">{{ user.usuNombres }} {{ user.usuApellidos }}</p>
                </div>
                <div class="flex items-center">
                    <span class="w-32 text-blue-600 font-serif">DNI:</span>
                    <p class="text-gray-900">{{ user.usuDni }}</p>
                </div>
                <div class="flex items-center">
                    <span class="w-32 text-blue-600 font-serif">Correo:</span>
                    <p class="text-gray-900">{{ user.usuCorreo }}</p>
                </div>
                <div class="flex items-center">
                    <span class="w-32 text-blue-600 font-serif">Teléfono:</span>
                    <p class="text-gray-900">{{ user.usuTelefono }}</p>
                </div>
                <div class="flex items-center">
                    <span class="w-32 text-blue-600 font-serif">Dirección:</span>
                    <p class="text-gray-900">{{ user.usuDireccion }}</p>
                </div>
                <div class="flex items-center">
                    <span class="w-32 text-blue-600 font-serif">Sexo:</span>
                    <p class="text-gray-900">{{ formatSexo(user.usuSexo) }}</p>
                </div>
                <div class="flex items-center">
                    <span class="w-32 text-blue-600 font-serif">Edad:</span>
                    <p class="text-gray-900">{{ calculateAge(user.usuFechaNacimiento) }} años</p>
                </div>
                <div class="flex items-center">
                    <span class="w-32 text-blue-600 font-serif">Profesión:</span>
                    <p class="text-gray-900">{{ user.usuProfesion || 'No disponible' }}</p>
                </div>
                <div class="flex items-center">
                    <span class="w-32 text-blue-600 font-serif">Provincia:</span>
                    <p class="text-gray-900">{{ provinciaNombre }}</p>
                </div>
            </div>
        </div>
  
        <!-- Sección de Currículum -->
        <div v-if="curriculum" class="bg-white border border-gray-300 rounded-lg shadow-md p-6">
            <h2 class="text-3xl text-blue-600 font-serif mb-6">Currículum</h2>
            <div class="flex items-center space-x-4">
                <p class="text-lg text-black-600 font-serif flex-1">
                    <strong>Nombre del Archivo:</strong> {{ curriculum.fileName }}
                </p>
                <a :href="getCurriculumDownloadUrl()"
                    class="bg-blue-600 text-white py-2 px-4 rounded-lg shadow hover:bg-blue-700 transition" download>
                    Descargar PDF
                </a>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'VerDetalleUsuario',
    props: {
        usuId: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            user: null,
            loading: true,
            error: null,
            provincias: [],
            provinciaNombre: '',
            curriculum: null
        };
    },
    mounted() {
        this.fetchUserDetails();
    },
    watch: {
        usuId(newId) {
            if (newId) {
                this.fetchUserDetails();
            }
        }
    },
    methods: {
        async fetchUserDetails() {
            this.loading = true;
            this.error = null;
            try {
                const userResponse = await axios.get(`http://172.24.0.11:5001/api/usuario/${this.usuId}`);
                this.user = userResponse.data;
                await this.fetchProvincia();
                await this.fetchCurriculum();
            } catch (err) {
                this.error = err.message || 'Error al cargar los detalles del usuario';
            } finally {
                this.loading = false;
            }
        },
        async fetchProvincia() {
            try {
                const response = await axios.get('http://172.24.0.11:5001/api/provincias');
                this.provincias = response.data;
                const provincia = this.provincias.find(p => p.proId === this.user.proId);
                this.provinciaNombre = provincia ? provincia.proNombre : 'Desconocida';
            } catch (err) {
                this.error = err.message || 'Error al cargar las provincias';
            }
        },
        async fetchCurriculum() {
            try {
                const response = await axios.get(`http://172.24.0.11:5001/api/Usuario/list`);
                const curriculums = response.data.filter(curriculum => curriculum.userId === this.user.usuId);
                this.curriculum = curriculums.length > 0 ? curriculums[0] : null;
            } catch (err) {
                this.error = err.message || 'Error al cargar el currículum';
            }
        },
        getCurriculumDownloadUrl() {
            return this.curriculum
                ? `http://172.24.0.11:5001/api/Usuario/download/${this.user.usuId}`
                : '#';
        },
        formatSexo(sexo) {
            const sexos = {
                '1': 'Masculino',
                '2': 'Femenino',
                '3': 'Otro'
            };
            return sexos[sexo] || 'Desconocido';
        },
        calculateAge(fecha) {
            const today = new Date();
            const birthDate = new Date(fecha);
            let age = today.getFullYear() - birthDate.getFullYear();
            const monthDifference = today.getMonth() - birthDate.getMonth();
            if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            }
            return age;
        }
    }
};
</script>

<style scoped>
.container {
    max-width: 900px;
    margin: 0 auto;
}
</style>
