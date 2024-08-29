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
                    <h2 class="text-2xl font-bold mb-2">Editar Publicación</h2>
                    <img src="../../assets/formulario.jpg" alt="Imagen decorativa">
                </div>
                <div class="p-6 flex-1">
                    <!-- Formulario -->
                    <form @submit.prevent="validarYActualizar" class="space-y-4">
                        <!-- Campo: Título -->
                        <div>
                            <label for="pubTitulo"
                                class="block text-sm font-medium text-muted-foreground">Título:</label>
                            <input id="pubTitulo" v-model="form.pubTitulo" type="text"
                                class="mt-1 block w-full rounded-md border border-input bg-background text-foreground p-2 dark:bg-background-dark dark:text-foreground-dark"
                                placeholder="Ingrese el título" required />
                            <span v-if="!form.pubTitulo" class="text-red-500 text-sm">El título es requerido</span>
                        </div>

                        <!-- Campo: Tema -->
                        <div>
                            <label for="pubTema" class="block text-sm font-medium text-muted-foreground">Tema:</label>
                            <input id="pubTema" v-model="form.pubTema" type="text"
                                class="mt-1 block w-full rounded-md border border-input bg-background text-foreground p-2 dark:bg-background-dark dark:text-foreground-dark"
                                placeholder="Ingrese el tema" required />
                            <span v-if="!form.pubTema" class="text-red-500 text-sm">El tema es requerido</span>
                        </div>

                        <!-- Campo: Descripción -->
                        <div>
                            <label for="pubDescripcion"
                                class="block text-sm font-medium text-muted-foreground">Descripción:</label>
                            <textarea id="pubDescripcion" v-model="form.pubDescripcion"
                                class="mt-1 block w-full rounded-md border border-input bg-background text-foreground p-2 dark:bg-background-dark dark:text-foreground-dark"
                                placeholder="Ingrese la descripción" required></textarea>
                            <span v-if="!form.pubDescripcion" class="text-red-500 text-sm">La descripción es
                                requerida</span>
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
                            <span v-if="!form.pubRol" class="text-red-500 text-sm">El rol es requerido</span>
                        </div>

                        <!-- Campo: Salario -->
                        <div>
                            <label for="pubSalario"
                                class="block text-sm font-medium text-muted-foreground">Salario:</label>
                            <input id="pubSalario" v-model="form.pubSalario" type="number"
                                class="mt-1 block w-full rounded-md border border-input bg-background text-foreground p-2 dark:bg-background-dark dark:text-foreground-dark"
                                placeholder="Ingrese el salario (máximo 5 dígitos)" required />
                            <span v-if="!form.pubSalario" class="text-red-500 text-sm">El salario es requerido</span>
                        </div>

                        <!-- Campo: Fecha -->
                        <div>
                            <label for="pubFecha" class="block text-sm font-medium text-muted-foreground">Fecha:</label>
                            <input id="pubFecha" v-model="form.pubFecha" type="date"
                                class="mt-1 block w-full rounded-md border border-input bg-background text-foreground p-2 dark:bg-background-dark dark:text-foreground-dark"
                                required />
                            <span v-if="!form.pubFecha" class="text-red-500 text-sm">La fecha es requerida</span>
                        </div>


                        <!-- Botón de Actualizar Publicación -->
                        <button type="submit"
                            class="bg-primary text-primary-foreground hover:bg-primary/80 w-full py-2 rounded-md dark:bg-primary-dark dark:text-primary-dark-foreground transition-colors duration-300">Actualizar
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
    name: 'EditarPubli',
    components: {
        AppAlert
    },
    data() {
        return {
            form: {
                pubId: '',  // Añadir pubId para manejar el ID
                pubTitulo: '',
                pubTema: '',
                pubDescripcion: '',
                pubRol: '',
                pubSalario: '',
                pubFecha: '' // Nuevo campo
            },
            showSuccessAlert: false,
            showErrorAlert: false,
            successMessage: '',
            errorMessage: ''
        };
    },

    props: ['id'], // Asegúrate de recibir el id como prop

    mounted() {
        this.cargarPublicacion();
    },

    methods: {
        async cargarPublicacion() {
            try {
                const response = await axios.get(`http://172.24.0.11:5001/api/publicaciones/${this.id}`);
                this.form = response.data; // Asigna los datos de la publicación a form
            } catch (error) {
                console.error('Error al cargar la publicación:', error);
            }
        },
        async validarYActualizar() {
            // Validación de campos requeridos
            if (!this.form.pubTitulo || !this.form.pubTema || !this.form.pubDescripcion || !this.form.pubRol || !this.form.pubSalario || !this.form.pubFecha) {
                this.showErrorAlert = true;
                this.errorMessage = 'Por favor complete todos los campos.';
                return;
            }

            try {
                const formData = {
                    pubId: this.form.pubId, // Incluye pubId en los datos del formulario
                    pubTitulo: this.form.pubTitulo,
                    pubTema: this.form.pubTema,
                    pubDescripcion: this.form.pubDescripcion,
                    pubRol: this.form.pubRol,
                    pubSalario: this.form.pubSalario,
                    pubFecha: this.form.pubFecha // Nuevo campo
                };

                const response = await axios.put(`http://172.24.0.11:5001/api/publicaciones/${this.id}`, formData);
                if (response.status === 200) {
                    this.showSuccessAlert = true;
                    this.successMessage = 'Publicación actualizada correctamente.';

                    // Esperar 1 segundo y luego redirigir a /publicaciones
                    setTimeout(() => {
                        this.$router.push('/publicaciones');
                    }, 1000);
                } else {
                    this.showErrorAlert = true;
                    this.errorMessage = 'Error al actualizar la publicación.';
                }
            } catch (error) {
                this.showErrorAlert = true;
                this.errorMessage = 'Error al actualizar la publicación: ' + error.message;
            }
        },
        limpiarAlertas() {
            this.showSuccessAlert = false;
            this.showErrorAlert = false;
        }
    }
};
</script>


<style scoped>
/* Estilos específicos para este componente */
</style>
