<template>
  <div class="min-h-screen flex flex-col items-center justify-start bg-background text-foreground">
    <header class="w-full flex justify-start items-center p-4 bg-white shadow-md">
      <button class="text-xl p-2">
        <router-link to="/" class="text-xl p-2">
          <img aria-hidden="true" alt="back-arrow" src="https://openui.fly.dev/openui/24x24.svg?text=←" class="h-6 w-6 md:h-8 md:w-8" />
        </router-link>
      </button>
      <img src="https://i.imgur.com/RCpUHKA.png" alt="multitrabajos logo" class="h-10 ml-2" />
      <router-link to="/login" class="text-pink-600 hover:underline ml-auto">Ingresa como usuario</router-link>
    </header>
    <main class="flex flex-col md:flex-row items-center justify-center w-full max-w-6xl mt-8 p-4">
      <div class="w-full md:w-1/2 p-4">
        <h1 class="text-3xl font-bold text-blue-700 mb-2">Ingresa a tu cuenta como empresa</h1>
        <p class="text-muted-foreground mb-6">¡Hola! Accede como empresa y gestiona tus vacantes</p>

        <form class="space-y-4" @submit.prevent="handleSubmit">
          <div>
            <label for="email" class="sr-only">Email</label>
            <div class="relative">
              <input id="email" type="email" v-model="email" placeholder="Ingresa tu email" class="w-full p-2 border border-input rounded-lg pl-10" />
              <img aria-hidden="true" alt="email-icon" src="https://openui.fly.dev/openui/24x24.svg?text=📧" class="absolute left-2 top-1/2 transform -translate-y-1/2" />
            </div>
          </div>
          <div>
            <label for="password" class="sr-only">Contraseña</label>
            <div class="relative">
              <input id="password" :type="passwordVisible ? 'text' : 'password'" v-model="password" placeholder="Ingresa tu contraseña" class="w-full p-2 border border-input rounded-lg pl-10" />
              <img aria-hidden="true" alt="lock-icon" src="https://openui.fly.dev/openui/24x24.svg?text=🔒" class="absolute left-2 top-1/2 transform -translate-y-1/2" />
              <button type="button" class="absolute right-2 top-1/2 transform -translate-y-1/2" @click="togglePasswordVisibility">
                <img aria-hidden="true" :alt="passwordVisible ? 'eye-off-icon' : 'eye-icon'" :src="passwordVisible ? 'https://openui.fly.dev/openui/24x24.svg?text=🚫👁️' : 'https://openui.fly.dev/openui/24x24.svg?text=👁️'" />
              </button>
            </div>
          </div>
          <p v-if="showEmptyFieldsError" class="text-red-500">Por favor completa todos los campos.</p>

          <button type="submit" class="w-full p-2 bg-zinc-500 text-white rounded-lg hover:bg-zinc-600">Ingresar Como Empresa</button>
        </form>
        <p class="mt-4 text-center text-muted-foreground">
          ¿No tienes cuenta? <router-link to="/rempesas" class="text-pink-600 hover:underline">Regístrate como empresa</router-link>
        </p>
      </div>
      <div class="hidden md:block w-1/2 p-4">
        <img src="https://i.imgur.com/rteOfkV.png" alt="Ilustración de una persona con un currículum" class="max-w-full h-auto" />
      </div>
    </main>
    
    <!-- Alertas -->
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
  components: {
    AppAlert,
  },
  data() {
    return {
      email: '',
      password: '',
      passwordVisible: false,
      showEmptyFieldsError: false,
      showSuccessAlert: false,
      showErrorAlert: false,
      successMessage: '',
      errorMessage: ''
    };
  },
  methods: {
    togglePasswordVisibility() {
      this.passwordVisible = !this.passwordVisible;
    },
    async handleSubmit() {
      // Verifica si los campos están vacíos
      if (!this.email || !this.password) {
        this.showEmptyFieldsError = true;
        return;
      }
      this.showEmptyFieldsError = false;

      try {
        // Simula la llamada a la API para autenticación
        const response = await this.$axios.post('API_ENDPOINT', {
          email: this.email,
          password: this.password,
        });

        if (response.data.success) {
          this.successMessage = 'Inicio de sesión exitoso.';
          this.showSuccessAlert = true;

          // Redirecciona a /dashempresas después de un breve retraso
          setTimeout(() => {
            this.$router.push('/dashempresas');
          }, 1000);
        } else {
          this.errorMessage = 'Credenciales incorrectas.';
          this.showErrorAlert = true;
        }
      } catch (error) {
        this.errorMessage = 'Error al intentar iniciar sesión.';
        this.showErrorAlert = true;
      }
    },
  },
};
</script>

<style>
.alert-container {
  margin-top: 1rem;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
