<template>
  <div class="bg-gradient-to-r from-pink-200 via-purple-200 to-blue-200 min-h-screen">
    <header class="flex justify-between items-center p-4 bg-white shadow">
      <img src="../assets/MultiEmpleo.png" alt="multitrabajos logo" class="h-10">
      <nav class="hidden md:flex space-x-4">
        <router-link to="/publicacioneslog" class="text-gray-700 hover:text-gray-900">Ofertas Laborales</router-link>
      </nav>
      <div class="flex space-x-4">
        <router-link to="/register" class="bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700">Crear
          cuenta</router-link>
        <router-link to="/login"
          class="bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700">Ingresar</router-link>

      </div>
      <button class="md:hidden block">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
          stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6">
          <path d="M4 6h16M4 12h16M4 18h16"></path>
        </svg>
      </button>
    </header>
    <nav class="md:hidden flex flex-col items-center space-y-4 p-4 bg-white shadow">
      <a href="#" class="text-zinc-600 hover:text-zinc-800">Buscar empresas</a>
      <a href="#" class="text-zinc-600 hover:text-zinc-800">Jóvenes profesionales</a>
      <a href="#" class="text-zinc-600 hover:text-zinc-800">Puestos ejecutivos</a>
      <a href="#" class="text-zinc-600 hover:text-zinc-800">Cuenta empresa</a>
    </nav>
    <main class="flex flex-col items-center justify-center py-8 px-4 md:py-16 md:px-0">
      <div
        class="flex flex-col md:flex-row items-center justify-center max-w-6xl mx-auto space-y-4 md:space-y-0 md:space-x-4">
        <div class="text-center md:text-left md:w-1/2 p-4">
          <h1 class="text-4xl font-bold">Hay <span class="text-pink-600">4.559</span> trabajos esperándote en Ecuador
          </h1>
          <div class="mt-6">
            <input type="text" placeholder="Puesto, empresa o palabra clave" class="w-full p-3 border rounded mb-4">
            <select class="w-full p-3 border rounded mb-4" v-model="selectedProvince">
              <option value="">Seleccione una provincia</option>
              <option v-for="provincia in provincias" :key="provincia.proId" :value="provincia.proId">
                {{ provincia.proNombre }}
              </option>
            </select>
            <button class="w-full bg-pink-600 text-white p-3 rounded hover:bg-pink-700">Buscar empleo</button>
          </div>
        </div>
        <div class="md:w-1/2 p-4">
          <img src="../assets/bienvenido.jpg" alt="Postúlate" class="rounded-lg shadow-lg w-full">
        </div>
      </div>
    </main>
    <section class="bg-white py-8">
      <div class="max-w-6xl mx-auto">
        <div class="relative">
          <h2 class="text-xl font-bold">Jóvenes profesionales</h2>
          <div class="flex space-x-4 overflow-x-auto carousel-container">
            <img src="../assets/Profe.png" alt="Image 1" class="flex-none w-64 h-40 rounded-lg shadow-lg">
            <img src="../assets/Profe2.png" alt="Image 2" class="flex-none w-64 h-40 rounded-lg shadow-lg">
            <img src="../assets/Profe3.png" alt="Image 3" class="flex-none w-64 h-40 rounded-lg shadow-lg">
            <img src="../assets/Profe4.png" alt="Image 3" class="flex-none w-64 h-40 rounded-lg shadow-lg">
          </div>
        </div>
      </div>
    </section>
    <section class="bg-white py-8">
      <div class="max-w-6xl mx-auto">
        <div class="flex justify-between items-center mb-4 px-4 md:px-0">
          <h2 class="text-xl font-bold">Puestos ejecutivos y directivos</h2>
        </div>
        <div class="flex space-x-4 overflow-x-auto">
          <div class="flex space-x-4 overflow-x-auto carousel-container">
            <img src="../assets/Puestos.png" alt="Image 1" class="flex-none w-64 h-40 rounded-lg shadow-lg">
            <img src="../assets/Puestos2.png" alt="Image 2" class="flex-none w-64 h-40 rounded-lg shadow-lg">
            <img src="../assets/Puestos3.png" alt="Image 3" class="flex-none w-64 h-40 rounded-lg shadow-lg">
            <img src="../assets/Puestos4.png" alt="Image 3" class="flex-none w-64 h-40 rounded-lg shadow-lg">
          </div>
        </div>
      </div>
    </section>
    <section class="bg-white py-8">
      <div class="max-w-6xl mx-auto text-center">
        <h2 class="text-xl font-bold mb-4">Estas empresas necesitan tu talento</h2>
        <div class="flex flex-wrap justify-center space-x-4">
          <img src="../assets/logoEmpe.png" alt="PRONACA logo" class="h-12 w-auto md:h-20 md:w-auto lg:h-24 lg:w-auto">
          <img src="../assets/logoEmpe1.png" alt="NIPRO logo" class="h-12 w-auto md:h-20 md:w-auto lg:h-24 lg:w-auto">
          <img src="../assets/logoEmpe2.png" alt="multitrabajos logo"
            class="h-12 w-auto md:h-20 md:w-auto lg:h-24 lg:w-auto">
          <img src="../assets/logoEmpe3.png" alt="QSI logo" class="h-12 w-auto md:h-20 md:w-auto lg:h-24 lg:w-auto">
          <img src="../assets/logoEmpe5.png" alt="SEDEMI logo" class="h-12 w-auto md:h-20 md:w-auto lg:h-24 lg:w-auto">
          <img src="../assets/logoEmpe4.png" alt="bayteq logo" class="h-12 w-auto md:h-20 md:w-auto lg:h-24 lg:w-auto">
        </div>
      </div>
    </section>
    <section class="bg-white py-8">
      <div class="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-center">
        <div class="md:w-1/2 p-4">
          <h2 class="text-2xl font-bold mb-4">Créate una cuenta y encuentra el trabajo que buscas</h2>
          <ul class="list-disc list-inside text-left">
            <li>Ingresa en la opción Crear cuenta, escribe tus datos y confírmalos.</li>
            <li>Completa la información principal de tu perfil a través de las preguntas por pasos que te haremos
              inmediatamente después de que te registres.</li>
            <li>Postúlate a los trabajos que más te interesen y sigue el proceso de tus postulaciones.</li>
            <li>Recuerda mantener tu información actualizada desde la sección de tu perfil.</li>
          </ul>
          <br>
          <br>
          <router-link to="/register"
            class="mt-4 block text-center bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700">
            Crear cuenta
          </router-link>
        </div>
        <div class="md:w-1/2 p-4">
          <img src="../assets/formulario.jpg" alt="Ilustración de creación de cuenta"
            class="rounded-lg shadow-lg w-full">
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import axios from 'axios';

