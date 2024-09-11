<template>
    <div class="min-h-screen bg-background text-foreground p-4">
        <header class="flex items-center justify-between p-4 bg-white shadow-2xl">
            <div class="flex items-center space-x-4">
                <img src="https://i.imgur.com/RCpUHKA.png" alt="Logo Multitrabajos" class="h-10">
            </div>
            <div class="relative">
                <button @click="toggleMenu" class="flex items-center space-x-2">
                    <img src="../../assets/personita.png" style="width: 40px; height: 40px;" alt="User Icon">
                    <p>{{ companyManager }}</p>
                    <svg class="h-4 w-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                </button>
                <div v-if="menuVisible" class="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-2xl z-10">
                    <router-link to="/dashempresas">
                        <button class="w-full text-left px-4 py-2 hover:bg-gray-100 transition">Inicio</button>
                    </router-link>
                    
                </div>
            </div>
        </header>
        <div class="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
            <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                <h1 class="text-2xl font-bold mb-4">Perfil de Empresa</h1>
                <div class="mb-4">
                    <!-- Información de la empresa -->
                    <h2 class="text-xl font-semibold">{{ companyName }}</h2>
                    <p class="text-gray-600">Nombre del Encargado: {{ companyManager }}</p>
                    <p class="text-gray-600">Nombre: {{ companyNombres }}</p>
                    <p class="text-gray-600">Apellido: {{ companyApellidos }}</p>
                    <p class="text-gray-600">Razón Social: {{ companyRazonSocial }}</p>
                    <p class="text-gray-600">Email: {{ companyEmail }}</p>
                    <p class="text-gray-600">Teléfono: {{ companyPhone }}</p>
                    <p class="text-gray-600">Dirección: {{ companyAddress }}</p>
                    <p class="text-gray-600">DNI: {{ companyDni }}</p>
                    <p class="text-gray-600">Clave: {{ companyKey }}</p>
                </div>

                <!-- Botón Editar Perfil -->
                <button @click="toggleEditModal"
                    class="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 mt-4">
                    Editar Perfil
                </button>

                <!-- Modal de Editar Perfil -->
                <div v-if="isEditModalVisible"
                    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                        <h2 class="text-xl font-bold mb-4">Editar Perfil</h2>
                        <form @submit.prevent="updateCompanyProfile">
                            <!-- Campos del formulario con etiquetas al lado -->
                            <div class="flex items-center mb-4">
                                <label for="companyName" class="w-32 text-right pr-4">Nombre de la Empresa:</label>
                                <input v-model="companyName" id="companyName" placeholder="Nombre de la Empresa"
                                    class="flex-1 p-2 border rounded" />
                            </div>
                            <div class="flex items-center mb-4">
                                <label for="companyManager" class="w-32 text-right pr-4">Encargado:</label>
                                <input v-model="companyManager" id="companyManager" placeholder="Encargado"
                                    class="flex-1 p-2 border rounded" />
                            </div>
                            <div class="flex items-center mb-4">
                                <label for="companyDni" class="w-32 text-right pr-4">DNI:</label>
                                <input v-model="companyDni" id="companyDni" placeholder="DNI"
                                    class="flex-1 p-2 border rounded" />
                            </div>
                            <div class="flex items-center mb-4">
                                <label for="companyEmail" class="w-32 text-right pr-4">Email:</label>
                                <input v-model="companyEmail" id="companyEmail" placeholder="Email"
                                    class="flex-1 p-2 border rounded" />
                            </div>
                            <div class="flex items-center mb-4">
                                <label for="companyPhone" class="w-32 text-right pr-4">Teléfono:</label>
                                <input v-model="companyPhone" id="companyPhone" placeholder="Teléfono"
                                    class="flex-1 p-2 border rounded" />
                            </div>
                            <div class="flex items-center mb-4">
                                <label for="companyAddress" class="w-32 text-right pr-4">Dirección:</label>
                                <input v-model="companyAddress" id="companyAddress" placeholder="Dirección"
                                    class="flex-1 p-2 border rounded" />
                            </div>
                            <div class="flex items-center mb-4">
                                <label for="companyKey" class="w-32 text-right pr-4">Clave:</label>
                                <input v-model="companyKey" id="companyKey" placeholder="Clave"
                                    class="flex-1 p-2 border rounded" />
                            </div>
                            <div class="flex items-center mb-4">
                                <label for="companyRazonSocial" class="w-32 text-right pr-4">Razón Social:</label>
                                <input v-model="companyRazonSocial" id="companyRazonSocial" placeholder="Razón Social"
                                    class="flex-1 p-2 border rounded" />
                            </div>
                            <div class="flex items-center mb-4">
                                <label for="companyNombres" class="w-32 text-right pr-4">Nombre:</label>
                                <input v-model="companyNombres" id="companyNombres" placeholder="Nombre"
                                    class="flex-1 p-2 border rounded" />
                            </div>
                            <div class="flex items-center mb-4">
                                <label for="companyApellidos" class="w-32 text-right pr-4">Apellido:</label>
                                <input v-model="companyApellidos" id="companyApellidos" placeholder="Apellido"
                                    class="flex-1 p-2 border rounded" />
                            </div>
                            <!-- Botones de Guardar y Cancelar -->
                            <div class="flex justify-end space-x-4">
                                <button type="button" @click="toggleEditModal"
                                    class="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">
                                    Cancelar
                                </button>
                                <button type="submit"
                                    class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                                    Guardar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>

        <!-- Mensajes de Alerta -->
        <Alert v-if="showSuccessAlert" :type="'success'" :message="successMessage" />
        <Alert v-if="showErrorAlert" :type="'error'" :message="errorMessage" />
    </div>
