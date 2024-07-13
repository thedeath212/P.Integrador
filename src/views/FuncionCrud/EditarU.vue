<template>
  <div v-if="usuario">
    <h1>Edición de Usuario</h1>
    <form @submit.prevent="editarUsuario">
      <label>Nombres:</label>
      <input type="text" v-model="usuario.usuNombres" required>

      <label>Apellidos:</label>
      <input type="text" v-model="usuario.usuApellidos" required>

      <label>Tipo de Documento:</label>
      <select v-model="usuario.usuTipoDni" required>
        <option value="1">DNI</option>
        <option value="2">Pasaporte</option>
      </select>

      <label>Número de Documento:</label>
      <input type="text" v-model="usuario.usuDni" required>

      <label>Correo Electrónico:</label>
      <input type="email" v-model="usuario.usuCorreo" required>

      <label>Teléfono:</label>
      <input type="text" v-model="usuario.usuTelefono" required>

      <label>Dirección:</label>
      <input type="text" v-model="usuario.usuDireccion" required>

      <label>Sexo:</label>
      <select v-model="usuario.usuSexo" required>
        <option value="1">Masculino</option>
        <option value="2">Femenino</option>
      </select>

      <label>Fecha de Nacimiento:</label>
      <input type="date" v-model="usuario.usuFechaNacimiento" required>

      <label>Profesión:</label>
      <input type="text" v-model="usuario.usuProfesion" required>

      <label>Rol:</label>
      <select v-model="usuario.usuRol" required>
        <option value="1">Administrador</option>
        <option value="2">Usuario Normal</option>
      </select>

      <label>Estado:</label>
      <select v-model="usuario.usuEstado" required>
        <option value="A">Activo</option>
        <option value="I">Inactivo</option>
      </select>

      <label>Contraseña:</label>
      <input type="password" v-model="usuario.usuClave" required>

      <label>Usuario:</label>
      <input type="text" v-model="usuario.usuUser" required>

      <button type="submit">Guardar cambios</button>
    </form>
  </div>
  <div v-else>
    <p>Cargando usuario...</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  props: ['id'],
  data() {
    return {
      usuario: null,
    };
  },
  mounted() {
    this.fetchUserData();
  },
  methods: {
    async fetchUserData() {
      try {
        const response = await axios.get(`http://192.168.100.12:8080/api/usuarios/${this.id}`);
        this.usuario = response.data;
      } catch (error) {
        console.error('Error al obtener datos del usuario:', error);
      }
    },
    async editarUsuario() {
      try {
        const response = await axios.put(`http://192.168.100.12:8080/api/usuarios/${this.id}`, this.usuario);
        if (response.status === 200) {
          alert('Usuario actualizado correctamente');
          this.$router.push('/');
        } else {
          alert('Hubo un problema al actualizar el usuario');
        }
      } catch (error) {
        console.error('Error al actualizar usuario:', error);
        alert('Hubo un error al actualizar el usuario');
      }
    }
  }
};
</script>
