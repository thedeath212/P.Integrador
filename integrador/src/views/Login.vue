<template>
  <div class="min-h-screen flex flex-col items-center justify-start bg-background text-foreground">
    <header class="w-full flex justify-start items-center p-4 bg-white shadow-md">
      <button class="text-xl p-2">
        <router-link to="/" class="text-xl p-2">
          <img aria-hidden="true" alt="back-arrow" src="https://openui.fly.dev/openui/24x24.svg?text=←" class="h-6 w-6 md:h-8 md:w-8" />
        </router-link>
      </button>
      <img src="https://placehold.co/100x24?text=multitrabajos" alt="multitrabajos logo" class="h-6 ml-4" />
      <a href="#" class="text-pink-600 hover:underline ml-auto">Ingresa como empresa</a>
    </header>
    <main class="flex flex-col md:flex-row items-center justify-center w-full max-w-6xl mt-8 p-4">
      <div class="w-full md:w-1/2 p-4">
        <h1 class="text-3xl font-bold text-blue-700 mb-2">Ingresa a tu cuenta</h1>
        <p class="text-muted-foreground mb-6">¡Hola! Accede y encuentra el trabajo que buscas</p>
        <div class="flex flex-col space-y-4 mb-6">
          <button class="flex items-center justify-center w-full p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
            <img src="../assets/google.png" alt="Google icon" class="mr-2" style="width: 50px; height: 30px;">
            Iniciar sesión con Google
          </button>
          <button class="flex items-center justify-center w-full p-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800">
            <img src="https://placehold.co/24x24?text=in" alt="LinkedIn icon" class="mr-2" />
            Acceder con LinkedIn
          </button>
        </div>
        
        <form class="space-y-4" @submit.prevent="handleSubmit">
          <div>
            <label for="email" class="sr-only">Email</label>
            <div class="relative">
              <input type="email" id="email" v-model="correo" class="w-full p-2 pl-10 border border-input rounded-lg" placeholder="Ingresa tu email" />
              <span class="absolute inset-y-0 left-0 flex items-center pl-3">
                <img aria-hidden="true" alt="email-icon" src="https://openui.fly.dev/openui/24x24.svg?text=📧" />
              </span>
            </div>
          </div>
          
          <div>
            <label for="password" class="sr-only">Contraseña</label>
            <div class="relative">
              <input type="password" id="password" v-model="clave" class="w-full p-2 pl-10 border border-input rounded-lg" placeholder="Ingresá tu contraseña" />
              <span class="absolute inset-y-0 left-0 flex items-center pl-3">
                <img aria-hidden="true" alt="password-icon" src="https://openui.fly.dev/openui/24x24.svg?text=🔒" />
              </span>
              <button type="button" @click="togglePasswordVisibility" class="absolute inset-y-0 right-0 flex items-center pr-3">
                <img aria-hidden="true" alt="show-password-icon" src="https://openui.fly.dev/openui/24x24.svg?text=👁️" />
              </button>
            </div>
          </div>
          
          <div class="flex justify-between items-center">
            <a href="#" class="text-pink-600 hover:underline">Olvidé mi contraseña</a>
          </div>
          
          <button type="submit" class="w-full p-2 bg-zinc-500 text-white rounded-lg hover:bg-zinc-600">Ingresar</button>
        </form>
        
        <p class="mt-4 text-center text-muted-foreground">
          <router-link to="/register" class="text-pink-600 hover:underline">Regístrate como candidato</router-link>
        </p>
      </div>
      <div class="hidden md:block w-1/2 p-4">
        <img src="../assets/login_img.png" alt="Illustration of a person with a resume" />
      </div>
    </main>

    <!-- Alerta de éxito -->
    <AppAlert v-if="successAlert" :message="successMessage" type="success" />

    <!-- Alerta de error -->
    <AppAlert v-if="errorAlert" :message="errorMessage" type="error" />
  </div>
</template>
<script>
import AppAlert from '../components/Alert.vue'; // Importa el componente Alert

export default {
  name: 'LoginPage',
  components: {
    AppAlert // Registra el componente AppAlert
  },
  data() {
    return {
      correo: '',
      clave: '',
      passwordVisible: false,
      successAlert: false,
      errorAlert: false,
      successMessage: '',
      errorMessage: ''
    };
  },
  methods: {
    async handleSubmit() {
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
        console.log('userData:', userData); 
        const { usuCorreo, usuClave, usuRol } = userData;
        if (this.correo === usuCorreo && this.clave === usuClave) {
          if (usuRol === 1) {
            this.successMessage = 'Inicio de sesión exitoso como administrador';
            this.successAlert = true;
            setTimeout(() => {
              this.$router.push('/dashboard');
            }, 1000);
          } else if (usuRol === 2) {
            this.successMessage = 'Inicio de sesión exitoso como usuario';
            this.successAlert = true;
            setTimeout(() => {
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
        this.errorMessage = 'Credenciales inválidas';
        this.errorAlert = true;
      }
    },
    togglePasswordVisibility() {
      this.passwordVisible = !this.passwordVisible;
    },
  }
};
</script>


<style scoped>
/* Estilos específicos del componente */
.AppAlert {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 9999;
}
</style>
