<template>
  <div class="min-h-screen flex flex-col items-center justify-start bg-background text-foreground">
    <!-- Header -->
    <header class="w-full flex justify-start items-center p-4 bg-white shadow-md">
      <button class="text-xl p-2">
        <router-link to="/usuarios" class="text-xl p-2">
          <img aria-hidden="true" alt="back-arrow" src="https://openui.fly.dev/openui/24x24.svg?text=←"
            class="h-6 w-6 md:h-8 md:w-8" />
        </router-link>
      </button>
    </header>

    <!-- Contenido principal -->
    <div class="flex flex-col md:flex-row bg-card text-card-foreground p-4 rounded-lg shadow-md">
      <!-- Sección izquierda (Imagen de perfil) -->
      <div class="w-full md:w-1/3 p-4 border-r border-border">
        <div class="flex flex-col items-center">
          <img src="../../assets/login_img.png" alt="Profile Image" class="rounded-full mb-4" />
        </div>
      </div>

      <!-- Sección derecha (Formulario) -->
      <div class="w-full md:w-2/3 p-4">
        <h2 class="text-lg font-semibold mb-4">Información Básica</h2>
        <form @submit.prevent="guardarInformacion">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <!-- Campos del formulario -->
            <div>
              <label class="block text-muted-foreground mb-1">Nombres</label>
              <input type="text" v-model="usuNombres" pattern="[A-Za-záéíóúÁÉÍÓÚñÑ ]+" title="Solo letras y espacios"
                required autocomplete="off" class="w-full p-2 border border-input rounded-lg" />
            </div>
            <div>
              <label class="block text-muted-foreground mb-1">Apellidos</label>
              <input type="text" v-model="usuApellidos" pattern="[A-Za-záéíóúÁÉÍÓÚñÑ ]+" title="Solo letras y espacios"
                required autocomplete="off" class="w-full p-2 border border-input rounded-lg" />
            </div>
            <div>
              <label class="block text-muted-foreground mb-1">Tipo de Documento</label>
              <select v-model="usuTipoDni" required autocomplete="off"
                class="w-full p-2 border border-input rounded-lg">
                <option value="" disabled selected>Seleccione</option>
                <option value="1">Cédula</option>
                <option value="2">RUC</option>
              </select>
            </div>
            <div>
              <label class="block text-muted-foreground mb-1">Número de Documento</label>
              <input type="text" v-model="usuDni" pattern="[0-9]{10}" title="Debe contener 10 dígitos numéricos"
                required autocomplete="off" class="w-full p-2 border border-input rounded-lg" />
            </div>
            <div>
              <label class="block text-muted-foreground mb-1">Correo Electrónico</label>
              <input type="email" v-model="usuCorreo" required autocomplete="off"
                class="w-full p-2 border border-input rounded-lg" />
            </div>
            <div>
              <label class="block text-muted-foreground mb-1">Teléfono</label>
              <input type="tel" v-model="usuTelefono" pattern="[0-9]+" title="Solo números" required autocomplete="off"
                class="w-full p-2 border border-input rounded-lg" />
            </div>
            <div>
              <label class="block text-muted-foreground mb-1">Dirección</label>
              <input type="text" v-model="usuDireccion" required autocomplete="off"
                class="w-full p-2 border border-input rounded-lg" />
            </div>
            <div>
              <label class="block text-muted-foreground mb-1">Sexo</label>
              <select v-model="usuSexo" required autocomplete="off" class="w-full p-2 border border-input rounded-lg">
                <option value="" disabled selected>Seleccione</option>
                <option value="1">Masculino</option>
                <option value="2">Femenino</option>
              </select>
            </div>
            <div>
              <label class="block text-muted-foreground mb-1">Fecha de Nacimiento</label>
              <input type="date" v-model="usuFechaNacimiento" :max="maxDate" required autocomplete="off"
                class="w-full p-2 border border-input rounded-lg" />
            </div>
            <div>
              <label class="block text-muted-foreground mb-1">Profesión</label>
              <input type="text" v-model="usuProfesion" required autocomplete="off"
                class="w-full p-2 border border-input rounded-lg" />
            </div>
            <div>
              <label class="block text-muted-foreground mb-1">Rol</label>
              <select v-model="usuRol" required autocomplete="off" class="w-full p-2 border border-input rounded-lg">
                <option value="" disabled selected>Seleccione</option>
                <option value="1">Admin</option>
                <option value="2">Usuario</option>
              </select>
            </div>
            <div>
              <label class="block text-muted-foreground mb-1">ID de Provincia</label>
              <select v-model="proId" required autocomplete="off" class="w-full p-2 border border-input rounded-lg">
                <option value="" disabled selected>Seleccione</option>
                <option v-for="provincia in provincias" :key="provincia.proId" :value="provincia.proId">{{
                  provincia.proNombre }}</option>
              </select>
            </div>
            <div style="display: none;">
              <label class="block text-muted-foreground mb-1">Estado</label>
              <input type="text" v-model="usuEstado" readonly class="w-full p-2 border border-input rounded-lg" />
            </div>
            <div>
              <label class="block text-muted-foreground mb-1">Contraseña</label>
              <input type="password" v-model="usuClave"
                pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,}$"
                title="Debe contener al menos una mayúscula, una minúscula, un número y un caracter especial, con un mínimo de 8 caracteres"
                required autocomplete="new-password" class="w-full p-2 border border-input rounded-lg" />
            </div>
            <div>
              <label class="block text-muted-foreground mb-1">Usuario</label>
              <input type="text" v-model="usuUser" required autocomplete="off"
                class="w-full p-2 border border-input rounded-lg" />
            </div>
          </div>
          <!-- Botón de Guardar -->
          <button type="submit" class="bg-primary text-primary-foreground hover:bg-primary/80 p-2 rounded-lg mt-4">
            Guardar Información
          </button>
        </form>
      </div>
    </div>

    <!-- Alerta de éxito -->
    <app-alert v-if="showSuccessAlert" type="success" :message="successMessage" @closed="limpiarAlertas" />

    <!-- Alerta de error -->
    <app-alert v-if="showErrorAlert" type="error" :message="errorMessage" @closed="limpiarAlertas" />
  </div>
