<template>
  <div class="flex h-screen bg-zinc-100">
    <div class="w-64 bg-zinc-800 text-white flex flex-col">
      <div class="p-4">
        <h1 class="text-2xl font-bold">Admin Panel</h1>
      </div>
      <div class="flex-grow">
        <div class="p-4">
          <h2 class="text-sm font-semibold">FILTRAR LA LISTA</h2>
          <div class="mt-4">
            <label class="block text-sm">Apellido</label>
            <input v-model="filtroApellido" type="text"
              class="w-full mt-1 p-2 bg-zinc-700 border border-zinc-600 rounded">
          </div>
          <div class="mt-4">
            <label class="block text-sm">Email</label>
            <input v-model="filtroEmail" type="text" class="w-full mt-1 p-2 bg-zinc-700 border border-zinc-600 rounded">
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
          <div class="mt-4">
            <router-link to="/empresas" class="text-white">Empresas</router-link>
            <br>
            <br>
            <router-link to="/usuarios" class="text-white">Usuarios</router-link>
            <br>
            <br>
            <router-link to="/dashboard" class="text-white">Dashboard</router-link>
          </div>
        </div>
      </div>
    </div>
    <div class="flex-grow flex flex-col">
      <div class="bg-zinc-200 p-4 flex justify-between items-center">
        <div>
          <h1 class="text-xl font-bold">Publicaciones</h1>
        </div>
      </div>
      <div class="bg-white p-4 flex justify-between items-center">
        <div class="flex space-x-2">
          <button class="bg-blue-500 text-white py-2 px-4 rounded">AGREGAR NUEVO</button>
        </div>
      </div>
      <div class="flex-grow overflow-auto">
        <table class="min-w-full bg-white">
          <thead>
        
          </thead>
          <tbody class="text-sm">
            <tr v-for="usuario in usuariosFiltrados" :key="usuario.usuId" class="border-b">
              <td class="py-2 px-4 flex space-x-2">
                <button class="bg-blue-500 text-white p-2 rounded">👁️</button>
                <button class="bg-yellow-500 text-white p-2 rounded">✏️</button>
                <button class="bg-red-500 text-white p-2 rounded">🗑️</button>
              </td>
            </tr>
          </tbody>
        </table>
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
      filtroActivo: ''
    };
  },
  mounted() {
    this.fetchUsuarios();
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
        usuariosFiltrados = usuariosFiltrados.filter(usuario =>
          usuario.usuEstado === this.filtroActivo
        );
      }

      return usuariosFiltrados;
    }
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
    async filtrarUsuarios() {
      try {
        const response = await axios.get('http://172.24.0.11:5001/api/usuario', {
          params: {
            apellido: this.filtroApellido,
            email: this.filtroEmail,
            estado: this.filtroActivo
          }
        });
        this.usuarios = response.data;
      } catch (error) {
        console.error('Error al filtrar usuarios:', error);
      }
    },
    limpiarFiltros() {
      this.filtroApellido = '';
      this.filtroEmail = '';
      this.filtroActivo = '';
      this.fetchUsuarios(); // Fetch all users again to reset filters
    },
    formatFecha(fecha) {
      return fecha ? new Date(fecha).toLocaleString() : '';
    },
    obtenerTipoDni(tipoDni) {
      const tipos = {
        '1': 'Cédula',
        '2': 'RUC',
      };
      return tipos[tipoDni] || 'Desconocido';
    },
    obtenerSexo(sexo) {
      return sexo === '1' ? 'Masculino' : 'Femenino';
    }
  }
};
</script>

<style>
/* Add your custom styles here */
</style>
