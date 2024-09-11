<template>
  <div>
    <!-- Encabezado y botón de retroceso -->
    <header class="w-full flex justify-start items-center p-4 bg-gray-100 shadow-md">
      <button class="text-xl p-2">
        <router-link to="/user" class="text-gray-800">
          <img aria-hidden="true" alt="back-arrow" src="https://openui.fly.dev/openui/24x24.svg?text=←"
            class="h-6 w-6 md:h-8 md:w-8" />
        </router-link>
      </button>
    </header>

    <div class="p-6 max-w-6xl mx-auto bg-white rounded-lg shadow-md mt-6">
      <h1 class="text-2xl font-semibold mb-6 text-center text-gray-800">Ver Publicación</h1>

      <div v-if="publicacion" class="space-y-6">
        <div class="bg-gray-50 p-6 rounded-lg shadow-md border border-gray-300">
          <p class="text-lg"><strong class="font-semibold text-gray-700">Título:</strong> {{ publicacion.pubTitulo }}
          </p>
          <p class="text-lg"><strong class="font-semibold text-gray-700">Tema:</strong> {{ publicacion.pubTema }}</p>
          <p class="text-lg"><strong class="font-semibold text-gray-700">Descripción:</strong> {{
            publicacion.pubDescripcion }}</p>
          <p class="text-lg"><strong class="font-semibold text-gray-700">Salario:</strong> ${{ publicacion.pubSalario }}
          </p>
          <p class="text-lg"><strong class="font-semibold text-gray-700">Estado:</strong> {{ publicacion.pubEstado }}
          </p>
          <p class="text-lg"><strong class="font-semibold text-gray-700">Fecha:</strong> {{ publicacion.pubFecha }}</p>
          <p class="text-lg"><strong class="font-semibold text-gray-700">Empresa:</strong> {{ empresaNombre }}</p>
        </div>

        <div class="flex justify-center mt-6">
          <button @click="postular"
            class="bg-gray-200 text-gray-800 px-6 py-3 rounded-md shadow-md hover:bg-gray-300 transition">
            Postular
          </button>
        </div>

      </div>

      <div v-else class="text-center mt-4">
        <p class="text-gray-600 text-lg">Cargando publicación...</p>
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
    },
    usuId: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      publicacion: null,
      empresaNombre: '',
    };
  },
  async created() {
    const { pubId } = this.$route.params;

    try {
      // Obtener los detalles de la publicación
      const response = await axios.get(`http://172.24.0.11:5001/api/publicaciones/${pubId}`);
      if (response.status === 200) {
        this.publicacion = response.data;

        // Obtener el nombre de la empresa utilizando el comId
        const empresaResponse = await axios.get(`http://172.24.0.11:5001/api/empresas/${this.publicacion.comId}`);
        if (empresaResponse.status === 200) {
          if (Array.isArray(empresaResponse.data)) {
            const empresa = empresaResponse.data.find(emp => emp.comId === this.publicacion.comId);
            this.empresaNombre = empresa ? empresa.comNombreEmpresa : 'Nombre de empresa no encontrado';
          } else {
            this.empresaNombre = empresaResponse.data.comNombreEmpresa;
          }
        }
      }
    } catch (error) {
      console.error('Error al obtener la publicación o la empresa:', error);
    }
  },
  methods: {

    async postular() {
      try {
        // Enviar la solicitud POST para guardar la postulación
        const response = await axios.post('http://172.24.0.11:5001/api/postulaciones', {
          posUsuario: this.$route.params.usuId,
          posEmpresa: this.publicacion.comId,
          posDetalle: 'Esperando respuesta, por favor espere',
          posEstado: 'P',
          posPublicacion: this.$route.params.pubId // Asegúrate de que esto sea el nombre correcto del campo
        });

        if (response.status === 200) {
          alert('Has postulado a esta publicación.');
        } else {
          alert('Hubo un problema al postular.');
        }
      } catch (error) {
        console.error('Error al postular:', error);
        alert('Error al postular: ' + error.message);
      }
    }
  }
};
</script>

<style scoped>
/* Aquí puedes agregar estilos adicionales si es necesario */
</style>
