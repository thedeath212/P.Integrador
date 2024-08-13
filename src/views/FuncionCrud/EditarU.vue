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
    <div class="flex flex-col md:flex-row bg-card text-card-foreground p-4 rounded-lg shadow-md">
      <div class="w-full md:w-1/3 p-4 border-r border-border">
        <div class="flex flex-col items-center">
          <img src="../../assets/login_img.png" alt="Profile Image" class="rounded-full mb-4" />
        </div>
      </div>
      <div class="w-full md:w-2/3 p-4">
        <h2 class="text-lg font-semibold mb-4">Información Básica</h2>
        <form @submit.prevent="guardarInformacion">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <!-- Campos editables -->
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
              <label class="block text-muted-foreground mb-1">Correo</label>
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
              <label class="block text-muted-foreground mb-1">Fecha de Nacimiento</label>
              <input type="date" v-model="usuFechaNacimiento" :max="maxDate" required
                class="w-full p-2 border border-input rounded-lg" />
            </div>
            <div>
              <label class="block text-muted-foreground mb-1">Profesión</label>
              <input type="text" v-model="usuProfesion" required autocomplete="off"
                class="w-full p-2 border border-input rounded-lg" />
            </div>
            <div>
              <label class="block text-muted-foreground mb-1">Rol</label>
              <select v-model="usuRol" required class="w-full p-2 border border-input rounded-lg">
                <option :value="1">Admin</option>
                <option :value="2">Usuario</option>
              </select>
            </div>
            <div>
              <label class="block text-muted-foreground mb-1">Estado</label>
              <input type="text" v-model="usuEstado" required autocomplete="off"
                class="w-full p-2 border border-input rounded-lg" />
            </div>
            <div>
              <label class="block text-muted-foreground mb-1">Provincia</label>
              <select v-model="proId" required class="w-full p-2 border border-input rounded-lg">
                <option v-for="provincia in provincias" :key="provincia.proId" :value="provincia.proId">
                  {{ provincia.proNombre }}
                </option>
              </select>
            </div>
            <div>
              <label class="block text-muted-foreground mb-1">Tipo de Documento</label>
              <select v-model="usuTipoDni" required class="w-full p-2 border border-input rounded-lg">
                <option :value="1">Cédula</option>
                <option :value="2">Otro</option>
              </select>
            </div>
            <div>
              <label class="block text-muted-foreground mb-1">Número de Documento</label>
              <input type="text" v-model="usuDni" required autocomplete="off"
                class="w-full p-2 border border-input rounded-lg" />
            </div>
            <div>
              <label class="block text-muted-foreground mb-1">Sexo</label>
              <select v-model="usuSexo" required class="w-full p-2 border border-input rounded-lg">
                <option :value="1">Masculino</option>
                <option :value="2">Femenino</option>
              </select>
            </div>

            <div>
              <label class="block text-muted-foreground mb-1">Contraseña</label>
              <input type="text" v-model="usuClave" required autocomplete="off"
                class="w-full p-2 border border-input rounded-lg" />
            </div>
            <div>
              <label class="block text-muted-foreground mb-1">Nombre de Usuario</label>
              <input type="text" v-model="usuUser" required autocomplete="off"
                class="w-full p-2 border border-input rounded-lg" />
            </div>
          </div>
          <button type="submit" class="bg-primary text-primary-foreground hover:bg-primary/80 p-2 rounded-lg mt-4">
            Guardar Información
          </button>
        </form>
      </div>
    </div>
    <transition name="fade">
      <AppAlert v-if="showSuccessAlert" type="success" :message="successMessage" @closed="limpiarAlertas" />
    </transition>
    <transition name="fade">
      <AppAlert v-if="showErrorAlert" type="error" :message="errorMessage" @closed="limpiarAlertas" />
    </transition>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRoute, useRouter } from 'vue-router';

// Importa los componentes desde su ubicación relativa
import AppAlert from '../../components/Alert.vue';

