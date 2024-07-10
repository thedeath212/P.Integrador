<template>
    <div class="min-h-screen bg-zinc-100 flex">
      <aside class="w-64 bg-zinc-800 text-zinc-100 flex-shrink-0">
        <div class="p-4 text-center">
          <h1 class="text-2xl font-bold">Admin Panel</h1>
        </div>
        <nav class="mt-4">
          <div class="px-4 py-2">
            <h2 class="text-sm font-semibold">FILTRAR LA LISTA</h2>
            <div class="mt-2">
              <label class="block text-sm">Apellido</label>
              <input v-model="filtroApellido" @input="aplicarFiltro" type="text" placeholder="Buscar por Apellido..." class="w-full mt-1 p-2 bg-zinc-700 text-zinc-100 border border-zinc-600 rounded">
            </div>
            <div class="mt-2">
              <label class="block text-sm">Correo</label>
              <input v-model="filtroCorreo" @input="aplicarFiltro" type="text" placeholder="Buscar por Correo..." class="w-full mt-1 p-2 bg-zinc-700 text-zinc-100 border border-zinc-600 rounded">
            </div>
            <div class="mt-2">
              <label class="block text-sm">Activo</label>
              <select v-model="filtroActivo" @change="aplicarFiltro" class="w-full mt-1 p-2 bg-zinc-700 text-zinc-100 border border-zinc-600 rounded">
                <option value="">Seleccionar ...</option>
                <option value="1">Activo</option>
                <option value="2">Inactivo</option>
              </select>
            </div>
            <button @click="limpiarFiltros" class="w-full mt-4 p-2 bg-yellow-500 text-zinc-900 rounded">REESTABLECER</button>
          </div>
          <div class="px-4 py-2 mt-4">
          <ul class="mt-2">
            <li class="py-1">
              <router-link to="/usuarios" class="flex items-center text-sm">
                <span class="mr-2">UsuariosList</span>
              </router-link>
            </li>
            <li class="py-1">
              <router-link to="/publicaciones" class="flex items-center text-sm">
                <span class="mr-2">Publicaciones</span>
              </router-link>
            </li>
            <li class="py-1">
              <router-link to="/dashboard" class="flex items-center text-sm">
                <span class="mr-2">Dashboard</span>
              </router-link>
            </li>
          </ul>
        </div>
        </nav>
      </aside>
  
      <div class="flex-1 p-6">
        <header class="flex justify-between items-center bg-zinc-200 p-4 rounded">
          <h1 class="text-xl font-bold">EmpresasList</h1>
          <div class="flex items-center space-x-4">
            <button class="bg-blue-500 text-white px-4 py-2 rounded">AGREGAR NUEVO</button>
          </div>
        </header>
  
        <div class="mt-4 bg-white rounded shadow overflow-x-auto">
          <table class="min-w-full table-auto">
            <thead class="bg-zinc-200 text-zinc-600">
              <tr>
                <th class="p-2">Acción</th>
                <th class="p-2"> Id</th>
                <th class="p-2">Nombre </th>
                <th class="p-2">Apellido </th>
                <th class="p-2">Email</th>
                <th class="p-2">Direccion</th>
                <th class="p-2">Tipo</th>
                <th class="p-2">Dni</th>
                <th class="p-2">Fecha Nacimiento </th>
                <th class="p-2">Sexo</th>
                <th class="p-2">Estado</th>
                <th class="p-2">Rol</th>
                <th class="p-2">Usuario</th>
                <th class="p-2">Clave</th>
              </tr>
            </thead>
            <tbody class="text-zinc-700">
              <!-- Aquí puedes incluir datos dinámicos con Vue -->
              <tr class="border-b" v-for="(usuario, index) in usuariosFiltrados" :key="index">
                <td class="p-2 flex space-x-2">
                  <button class="bg-yellow-500 text-white p-1 rounded">✏️</button>
                  <button class="bg-red-500 text-white p-1 rounded">🗑️</button>
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
    name: 'EmpresasList',
    data() {
      return {
        usuarios: [],
        usuariosFiltrados: [],
        loading: true,
        error: null,
        filtroApellido: '',
        filtroCorreo: '',
        filtroActivo: '',
        apellidos: [],
        correos: []
      };
    },
    mounted() {
      this.fetchUsuarios();
    },
    methods: {
      fetchUsuarios() {
        axios.get('http://172.24.0.11:5046/api/usuarios')
          .then(response => {
            this.usuarios = response.data;
            this.usuariosFiltrados = response.data;
            this.obtenerOpcionesFiltro();
            this.loading = false;
          })
          .catch(error => {
            this.error = 'Error al cargar los datos: ' + error;
            this.loading = false;
          });
      },
      obtenerOpcionesFiltro() {
        this.apellidos = Array.from(new Set(this.usuarios.map(usuario => usuario.usuApellidos)));
        this.correos = Array.from(new Set(this.usuarios.map(usuario => usuario.usuCorreo)));
      },
      aplicarFiltro() {
        this.usuariosFiltrados = this.usuarios.filter(usuario =>
          (this.filtroApellido === '' || usuario.usuApellidos.toLowerCase().includes(this.filtroApellido.toLowerCase())) &&
          (this.filtroCorreo === '' || usuario.usuCorreo.toLowerCase().includes(this.filtroCorreo.toLowerCase())) &&
          (this.filtroActivo === '' || usuario.usuEstado == this.filtroActivo)
        );
      },
      limpiarFiltros() {
        this.filtroApellido = '';
        this.filtroCorreo = '';
        this.filtroActivo = '';
        this.usuariosFiltrados = this.usuarios;
      }
    }
  }
  </script>
  
  <style scoped>
  .error {
    color: red;
  }
  </style>
  