</template>

<script>
import axios from 'axios'
import Alert from '@/components/Alert.vue'; // Actualiza la importación a 'Alert'

export default {
    name: 'PerfilEmpresa',
    components: {
        Alert // Registra el componente localmente
    },
    data() {
        return {
            companyId: '',
            companyName: '',
            companyManager: '',
            companyEmail: '',
            companyPhone: '',
            companyAddress: '',
            companyDni: '',
            companyUserName: '',
            companyKey: '',
            companyStatus: '',
            companyNombres: '',
            companyApellidos: '',
            companyRazonSocial: '',

            isEditModalVisible: false,
            menuVisible: false,
            showSuccessAlert: false,
            successMessage: '',
            showErrorAlert: false,
            errorMessage: ''
        };
    },
    mounted() {
        this.fetchCompanyData();
    },
    methods: {
        fetchCompanyData() {
            const companyId = this.$route.params.comId; // Usa 'comId'
            console.log('Fetching data for companyId:', companyId); // Verifica el valor de companyId

            axios.get(`http://172.24.0.11:5001/api/empresas/${companyId}`)
                .then(response => {
                    const company = response.data;
                    if (company) {
                        this.companyId = company.comId || '';
                        this.companyName = company.comNombreEmpresa || '';
                        this.companyManager = company.comEncargado || '';
                        this.companyEmail = company.comCorreo || '';
                        this.companyPhone = company.comTelefono || '';
                        this.companyAddress = company.comDireccion || '';
                        this.companyDni = company.comDni || '';
                        this.companyUserName = company.comUsuario || '';
                        this.companyKey = company.comClave || '';
                        this.companyStatus = company.comEstado || '';
                        this.companyNombres = company.comNombres || '';
                        this.companyApellidos = company.comApellidos || '';
                        this.companyRazonSocial = company.comRazonSocial || '';
                    }
                })
                .catch(error => {
                    console.error('Error fetching company data:', error);
                });
        },
        updateCompanyProfile() {
            const datos = {
                comId: this.companyId,
                comNombres: this.companyNombres,
                comApellidos: this.companyApellidos,
                comEncargado: this.companyManager,
                comDni: this.companyDni,
                comTelefono: this.companyPhone,
                comDireccion: this.companyAddress,
                comCorreo: this.companyEmail,
                comEstado: 'A',
                comNombreEmpresa: this.companyName,
                comRazonSocial: this.companyRazonSocial,
                comClave: this.companyKey,
            };

            axios.put(`http://172.24.0.11:5001/api/empresas/${this.companyId}`, datos)
                .then(response => {
                    console.log(response); // Log the response for debugging
                    this.successMessage = 'Perfil actualizado exitosamente.';
                    this.showSuccessAlert = true;
                    setTimeout(() => this.showSuccessAlert = false, 3000); // Ocultar después de 3 segundos
                    this.toggleEditModal(); // Cierra el modal
                })
                .catch(error => {
                    console.error(error); // Log the error for debugging
                    this.errorMessage = 'Error al actualizar el perfil.';
                    this.showErrorAlert = true;
                    setTimeout(() => this.showErrorAlert = false, 3000); // Ocultar después de 3 segundos
                });
        },
        toggleEditModal() {
            this.isEditModalVisible = !this.isEditModalVisible;
        },
        toggleMenu() {
            this.menuVisible = !this.menuVisible;
        }
    },
};
</script>


<style scoped>
/* Estilos específicos si es necesario */
</style>
