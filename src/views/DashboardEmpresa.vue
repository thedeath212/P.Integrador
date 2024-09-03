<template>
  <div class="min-h-screen bg-background text-foreground p-4">
    <header class="flex items-center justify-between p-4 bg-white shadow-md">
      <div class="flex items-center space-x-4">
        <img src="https://i.imgur.com/RCpUHKA.png" alt="Logo Multitrabajos" class="h-10">
      </div>
      <div class="relative">
        <button @click="toggleMenu" class="flex items-center space-x-2">
          <img src="../assets/personita.png" style="width: 40px; height: 40px;" alt="User Icon">
          <span class="ml-2">{{ comEncargado }}</span>
          <svg class="h-4 w-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </button>
        <div v-if="menuVisible" class="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-10">
          <button @click="verPerfil" class="w-full text-left px-4 py-2 hover:bg-gray-100 transition">Ver
            postulaciones</button>
          <button @click="cerrarSesion" class="w-full text-left px-4 py-2 hover:bg-gray-100 transition">Cerrar
            Sesión</button>
        </div>
      </div>
    </header>

    <!-- Contenido principal -->
    <main class="flex-1 p-6 space-y-6">
      <!-- Sección: Crear publicación -->
      <section class="flex items-center justify-between">
        <button @click="openModal" class="bg-pink-600 text-white px-6 py-4 rounded-lg hover:bg-red-400 transition">
          Crear Publicación
        </button>
      </section>

      <!-- Sección: Contenido destacado -->
      <section class="flex space-x-6">
        <!-- Primer bloque -->
        <div class="w-1/2 bg-white p-3 mb-5 rounded-3 border border-light shadow-2xl flex">
          <!-- Imagen ocupando la mitad izquierda -->
          <img src="../assets/19197503.jpg" alt="Imagen de la empresa" class="w-1/2 h-auto object-cover rounded-l-3">

          <!-- Información de la empresa en la mitad derecha -->
          <div class="w-1/2 p-4 flex flex-col justify-center">
            <h2 class="text-xl font-bold text-blue-600 font-serif">Información empresa</h2>
            <p class="mt-4 text-lg text-gray-700">Nombre de la empresa: {{ empresa.nombreEmpresa }}</p>
            <p class="mt-4 text-lg text-gray-700">Razón social: {{ empresa.razonSocial }}</p>
            <p class="mt-4 text-lg text-gray-700">Ruc: {{ empresa.dni }}</p>
          </div>
        </div>

        <!-- Segundo bloque -->
        <div class="w-1/2 space-y-6">
          <div class="bg-white p-6 rounded-3 border border-light shadow-2xl">
            <!-- Fondo blanco, borde gris sutil y sombra grande -->
            <h3 class="text-xl font-bold text-blue-600 font-serif">Información de Encargado</h3>
            <p class="mt-4 text-lg text-gray-700">Nombre: {{ empresa.nombres }}</p>
            <p class="mt-4 text-lg text-gray-700">Apellido: {{ empresa.apellidos }}</p>
          </div>
          <div class="bg-white p-6 rounded-3 border border-light shadow-2xl">
            <!-- Fondo blanco, borde gris sutil y sombra grande -->
            <h3 class="text-xl font-bold text-blue-600 font-serif">Información de contacto empresa</h3>
            <p class="mt-4 text-lg text-gray-700">Teléfono: {{ empresa.telefono }}</p>
            <p class="mt-4 text-lg text-gray-700">Correo Empresa: {{ empresa.correo }}</p>
          </div>
          <div class="bg-white p-6 rounded-3 border border-light shadow-2xl">
            <!-- Fondo blanco, borde gris sutil y sombra grande -->
            <h3 class="text-xl font-bold text-blue-600 font-serif">Contacto empresa</h3>
            <p class="mt-4 text-lg text-gray-700">Dirección: {{ empresa.direccion }}</p>
          </div>
        </div>
      </section>

      <!-- Sección: Productos -->
      <section class="bg-white p-6 rounded-lg shadow">
        <h2 class="text-xl font-semibold mb-4">Publicaciones</h2>
        <div class="flex space-x-4 mb-4">
          <button class="bg-blue-600 text-white px-4 py-2 rounded-lg">Ver mis publicaciones</button>
          <button class="bg-zinc-200 text-zinc-700 px-4 py-2 rounded-lg">Ver postulaciones</button>
        </div>
        <div class="grid grid-cols-2 gap-4">
          <div class="border p-4 rounded-lg">
            <h3 class="text-lg font-semibold">Gratis</h3>
            <img src="https://i.imgur.com/RCpUHKA.png" alt="Logo" class="h-12 ml-4">
            <p class="text-zinc-700">1</p>
            <button class="bg-blue-600 text-white px-4 py-2 rounded-lg mt-2">Publicar</button>
          </div>
          <div class="border p-4 rounded-lg">
            <h3 class="text-lg font-semibold">Simple</h3>
            <img src="https://i.imgur.com/RCpUHKA.png" alt="Logo" class="h-12 ml-4">
            <p class="text-zinc-700">USD 300<sup>15</sup> final</p>
            <button class="bg-green-600 text-white px-4 py-2 rounded-lg mt-2">Comprar</button>
          </div>
          <div class="border p-4 rounded-lg">
            <h3 class="text-lg font-semibold">Destacado</h3>
            <img src="https://i.imgur.com/RCpUHKA.png" alt="Logo" class="h-12 ml-4">
            <p class="text-zinc-700">USD 479<sup>95</sup> final</p>
            <button class="bg-green-600 text-white px-4 py-2 rounded-lg mt-2">Comprar</button>
          </div>
          <div class="border p-4 rounded-lg">
            <h3 class="text-lg font-semibold">Superdestacado</h3>
            <img src="https://i.imgur.com/RCpUHKA.png" alt="Logo" class="h-12 ml-4">
            <p class="text-zinc-700">USD 671<sup>05</sup> final</p>
            <button class="bg-green-600 text-white px-4 py-2 rounded-lg mt-2">Comprar</button>
          </div>
        </div>
      </section>
    </main>
    <!-- ...resto del template... -->
    <transition name="fade">
      <div v-if="modalVisible" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="relative bg-white p-12 rounded-lg shadow-lg max-w-4xl mx-auto z-10">
          <h3 class="text-3xl font-semibold mb-8">Crear Publicación</h3>
          <form @submit.prevent="agregarPublicacion">
            <!-- Campos del formulario -->
            <div class="mb-8">
              <label for="pubTitulo" class="block text-xl font-medium text-gray-700">Título</label>
              <input v-model="newPublication.pubTitulo" id="pubTitulo" type="text"
                class="mt-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-lg px-4 py-3 h-12"
                required>
            </div>
            <div class="mb-8">
              <label for="pubTema" class="block text-xl font-medium text-gray-700">Tema</label>
              <input v-model="newPublication.pubTema" id="pubTema" type="text"
                class="mt-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-lg px-4 py-3 h-12"
                required>
            </div>
            <div class="mb-8">
              <label for="pubDescripcion" class="block text-xl font-medium text-gray-700">Descripción</label>
              <textarea v-model="newPublication.pubDescripcion" id="pubDescripcion"
                class="mt-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-lg px-4 py-3 h-24"
                required></textarea>
            </div>
            <div class="mb-8">
              <label for="pubSalario" class="block text-xl font-medium text-gray-700">Salario</label>
              <input v-model="newPublication.pubSalario" id="pubSalario" type="number"
                class="mt-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-lg px-4 py-3 h-12"
                required>
            </div>
            <button type="button" @click="closeModal"
              class="bg-gray-500 text-white p-2 rounded-md hover:bg-gray-600 transition">Cancelar</button>
            <button :disabled="isSubmitting" @click="agregarPublicacion"
              class="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition">
              {{ isSubmitting ? 'Guardando...' : 'Guardar' }}
            </button>
          </form>
        </div>
      </div>
    </transition>

  </div>
  <AppAlert v-if="successMessage" :message="successMessage" type="success" />
  <AppAlert v-if="errorMessage" :message="errorMessage" type="error" />
