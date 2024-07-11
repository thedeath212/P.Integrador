<template>
    <div class="min-h-screen flex flex-col items-center justify-center bg-background text-foreground">
      <header class="w-full flex justify-between items-center p-4">
        <router-link to="/" class="text-primary hover:text-primary-foreground">
            <img aria-hidden="true" alt="back-arrow" src="https://i.imgur.com/F71UyUR.jpeg" style="width: 50px; height: 50px;" />
        </router-link>
        <!--<img aria-hidden="true" alt="logo" src="https://openui.fly.dev/openui/100x24.svg?text=multitrabajos" />-->
        <a href="#" class="text-secondary hover:text-secondary-foreground">Ingresa como empresa</a>
      </header>
      <main class="flex flex-col md:flex-row items-center justify-center w-full max-w-4xl p-4">
        <div class="w-full md:w-1/2 p-4">

          <h1 class="text-2xl font-bold text-primary mb-2">Ingresa a tu cuenta</h1>
          
          <p class="text-muted-foreground mb-4">¡Hola! Accede y encuentra el trabajo que buscas</p>
          <div class="flex flex-col space-y-2 mb-4">
            <button class="bg-blue-500 text-white p-2 rounded-lg flex items-center justify-center">
              <img aria-hidden="true" alt="google-icon" src="https://openui.fly.dev/openui/24x24.svg?text=G" class="mr-2" />
              Iniciar sesión con Google
            </button>
            <button class="bg-blue-700 text-white p-2 rounded-lg flex items-center justify-center">
              <img aria-hidden="true" alt="linkedin-icon" src="https://openui.fly.dev/openui/24x24.svg?text=in" class="mr-2" />
              Acceder con Linkedin
            </button>
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
            <div class="flex justify-between items-center">
              <a href="#" class="text-destructive hover:text-destructive-foreground">Olvidé mi contraseña</a>
            </div>
            <router-link to="/user">
                <button type="submit" class="w-full bg-muted text-muted-foreground p-2 rounded-lg">Ingresar</button>
            </router-link>
          </form>
          <p class="mt-4 text-center">
            ¿No tienes cuenta? <router-link to="/register" href="#" class="text-destructive hover:text-destructive-foreground">Regístrate como candidato</router-link>
          </p>
        </div>
        <div class="hidden md:block w-1/2 p-4">
          <img aria-hidden="true" alt="illustration" src="https://i.imgur.com/i8SRwoI.png" class="max-w-full h-auto" />
        </div>
      </main>
    </div>
  </template>
  
  <script>
  export default {
    name: 'LoginPage', // Nombre multi-palabra para evitar advertencias de ESLint
    data() {
      return {
        email: '',
        password: '',
        passwordVisible: false,
      };
    },
    methods: {
      handleSubmit() {
        // Manejar el envío del formulario
        console.log('Email:', this.email);
        console.log('Password:', this.password);
      },
      togglePasswordVisibility() {
        this.passwordVisible = !this.passwordVisible;
      },
    },
  };
  </script>
  
  <style scoped>
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
      --border: 240 5.9% 90%;
      --input: 240 5.9% 90%;
      --ring: 240 5.9% 10%;
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
      --secondary: 240 3.7% 15.9%;
      --secondary-foreground: 0 0% 98%;
      --muted: 240 3.7% 15.9%;
      --muted-foreground: 240 5% 64.9%;
      --accent: 240 3.7% 15.9%;
      --accent-foreground: 0 0% 98%;
      --destructive: 0 62.8% 30.6%;
      --destructive-foreground: 0 0% 98%;
      --border: 240 3.7% 15.9%;
      --input: 240 3.7% 15.9%;
      --ring: 240 4.9% 83.9%;
    }
  }
  </style>
  