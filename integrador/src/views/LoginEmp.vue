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

        <div class="flex flex-col space-y-2 mb-4">
          <!--<button class="bg-blue-500 text-white p-2 rounded-lg flex items-center justify-center">
            <img aria-hidden="true" alt="google-icon" src="https://openui.fly.dev/openui/24x24.svg?text=G" class="mr-2" />
            Iniciar sesión con Google
          </button>
          <button class="bg-blue-700 text-white p-2 rounded-lg flex items-center justify-center">
            <img aria-hidden="true" alt="linkedin-icon" src="https://openui.fly.dev/openui/24x24.svg?text=in" class="mr-2" />
            Acceder con Linkedin
          </button>-->
        </div>

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

          <div class="flex justify-between items-center">
            <a href="#" class="text-pink-600 hover:underline">Olvidé mi contraseña</a>
          </div>
          <button type="submit" class="w-full p-2 bg-zinc-500 text-white rounded-lg hover:bg-zinc-600">Ingresar Como Empresa</button>
        </form>
        <p class="mt-4 text-center text-muted-foreground">
          ¿No tienes cuenta? <router-link to="/rempresas" class="text-pink-600 hover:underline">Regístrate como empresa</router-link>
        </p>
      </div>
      <div class="hidden md:block w-1/2 p-4">
        <img src="https://i.imgur.com/rteOfkV.png" alt="Ilustración de una persona con un currículum" class="max-w-full h-auto" />
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
  name: 'LoginEmpresas',
  components: {
    AppAlert
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
    async handleSubmit() {
      if (!this.email || !this.password) {
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
            correo: this.email,
            clave: this.password,
          }),
        });

        if (!response.ok) {
          throw new Error('Credenciales inválidas');
        }

        let userData = null;
        try {
          userData = await response.json();
        } catch (error) {
          throw new Error('Credenciales incorrectas');
        }

        const { usuCorreo, usuClave, usuRol } = userData;

        if (this.email === usuCorreo && this.password === usuClave) {
          if (usuRol === 1) {
            this.successMessage = 'Inicio de sesión exitoso como administrador';
            this.showSuccessAlert = true;
            setTimeout(() => {
              this.showSuccessAlert = false;
              this.$router.push('/dashboard');
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

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 240 10% 3.9%;
    --card: 0 0% 100%;
    --card-foreground: 240 10% 3.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 240 10% 3.9%;
    --primary: 240 5.9% 10%;
    --primary-foreground: 0 0% 98%;
    --secondary: 240 4.8% 95.9%;
    --secondary-foreground: 240 5.9% 10%;
    --muted: 240 4.8% 95.9%;
    --muted-foreground: 240 3.8% 46.1%;
    --accent: 240 4.8% 95.9%;
    --accent-foreground: 240 5.9% 10%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 0 0% 98%;
    --border: hsl(var(--muted));
    --input: hsl(var(--muted));
    --ring: 240 5% 64.9%;
    --radius: 0.5rem;
  }

  .dark {
    --background: 240 10% 3.9%;
    --foreground: 0 0% 98%;
    --card: 240 10% 3.9%;
    --card-foreground: 0 0% 98%;
    --popover: 240 10% 3.9%;
    --popover-foreground: 0 0% 98%;
    --primary: 0 0% 98%;
    --primary-foreground: 240 5.9% 10%;
    --secondary: 240 4.8% 95.9%;
    --secondary-foreground: 240 5.9% 10%;
    --muted: 240 4% 15%;
    --muted-foreground: 240 3.8% 46.1%;
    --accent: 240 4.8% 95.9%;
    --accent-foreground: 240 5.9% 10%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 0 85.7% 97.8%;
    --border: hsl(var(--muted));
    --input: hsl(var(--muted));
    --ring: 240 10% 3.9%;
    --radius: 0.5rem;
  }
}
</style>
