<template>
    <div class="min-h-screen flex flex-col items-center justify-start bg-background text-foreground">
        <header class="w-full flex justify-start items-center p-4 bg-white shadow-md">
            <button class="text-xl p-2">
                <router-link to="/empresas" class="text-xl p-2">
                    <img aria-hidden="true" alt="back-arrow" src="https://openui.fly.dev/openui/24x24.svg?text=←"
                        class="h-6 w-6 md:h-8 md:w-8" />
                </router-link>
            </button>
        </header>
        <main class="flex flex-col md:flex-row items-center justify-center w-full max-w-6xl mt-8 p-4">
            <div class="w-full md:w-1/2 p-4 bg-blue-100 rounded-lg shadow-lg">
                <h1 class="text-2xl font-bold text-blue-700 mb-4">Registra tu empresa en Multitrabajos</h1>
                <p class="text-muted-foreground mb-6">Todos los campos son obligatorios.</p>
                <form class="space-y-4" @submit.prevent="handleSubmit">
                    <fieldset>
                        <legend class="text-lg font-semibold mb-2">Completa la información de tu empresa</legend>
                        <div class="space-y-4">
                            <div>
                                <label for="nombre" class="block text-sm font-medium">Nombre</label>
                                <input v-model="nombre" type="text" id="nombre"
                                    class="mt-1 block w-full border border-input rounded-lg p-2" />
                                <span v-if="errors.nombre" class="text-red-600 text-sm">{{ errors.nombre }}</span>
                            </div>
                            <div>
                                <label for="apellidos" class="block text-sm font-medium">Apellidos</label>
                                <input v-model="apellidos" type="text" id="apellidos"
                                    class="mt-1 block w-full border border-input rounded-lg p-2" />
                                <span v-if="errors.apellidos" class="text-red-600 text-sm">{{ errors.apellidos }}</span>
                            </div>
                            <div>
                                <label for="encargado" class="block text-sm font-medium">Encargado</label>
                                <input v-model="encargado" type="text" id="encargado"
                                    class="mt-1 block w-full border border-input rounded-lg p-2" />
                                <span v-if="errors.encargado" class="text-red-600 text-sm">{{ errors.encargado }}</span>
                            </div>
                            <div>
                                <label for="tipoDni" class="block text-sm font-medium">Tipo de DNI</label>
                                <select v-model="tipoDni" id="tipoDni"
                                    class="mt-1 block w-full border border-input rounded-lg p-2">
                                    <option value="1">RUC</option>
                                </select>
                                <span v-if="errors.tipoDni" class="text-red-600 text-sm">{{ errors.tipoDni }}</span>
                            </div>
                            <div>
                                <label for="dni" class="block text-sm font-medium">Número de DNI</label>
                                <input v-model="dni" type="text" id="dni"
                                    class="mt-1 block w-full border border-input rounded-lg p-2" />
                                <span v-if="errors.dni" class="text-red-600 text-sm">{{ errors.dni }}</span>
                            </div>
                            <div>
                                <label for="telefono" class="block text-sm font-medium">Teléfono</label>
                                <input v-model="telefono" type="text" id="telefono"
                                    class="mt-1 block w-full border border-input rounded-lg p-2" />
                                <span v-if="errors.telefono" class="text-red-600 text-sm">{{ errors.telefono }}</span>
                            </div>
                            <div>
                                <label for="direccion" class="block text-sm font-medium">Dirección</label>
                                <input v-model="direccion" type="text" id="direccion"
                                    class="mt-1 block w-full border border-input rounded-lg p-2" />
                                <span v-if="errors.direccion" class="text-red-600 text-sm">{{ errors.direccion }}</span>
                            </div>
                            <div>
                                <label for="correo" class="block text-sm font-medium">Correo Electrónico</label>
                                <input v-model="correo" type="email" id="correo"
                                    class="mt-1 block w-full border border-input rounded-lg p-2" />
                                <span v-if="errors.correo" class="text-red-600 text-sm">{{ errors.correo }}</span>
                            </div>
                            <div>
                                <label for="nombreEmpresa" class="block text-sm font-medium">Nombre de la Empresa</label>
                                <input v-model="nombreEmpresa" type="text" id="nombreEmpresa"
                                    class="mt-1 block w-full border border-input rounded-lg p-2" />
                                <span v-if="errors.nombreEmpresa" class="text-red-600 text-sm">{{ errors.nombreEmpresa }}</span>
                            </div>
                        </div>
                    </fieldset>
                    <div class="space-y-4">
                        <button type="submit"
                            class="w-full py-2 px-4 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700">
                            Registrar Empresa
                        </button>
                    </div>
                </form>
                <app-alert v-if="showSuccessAlert" type="success" :message="successMessage" @closed="limpiarAlertas" />
                <app-alert v-if="showErrorAlert" type="error" :message="errorMessage" @closed="limpiarAlertas" />
            </div>
            <div class="hidden md:block w-1/2 p-4">
                <img src="https://i.imgur.com/tM9uwLh.jpeg" alt="Ilustración de una persona con un currículum"
                    class="max-w-full h-auto" />
            </div>
        </main>
    </div>
