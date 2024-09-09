<template>
  <div>
    <!-- Encabezado y botón de retroceso -->
    <header class="w-full flex justify-start items-center p-4 bg-rose-100 shadow-md">
      <button class="text-xl p-2">
        <router-link to="/user" class="text-white">
          <img aria-hidden="true" alt="back-arrow" src="https://openui.fly.dev/openui/24x24.svg?text=←"
            class="h-6 w-6 md:h-8 md:w-8" />
        </router-link>
      </button>
    </header>
    
    <div class="p-6 max-w-6xl mx-auto bg-white rounded-lg shadow-lg mt-6">
      <h1 class="text-3xl font-bold mb-6 text-center text-blue-700">Ver Publicación</h1>
      
      <div v-if="publicacion" class="space-y-6">
        <div class="bg-gray-50 p-6 rounded-lg shadow-md border border-gray-200">
          <p class="text-lg"><strong class="font-semibold text-blue-600">Título:</strong> {{ publicacion.pubTitulo }}</p>
          <p class="text-lg"><strong class="font-semibold text-blue-600">Tema:</strong> {{ publicacion.pubTema }}</p>
          <p class="text-lg"><strong class="font-semibold text-blue-600">Descripción:</strong> {{ publicacion.pubDescripcion }}</p>
          <p class="text-lg"><strong class="font-semibold text-blue-600">Salario:</strong> ${{ publicacion.pubSalario }}</p>
          <p class="text-lg"><strong class="font-semibold text-blue-600">Estado:</strong> {{ publicacion.pubEstado }}</p>
          <p class="text-lg"><strong class="font-semibold text-blue-600">Fecha:</strong> {{ publicacion.pubFecha }}</p>
          <p class="text-lg"><strong class="font-semibold text-blue-600">Empresa:</strong> {{ empresaNombre }}</p>
        </div>
        
        <div class="flex justify-center mt-6">
          <button @click="postular" class="bg-rose-50 text-white px-6 py-3 rounded-md shadow-lg hover:bg-blue-700 transition">
            Postular
          </button>
        </div>
        
      </div>
      
      <div v-else class="text-center mt-4">
        <p class="text-gray-500 text-lg">Cargando publicación...</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'VerPublicacion',
  props: {
    pubId: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      publicacion: null,
      empresaNombre: ''
    };
  },
  async created() {
    try {
      // Obtener los detalles de la publicación
      const response = await axios.get(`http://172.24.0.11:5001/api/publicaciones/${this.pubId}`);
      if (response.status === 200) {
        this.publicacion = response.data;

        // Obtener el nombre de la empresa utilizando el usuId
        const empresaResponse = await axios.get(`http://172.24.0.11:5001/api/empresas/${this.publicacion.usuId}`);
        if (empresaResponse.status === 200) {
          // Verifica si la respuesta es un objeto o una lista
          if (Array.isArray(empresaResponse.data)) {
            const empresa = empresaResponse.data.find(emp => emp.comId === this.publicacion.usuId);
            this.empresaNombre = empresa ? empresa.comNombreEmpresa : 'Nombre de empresa no encontrado';
          } else {
            // Asumiendo que la respuesta es un objeto
            this.empresaNombre = empresaResponse.data.comNombreEmpresa;
          }
        }
      }
    } catch (error) {
      console.error('Error al obtener la publicación o la empresa:', error);
    }
  },
  methods: {
    postular() {
      // Lógica para postular a la publicación
      alert('Has postulado a esta publicación.');
    }
  }
};
</script>

<style scoped>
/* Aquí puedes agregar estilos adicionales si es necesario */
</style>
