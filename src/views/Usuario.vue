<template>
  <div class="min-h-screen bg-background text-foreground p-4">
    <header class="flex items-center justify-between p-4 bg-white shadow-md">
      <div class="flex items-center space-x-4">
        <img src="https://i.imgur.com/RCpUHKA.png" alt="Logo Multitrabajos" class="h-10">
        <input type="text" placeholder="Buscar empleo por puesto o palabra clave"
          class="border rounded-md p-2 w-64 focus:ring-2 focus:ring-primary">
        <input type="text" placeholder="Lugar de empleo"
          class="border rounded-md p-2 w-64 focus:ring-2 focus:ring-primary">
        <button class="bg-primary text-primary-foreground p-2 rounded-md hover:bg-primary/80 transition">Buscar</button>
      </div>
      <div class="flex items-center space-x-4">
        <a href="#" class="text-muted-foreground hover:text-primary transition">Mis postulaciones</a>
        <button @click="cerrarSesion" class="bg-red-500 text-white py-2 px-4 rounded">Cerrar Sesión</button>
      </div>
    </header>
    <div class="grid grid-cols-1 lg:grid-cols-4 gap-4 mt-4">
      <aside class="col-span-1 bg-white p-4 rounded-lg shadow-md">
        <div class="flex flex-col items-center space-y-4">
          <label for="profileImageInput" class="cursor-pointer">
            <img :src="userProfileImage" alt="User Profile" class="h-20 w-20 rounded-full mb-4 cursor-pointer">
          </label>
          <input id="profileImageInput" type="file" class="hidden" @change="handleImageChange">
          <h2 class="text-xl font-semibold text-blue-800">{{ usuarioDatos.usuNombres }} {{ usuarioDatos.usuApellidos }}
          </h2>
          <div class="space-y-2 mt-4 w-full">
            <div class="flex justify-between">
              <span class="font-semibold text-blue-800">Cédula:</span>
              <span>{{ usuarioDatos.usuDni }}</span>
            </div>
            <div class="flex justify-between">
              <span class="font-semibold text-blue-800">Correo:</span>
              <span>{{ usuarioDatos.usuCorreo }}</span>
            </div>
            <div class="flex justify-between">
              <span class="font-semibold text-blue-800">Teléfono:</span>
              <span>{{ usuarioDatos.usuTelefono }}</span>
            </div>
            <div class="flex justify-between">
              <span class="font-semibold text-blue-800">Sexo:</span>
              <span>{{ obtenerSexo(usuarioDatos.usuSexo) }}</span>
            </div>
            <div class="flex justify-between">
              <span class="font-semibold text-blue-800">Fecha de Nacimiento:</span>
              <span>{{ formatFecha(usuarioDatos.usuFechaNacimiento) }}</span>
            </div>
            <div class="flex justify-between">
              <span class="font-semibold text-blue-800">Profesión:</span>
              <span>{{ usuarioDatos.usuProfesion }}</span>
            </div>
          </div>
          <!-- Sección para subir CV en PDF -->
          <section class="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition mt-4">
            <h3 class="text-lg font-semibold text-blue-800">Subir CV en PDF</h3>
            <input type="file" accept=".pdf" @change="handleFileChange" class="border rounded-md p-2 w-full">
            <p v-if="uploadError" class="text-red-500 mt-2">{{ uploadError }}</p>
            <button @click="uploadPDF"
              class="bg-primary text-primary-foreground p-2 rounded-md mt-4 hover:bg-primary/80 transition">
              Subir PDF
            </button>
          </section>
          <div class="mt-4">
            <h3 class="text-lg font-semibold text-blue-800">Mejora tu HV agregando:</h3>
            <ul class="mt-2 space-y-2">
              <li class="flex items-center space-x-2">
                <img src="https://placehold.co/20x20?text=📷" alt="Foto" class="h-5 w-5">
                <span>Foto</span>
              </li>
              <li class="flex items-center space-x-2">
                <img src="https://placehold.co/20x20?text=🏠" alt="Lugar de residencia" class="h-5 w-5">
                <span>Lugar de residencia</span>
              </li>
              <li class="flex items-center space-x-2">
                <img src="https://placehold.co/20x20?text=💼" alt="Datos personales" class="h-5 w-5">
                <span>Datos personales</span>
              </li>
              <li class="flex items-center space-x-2">
                <img src="https://placehold.co/20x20?text=💰" alt="Preferencia salarial" class="h-5 w-5">
                <span>Preferencia salarial</span>
              </li>
            </ul>
          </div>
        </div>
      </aside>
      <main class="col-span-3 grid grid-cols-1 lg:grid-cols-2 gap-4">
        <section class="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition">
          <h3 class="text-lg font-semibold text-blue-800">Publicaciones</h3>
          <div v-if="publicaciones.length === 0" class="text-center text-muted-foreground mt-4">
            No hay publicaciones disponibles.
          </div>
          <div v-else class="mt-4 grid grid-cols-1 gap-4">
            <div v-for="publicacion in publicaciones" :key="publicacion.pubId"
              class="bg-gray-100 p-4 rounded-lg shadow-md">
              <h4 class="text-lg font-semibold text-blue-800">{{ publicacion.pubTitulo }}</h4>
              <p class="text-md mt-2 text-gray-700">{{ publicacion.pubTema }}</p>
              <p class="mt-2">{{ publicacion.pubDescripcion }}</p>
              <p class="mt-2 font-bold">Salario: ${{ publicacion.pubSalario }}</p>
            </div>
          </div>
        </section>
        <section class="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition">
          <h3 class="text-lg font-semibold text-blue-800">Experiencias</h3>
          <div v-if="experiencias.length === 0" class="text-center text-muted-foreground mt-4">
            No hay experiencias disponibles.
          </div>
          <!-- Añadir sección para experiencias si es necesario -->
        </section>
      </main>
    </div>
    <transition name="fade">
      <div v-if="showSuccessAlert" class="alert-container">
        <AppAlert type="success" :message="successMessage" />
      </div>
    </transition>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'UsuarioPage',
  data() {
    return {
      usuarioDatos: {},
      userProfileImage: 'https://i.imgur.com/RCpUHKA.png', // URL de la imagen de perfil predeterminada
      publicaciones: [], // Inicializar propiedad
      experiencias: [], // Añadir esta propiedad si planeas usarla
      selectedFile: null,
      uploadError: '', // Para mostrar mensajes de error
      showSuccessAlert: false, // Para mostrar la alerta de éxito
      successMessage: '' // Mensaje de éxito
    };
  },
  mounted() {
    this.obtenerDatosUsuario();
    this.obtenerPublicaciones(); // Asegúrate de llamar a la función para obtener publicaciones
  },
  methods: {
    async obtenerDatosUsuario() {
      try {
        const correo = localStorage.getItem('userCorreo');
        if (!correo) {
          throw new Error('Correo del usuario no encontrado en el almacenamiento local');
        }

        const response = await fetch('http://172.24.0.11:5001/api/usuario');
        if (!response.ok) {
          throw new Error('Error al obtener los datos del usuario');
        }

        const usuarios = await response.json();
        const usuario = usuarios.find(user => user.usuCorreo === correo);

        if (usuario) {
          this.usuarioDatos = usuario;
          if (usuario.imagenPerfil) {
            this.userProfileImage = usuario.imagenPerfil;
          }
        } else {
          throw new Error('Usuario no encontrado');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    },
    async obtenerPublicaciones() {
      try {
        const response = await fetch('http://172.24.0.11:5001/api/publicaciones');
        if (!response.ok) {
          throw new Error('Error al obtener las publicaciones');
        }

        this.publicaciones = await response.json();
      } catch (error) {
        console.error('Error:', error);
      }
    },
    obtenerSexo(sexo) {
      const sexos = {
        '1': 'Masculino',
        '2': 'Femenino'
      };
      return sexos[sexo] || 'No especificado';
    },
    formatFecha(fecha) {
      if (!fecha) return 'Fecha no disponible';
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(fecha).toLocaleDateString('es-ES', options);
    },
    handleImageChange(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.userProfileImage = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    },
    handleFileChange(event) {
      this.selectedFile = event.target.files[0];
    },
    async uploadPDF() {
      if (!this.selectedFile) {
        this.uploadError = 'Selecciona un archivo PDF antes de subir.';
        return;
      }
      if (this.selectedFile.type !== 'application/pdf') {
        this.uploadError = 'El archivo debe ser un PDF.';
        return;
      }
      const usuarioId = this.usuarioDatos.usuId;
      if (!usuarioId) {
        this.uploadError = 'ID de usuario no disponible.';
        return;
      }

      try {
        const formData = new FormData();
        formData.append('usuCv', this.selectedFile);

        const response = await axios.put(`http://172.24.0.11:5001/api/usuario/${usuarioId}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });

        if (response.status === 200) {
          this.successMessage = 'CV subido exitosamente';
          this.showSuccessAlert = true;
          setTimeout(() => this.showSuccessAlert = false, 3000);
          this.uploadError = '';
        } else {
          throw new Error('Error al subir el CV');
        }
      } catch (axiosError) {
        this.uploadError = axiosError.response ? axiosError.response.data : 'Error al enviar la solicitud';
        console.error('Error al subir el CV:', axiosError);
      }
    },
    cerrarSesion() {
      localStorage.removeItem('userCorreo');
      this.$router.push('/login');
    }
  }
};
</script>

<style scoped>
/* Estilos para la página de usuario */
.alert-container {
  position: fixed;
  top: 0;
  right: 0;
  margin: 1rem;
}
</style>