</template>

<script>
import axios from 'axios';
import AppAlert from '../../components/Alert.vue';

export default {
    name: 'CrearEmpresa',
    components: {
        AppAlert
    },
    data() {
        return {
            nombre: '',
            apellidos: '',
            encargado: '',
            tipoDni: '1', // RUC predeterminado
            dni: '',
            telefono: '',
            direccion: '',
            correo: '',
            nombreEmpresa: '',
            errors: {},
            showSuccessAlert: false,
            showErrorAlert: false,
            successMessage: '',
            errorMessage: ''
        };
    },
    methods: {
        validate() {
            this.errors = {};
            if (!/^[a-zA-Z]+(?: [a-zA-Z]+)?$/.test(this.nombre)) {
                this.errors.nombre = 'El nombre debe contener solo letras y un solo espacio entre palabras.';
            }
            if (!/^[a-zA-Z]+(?: [a-zA-Z]+)?$/.test(this.apellidos)) {
                this.errors.apellidos = 'Los apellidos deben contener solo letras y un solo espacio entre palabras.';
            }
            if (!/^[a-zA-Z]+(?: [a-zA-Z]+)?$/.test(this.encargado)) {
                this.errors.encargado = 'El encargado debe contener solo letras y un solo espacio entre palabras.';
            }
            if (!this.tipoDni) {
                this.errors.tipoDni = 'Selecciona un tipo de DNI.';
            }
            if (!/^\d{10}$/.test(this.dni)) { // Ajustado a 10 dígitos
                this.errors.dni = 'El número de DNI debe tener 10 dígitos.';
            }
            if (!/^\d{10,15}$/.test(this.telefono)) {
                this.errors.telefono = 'El teléfono debe tener entre 10 y 15 dígitos.';
            }
            if (!this.direccion || /[^a-zA-Z0-9\s]/.test(this.direccion)) { // Permitido espacio en dirección
                this.errors.direccion = 'La dirección no puede estar vacía y debe contener solo letras y números.';
            }
            const emailRegex = /^[^\s@]+@[^\s@]+\.(com|edu\.ec)$/;
            if (!emailRegex.test(this.correo)) {
                this.errors.correo = 'El correo electrónico debe ser válido y terminar en @.com o @.edu.ec.';
            }

            if (!/^[a-zA-Z]+(?: [a-zA-Z]+)?$/.test(this.nombreEmpresa)) {
                this.errors.nombreEmpresa = 'El nombre de la empresa debe contener solo letras y un solo espacio entre palabras.';
            }

            return Object.keys(this.errors).length === 0;
        },
        limpiarAlertas() {
            this.showSuccessAlert = false;
            this.showErrorAlert = false;
        },
        handleSubmit() {
            if (this.validate()) {
                // Check if RUC already exists
                axios.get(`http://172.24.0.11:5001/api/empresas/ruc/${this.dni}`)
                    .then(response => {
                        if (response.data.exists) {
                            this.errorMessage = 'El RUC ya se encuentra registrado.';
                            this.showErrorAlert = true;
                        } else {
                            // Register new company
                            const data = {
                                comNombres: this.nombre,
                                comApellidos: this.apellidos,
                                comEncargado: this.encargado,
                                comTipoDni: this.tipoDni,
                                comDni: this.dni,
                                comTelefono: this.telefono,
                                comDireccion: this.direccion,
                                comCorreo: this.correo,
                                comEstado: 'A',
                                comNombreEmpresa: this.nombreEmpresa,
                                comUsuario: 0 // Enviado como 0
                            };

                            axios.post('http://172.24.0.11:5001/api/empresas', data)
                                .then(() => {
                                    this.successMessage = 'Empresa registrada con éxito.';
                                    this.showSuccessAlert = true;
                                    // Puedes agregar redirección o mensajes aquí
                                })
                                .catch(() => {
                                    this.errorMessage = 'Error al registrar la empresa. Inténtalo de nuevo.';
                                    this.showErrorAlert = true;
                                });
                        }
                    })
                    .catch(() => {
                        this.errorMessage = 'Error al verificar el RUC.';
                        this.showErrorAlert = true;
                    });
            }
        }
    }
};
</script>

<style scoped>
/* Estilos personalizados aquí */
</style>
