<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
    <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
      <h1 class="text-2xl font-bold mb-4">Perfil de Usuario</h1>
      <div class="mb-4">
        <img :src="userProfileImage" alt="Perfil" class="h-24 w-24 rounded-full mx-auto mb-4" />
        <h2 class="text-xl font-semibold">{{ userName }}</h2>
        <p class="text-gray-600">Email: {{ userEmail }}</p>
      </div>
      <h2 class="text-xl font-semibold mb-4">Mis Postulaciones</h2>
      <ul v-if="postulaciones.length" class="list-disc pl-5">
        <li v-for="postulacion in postulaciones" :key="postulacion.posId">
          {{ postulacion.posDetalle }} - {{ postulacion.posEstado }}
        </li>
      </ul>
      <p v-else class="text-gray-600">No tienes postulaciones.</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'PostuPage',
  data() {
    return {
      userProfileImage: 'https://example.com/profile.jpg',
      userName: 'Dominic Muñoz',
      userEmail: 'juan.perez@example.com',
      postulaciones: [],
    };
  },
  async mounted() {
    const usuId = this.$route.params.usuId;
    console.log('usuId from URL:', usuId); // Verifica que usuId se obtiene correctamente

    try {
      const response = await axios.get('http://172.24.0.11:5001/api/postulaciones');
      console.log('Response data:', response.data); // Verifica los datos recibidos

      // Asegúrate de que posUsuario y usuId sean del mismo tipo
      this.postulaciones = response.data.filter(postulacion => {
        console.log('Filtering:', postulacion.posUsuario, usuId);
        return postulacion.posUsuario === parseInt(usuId, 10); // Convierte usuId a número
      });

      console.log('Filtered postulaciones:', this.postulaciones); // Verifica las postulaciones filtradas
    } catch (error) {
      console.error('Error al obtener postulaciones:', error);
    }
  },
};
</script>

<style scoped>
/* Estilos opcionales */
</style>
