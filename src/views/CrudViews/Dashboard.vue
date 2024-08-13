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
            <router-link to="/publicaciones" class="text-white">Publicaciones</router-link>
            <br>
            <br>
            <router-link to="/usuarios" class="text-white">Usuarios</router-link>
          </div>
        </div>
      </div>
    </div>
    <div class="flex-grow flex flex-col">
      <div class="bg-zinc-200 p-4 flex justify-between items-center">
        <div>
          <h1 class="text-xl font-bold">Panel de administración</h1>
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
          
          </thead>
          <tbody class="text-sm">
            <tr v-for="usuario in usuariosFiltrados" :key="usuario.usuId" class="border-b">
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
        usuariosFiltrados = usuariosFiltrados.filter(usuario =>
          usuario.usuEstado === this.filtroActivo
        );
      }

      return usuariosFiltrados;
    },
    usuarioActual() {
      return this.usuarios.find(usuario => usuario.usuCorreo === this.usuarioCorreo);
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
    async eliminarUsuario(usuId) {
      try {
        const response = await axios.post(`http://172.24.0.11:5001/api/usuario/${usuId}`, {
          usuEstado: 'I' 
        });
        if (response.status === 200) {
          this.usuarios = this.usuarios.map(usuario =>
            usuario.usuId === usuId ? { ...usuario, usuEstado: 'I' } : usuario
          );
        } else {
          console.error('Error al actualizar el estado del usuario.');
        }
      } catch (error) {
        console.error('Error al eliminar el usuario:', error);
      }
    },

    limpiarFiltros() {
      this.filtroApellido = '';
      this.filtroEmail = '';
      this.filtroActivo = '';
    },
    obtenerTipoDni(tipoDni) {
      if (tipoDni === '1') {
        return 'Cédula';  // Si tipoDni es '1', mostrar 'Cédula'
      } else if (tipoDni === '2') {
        return 'RUC';  // Si tipoDni es '2', mostrar 'RUC'
      } else {
        return 'Desconocido';  // En caso contrario, mostrar 'Desconocido'
      }
    },
    obtenerSexo(sexo) {
      const sexos = {
        '1': 'Masculino',
        '2': 'Femenino',
      };
      return sexos[sexo] || 'Desconocido';  // Devuelve el valor mapeado o 'Desconocido' si no hay coincidencia
    },
    obtenerRol(rol) {
      return rol === 1 ? 'admin' : (rol === 2 ? 'usuario' : 'Desconocido');
    },
    cerrarSesion() {
      localStorage.clear();
      this.$router.push('/login');
    }
  }
};
</script>

<style scoped>
/* Agregar estilos aquí */
</style>