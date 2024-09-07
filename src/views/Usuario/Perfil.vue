<template>
    <div class="min-h-screen bg-background text-foreground p-4">
        <header class="flex items-center justify-between p-4 bg-white shadow-2xl">
            <div class="flex items-center space-x-4">
                <img src="https://i.imgur.com/RCpUHKA.png" alt="Logo Multitrabajos" class="h-10">
            </div>
            <div class="relative">
                <button @click="toggleMenu" class="flex items-center space-x-2">
                    <img src="../../assets/personita.png" style="width: 40px; height: 40px;" alt="User Icon">
                    <p>{{ userUserName }}</p>
                    <svg class="h-4 w-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                </button>
                <div v-if="menuVisible" class="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-2xl z-10">
                    <router-link to="/user">
                        <button class="w-full text-left px-4 py-2 hover:bg-gray-100 transition">Inicio</button>
                    </router-link>
                    <router-link to="/postulaciones">
                        <button class="w-full text-left px-4 py-2 hover:bg-gray-100 transition">Ver
                            Postulaciones</button>
                    </router-link>

                    <button @click="cerrarSesion" class="w-full text-left px-4 py-2 hover:bg-gray-100 transition">Cerrar
                        sesión</button>
                </div>
            </div>
        </header>
        <div class="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
            <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                <h1 class="text-2xl font-bold mb-4">Perfil de Usuario</h1>
                <div class="mb-4">
                    <!-- Imagen del perfil (opcional) -->
                    <img :src="userProfileImage" alt="Perfil" class="h-24 w-24 rounded-full mx-auto mb-4" />
                    <!-- Información del usuario -->
                    <h2 class="text-xl font-semibold">{{ userName }} {{ userLastName }}</h2>
                    <p class="text-gray-600">Email: {{ userEmail }}</p>
                    <p class="text-gray-600">Teléfono: {{ userPhone }}</p>
                    <p class="text-gray-600">Dirección: {{ userAddress }}</p>
                    <p class="text-gray-600">Fecha de Nacimiento: {{ userBirthDate }} (Edad: {{ userAge }})</p>
                    <p class="text-gray-600">Profesión: {{ userProfession }}</p>
                    <p class="text-gray-600">Sexo: {{ userSex }}</p>
                    <p class="text-gray-600">DNI: {{ userDni }}</p>
                    <p class="text-gray-600">Nombre de Usuario: {{ userUserName }}</p>
                    <p class="text-gray-600">Clave del usuario: {{ userClave }}</p>
                    <p class="text-gray-600">Provincia: {{ userProvinceName }}</p>
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
                        <form @submit.prevent="updateUserProfile">
                            <!-- Campos del formulario con etiquetas al lado -->
                            <div class="flex items-center mb-4">
                                <label for="userName" class="w-32 text-right pr-4">Nombre:</label>
                                <input v-model="userName" id="userName" placeholder="Nombre"
                                    class="flex-1 p-2 border rounded" />
                            </div>
                            <div class="flex items-center mb-4">
                                <label for="userLastName" class="w-32 text-right pr-4">Apellido:</label>
                                <input v-model="userLastName" id="userLastName" placeholder="Apellido"
                                    class="flex-1 p-2 border rounded" />
                            </div>
                            <div class="flex items-center mb-4">
                                <label for="userDni" class="w-32 text-right pr-4">DNI:</label>
                                <input v-model="userDni" id="userDni" placeholder="DNI"
                                    class="flex-1 p-2 border rounded" />
                            </div>
                            <div class="flex items-center mb-4">
                                <label for="userEmail" class="w-32 text-right pr-4">Email:</label>
                                <input v-model="userEmail" id="userEmail" placeholder="Email"
                                    class="flex-1 p-2 border rounded" />
                            </div>
                            <div class="flex items-center mb-4">
                                <label for="userPhone" class="w-32 text-right pr-4">Teléfono:</label>
                                <input v-model="userPhone" id="userPhone" placeholder="Teléfono"
                                    class="flex-1 p-2 border rounded" />
                            </div>
                            <div class="flex items-center mb-4">
                                <label for="userAddress" class="w-32 text-right pr-4">Dirección:</label>
                                <input v-model="userAddress" id="userAddress" placeholder="Dirección"
                                    class="flex-1 p-2 border rounded" />
                            </div>
                            <div class="flex items-center mb-4">
                                <label for="userProfession" class="w-32 text-right pr-4">Profesión:</label>
                                <input v-model="userProfession" id="userProfession" placeholder="Profesión"
                                    class="flex-1 p-2 border rounded" />
                            </div>
                            <div class="flex items-center mb-4">
                                <label for="userClave" class="w-32 text-right pr-4">Clave:</label>
                                <input v-model="userClave" id="userClave" type="password" placeholder="Clave"
                                    class="flex-1 p-2 border rounded" />
                            </div>
                            <div class="flex items-center mb-4">
                                <label for="usuUser" class="w-32 text-right pr-4">Nombre de Usuario:</label>
                                <input v-model="userUserName" id="userUserName" placeholder="Nombre de Usuario"
                                    class="flex-1 p-2 border rounded" />
                            </div>

                            <!-- Botones para guardar o cancelar -->
                            <div class="flex justify-end space-x-4 mt-4">
                                <button @click="toggleEditModal"
                                    class="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">Cancelar</button>
                                <button type="submit"
                                    class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Guardar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios';