export default defineComponent({
  name: 'HomePage',
  data() {
    return {
      provincias: [],
      selectedProvince: '',
    };
  },
  async mounted() {
    try {
      const response = await axios.get('http://172.24.0.11:5001/api/provincias');
      this.provincias = response.data;
    } catch (error) {
      console.error(error);
    }

    const carouselContainers = this.$el.querySelectorAll('.carousel-container');
    carouselContainers.forEach((container) => {
      let scrollAmount = 0;
      const scrollStep = 2;
      const maxScroll = container.scrollWidth - container.clientWidth;

      setInterval(() => {
        container.scrollLeft += scrollStep;
        scrollAmount += scrollStep;
        if (scrollAmount >= maxScroll) {
          scrollAmount = 0;
          container.scrollLeft = 0;
        }
      }, 20);
    });
  },
});
</script>

<style scoped>
@media (min-width: 640px) {
  .container {
    max-width: 100%;
  }
}

.carousel-container {
  scroll-snap-type: x mandatory;
  display: flex;
  overflow-x: auto;
  scrollbar-width: none;
  /* Ocultar la barra de desplazamiento en Firefox */
}

.carousel-container::-webkit-scrollbar {
  display: none;
  /* Ocultar la barra de desplazamiento en Chrome, Safari y Opera */
}

.carousel-container>img {
  scroll-snap-align: start;
}
</style>
