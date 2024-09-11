<template>
    <div>
        <!-- Encabezado y botón de retroceso -->
        <header class="w-full flex justify-start items-center p-4 bg-white shadow-md">
            <button class="text-xl p-2">
                <router-link to="/publicaciones" class="text-xl p-2">
                    <img aria-hidden="true" alt="back-arrow" src="https://openui.fly.dev/openui/24x24.svg?text=←"
                        class="h-6 w-6 md:h-8 md:w-8" />
                </router-link>
            </button>
        </header>

        <!-- Contenedor del formulario -->
        <div class="form-container">
            <div
                class="flex flex-col md:flex-row bg-card text-card-foreground shadow-md rounded-lg overflow-hidden dark:bg-card-dark dark:text-card-dark-foreground">
                <div class="bg-primary text-primary-foreground p-6 flex-1">
                    <h2 class="text-2xl font-bold mb-2">Agregar Nueva Publicación</h2>
                    <img src="../../assets/formulario.jpg" alt="Imagen decorativa">
                </div>
                <div class="p-6 flex-1">
                    <!-- Formulario -->
                    <form @submit.prevent="validarYAgregar" class="space-y-4">
                        <!-- Campo: Título -->
                        <div>
                            <label for="pubTitulo"
                                class="block text-sm font-medium text-muted-foreground">Título:</label>
                            <input id="pubTitulo" v-model="form.pubTitulo" type="text"
                                class="mt-1 block w-full rounded-md border border-input bg-background text-foreground p-2 dark:bg-background-dark dark:text-foreground-dark"
                                placeholder="Ingrese el título" @keypress="validateText($event)" required />
                            <span v-if="errors.pubTitulo" class="text-red-500 text-sm">{{ errors.pubTitulo }}</span>
                        </div>

                        <!-- Campo: Tema -->
                        <div>
                            <label for="pubTema" class="block text-sm font-medium text-muted-foreground">Tema:</label>
                            <input id="pubTema" v-model="form.pubTema" type="text"
                                class="mt-1 block w-full rounded-md border border-input bg-background text-foreground p-2 dark:bg-background-dark dark:text-foreground-dark"
                                placeholder="Ingrese el tema" @keypress="validateText($event)" required />
                            <span v-if="errors.pubTema" class="text-red-500 text-sm">{{ errors.pubTema }}</span>
                        </div>

                        <!-- Campo: Descripción -->
                        <div>
                            <label for="pubDescripcion"
                                class="block text-sm font-medium text-muted-foreground">Descripción:</label>
                            <textarea id="pubDescripcion" v-model="form.pubDescripcion"
                                class="mt-1 block w-full rounded-md border border-input bg-background text-foreground p-2 dark:bg-background-dark dark:text-foreground-dark"
                                placeholder="Ingrese la descripción" @keypress="validateText($event)"
                                required></textarea>
                            <span v-if="errors.pubDescripcion" class="text-red-500 text-sm">{{ errors.pubDescripcion
                                }}</span>
                        </div>

                        <!-- Campo: Rol -->
                        <div>
                            <label for="pubRol" class="block text-sm font-medium text-muted-foreground">Rol:</label>
                            <select id="pubRol" v-model="form.pubRol"
                                class="mt-1 block w-full rounded-md border border-input bg-background text-foreground p-2 dark:bg-background-dark dark:text-foreground-dark"
                                required>
                                <option value="" disabled>Seleccione un rol</option>
                                <option value="1">Usuario</option>
                                <option value="2">Empresa</option>
                            </select>
                            <span v-if="errors.pubRol" class="text-red-500 text-sm">{{ errors.pubRol }}</span>
                        </div>

                        <!-- Campo: Salario -->
                        <div>
                            <label for="pubSalario"
                                class="block text-sm font-medium text-muted-foreground">Salario:</label>
                            <input id="pubSalario" v-model="form.pubSalario" type="number"
                                class="mt-1 block w-full rounded-md border border-input bg-background text-foreground p-2 dark:bg-background-dark dark:text-foreground-dark"
                                placeholder="Ingrese el salario (máximo 5 dígitos)" @keypress="validateNumber($event)"
                                required />
                            <span v-if="errors.pubSalario" class="text-red-500 text-sm">{{ errors.pubSalario }}</span>
                        </div>

                        <!-- Campo: Fecha -->
                        <div>
                            <label for="pubFecha" class="block text-sm font-medium text-muted-foreground">Fecha:</label>
                            <input id="pubFecha" v-model="form.pubFecha" type="date"
                                class="mt-1 block w-full rounded-md border border-input bg-background text-foreground p-2 dark:bg-background-dark dark:text-foreground-dark"
                                required />
                            <span v-if="errors.pubFecha" class="text-red-500 text-sm">{{ errors.pubFecha }}</span>
                        </div>

                        <!-- Botón de Agregar Publicación -->
                        <button type="submit"
                            class="bg-primary text-primary-foreground hover:bg-primary/80 w-full py-2 rounded-md dark:bg-primary-dark dark:text-primary-dark-foreground transition-colors duration-300">Agregar
                            Publicación</button>
                    </form>

                    <!-- Alerta de éxito -->
                    <app-alert v-if="showSuccessAlert" type="success" :message="successMessage"
                        @closed="limpiarAlertas" />

                    <!-- Alerta de error -->
                    <app-alert v-if="showErrorAlert" type="error" :message="errorMessage" @closed="limpiarAlertas" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import AppAlert from '../../components/Alert.vue';

