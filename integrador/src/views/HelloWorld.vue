<template>
  <div id="HomePage" class="min-h-screen bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200">
    <header class="flex justify-between items-center p-4 bg-white shadow-md">
      <div class="text-2xl font-bold text-blue-600">multitrabajos</div>
      <nav class="space-x-4">
        <a href="#" class="text-zinc-600">Buscar empresas</a>
        <a href="#" class="text-zinc-600">Puestos, empresas o palabra clave</a>
        <a href="#" class="text-zinc-600">Jóvenes profesionales</a>
        <a href="#" class="text-zinc-600">Puestos ejecutivos y directivos</a>
      </nav>
      <div class="space-x-4">
        <router-link to="/login" class="text-pink-600">Iniciar Sesión</router-link>
        <router-link to="/register" class="bg-pink-600 text-white px-4 py-2 rounded">Crear cuenta</router-link>
      </div>
    </header>

    <main class="py-16">
      <div class="container mx-auto text-center">
        <h1 class="text-4xl font-bold text-zinc-800">
          Hay <span class="text-pink-600">4,470</span> trabajos esperándote en Ecuador
        </h1>
        <div class="mt-8 flex justify-center space-x-4">
          <input type="text" placeholder="Puestos, empresa o palabra clave" class="p-4 border rounded w-1/3">
          <select class="p-4 border rounded w-1/4">
            <option value="">Todo el país</option>
            <option v-for="provincia in provincias" :key="provincia.proId" :value="provincia.proId">
              {{ provincia.proNombre }}
            </option>
          </select>
          <button class="bg-pink-600 text-white px-8 py-4 rounded">Buscar empleo</button>
        </div>
        <div class="mt-16 flex justify-center">
          <img src="https://placehold.co/600x400" alt="Postulate" class="rounded shadow-lg">
        </div>
        <div class="mt-16 flex justify-center space-x-8">
          <a href="#" class="bg-white p-4 rounded shadow-md hover:shadow-lg transition">Jóvenes profesionales</a>
          <a href="#" class="bg-white p-4 rounded shadow-md hover:shadow-lg transition">Puestos ejecutivos y directivos</a>
        </div>
        <div class="mt-16 text-center">
          <h2 class="text-2xl font-bold text-zinc-800">Estas empresas necesitan tu talento</h2>
          <div class="mt-8 flex justify-center space-x-8">
            <img src="../assets/logoEmpe.png" style="width: 200px; height: 100px;" alt="Nippo" class="rounded shadow-md">
            <img src="../assets/logoEmpe1.png" style="width: 200px; height: 100px;" alt="Multitrabajos" class="rounded shadow-md">
            <img src="../assets/logoEmpe2.png" style="width: 200px; height: 100px;" alt="Sedem" class="rounded shadow-md">
            <img src="../assets/logoEmpe3.png" style="width: 200px; height: 100px;" alt="Company 4" class="rounded shadow-md">
            <img src="../assets/logoEmpe4.png" style="width: 200px; height: 100px;" alt="Company 5" class="rounded shadow-md">
          </div>
          <button class="mt-8 bg-pink-600 text-white px-8 py-4 rounded">Ver todas las empresas</button>
        </div>

        <div class="mt-16 bg-white py-16">
          <div class="container mx-auto flex justify-between items-center">
            <div class="w-1/2">
              <h3 class="text-2xl font-bold text-zinc-800">Créate una cuenta y encuentra el trabajo que buscas</h3>
              <ul class="mt-4 space-y-2 text-zinc-600">
                <li>Ingresa en la opción Crear cuenta, escribe tus datos y confirma.</li>
                <li>Completa la información principal de tu perfil a través de los diferentes pasos para que las empresas interesadas dispongan de toda tu registración.</li>
                <li>Postúlate a los trabajos de tu interés sin ingresar al proceso de tus postulaciones.</li>
                <li>Recuerda mantener tu información actualizada desde la sección de tu perfil.</li>
              </ul>
              <br>
              <router-link to="/register" class="mt-8 bg-pink-600 text-white px-8 py-4 rounded">Crear cuenta</router-link>
            </div>
            <div class="w-1/2">
              <img src="https://placehold.co/400x400" alt="Create Account" class="rounded shadow-lg">
            </div>
          </div>
        </div>
      </div>
    </main>

    <footer class="bg-zinc-100 py-8">
      <div class="container mx-auto text-center text-zinc-600">
        <div class="grid grid-cols-5 gap-4">
          <div>
            <h4 class="font-bold">Provincia</h4>
            <ul class="mt-2 space-y-1">
              <li>Pichincha</li>
              <li>Esmeraldas</li>
              <li>Manabi</li>
            </ul>
          </div>
          <div>
            <h4 class="font-bold">Nivel laboral</h4>
            <ul class="mt-2 space-y-1">
              <li>Nivel 1</li>
              <li>Nivel 2</li>
              <li>Nivel 3</li>
            </ul>
          </div>
          <div>
            <h4 class="font-bold">Potencial de búsqueda</h4>
            <ul class="mt-2 space-y-1">
              <li>Búsqueda 1</li>
              <li>Búsqueda 2</li>
              <li>Búsqueda 3</li>
            </ul>
          </div>
          <div>
            <h4 class="font-bold">Puestos más buscados</h4>
            <ul class="mt-2 space-y-1">
              <li>Puesto 1</li>
              <li>Puesto 2</li>
              <li>Puesto 3</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import axios from 'axios';

export default defineComponent({
  name: 'HomePage', // Nombre del componente modificado
  data() {
    return {
      provincias: []
    };
  },
  mounted() {
    this.obtenerProvincias();
  },
  methods: {
    async obtenerProvincias() {
      try {
        const response = await axios.get('http://172.24.0.11:5046/api/provincias'); // Reemplaza con tu URL real
        this.provincias = response.data; // Ajusta según la estructura de tu respuesta
      } catch (error) {
        console.error('Error al obtener las provincias:', error);
      }
    }
  }
});
</script>

<style scoped>
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
</style>