export default {
    name: 'PerfilPage',
    data() {
        return {
            userProfileImage: 'https://genesistoxical.com/wp-content/uploads/2022/07/CFS_P.png',
            userName: '',
            userLastName: '',
            menuVisible: false,
            userEmail: '',
            userPhone: '',
            userAddress: '',
            userBirthDate: '',
            userAge: '',
            userProfession: '',
            userSex: '',
            userClave: '',
            userDni: '',
            userUserName: '',
            userProvinceName: '', // Aquí se mostrará el nombre de la provincia
            isEditModalVisible: false,
            provinces: [] // Lista para almacenar las provincias
        };
    },
    mounted() {
        this.fetchUserData();
        this.fetchProvinces();
        this.fetchProvinces();
        this.fetchProvinces();// Llamada para obtener las provincias
    },
    methods: {
        // Método para obtener las provincias
        fetchProvinces() {
            axios.get('http://172.24.0.11:5001/api/provincias')
                .then(response => {
                    this.provinces = response.data; // Guarda las provincias
                })
                .catch(error => {
                    console.error('Error al obtener las provincias:', error);
                });
        },
        fetchUserData() {
            const userId = this.$route.params.id;
            axios.get(`http://172.24.0.11:5001/api/usuario/${userId}`)
                .then(response => {
                    const user = response.data;
                    if (user) {
                        this.userName = user.usuNombres || '';
                        this.userLastName = user.usuApellidos || '';
                        this.userEmail = user.usuCorreo || '';
                        this.userPhone = user.usuTelefono || '';
                        this.userAddress = user.usuDireccion || '';
                        this.userBirthDate = user.usuFechaNacimiento ? new Date(user.usuFechaNacimiento).toLocaleDateString() : '';
                        this.userAge = this.calculateAge(user.usuFechaNacimiento);
                        this.userProfession = user.usuProfesion || '';
                        this.userSex = user.usuSexo === '1' ? 'Masculino' : 'Femenino';
                        this.userDni = user.usuDni || '';
                        this.userUserName = user.usuUser || '';
                        this.userClave = user.usuClave || '';

                        console.log('Usuario:', user); // Verifica los datos del usuario
                        console.log('Provincias:', this.provinces); // Verifica las provincias

                        // Busca el nombre de la provincia usando el proId del usuario
                        const userProvince = this.provinces.find(province => province.proId === user.proId);
                        console.log('Provincia encontrada:', userProvince); // Verifica si se encuentra la provincia
                        this.userProvinceName = userProvince ? userProvince.proNombre : 'Provincia no encontrada';
                    }
                })
                .catch(error => {
                    console.error('Error al cargar los datos del usuario:', error);
                });
        },
        toggleEditModal() {
            this.isEditModalVisible = !this.isEditModalVisible;
        },
        // Método para calcular la edad
        calculateAge(birthDate) {
            if (!birthDate) return '';
            const birthDateObj = new Date(birthDate);
            const today = new Date();
            let age = today.getFullYear() - birthDateObj.getFullYear();
            const monthDifference = today.getMonth() - birthDateObj.getMonth();
            if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDateObj.getDate())) {
                age--;
            }
            return age;
        },
        toggleMenu() {
            this.menuVisible = !this.menuVisible;

        },
        async updateUserProfile() {
            const userId = this.$route.params.id;

            // Verificar si todas las propiedades necesarias tienen valores válidos
            if (!this.userName || !this.userLastName || !this.userDni || !this.userEmail || !this.userPhone || !this.userAddress || !this.userSex || !this.userBirthDate || !this.userProfession || !this.userClave || !this.userUserName) {
                console.error('Algunos campos están vacíos.');
                return;
            }

            try {
                await axios.put(`http://172.24.0.11:5001/api/usuario/${userId}`, {
                    usuId: userId,
                    usuNombres: this.userName,
                    usuApellidos: this.userLastName,
                    usuTipoDni: '1', // Asume que este valor es siempre '1' o ajusta según sea necesario
                    usuDni: this.userDni,
                    usuCorreo: this.userEmail,
                    usuTelefono: this.userPhone,
                    usuDireccion: this.userAddress,
                    usuSexo: this.userSex === 'Masculino' ? '1' : '2', // Asegúrate de mapear correctamente el sexo
                    usuFechaNacimiento: new Date(this.userBirthDate).toISOString(), // Asegúrate de usar el formato ISO 8601
                    usuProfesion: this.userProfession,
                    usuRol: 2, // Asume que el rol es siempre '2' o ajusta según sea necesario
                    usuEstado: 'A', // Asume que el estado es siempre 'A' o ajusta según sea necesario
                    proId: this.userProvince, // Asegúrate de que esto coincida con el ID de provincia correcto
                    usuCv: null, // Ajusta esto según sea necesario
                    usuClave: this.userClave,
                    usuUser: this.userUserName
                });
                console.log('Perfil actualizado exitosamente');
                this.toggleEditModal(); // Cierra el modal después de actualizar
                this.fetchUserData(); // Actualiza los datos del usuario
            } catch (error) {
                console.error('Error al actualizar el perfil:', error.response ? error.response.data : error.message);
                // Revisa los errores específicos aquí
                if (error.response && error.response.data && error.response.data.errors) {
                    console.log('Errores:', error.response.data.errors);
                }
            }
        },
        async cerrarSesion() {
            try {
                // Limpiar almacenamiento local
                localStorage.removeItem('userCorreo');
                localStorage.removeItem('userToken'); // Si estás almacenando un token de autenticación

                // Redirigir al usuario a la página de inicio de sesión
                this.$router.push('/login'); // Cambia '/login' por la ruta de tu página de inicio de sesión
            } catch (error) {
                console.error('Error al cerrar sesión:', error);
            }
        }
    }
};
</script>

<style scoped>
/* Agrega estilos personalizados si es necesario */
</style>
