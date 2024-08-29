<template>
  <div class="flex h-screen bg-zinc-100">
    <!-- Sidebar izquierdo (admin panel) -->
    <div class="w-64 bg-zinc-800 text-white flex flex-col">
      <div class="p-4">
        <h1 class="text-2xl font-bold">Admin Panel</h1>
      </div>
      <!-- Filtros -->
      <div class="flex-grow">
        <div class="p-4">
          <h2 class="text-sm font-semibold">FILTRAR LA LISTA</h2>
          <div class="mt-4">
            <label class="block text-sm">Título</label>
            <input v-model="filtroTitulo" type="text"
              class="w-full mt-1 p-2 bg-zinc-700 border border-zinc-600 rounded">
          </div>
          <div class="mt-4">
            <label class="block text-sm">Tema</label>
            <input v-model="filtroTema" type="text" class="w-full mt-1 p-2 bg-zinc-700 border border-zinc-600 rounded">
          </div>
          <div class="mt-4">
            <label class="block text-sm">Estado</label>
            <select v-model="filtroActivo" class="w-full mt-1 p-2 bg-zinc-700 border border-zinc-600 rounded">
              <option value="">Seleccionar ...</option>
              <option value="A">Activo</option>
              <option value="I">Inactivo</option>
            </select>
          </div>
          <div class="mt-4 flex space-x-2">
            <button @click="limpiarFiltros" class="bg-yellow-500 text-white py-2 px-4 rounded">Limpiar</button>
          </div>
          <!-- Enlaces de navegación -->
          <div class="mt-4">
            <router-link to="/empresas" class="text-white">Empresas</router-link>
            <br>
            <br>
            <router-link to="/usuarios" class="text-white">Usuarios</router-link>
          </div>
        </div>
      </div>
    </div>
    <!-- Contenido principal (publicaciones) -->
    <div class="flex-grow flex flex-col">
      <div class="bg-zinc-200 p-4 flex justify-between items-center">
        <div>
          <h1 class="text-xl font-bold">Publicaciones</h1>
        </div>
      </div>
      <!-- Botón para agregar nueva publicación -->
      <div class="bg-white p-4 flex justify-between items-center">
        <div class="flex space-x-2">
          <router-link :to="{ name: 'CrearP', params: { usuId: usuId } }"
            class="bg-blue-500 text-white py-2 px-4 rounded">AGREGAR NUEVO</router-link>
        </div>
        <div class="flex items-center space-x-4">
          <div class="user-info">
            <img src="../../assets/personita.png" class="w-10 h-10 rounded-full" alt="User Icon">
            <span class="ml-2">{{ usuUser }}</span>
          </div>
          <button @click="cerrarSesion" class="bg-red-500 text-white py-2 px-4 rounded">Cerrar Sesión</button>
        </div>
      </div>
      <!-- Lista de publicaciones -->
      <div class="flex-grow overflow-auto">
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
          <div v-for="publicacion in publicacionesFiltradas" :key="publicacion.pubId"
            class="bg-white p-4 rounded-lg border border-gray-200 mb-4 shadow-md">
            <h2 class="text-lg font-bold mb-2">{{ publicacion.pubTitulo }}</h2>
            <p class="text-gray-600 mb-4">{{ publicacion.pubDescripcion }}</p>
            <p><strong>Tema:</strong> {{ publicacion.pubTema }}</p>
            <p><strong>Rol:</strong> {{ getRol(publicacion.pubRol) }}</p>
            <p><strong>Usuario:</strong> {{ getNombreUsuario(publicacion.usuId) }}</p>
            <p><strong>Salario:</strong> {{ publicacion.pubSalario }}</p>
            <p><strong>Fecha:</strong> {{ publicacion.pubFecha }}</p>
            <p><strong>Estado:</strong> {{ publicacion.pubEstado }}</p>
            <div class="mt-4 flex justify-end space-x-2">
              <router-link :to="'/editar-publicacion/' + publicacion.pubId"
                class="bg-yellow-500 text-white py-2 px-4 rounded">Editar</router-link>
              <button @click="confirmarEliminacion(publicacion.pubId)"
                class="bg-red-500 text-white py-2 px-4 rounded">Eliminar</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal de confirmación de eliminación -->
    <div v-if="mostrarModal" class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div class="bg-white p-6 rounded-lg shadow-lg">
        <h3 class="text-lg font-bold mb-4">Confirmar Eliminación</h3>
        <p class="mb-4">¿Estás seguro de que deseas eliminar esta publicación?</p>
        <div class="flex justify-end space-x-2">
          <button @click="eliminarPublicacionConfirmado" class="bg-red-500 text-white py-2 px-4 rounded">Eliminar</button>
          <button @click="cancelarEliminacion" class="bg-gray-500 text-white py-2 px-4 rounded">Cancelar</button>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import axios from 'axios';

