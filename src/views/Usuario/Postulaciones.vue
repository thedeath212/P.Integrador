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

    <div class="container mx-auto p-6">
      <h1 class="text-2xl font-semibold mb-4">Mis Postulaciones</h1>

      <!-- Si no hay postulaciones, mostrar un mensaje -->
      <div v-if="postulacionesFiltradas.length === 0" class="text-center text-gray-600">
        No tienes postulaciones disponibles.
      </div>

      <!-- Listado de postulaciones -->
      <ul v-else class="space-y-4">
        <li v-for="postulacion in postulacionesFiltradas" :key="postulacion.posId"
          class="p-4 bg-white rounded shadow-md">
          <p>
            <strong>Empresa:</strong> {{ obtenerNombreEmpresa(postulacion.posEmpresa) || 'No asignada' }}
          </p>
          <p>
            <strong>Publicación:</strong> {{ obtenerTituloPublicacion(postulacion.posPublicacion) || 'No disponible' }}
          </p>
          <p>
            <strong>Estado:</strong> {{ traducirEstado(postulacion.posEstado) }}
          </p>
          <p>
            <strong>Detalle:</strong> {{ postulacion.posDetalle }}
          </p>
          <div class="flex space-x-4 mt-4">
            <button @click="confirmarEliminacion(postulacion.posId)"
              class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
              Eliminar Postulación
            </button>
            <button @click="verPublicacion(postulacion.posPublicacion)"
              class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              Ver Publicación
            </button>
          </div>
        </li>
      </ul>
    </div>

    <!-- Modal de confirmación de eliminación -->
    <div v-if="mostrarModal" class="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white p-6 rounded shadow-lg w-1/3">
        <h2 class="text-lg font-semibold mb-4">Confirmar Eliminación</h2>
        <p>¿Estás seguro de que quieres eliminar esta postulación?</p>
        <div class="flex justify-end mt-4">
          <button @click="eliminarPostulacion" class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
            Eliminar
          </button>
          <button @click="cerrarModal" class="ml-4 bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400">
            Cancelar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'PostuPage',
  data() {
    return {
      postulacionesFiltradas: [],
      empresas: [],
      publicaciones: [],
      usuId: null,
      mostrarModal: false,
      idPostulacionAEliminar: null
    };
  },
  methods: {
    traducirEstado(estado) {
      switch (estado) {
        case 'P':
          return 'Pendiente';
        case 'A':
          return 'Aprobada';
        case 'R':
          return 'Rechazada';
        default:
          return 'Estado desconocido';
      }
    },
    obtenerNombreEmpresa(comId) {
      const empresa = this.empresas.find(e => e.comId === comId);
      return empresa ? empresa.comNombreEmpresa : 'No asignada';
    },
    obtenerTituloPublicacion(pubId) {
      const publicacion = this.publicaciones.find(p => p.pubId === pubId);
      console.log('ID publicación buscada:', pubId);
      console.log('Publicación encontrada:', publicacion);
      return publicacion ? publicacion.pubTitulo : 'No disponible';
    },
    async fetchData() {
      try {
        const [postulacionesResponse, empresasResponse, publicacionesResponse] = await Promise.all([
          axios.get('http://172.24.0.11:5001/api/postulaciones'),
          axios.get('http://172.24.0.11:5001/api/empresas'),
          axios.get('http://172.24.0.11:5001/api/publicaciones')
        ]);

        // Verificar datos de respuesta
        console.log('Postulaciones:', postulacionesResponse.data);
        console.log('Empresas:', empresasResponse.data);
        console.log('Publicaciones:', publicacionesResponse.data);

        // Filtrar las postulaciones que tienen estado 'P', 'A' o 'R', tienen un usuario que coincide con `usuId`, 
        // y tienen un `posPublicacion` que no es null
        this.postulacionesFiltradas = postulacionesResponse.data.filter(postulacion =>
          ['P', 'A', 'R'].includes(postulacion.posEstado) &&
          Number(postulacion.posUsuario) === this.usuId &&
          postulacion.posPublicacion !== null
        );
        this.empresas = empresasResponse.data;
        this.publicaciones = publicacionesResponse.data;

        // Verificar el contenido de publicaciones
        console.log('Contenido de publicaciones:', this.publicaciones);
      } catch (error) {
        console.error('Error al obtener datos:', error);
      }
    },

    confirmarEliminacion(postulacionId) {
      this.idPostulacionAEliminar = postulacionId;
      this.mostrarModal = true;
    },
    async eliminarPostulacion() {
      if (this.idPostulacionAEliminar) {
        try {
          // Usar POST en lugar de DELETE para cambiar el estado de la postulación
          await axios.post(`http://172.24.0.11:5001/api/postulaciones/${this.idPostulacionAEliminar}`, {
            posEstado: 'I'  // Cambia el estado a 'Inactivo' o el que corresponda
          });
          // Volver a obtener los datos después de actualizar el estado
          await this.fetchData();
          alert('Postulación eliminada correctamente');
          this.cerrarModal();
        } catch (error) {
          console.error('Error al eliminar la postulación:', error);
          alert('Error al eliminar la postulación');
        }
      }
    },
    cerrarModal() {
      this.mostrarModal = false;
      this.idPostulacionAEliminar = null;
    },
    verPublicacion(pubId) {
      if (pubId) {
        this.$router.push({ name: 'PublicacionDetalle', params: { pubId } });
      } else {
        alert('No hay una publicación asociada');
      }
    }
  },
  async created() {
    try {
      this.usuId = Number(this.$route.params.usuId);
      await this.fetchData();
    } catch (error) {
      console.error('Error al inicializar datos:', error);
    }
  }
};
</script>

<style scoped>
/* Estilos específicos para la página de postulaciones */
.container {
  max-width: 900px;
}
</style>