</template>
<script>

import { useRouter } from 'vue-router';
import { ref, onMounted } from 'vue';
import axios from 'axios';
import AppAlert from '../../components/Alert.vue'; // Asegúrate de que la ruta sea correcta

export default {
  name: 'CrearPage',
  components: {
    AppAlert,
  },
  setup() {
    const router = useRouter();
    const usuNombres = ref('');
    const usuApellidos = ref('');
    const usuTipoDni = ref('');
    const usuDni = ref('');
    const usuCorreo = ref('');
    const usuTelefono = ref('');
    const usuDireccion = ref('');
    const usuSexo = ref('');
    const usuFechaNacimiento = ref('');
    const usuProfesion = ref('');
    const usuRol = ref('');
    const usuEstado = ref('A'); // Estado por defecto 'A'
    const proId = ref('');
    const usuClave = ref('');
    const usuUser = ref('');
    const provincias = ref([]);

    // Estado de las alertas
    const showSuccessAlert = ref(false);
    const showErrorAlert = ref(false);
    const successMessage = ref('');
    const errorMessage = ref('');

    // Función para obtener las provincias desde la API
    const fetchProvincias = () => {
      axios.get('http://172.24.0.11:5001/api/provincias')
        .then(response => {
          provincias.value = response.data;
        })
        .catch(error => {
          console.error('Error al obtener las provincias:', error);
        });
    };

    // Función para guardar la información del formulario
    // Función para guardar la información del formulario
    const guardarInformacion = () => {
      const formData = {
        usuNombres: usuNombres.value,
        usuApellidos: usuApellidos.value,
        usuTipoDni: usuTipoDni.value,
        usuDni: usuDni.value,
        usuCorreo: usuCorreo.value,
        usuTelefono: usuTelefono.value,
        usuDireccion: usuDireccion.value,
        usuSexo: usuSexo.value,
        usuFechaNacimiento: usuFechaNacimiento.value,
        usuProfesion: usuProfesion.value,
        usuRol: usuRol.value,
        proId: proId.value,
        usuEstado: usuEstado.value,
        usuClave: usuClave.value,
        usuUser: usuUser.value,
      };

      axios.post('http://172.24.0.11:5001/api/usuario', formData)
        .then(() => {
          successMessage.value = '¡Usuario creado exitosamente!';
          showSuccessAlert.value = true;
          limpiarCampos();

          // Redirigir a la página deseada después de 2 segundos (por ejemplo)
          setTimeout(() => {
            router.push('/usuarios'); // Reemplaza '/ruta-deseada' con la ruta a la que deseas redirigir
          }, 1000); // Espera 2000 milisegundos (2 segundos) antes de redirigir
        })
        .catch(error => {
          errorMessage.value = 'Error al crear el usuario. Por favor, inténtelo nuevamente.';
          showErrorAlert.value = true;
          console.error('Error al crear el usuario:', error);
        });

    };

  // Función para limpiar los campos del formulario después de enviar
  const limpiarCampos = () => {
    usuNombres.value = '';
    usuApellidos.value = '';
    usuTipoDni.value = '';
    usuDni.value = '';
    usuCorreo.value = '';
    usuTelefono.value = '';
    usuDireccion.value = '';
    usuSexo.value = '';
    usuFechaNacimiento.value = '';
    usuProfesion.value = '';
    usuRol.value = '';
    proId.value = '';
    usuClave.value = '';
    usuUser.value = '';
  };

  // Función para limpiar las alertas después de cerrarlas
  const limpiarAlertas = () => {
    showSuccessAlert.value = false;
    showErrorAlert.value = false;
    successMessage.value = '';
    errorMessage.value = '';
  };

  // Fecha máxima permitida en el input de fecha de nacimiento (hoy)
  const maxDate = new Date().toISOString().split('T')[0];

  // Cargar las provincias al cargar el componente
  onMounted(() => {
  fetchProvincias();
});

return {
  usuNombres,
  usuApellidos,
  usuTipoDni,
  usuDni,
  usuCorreo,
  usuTelefono,
  usuDireccion,
  usuSexo,
  usuFechaNacimiento,
  usuProfesion,
  usuRol,
  proId,
  usuClave,
  usuUser,
  provincias,
  showSuccessAlert,
  showErrorAlert,
  successMessage,
  errorMessage,
  maxDate,
  guardarInformacion,
  limpiarAlertas,
};
  },
};
</script>

<style scoped>
/* Estilos específicos del componente */
</style>

<style scoped>
/* Estilos específicos del componente */
</style>