export default {
  components: {
    AppAlert,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();

    const usuId = ref('');
    const usuNombres = ref('');
    const usuApellidos = ref('');
    const usuCorreo = ref('');
    const usuTelefono = ref('');
    const usuDireccion = ref('');
    const usuFechaNacimiento = ref('');
    const usuProfesion = ref('');
    const usuRol = ref('');
    const usuEstado = ref('');
    const proId = ref('');
    const usuTipoDni = ref('');
    const usuDni = ref('');
    const usuSexo = ref('');
    const usuCv = ref(null); // Asegúrate de manejar el valor adecuadamente si es necesario
    const usuClave = ref(''); // Asegúrate de manejar la contraseña adecuadamente si es necesario
    const usuUser = ref('');
    const provincias = ref([]);
    const showSuccessAlert = ref(false);
    const showErrorAlert = ref(false);
    const successMessage = ref('');
    const errorMessage = ref('');
    const maxDate = ref(new Date().toISOString().split('T')[0]);

    const fetchUsuario = async () => {
      try {
        const response = await axios.get(`http://172.24.0.11:5001/api/usuario/${route.params.id}`);
        const usuario = response.data;
        usuId.value = usuario.usuId;
        usuNombres.value = usuario.usuNombres;
        usuApellidos.value = usuario.usuApellidos;
        usuCorreo.value = usuario.usuCorreo;
        usuTelefono.value = usuario.usuTelefono;
        usuDireccion.value = usuario.usuDireccion;
        usuFechaNacimiento.value = usuario.usuFechaNacimiento.split('T')[0];
        usuProfesion.value = usuario.usuProfesion;
        usuRol.value = usuario.usuRol;
        usuEstado.value = usuario.usuEstado;
        proId.value = usuario.proId;
        usuTipoDni.value = usuario.usuTipoDni;
        usuDni.value = usuario.usuDni;
        usuSexo.value = usuario.usuSexo;
        usuCv.value = usuario.usuCv;
        usuUser.value = usuario.usuUser;
        usuClave.value = usuario.usuClave;
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    const fetchProvincias = async () => {
      try {
        const response = await axios.get('http://172.24.0.11:5001/api/provincias');
        provincias.value = response.data;
      } catch (error) {
        console.error('Error fetching provinces:', error);
      }
    };

    const guardarInformacion = async () => {
      const usuarioActualizado = {
        usuId: usuId.value,
        usuNombres: usuNombres.value,
        usuApellidos: usuApellidos.value,
        usuCorreo: usuCorreo.value,
        usuTelefono: usuTelefono.value,
        usuDireccion: usuDireccion.value,
        usuFechaNacimiento: usuFechaNacimiento.value,
        usuProfesion: usuProfesion.value,
        usuRol: parseInt(usuRol.value),
        usuEstado: usuEstado.value,
        proId: parseInt(proId.value),
        usuTipoDni: usuTipoDni.value,
        usuDni: usuDni.value,
        usuSexo: usuSexo.value,
        usuCv: usuCv.value, // Asegúrate de manejar el valor adecuadamente si es necesario
        usuClave: usuClave.value, // Asegúrate de manejar la contraseña adecuadamente si es necesario
        usuUser: usuUser.value
      };

      try {
        await axios.put(`http://172.24.0.11:5001/api/usuario/${usuId.value}`, usuarioActualizado);
        showSuccessAlert.value = true;
        successMessage.value = 'Usuario actualizado correctamente.';

        setTimeout(() => {
          showSuccessAlert.value = false; // Oculta la alerta después de 1 segundo
          router.push('/usuarios'); // Redirige a /usuarios
        }, 1000);
      } catch (error) {
        console.error('Error updating user:', error);
        showErrorAlert.value = true;
        errorMessage.value = 'Error al actualizar el usuario.';
      }
    };

    const limpiarAlertas = () => {
      showSuccessAlert.value = false;
      showErrorAlert.value = false;
      successMessage.value = '';
      errorMessage.value = '';
    };

    onMounted(() => {
      fetchUsuario();
      fetchProvincias();
    });

    return {
      usuId,
      usuNombres,
      usuApellidos,
      usuCorreo,
      usuTelefono,
      usuDireccion,
      usuFechaNacimiento,
      usuProfesion,
      usuRol,
      usuEstado,
      proId,
      usuTipoDni,
      usuDni,
      usuSexo,
      usuCv,
      usuClave,
      usuUser,
      provincias,
      showSuccessAlert,
      showErrorAlert,
      successMessage,
      errorMessage,
      guardarInformacion,
      limpiarAlertas,
      maxDate
    };
  }
};
</script>
<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to

/* .fade-leave-active below version 2.1.8 */
  {
  opacity: 0;
}
</style>