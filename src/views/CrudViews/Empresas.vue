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
            <label class="block text-sm">Nombre empresas</label>
            <input v-model="filtroNombre" type="text"
              class="w-full mt-1 p-2 bg-zinc-700 border border-zinc-600 rounded">
          </div>
          <div class="mt-4">
            <label class="block text-sm">Dirección</label>
            <input v-model="filtroDireccion" type="text"
              class="w-full mt-1 p-2 bg-zinc-700 border border-zinc-600 rounded">
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
            <router-link to="/usuarios" class="text-white">Usuarios</router-link>
            <br>
            <br>
            <router-link to="/publicaciones" class="text-white">Publicaciones</router-link>
          </div>
        </div>
      </div>
    </div>
    <div class="flex-grow flex flex-col">
      <div class="bg-zinc-200 p-4 flex justify-between items-center">
        <div>
          <h1 class="text-xl font-bold">Empresas </h1>
        </div>
      </div>
      <div class="bg-white p-4 flex justify-between items-center">
        <div class="flex space-x-2">
          <router-link to="/CrearE" class="bg-blue-500 text-white py-2 px-4 rounded">AGREGAR NUEVO</router-link>
        </div>
        <div class="flex items-center space-x-4">
          <div class="user-info">
            <img src="../../assets/personita.png" style="width: 40px; height: 40px;" alt="User Icon">
            <span class="ml-2">{{ usuUser }}</span>
          </div>
          <button @click="cerrarSesion" class="bg-red-500 text-white py-2 px-4 rounded">Cerrar Sesión</button>
        </div>
      </div>
      <div class="flex-grow overflow-auto p-4 space-y-8">
        <div>
          <h2 class="text-lg font-semibold">Empresas</h2>
          <table class="min-w-full bg-white">
            <thead>
              <tr>
                <th class="py-2 px-4 border-b">Acciones</th>
                <th class="py-2 px-4 border-b">Nombres</th>
                <th class="py-2 px-4 border-b">Apellidos</th>
                <th class="py-2 px-4 border-b">Encargado</th>
                <th class="py-2 px-4 border-b">DNI</th>
                <th class="py-2 px-4 border-b">Teléfono</th>
                <th class="py-2 px-4 border-b">Dirección</th>
                <th class="py-2 px-4 border-b">Correo</th>
                <th class="py-2 px-4 border-b">Nombre Empresa</th>
                <th class="py-2 px-4 border-b">Clave</th>
                <th class="py-2 px-4 border-b">Estado</th>
              </tr>
            </thead>
            <tbody class="text-sm">
              <tr v-for="empresa in empresasFiltradas" :key="empresa.comId" class="border-b">
                <td class="py-2 px-4 flex space-x-2">
                  <router-link :to="`/editar-empresa/${empresa.comId}`"
                    class="bg-yellow-500 text-white p-2 rounded">✏️</router-link>
                  <button @click="abrirModalEliminar(empresa.comId)" class="bg-red-500 text-white p-2 rounded">🗑️</button>
                </td>
                <td class="py-2 px-4">{{ empresa.comNombres }}</td>
                <td class="py-2 px-4">{{ empresa.comApellidos }}</td>
                <td class="py-2 px-4">{{ empresa.comEncargado }}</td>
                <td class="py-2 px-4">{{ empresa.comDni }}</td>
                <td class="py-2 px-4">{{ empresa.comTelefono }}</td>
                <td class="py-2 px-4">{{ empresa.comDireccion }}</td>
                <td class="py-2 px-4">{{ empresa.comCorreo }}</td>
                <td class="py-2 px-4">{{ empresa.comNombreEmpresa }}</td>
                <td class="py-2 px-4">{{ empresa.comClave }}</td>
                <td class="py-2 px-4">{{ empresa.comEstado === 'A' ? '✔️' : '❌' }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <div v-if="mostrarModalEliminar" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div class="bg-white p-6 rounded shadow-lg">
        <h3 class="text-xl font-bold mb-4">Confirmar eliminación</h3>
        <p>¿Estás seguro que deseas eliminar esta empresa?</p>
        <div class="mt-4 flex justify-end space-x-2">
          <button @click="cancelarEliminar" class="bg-gray-500 text-white py-2 px-4 rounded">Cancelar</button>
          <button @click="confirmarEliminar" class="bg-red-500 text-white py-2 px-4 rounded">Eliminar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'EmpreList',
  data() {
    return {
      usuarios: [],
      empresas: [],
      filtroNombre: '',
      filtroDireccion: '',
      filtroActivo: '',
      usuUser: '',
      mostrarModalEliminar: false,
      empresaIdAEliminar: null
    };
  },
  mounted() {
    this.fetchUsuarios();
    this.fetchEmpresas();
    this.usuUser = localStorage.getItem('nombreUsuario') || '';
  },
  computed: {
    empresasFiltradas() {
      let empresasFiltradas = this.empresas;

      if (this.filtroNombre) {
        empresasFiltradas = empresasFiltradas.filter(empresa =>
          empresa.comNombreEmpresa && empresa.comNombreEmpresa.toLowerCase().includes(this.filtroNombre.toLowerCase())
        );
      }

      if (this.filtroDireccion) {
        empresasFiltradas = empresasFiltradas.filter(empresa =>
          empresa.comDireccion && empresa.comDireccion.toLowerCase().includes(this.filtroDireccion.toLowerCase())
        );
      }

      if (this.filtroActivo) {
        empresasFiltradas = empresasFiltradas.filter(empresa =>
          empresa.comEstado === this.filtroActivo
        );
      }

      return empresasFiltradas;
    }
  },
  methods: {
    async fetchUsuarios() {
      try {
        const response = await axios.get('http://172.24.0.11:5001/api/usuario');
        this.usuarios = response.data;
      } catch (error) {
        console.error('Error al cargar los datos de usuarios:', error);
      }
    },
    async fetchEmpresas() {
      try {
        const response = await axios.get('http://172.24.0.11:5001/api/empresas');
        this.empresas = response.data;
      } catch (error) {
        console.error('Error al cargar los datos de empresas:', error);
      }
    },
    abrirModalEliminar(comId) {
      this.empresaIdAEliminar = comId;
      this.mostrarModalEliminar = true;
    },
    cancelarEliminar() {
      this.mostrarModalEliminar = false;
      this.empresaIdAEliminar = null;
    },
    async confirmarEliminar() {
      try {
        const response = await axios.post(`http://172.24.0.11:5001/api/empresas/${this.empresaIdAEliminar}`, {
          comEstado: 'I'
        });
        if (response.status === 200) {
          this.empresas = this.empresas.filter(empresa => empresa.comId !== this.empresaIdAEliminar);
          this.cancelarEliminar();
        } else {
          console.error('Error al eliminar la empresa:', response);
        }
      } catch (error) {
        console.error('Error al eliminar la empresa:', error);
      }
    },
    limpiarFiltros() {
      this.filtroNombre = '';
      this.filtroDireccion = '';
      this.filtroActivo = '';
    },
    cerrarSesion() {
      localStorage.removeItem('nombreUsuario');
      this.$router.push('/login');
    }
  }
};
</script>
