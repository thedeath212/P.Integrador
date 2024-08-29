<template>
  <div class="flex h-screen bg-gray-100">
    <!-- Panel lateral izquierdo -->
    <div class="w-64 bg-gray-800 text-white flex flex-col">
      <div class="p-4">
        <h1 class="text-2xl font-bold">Admin Panel</h1>
      </div>
      <div class="flex-grow">
        <div class="p-4">
          <h2 class="text-sm font-semibold">FILTRAR LA LISTA</h2>
          <div class="mt-4">
            <label class="block text-sm">Apellido</label>
            <input v-model="filtroApellido" type="text"
              class="w-full mt-1 p-2 bg-gray-700 border border-gray-600 rounded">
          </div>
          <div class="mt-4">
            <label class="block text-sm">Email</label>
            <input v-model="filtroEmail" type="text" class="w-full mt-1 p-2 bg-gray-700 border border-gray-600 rounded">
          </div>
          <div class="mt-4">
            <label class="block text-sm">Estado</label>
            <select v-model="filtroActivo" class="w-full mt-1 p-2 bg-gray-700 border border-gray-600 rounded">
              <option value="">Seleccionar ...</option>
              <option value="A">Activo</option>
              <option value="I">Inactivo</option>
            </select>
          </div>
          <div class="mt-4 flex space-x-2">
            <button @click="limpiarFiltros" class="bg-yellow-500 text-white py-2 px-4 rounded">Limpiar</button>
          </div>
          <div class="mt-4">
            <!-- Enlaces a otras secciones -->
            <router-link to="/empresas" class="text-white">Empresas</router-link>
            <br>
            <br>
            <router-link to="/publicaciones" class="text-white">Publicaciones</router-link>

          </div>
        </div>
      </div>
    </div>

    <!-- Contenido principal -->
    <div class="flex-grow flex flex-col">
      <div class="bg-gray-200 p-4 flex justify-between items-center">
        <div>
          <h1 class="text-xl font-bold">UsuariosList</h1>
        </div>
      </div>
      <div class="bg-white p-4 flex justify-between items-center">
        <div class="flex space-x-2">
          <router-link to="/crear" class="bg-blue-500 text-white py-2 px-4 rounded">AGREGAR NUEVO</router-link>
        </div>
        <div class="flex items-center space-x-4">
          <div class="user-info">
            <img src="../../assets/personita.png" style="width: 40px; height: 40px;" alt="User Icon">
            <span class="ml-2">{{ usuUser }}</span>
          </div>
          <button @click="cerrarSesion" class="bg-red-500 text-white py-2 px-4 rounded">Cerrar Sesión</button>
        </div>
      </div>
      <div class="flex-grow overflow-auto">
        <table class="min-w-full bg-white">
          <thead>
            <tr class="w-full bg-gray-200 text-left text-sm uppercase">
              <th class="py-2 px-4">Acción</th>
              <th class="py-2 px-4">ID</th>
              <th class="py-2 px-4">Nombres</th>
              <th class="py-2 px-4">Apellidos</th>
              <th class="py-2 px-4">Tipo de DNI</th>
              <th class="py-2 px-4">Número de DNI/RUC</th>
              <th class="py-2 px-4">Correo Electrónico</th>
              <th class="py-2 px-4">Teléfono</th>
              <th class="py-2 px-4">Dirección</th>
              <th class="py-2 px-4">Sexo</th>
              <th class="py-2 px-4">Fecha de Nacimiento</th>
              <th class="py-2 px-4">Profesión</th>
              <th class="py-2 px-4">Rol</th>
              <th class="py-2 px-4">Estado</th>
            </tr>
          </thead>
          <tbody class="text-sm">
            <tr v-for="usuario in usuariosFiltrados" :key="usuario.usuId" class="border-b">
              <td class="py-2 px-4 flex space-x-2">
                <router-link :to="'/editar-usuario/' + usuario.usuId"
                  class="bg-yellow-500 text-white p-2 rounded">✏️</router-link>
                <button @click="confirmarEliminar(usuario.usuId)" class="bg-red-500 text-white p-2 rounded">🗑️</button>
              </td>
              <td class="py-2 px-4">{{ usuario.usuId }}</td>
              <td class="py-2 px-4">{{ usuario.usuNombres }}</td>
              <td class="py-2 px-4">{{ usuario.usuApellidos }}</td>
              <td class="py-2 px-4">{{ obtenerTipoDni(usuario.usuTipoDni) }}</td>
              <td class="py-2 px-4">{{ usuario.usuDni }}</td>
              <td class="py-2 px-4">{{ usuario.usuCorreo }}</td>
              <td class="py-2 px-4">{{ usuario.usuTelefono }}</td>
              <td class="py-2 px-4">{{ usuario.usuDireccion }}</td>
              <td class="py-2 px-4">{{ obtenerSexo(usuario.usuSexo) }}</td>
              <td class="py-2 px-4">{{ usuario.usuFechaNacimiento }}</td>
              <td class="py-2 px-4">{{ usuario.usuProfesion }}</td>
              <td class="py-2 px-4">{{ obtenerRol(usuario.usuRol) }}</td>
              <td class="py-2 px-4">{{ usuario.usuEstado === 'A' ? '✔️' : '❌' }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Modal de confirmación -->
    <div v-if="mostrarModal" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div class="bg-white p-6 rounded shadow-lg">
        <h2 class="text-xl font-bold mb-4">Confirmar Eliminación</h2>
        <p>¿Estás seguro de que deseas eliminar este usuario?</p>
        <div class="mt-6 flex justify-end space-x-2">
          <button @click="eliminarUsuario(usuIdSeleccionado)"
            class="bg-red-500 text-white py-2 px-4 rounded">Eliminar</button>
          <button @click="cancelarEliminacion" class="bg-gray-500 text-white py-2 px-4 rounded">Cancelar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'UsuariosList',
  data() {
    return {
      usuarios: [],
      filtroApellido: '',
      filtroEmail: '',
      filtroActivo: '',
      usuUser: '',
      usuarioCorreo: localStorage.getItem('userCorreo') || '',
      mostrarModal: false,
      usuIdSeleccionado: null
    };
  },
  mounted() {
    this.fetchUsuarios();
    this.usuUser = localStorage.getItem('nombreUsuario') || '';
  },
  computed: {
    usuariosFiltrados() {
      let usuariosFiltrados = this.usuarios;

      if (this.filtroApellido) {
        usuariosFiltrados = usuariosFiltrados.filter(usuario =>
          usuario.usuApellidos && usuario.usuApellidos.toLowerCase().includes(this.filtroApellido.toLowerCase())
        );
      }

      if (this.filtroEmail) {
        usuariosFiltrados = usuariosFiltrados.filter(usuario =>
          usuario.usuCorreo && usuario.usuCorreo.toLowerCase().includes(this.filtroEmail.toLowerCase())
        );
      }

      if (this.filtroActivo) {
        // Filtrar por estado si se ha seleccionado uno; de lo contrario, no filtrar por estado
        usuariosFiltrados = usuariosFiltrados.filter(usuario =>
          usuario.usuEstado === this.filtroActivo
        );
      }

      return usuariosFiltrados;
    }
  },
  usuarioActual() {
    return this.usuarios.find(usuario => usuario.usuCorreo === this.usuarioCorreo);
  },
methods: {
    async fetchUsuarios() {
    try {
      const response = await axios.get('http://172.24.0.11:5001/api/usuario');
      this.usuarios = response.data;
    } catch (error) {
      console.error('Error al cargar los datos:', error);
    }
  },
  confirmarEliminar(usuId) {
    this.usuIdSeleccionado = usuId;
    this.mostrarModal = true;
  },
    async eliminarUsuario(usuId) {
    try {
      await axios.post(`http://172.24.0.11:5001/api/usuario/${usuId}`);
      this.usuarios = this.usuarios.filter(usuario => usuario.usuId !== usuId);
      this.mostrarModal = false;
    } catch (error) {
      console.error('Error al eliminar usuario:', error);
    }
  },
  cancelarEliminacion() {
    this.mostrarModal = false;
    this.usuIdSeleccionado = null;
  },
  obtenerTipoDni(tipoDni) {
    const tiposDni = {
      '1': 'Cédula',
      '2': 'RUC',
      '3': 'Pasaporte'
    };
    return tiposDni[tipoDni] || 'Desconocido';
  },
  obtenerSexo(sexo) {
    return sexo === 'M' ? 'Masculino' : 'Femenino';
  },
  obtenerRol(rol) {
    return rol === 1 ? 'admin' : 'usuario';
  },
  limpiarFiltros() {
    this.filtroApellido = '';
    this.filtroEmail = '';
    this.filtroActivo = '';
  },
  cerrarSesion() {
    localStorage.removeItem('nombreUsuario');
    localStorage.removeItem('userCorreo');
    this.$router.push('/login');
  }
}
};
</script>


<style scoped>
/* Agregar estilos aquí */
</style>