export default {
  name: 'PublicacionesList',
  data() {
    return {
      publicaciones: [],
      filtroTitulo: '',
      filtroTema: '',
      filtroActivo: '',
      usuUser: '',
      usuId: '',
      usuarios: [],
      idPublicacionAEliminar: null, // ID de la publicación a eliminar
      mostrarModal: false, // Controlar la visibilidad del modal
    };
  },
  mounted() {
    this.fetchPublicaciones();
    this.usuUser = localStorage.getItem('nombreUsuario') || '';
    this.usuId = localStorage.getItem('usuId') || '';
    this.fetchUsuarios();
  },
  computed: {
    publicacionesFiltradas() {
      let publicacionesFiltradas = this.publicaciones;

      if (this.filtroTitulo) {
        publicacionesFiltradas = publicacionesFiltradas.filter(publicacion =>
          publicacion.pubTitulo && publicacion.pubTitulo.toLowerCase().includes(this.filtroTitulo.toLowerCase())
        );
      }

      if (this.filtroTema) {
        publicacionesFiltradas = publicacionesFiltradas.filter(publicacion =>
          publicacion.pubTema && publicacion.pubTema.toLowerCase().includes(this.filtroTema.toLowerCase())
        );
      }

      if (this.filtroActivo) {
        publicacionesFiltradas = publicacionesFiltradas.filter(publicacion =>
          publicacion.pubEstado === this.filtroActivo
        );
      }

      return publicacionesFiltradas;
    }
  },
  methods: {
    async fetchPublicaciones() {
      try {
        const response = await axios.get('http://172.24.0.11:5001/api/publicaciones');
        this.publicaciones = response.data;
      } catch (error) {
        console.error('Error al cargar los datos de publicaciones:', error);
      }
    },
    async fetchUsuarios() {
      try {
        const response = await axios.get('http://172.24.0.11:5001/api/usuario');
        this.usuarios = response.data;
      } catch (error) {
        console.error('Error al cargar los datos de usuarios:', error);
      }
    },
    getNombreUsuario(usuId) {
      const usuario = this.usuarios.find(usuario => usuario.usuId === usuId);
      return usuario ? usuario.usuUser : 'Usuario no encontrado';
    },
    getRol(rolId) {
      return rolId === 1 ? 'Usuario' : rolId === 2 ? 'Empresa' : 'Desconocido';
    },
    confirmarEliminacion(pubId) {
      this.idPublicacionAEliminar = pubId;
      this.mostrarModal = true;
    },
    async eliminarPublicacionConfirmado() {
      try {
        const response = await axios.post(`http://172.24.0.11:5001/api/publicaciones/${this.idPublicacionAEliminar}`, { pubEstado: 'I' });
        if (response.status === 200) {
          this.publicaciones = this.publicaciones.filter(publicacion => publicacion.pubId !== this.idPublicacionAEliminar);
          this.mostrarModal = false; // Ocultar modal
          this.idPublicacionAEliminar = null; // Limpiar ID de publicación
        } else {
          console.error('Error al eliminar la publicación.');
        }
      } catch (error) {
        console.error('Error al eliminar la publicación:', error);
      }
    },
    cancelarEliminacion() {
      this.mostrarModal = false; // Ocultar modal
      this.idPublicacionAEliminar = null; // Limpiar ID de publicación
    },
    limpiarFiltros() {
      this.filtroTitulo = '';
      this.filtroTema = '';
      this.filtroActivo = '';
    },
    cerrarSesion() {
      localStorage.clear();
      this.$router.push('/login');
    }
  }
};
</script>


<style scoped>
/* Estilos específicos para este componente */
.user-info img {
  width: 40px;
  height: 40px;
}
</style>
