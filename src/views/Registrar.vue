<template>
  <div id="Registrar" class="min-h-screen flex flex-col items-center justify-start bg-gray-100 text-gray-800">
    <!-- Header -->
    <header class="w-full flex justify-start items-center p-4 bg-white shadow-md">
      <router-link to="/login" class="text-xl p-2">
        <img aria-hidden="true" alt="back-arrow" src="https://openui.fly.dev/openui/24x24.svg?text=←"
          class="h-6 w-6 md:h-8 md:w-8" />
      </router-link>
      <img src="../assets/MultiEmpleo.png" alt="multitrabajos logo" class="h-6 ml-4" />
      <router-link to="/logemp" class="text-pink-600 hover:underline ml-auto">Ingresa como empresa</router-link>
    </header>

    <!-- Contenido principal -->
    <div class="flex flex-col md:flex-row bg-white shadow-lg rounded-lg mt-4">
      <!-- Sección izquierda (Imagen de perfil) -->
      <div class="w-full md:w-1/3 p-4 border-r border-gray-200 flex flex-col items-center justify-center">
        <div class="flex justify-center items-center mb-4">
          <img src="../assets/registro_img.jpg" alt="Profile Image" class="rounded-full w-40 h-40 object-cover" />
        </div>
      </div>


      <!-- Sección derecha (Formulario) -->
      <div class="w-full md:w-2/3 p-4">
        <h2 class="text-xl font-semibold mb-4">Registrate como candidato</h2>
        <form @submit.prevent="guardarInformacion">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <!-- Campos del formulario -->
            <div>
              <label class="block text-sm text-gray-600 mb-1">Nombres</label>
              <input type="text" v-model="usuNombres" pattern="[A-Za-záéíóúÁÉÍÓÚñÑ ]+" title="Solo letras y espacios"
                required autocomplete="off"
                class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500" />
            </div>
            <div>
              <label class="block text-sm text-gray-600 mb-1">Apellidos</label>
              <input type="text" v-model="usuApellidos" pattern="[A-Za-záéíóúÁÉÍÓÚñÑ ]+" title="Solo letras y espacios"
                required autocomplete="off"
                class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500" />
            </div>
            <div>
              <label class="block text-sm text-gray-600 mb-1">Tipo de Documento</label>
              <select v-model="usuTipoDni" required autocomplete="off"
                class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500">
                <option value="" disabled selected>Seleccione</option>
                <option value="1">Cédula</option>
              </select>
            </div>
            <div>
              <label class="block text-sm text-gray-600 mb-1">Número de Documento</label>
              <input type="text" v-model="usuDni" pattern="[0-9]{10}" title="Debe contener 10 dígitos numéricos"
                required autocomplete="off"
                class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500" />
            </div>
            <div>
              <label class="block text-sm text-gray-600 mb-1">Correo Electrónico</label>
              <input type="email" v-model="usuCorreo" required autocomplete="off"
                class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500" />
            </div>
            <div>
              <label class="block text-sm text-gray-600 mb-1">Teléfono</label>
              <input type="tel" v-model="usuTelefono" pattern="[0-9]+" title="Solo números" required autocomplete="off"
                class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500" />
            </div>
            <div>
              <label class="block text-sm text-gray-600 mb-1">Dirección</label>
              <input type="text" v-model="usuDireccion" required autocomplete="off"
                class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500" />
            </div>
            <div>
              <label class="block text-sm text-gray-600 mb-1">Sexo</label>
              <select v-model="usuSexo" required autocomplete="off"
                class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500">
                <option value="" disabled selected>Seleccione</option>
                <option value="1">Masculino</option>
                <option value="2">Femenino</option>
              </select>
            </div>
            <div>
              <label class="block text-sm text-gray-600 mb-1">Fecha de Nacimiento</label>
              <input type="date" v-model="usuFechaNacimiento" :max="maxDate" required autocomplete="off"
                class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500" />
            </div>
            <div>
              <label class="block text-sm text-gray-600 mb-1">Profesión</label>
              <input type="text" v-model="usuProfesion" required autocomplete="off"
                class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500" />
            </div>
            <!-- El campo de rol está oculto y se envía automáticamente como rol 2 -->
            <div style="display: none;">
              <label class="block text-sm text-gray-600 mb-1">Rol</label>
              <select v-model="usuRol" required autocomplete="off"
                class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500">
                <option value="2">Usuario</option>
              </select>
            </div>
            <div>
              <label class="block text-sm text-gray-600 mb-1">ID de Provincia</label>
              <select v-model="proId" required autocomplete="off"
                class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500">
                <option value="" disabled selected>Seleccione</option>
                <option v-for="provincia in provincias" :key="provincia.proId" :value="provincia.proId">{{
                  provincia.proNombre }}</option>
              </select>
            </div>
            <div style="display: none;">
              <label class="block text-sm text-gray-600 mb-1">Estado</label>
              <input type="text" v-model="usuEstado" readonly class="w-full p-2 border border-gray-300 rounded-lg" />
            </div>
            <div>
              <label class="block text-sm text-gray-600 mb-1">Contraseña</label>
              <input type="password" v-model="usuClave"
                pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,}$"
                title="Debe contener al menos una mayúscula, una minúscula, un número y un caracter especial, con un mínimo de 8 caracteres"
                required autocomplete="new-password"
                class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500" />
            </div>
            <div>
              <label class="block text-sm text-gray-600 mb-1">Usuario</label>
              <input type="text" v-model="usuUser" required autocomplete="off"
                class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500" />
            </div>
          </div>
          <!-- Botón de Guardar -->
          <button type="submit" class="bg-blue-500 text-white hover:bg-blue-600 p-2 rounded-lg mt-4">
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
import AppAlert from '../components/Alert.vue';

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
    const usuRol = ref('2'); // Siempre se registra como rol 2
    const usuEstado = ref('A'); // Estado por defecto 'A'
    const proId = ref('');
    const usuClave = ref('');
    const usuUser = ref('');
    const provincias = ref([]);

    const showSuccessAlert = ref(false);
    const showErrorAlert = ref(false);
    const successMessage = ref('');
    const errorMessage = ref('');

    const fetchProvincias = () => {
      axios.get('http://172.24.0.11:5001/api/provincias')
        .then(response => {
          provincias.value = response.data;
        })
        .catch(error => {
          console.error('Error al obtener las provincias:', error);
        });
    };

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
        usuEstado: usuEstado.value,
        proId: proId.value,
        usuClave: usuClave.value,
        usuUser: usuUser.value,
      };

      axios.post('http://172.24.0.11:5001/api/usuario', formData)
        .then(() => {
          successMessage.value = '¡Usuario creado exitosamente!';
          showSuccessAlert.value = true;
          limpiarCampos();

          setTimeout(() => {
            router.push('/usuarios');
          }, 1000);
        })
        .catch(error => {
          errorMessage.value = 'Error al crear el usuario. Por favor, inténtelo nuevamente.';
          showErrorAlert.value = true;
          console.error('Error al crear el usuario:', error);
        });
    };

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
      usuRol.value = '2'; // Rol siempre es 2
      usuEstado.value = 'A'; // Estado por defecto 'A'
      proId.value = '';
      usuClave.value = '';
      usuUser.value = '';
    };

    const limpiarAlertas = () => {
      showSuccessAlert.value = false;
      showErrorAlert.value = false;
      successMessage.value = '';
      errorMessage.value = '';
    };

    const maxDate = new Date().toISOString().split('T')[0];

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
      proId,
      usuRol,
      usuEstado,
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
