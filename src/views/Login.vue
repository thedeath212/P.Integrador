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
      <router-link to="/logemp" class="text-pink-600 hover:underline ml-auto">Ingresa como empresa</router-link>
    </header>
    <main class="flex flex-col md:flex-row items-center justify-center w-full max-w-6xl mt-8 p-4">
      <div class="w-full md:w-1/2 p-4">
        <h1 class="text-3xl font-bold text-blue-700 mb-2">Ingresa a tu cuenta</h1>
        <p class="text-muted-foreground mb-6">¡Hola! Accede y encuentra el trabajo que buscas</p>

        <form class="space-y-4" @submit.prevent="handleSubmit" autocomplete="off">
          <div>
            <label for="email" class="sr-only">Email</label>
            <div class="relative">
              <input type="email" id="email" v-model="correo" class="w-full p-2 pl-10 border border-input rounded-lg"
                placeholder="Ingresa tu email" required />
              <span class="absolute inset-y-0 left-0 flex items-center pl-3">
                <img aria-hidden="true" alt="email-icon" src="https://openui.fly.dev/openui/24x24.svg?text=📧" />
              </span>
            </div>
          </div>

          <div>
            <label for="password" class="sr-only">Contraseña</label>
            <div class="relative">
              <input :type="passwordVisible ? 'text' : 'password'" id="password" v-model="clave"
                class="w-full p-2 pl-10 border border-input rounded-lg" placeholder="Ingresá tu contraseña" required />
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
          <router-link to="/register" class="text-pink-600 hover:underline">Regístrate como candidato</router-link>
        </p>
      </div>
      <div class="hidden md:block w-1/2 p-4">
        <img src="../assets/login_img.png" alt="Ilustración de una persona con un currículum" />
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
  </div>
</template>

<script>
import AppAlert from '../components/Alert.vue';

export default {
  name: 'LoginPage',
  components: {
    AppAlert
  },
  data() {
    return {
      correo: '',
      clave: '',
      passwordVisible: false,
      showEmptyFieldsError: false,
      showSuccessAlert: false,
      showErrorAlert: false,
      successMessage: '',
      errorMessage: ''
    };
  },
  created() {
    window.addEventListener('beforeunload', this.handleBeforeUnload);
  },
  beforeUnmount() {
    window.removeEventListener('beforeunload', this.handleBeforeUnload);
  },
  methods: {
    handleBeforeUnload() {
      localStorage.clear();
      sessionStorage.clear();
    },
    async handleSubmit() {
      if (!this.correo || !this.clave) {
        this.showEmptyFieldsError = true;
        return;
      } else {
        this.showEmptyFieldsError = false;
      }

      try {
        const response = await fetch('http://172.24.0.11:5001/api/usuario/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            correo: this.correo,
            clave: this.clave,
          }),
        });

        if (!response.ok) {
          throw new Error('Credenciales inválidas');
        }

        const userData = await response.json();
        const { usuCorreo, usuClave, usuRol, token } = userData;

        if (this.correo === usuCorreo && this.clave === usuClave) {
          localStorage.setItem('authToken', token);
          localStorage.setItem('userCorreo', this.correo);
          localStorage.setItem('userRole', usuRol); // Almacenar el rol del usuario
          await this.obtenerNombreUsuario(this.correo);

          if (usuRol === 1) {
            this.successMessage = 'Inicio de sesión exitoso como administrador';
            this.showSuccessAlert = true;
            setTimeout(() => {
              this.showSuccessAlert = false;
              this.$router.push('/usuarios');
            }, 1000);
          } else if (usuRol === 2) {
            this.successMessage = 'Inicio de sesión exitoso como usuario';
            this.showSuccessAlert = true;
            setTimeout(() => {
              this.showSuccessAlert = false;
              this.$router.push('/user');
            }, 1000);
          } else {
            throw new Error('Rol de usuario desconocido');
          }
        } else {
          throw new Error('Credenciales inválidas');
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
    async obtenerNombreUsuario(correo) {
      try {
        const response = await fetch('http://172.24.0.11:5001/api/usuario');
        if (!response.ok) {
          throw new Error('Error al obtener la lista de usuarios');
        }
        const usuarios = await response.json();
        const usuario = usuarios.find(user => user.usuCorreo === correo);
        if (usuario) {
          const { usuUser } = usuario;
          localStorage.setItem('nombreUsuario', usuUser);
        } else {
          throw new Error('Usuario no encontrado');
        }
      } catch (error) {
        console.error('Error al obtener el nombre del usuario:', error.message);
      }
    },
    togglePasswordVisibility() {
      this.passwordVisible = !this.passwordVisible;
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
