<template>
    <div class="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h1 class="text-2xl font-bold mb-4">Perfil de Usuario</h1>
        <div class="mb-4">
          <img :src="userProfileImage" alt="Perfil" class="h-24 w-24 rounded-full mx-auto mb-4" />
          <h2 class="text-xl font-semibold">{{ userName }}</h2>
          <p class="text-gray-600">Email: {{ userEmail }}</p>
        </div>
        <router-link to="/postulaciones">
          <button class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
            Ver Postulaciones
          </button>
        </router-link>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'PostuPage',
    data() {
      return {
        userProfileImage: 'https://example.com/profile.jpg', // Cambia esto por la URL de tu imagen de perfil
        userName: 'Dominic Muñoz',
        userEmail: 'juan.perez@example.com',
      };
    },
  };
  </script>
  
  <style scoped>
  /* Estilos opcionales */
  </style>
  