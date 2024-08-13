<template>
    <transition name="fade">
      <div v-if="show" class="fixed inset-0 overflow-y-auto flex items-center justify-center z-50">
        <div class="absolute inset-0 bg-black opacity-75"></div>
        <div class="relative bg-white p-8 rounded-lg shadow-lg max-w-md">
          <h3 class="text-lg font-semibold mb-4">{{ title }}</h3>
          <p class="text-sm mb-4">{{ message }}</p>
          <div class="flex justify-end">
            <button @click="cancelar" class="text-sm text-gray-600 mr-4">Cancelar</button>
            <button @click="confirmar" class="text-sm text-white bg-red-500 px-4 py-2 rounded-lg">Confirmar</button>
          </div>
        </div>
      </div>
    </transition>
  </template>
  
  <script>
  import { ref } from 'vue';
  
  export default {
    props: {
      title: String,
      message: String,
    },
    setup(props, { emit }) {
      const show = ref(false);
  
      const mostrar = () => {
        show.value = true;
      };
  
      const cancelar = () => {
        show.value = false;
        emit('cancelado');
      };
  
      const confirmar = () => {
        show.value = false;
        emit('confirmado');
      };
  
      return {
        show,
        mostrar,
        cancelar,
        confirmar,
      };
    },
  };
  </script>
  
  <style scoped>
  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.3s;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
  </style>
  