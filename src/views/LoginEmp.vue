<template>
  <div class="min-h-screen flex flex-col items-center justify-start bg-background text-foreground">
    <header class="w-full flex justify-start items-center p-4 bg-white shadow-md">
      <button class="text-xl p-2">
        <router-link to="/" class="text-xl p-2">
          <img aria-hidden="true" alt="back-arrow" src="https://openui.fly.dev/openui/24x24.svg?text=←"
            class="h-6 w-6 md:h-8 md:w-8" />
        </router-link>
      </button>
      <img src="../assets/MultiEmpleo.png" alt="multitrabajos logo" class="h-6 ml-4" />
      <router-link to="/login" class="text-pink-600 hover:underline ml-auto">Ingresa como candidato</router-link>
    </header>
    <main class="flex flex-col md:flex-row items-center justify-center w-full max-w-6xl mt-8 p-4">
      <div class="w-full md:w-1/2 p-4">
        <h1 class="text-3xl font-bold text-blue-700 mb-2">Ingresa a tu cuenta como empresa</h1>
        <p class="text-muted-foreground mb-6">¡Hola! Accede y gestiona tus vacantes.</p>

        <form class="space-y-4" @submit.prevent="handleSubmit" autocomplete="off">
          <div>
            <label for="comDni" class="sr-only">DNI</label>
            <div class="relative">
              <input type="text" id="comDni" v-model="dni" class="w-full p-2 pl-10 border border-input rounded-lg"
                placeholder="Ingresa tu DNI" required />
              <span class="absolute inset-y-0 left-0 flex items-center pl-3">
                <img aria-hidden="true" alt="dni-icon" src="https://openui.fly.dev/openui/24x24.svg?text=🆔" />
              </span>
            </div>
          </div>

          <div>
            <label for="comClave" class="sr-only">Contraseña</label>
            <div class="relative">
              <input :type="passwordVisible ? 'text' : 'password'" id="comClave" v-model="clave"
                class="w-full p-2 pl-10 border border-input rounded-lg" placeholder="Ingresa tu contraseña" required />
              <span class="absolute inset-y-0 left-0 flex items-center pl-3">
                <img aria-hidden="true" alt="password-icon" src="https://openui.fly.dev/openui/24x24.svg?text=🔒" />
              </span>
              <button type="button" @click="togglePasswordVisibility"
                class="absolute inset-y-0 right-0 flex items-center pr-3">
                <img aria-hidden="true" alt="show-password-icon"
                  :src="passwordVisible ? 'https://openui.fly.dev/openui/24x24.svg?text=🙈' : 'https://openui.fly.dev/openui/24x24.svg?text=👁️'" />
              </button>
            </div>
          </div>
          <p v-if="showEmptyFieldsError" class="text-red-500">Por favor completa todos los campos.</p>

          <button type="submit" class="w-full p-2 bg-zinc-500 text-white rounded-lg hover:bg-zinc-600">Ingresar</button>
        </form>
        <p class="mt-4 text-center text-muted-foreground">
          <router-link to="/rempesas" class="text-pink-600 hover:underline">Regístrate como empresa</router-link>
        </p>
        <p class="mt-4 text-center text-muted-foreground">
          <button @click="openPasswordRecoveryModal" class="text-pink-600 hover:underline">Olvidaste tu contraseña?</button>
        </p>
      </div>
      <div class="hidden md:block w-1/2 p-4">
        <img src="https://i.imgur.com/rteOfkV.png" alt="Ilustración de una empresa" />
      </div>
    </main>
    <transition name="fade">
      <div v-if="showSuccessAlert" class="alert-container">
        <AppAlert type="success" :message="successMessage" />
      </div>
    </transition>
    <transition name="fade">
      <div v-if="showErrorAlert" class="alert-container">
        <AppAlert type="error" :message="errorMessage" />
      </div>
    </transition>
    <!-- Modal de recuperación de contraseña -->
    <PasswordRecoveryModalE :showModal="showPasswordRecoveryModal" @close="showPasswordRecoveryModal = false" />
  </div>
</template>

<script>
import AppAlert from '../components/Alert.vue';
import PasswordRecoveryModalE from '../components/PasswordRecoveryModalE.vue';

export default {
  name: 'LoginEmpresaPage',
  components: {
    AppAlert,
    PasswordRecoveryModalE
  },
  data() {
    return {
      dni: '',
      clave: '',
      passwordVisible: false,
      showEmptyFieldsError: false,
      showSuccessAlert: false,
      showErrorAlert: false,
      successMessage: '',
      errorMessage: '',
      showPasswordRecoveryModal: false, // Variable para controlar la visibilidad del modal
      comEncargado: ''
    };
  },
  methods: {
    async handleSubmit() {
      if (!this.dni || !this.clave) {
        this.showEmptyFieldsError = true;
        return;
      } else {
        this.showEmptyFieldsError = false;
      }

      try {
        // Solicitud POST para autenticar al usuario
        const response = await fetch('http://172.24.0.11:5001/api/empresas/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            comDni: this.dni,
            comClave: this.clave,
          }),
        });

        if (!response.ok) {
          throw new Error('Credenciales incorrectas');
        }

        const responseText = await response.text();
        let empresaData = {};

        if (responseText) {
          try {
            empresaData = JSON.parse(responseText);
          } catch (e) {
            throw new Error('Error al analizar la respuesta del servidor');
          }
        } else {
          throw new Error('Credenciales incorrectas');
        }

        const { comDni, comClave, comRol, token, comEstado, comEncargado } = empresaData;

        if (comEstado !== 'A') {
          throw new Error('La empresa no está activa');
        }

        if (this.dni === comDni && this.clave === comClave) {
          localStorage.setItem('authToken', token);
          localStorage.setItem('empresaDni', this.dni);
          localStorage.setItem('empresaRole', comRol);

          // Guardar comEncargado en localStorage si está presente
          if (comEncargado && comEncargado.trim() !== '') {
            localStorage.setItem('encargadoNombre', comEncargado);
            this.comEncargado = comEncargado; // Actualiza la variable local
          } else {
            localStorage.removeItem('encargadoNombre'); // Elimina la clave si está vacía
          }

          // Solicitud GET para obtener la información de todas las empresas
          const companiesResponse = await fetch('http://172.24.0.11:5001/api/empresas', {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });

          if (!companiesResponse.ok) {
            throw new Error('No se pudo obtener la información de las empresas');
          }

          const companiesData = await companiesResponse.json();
          const empresa = companiesData.find(emp => emp.comDni === this.dni);

          if (empresa) {
            this.successMessage = 'Inicio de sesión exitoso como empresa';
            this.showSuccessAlert = true;

            setTimeout(() => {
              this.showSuccessAlert = false;
              this.$router.push('/dashempresas'); // O la ruta correspondiente
            }, 1000);
          } else {
            throw new Error('No se encontró la empresa');
          }
        } else {
          throw new Error('Credenciales incorrectas');
        }
      } catch (error) {
        console.error('Error al iniciar sesión:', error.message);
        this.errorMessage = error.message;
        this.showErrorAlert = true;
        setTimeout(() => {
          this.showErrorAlert = false;
        }, 3000);
      }
    },
    togglePasswordVisibility() {
      this.passwordVisible = !this.passwordVisible;
    },
    openPasswordRecoveryModal() {
      this.showPasswordRecoveryModal = true;
    }
  }
};
</script>

<style scoped>
.alert-container {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 9999;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>