export default {
    name: 'CrearPublicacion',
    components: {
        AppAlert
    },
    data() {
        return {
            form: {
                pubTitulo: '',
                pubTema: '',
                pubDescripcion: '',
                pubRol: '',
                pubSalario: null,
                pubFecha: '', // Campo de fecha añadido
                comId: 3, // usuId quemado como 2
                pubEstado: 'A' // Estado quemado 'A'
            },
            errors: {
                pubTitulo: '',
                pubTema: '',
                pubDescripcion: '',
                pubRol: '',
                pubSalario: '',
                pubFecha: '' // Error para campo de fecha añadido
            },
            showSuccessAlert: false,
            showErrorAlert: false,
            successMessage: 'Publicación agregada correctamente.',
            errorMessage: 'Error al agregar la publicación. Por favor, verifica los campos.'
        };
    },
    methods: {
        validarYAgregar() {
            this.resetErrors();
            this.form.pubRol = parseInt(this.form.pubRol); // Convertir a número entero

            if (!this.form.pubTitulo) {
                this.errors.pubTitulo = 'Debe ingresar el título.';
            }
            if (!this.form.pubTema) {
                this.errors.pubTema = 'Debe ingresar el tema.';
            }
            if (!this.form.pubDescripcion) {
                this.errors.pubDescripcion = 'Debe ingresar la descripción.';
            }
            if (!this.form.pubRol) {
                this.errors.pubRol = 'Debe seleccionar el rol.';
            }
            if (!this.form.pubSalario) {
                this.errors.pubSalario = 'Debe ingresar el salario.';
            }
            if (!this.form.pubFecha) {
                this.errors.pubFecha = 'Debe ingresar la fecha.';
            }
            if (this.hasErrors()) {
                this.showErrorAlert = true;
                return;
            }
            this.agregarPublicacion();
        },

        async agregarPublicacion() {
            try {
                // Enviar datos a la API
                await axios.post('http://172.24.0.11:5001/api/publicaciones', {
                    pubTitulo: this.form.pubTitulo,
                    pubTema: this.form.pubTema,
                    pubRol: this.form.pubRol,
                    pubDescripcion: this.form.pubDescripcion,
                    comId: this.form.usuId,
                    pubSalario: this.form.pubSalario,
                    pubFecha: this.form.pubFecha, // Enviar pubFecha
                    pubEstado: 'A'
                });
                this.showSuccessAlert = true;
                setTimeout(() => {
                    this.limpiarFormulario();
                    this.limpiarAlertas();
                    this.$router.push('/publicaciones');
                }, 1000);
            } catch (error) {
                // Capturar y mostrar error si la solicitud falla
                console.error('Error al agregar la publicación:', error);
                this.showErrorAlert = true;
                this.errorMessage = 'Error al agregar la publicación: ' + error.message;
            }
        },

        resetErrors() {
            this.errors.pubTitulo = '';
            this.errors.pubTema = '';
            this.errors.pubDescripcion = '';
            this.errors.pubRol = '';
            this.errors.pubSalario = '';
            this.errors.pubFecha = ''; // Limpiar errores de fecha
        },

        hasErrors() {
            return (
                this.errors.pubTitulo ||
                this.errors.pubTema ||
                this.errors.pubDescripcion ||
                this.errors.pubRol ||
                this.errors.pubSalario ||
                this.errors.pubFecha
            );
        },

        validateText(event) {
            if (!/[a-zA-Z\s]/.test(event.key)) {
                event.preventDefault();
            }
        },

        validateNumber(event) {
            if (!/[0-9]/.test(event.key)) {
                event.preventDefault();
            }
        },

        limpiarFormulario() {
            this.form.pubTitulo = '';
            this.form.pubTema = '';
            this.form.pubDescripcion = '';
            this.form.pubRol = '';
            this.form.pubSalario = null;
            this.form.pubFecha = ''; // Limpiar campo de fecha
        },

        limpiarAlertas() {
            this.showSuccessAlert = false;
            this.showErrorAlert = false;
        }
    }
};
</script>

<style scoped>
/* Estilos para el formulario y otros elementos */
.form-container {
    margin: auto;
    padding: 20px;
    max-width: 800px;
}

.bg-card {
    background-color: #f9f9f9;
}

.text-card-foreground {
    color: #333;
}
</style>