</template>

<script>
import axios from 'axios';
import AppAlert from '../components/Alert.vue';

export default {
  name: 'DashboardEmpresa',
  components: {
    AppAlert
  },
  data() {
    return {
      successMessage: '',
      errorMessage: '',
      menuVisible: false,
      modalVisible: false,
      isSubmitting: false, // Agregado para manejar el estado de envío
      newPublication: {
        pubTitulo: '',
        pubTema: '',
        pubDescripcion: '',
        pubSalario: ''
      },
      comEncargado: '', // Nombre del encargado
      empresa: { // Almacena todos los datos de la empresa
        id: '',
        nombres: '',
        apellidos: '',
        encargado: '',
        dni: '',
        telefono: '',
        direccion: '',
        correo: '',
        nombreEmpresa: '',
        razonSocial: '',
      }
    };
  },
  created() {
    this.comEncargado = localStorage.getItem('encargadoNombre') || 'Usuario';
    this.fetchCompanyData(); // Llamar a la función para obtener los datos de la empresa
  },
  methods: {
    toggleMenu() {
      this.menuVisible = !this.menuVisible;
    },
    cerrarSesion() {
      localStorage.removeItem('authToken');
      localStorage.removeItem('empresaDni');
      localStorage.removeItem('empresaRole');
      localStorage.removeItem('encargadoNombre');
      this.$router.push('/login');
    },
    verPerfil() {
      this.$router.push('/perfil');
    },
    async fetchCompanyData() {
      try {
        const token = localStorage.getItem('authToken');
        const encargadoNombre = localStorage.getItem('encargadoNombre');

        if (!token || !encargadoNombre) {
          throw new Error('Token o nombre del encargado no disponible.');
        }

        const response = await fetch('http://172.24.0.11:5001/api/empresas', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Error al obtener los datos de las empresas.');
        }

        const data = await response.json();
        console.log(data);

        const empresa = data.find(item => item.comEncargado.toLowerCase() === encargadoNombre.toLowerCase());

        if (empresa) {
          this.empresa = {
            id: empresa.comId || 'Id no disponible',
            nombres: empresa.comNombres || 'Nombre no disponible',
            apellidos: empresa.comApellidos || 'Apellidos no disponibles',
            encargado: empresa.comEncargado || 'Encargado no disponible',
            dni: empresa.comDni || 'DNI no disponible',
            telefono: empresa.comTelefono || 'Teléfono no disponible',
            direccion: empresa.comDireccion || 'Dirección no disponible',
            correo: empresa.comCorreo || 'Correo no disponible',
            nombreEmpresa: empresa.comNombreEmpresa || 'Nombre de la empresa no disponible',
            razonSocial: empresa.comRazonSocial || 'Razón social no disponible'
          };
        } else {
          console.warn('Empresa no encontrada para el encargado especificado.');
        }
      } catch (error) {
        console.error('Error:', error.message);
      }
    },
    openModal() {
      this.modalVisible = true;
    },
    closeModal() {
      this.modalVisible = false;
    },
    async agregarPublicacion() {
      if (this.isSubmitting) return; // Evita envíos múltiples

      this.isSubmitting = true;
      try {
        // Asegúrate de tener el ID del usuario (comId) correctamente
        const response = await axios.post('http://172.24.0.11:5001/api/publicaciones', {
          pubTitulo: this.newPublication.pubTitulo,
          pubTema: this.newPublication.pubTema,
          pubDescripcion: this.newPublication.pubDescripcion,
          pubSalario: this.newPublication.pubSalario,
          usuId: this.empresa.id, // Usa el ID de la empresa si es aplicable
          pubEstado: 'A',
          pubRol: 2,
          pubFecha: new Date().toISOString()
        });

        console.log('Publicación creada:', response.data);
        this.successMessage = 'Publicación creada exitosamente.';
        this.modalVisible = false;
        this.resetForm();
      } catch (error) {
        console.error('Error al crear la publicación:', error.response ? error.response.data : error.message);
        this.errorMessage = 'Error al crear la publicación.';
      } finally {
        this.isSubmitting = false; // Restaura el estado de envío
      }
    },
    resetForm() {
      this.newPublication = {
        pubTitulo: '',
        pubTema: '',
        pubDescripcion: '',
        pubSalario: ''
      };
    }
  }
};
</script>

<style scoped>
.rounded-3 {
  border-radius: 1rem;
}

.rounded-l-3 {
  border-top-left-radius: 1rem;
  /* 16px */
  border-bottom-left-radius: 1rem;
  /* 16px */
}

.border-light {
  border-color: #e5e7eb;
  /* Color gris muy claro para bordes */
}

.bg-white {
  background-color: #ffffff;
  /* Fondo blanco */
}

.shadow-2xl {
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  /* Sombra grande */
}

.text-blue-600 {
  color: #2563eb;
  /* Color azul para el texto */
}

.text-gray-700 {
  color: #374151;
  /* Color gris oscuro para el texto */
}

.font-serif {
  font-family: serif;
  /* Fuente serif */
}
</style>