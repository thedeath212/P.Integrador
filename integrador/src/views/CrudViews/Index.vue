<template>
    <div>
      <h1>Lista de Usuarios</h1>
      <div v-if="loading">Cargando datos...</div>
      <div v-else>
        <ul>
          <li v-for="usuario in usuarios" :key="usuario.id">{{ usuario.nombre }}</li>
        </ul>
      </div>
      <div v-if="error" class="error">{{ error }}</div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'UsuariosList',
    data() {
      return {
        usuarios: [],
        loading: true,
        error: null
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
            this.loading = false;
          })
          .catch(error => {
            this.error = 'Error al cargar los datos: ' + error;
            this.loading = false;
          });
      }
    }
  }
  </script>
  
  <style scoped>
  .error {
    color: red;
  }
  </style>
  