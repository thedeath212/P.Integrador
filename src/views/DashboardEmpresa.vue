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
          <button @click="verPerfil(empresa.id)" class="w-full text-left px-4 py-2 hover:bg-gray-100 transition">Ver
            perfil</button>
          <router-link :to="{ name: 'PostulPage', params: { comId: empresa.id } }">
            <button class="w-full text-left px-4 py-2 hover:bg-gray-100 transition">
              Ver Postulaciones
            </button>
          </router-link>
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
            <h3 class="text-xl font-bold text-blue-600 font-serif">Información de Encargado</h3>
            <p class="mt-4 text-lg text-gray-700">Nombre: {{ empresa.nombres }}</p>
            <p class="mt-4 text-lg text-gray-700">Apellido: {{ empresa.apellidos }}</p>
          </div>
          <div class="bg-white p-6 rounded-3 border border-light shadow-2xl">
            <h3 class="text-xl font-bold text-blue-600 font-serif">Información de contacto empresa</h3>
            <p class="mt-4 text-lg text-gray-700">Teléfono: {{ empresa.telefono }}</p>
            <p class="mt-4 text-lg text-gray-700">Correo Empresa: {{ empresa.correo }}</p>
          </div>
          <div class="bg-white p-6 rounded-3 border border-light shadow-2xl">
            <h3 class="text-xl font-bold text-blue-600 font-serif">Contacto empresa</h3>
            <p class="mt-4 text-lg text-gray-700">Dirección: {{ empresa.direccion }}</p>
          </div>
        </div>
      </section>


      <!-- Lista de publicaciones -->
      <section class="bg-white p-6 rounded-lg shadow">
        <h2 class="text-xl font-semibold mb-4">Publicaciones</h2>
        <div class="flex space-x-4 mb-4">
          <button class="bg-blue-600 text-white px-4 py-2 rounded-lg">Ver mis publicaciones</button>
          <button class="bg-zinc-200 text-zinc-700 px-4 py-2 rounded-lg">Ver postulaciones</button>
        </div>
        <div v-if="publicacionesFiltradas.length === 0" class="text-center text-gray-500">
          No hay publicaciones disponibles.
        </div>
        <div v-else class="flex-grow overflow-auto">
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
            <div v-for="publicacion in publicacionesFiltradas" :key="publicacion.pubId"
              class="bg-white p-4 rounded-lg border border-gray-200 mb-4 shadow-md">
              <h3 class="text-lg font-bold mb-2">{{ publicacion.pubTitulo }}</h3>
              <p class="text-gray-600 mb-4">{{ publicacion.pubDescripcion }}</p>
              <p><strong>Tema:</strong> {{ publicacion.pubTema }}</p>
              <p><strong>Salario:</strong> {{ publicacion.pubSalario }}</p>
              <p><strong>Estado:</strong> {{ publicacion.pubEstado }}</p>
              <div class="mt-4 flex justify-end space-x-2">
                <button @click="openEditModal(publicacion)"
                  class="bg-yellow-500 text-white py-2 px-4 rounded">Editar</button>

                <button @click="confirmarEliminacion(publicacion.pubId)"
                  class="bg-red-500 text-white py-2 px-4 rounded">Eliminar</button>
              </div>
            </div>
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
    <transition name="fade">
      <div v-if="editModalVisible" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="relative bg-white p-12 rounded-lg shadow-lg max-w-4xl mx-auto z-10">
          <h3 class="text-3xl font-semibold mb-8">Editar Publicación</h3>
          <form @submit.prevent="editarPublicacion">
            <!-- Campo oculto para el ID -->
            <input type="hidden" v-model="selectedPublication.pubId">
            <!-- Campos del formulario -->
            <div class="mb-8">
              <label for="editPubTitulo" class="block text-xl font-medium text-gray-700">Título</label>
              <input v-model="selectedPublication.pubTitulo" id="editPubTitulo" type="text"
                class="mt-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-lg px-4 py-3 h-12"
                required>
            </div>
            <div class="mb-8">
              <label for="editPubTema" class="block text-xl font-medium text-gray-700">Tema</label>
              <input v-model="selectedPublication.pubTema" id="editPubTema" type="text"
                class="mt-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-lg px-4 py-3 h-12"
                required>
            </div>
            <div class="mb-8">
              <label for="editPubDescripcion" class="block text-xl font-medium text-gray-700">Descripción</label>
              <textarea v-model="selectedPublication.pubDescripcion" id="editPubDescripcion"
                class="mt-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-lg px-4 py-3 h-24"
                required></textarea>
            </div>
            <div class="mb-8">
              <label for="editPubSalario" class="block text-xl font-medium text-gray-700">Salario</label>
              <input v-model="selectedPublication.pubSalario" id="editPubSalario" type="number"
                class="mt-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-lg px-4 py-3 h-12"
                required>
            </div>
            <button type="button" @click="closeEditModal"
              class="bg-gray-500 text-white p-2 rounded-md hover:bg-gray-600 transition">Cancelar</button>
            <button :disabled="isSubmitting" type="submit"
              class="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition">
              {{ isSubmitting ? 'Guardando...' : 'Guardar' }}
            </button>
          </form>
        </div>
      </div>
    </transition>

    <!-- Modal de confirmación de eliminación -->
    <transition name="fade" enter-active-class="transition ease-out duration-300" enter-class="opacity-0"
      enter-to-class="opacity-100" leave-active-class="transition ease-in duration-200" leave-class="opacity-100"
      leave-to-class="opacity-0">
      <div v-if="mostrarModal" class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
        <div class="bg-white p-6 rounded-lg shadow-lg">
          <h3 class="text-lg font-bold mb-4">Confirmar Eliminación</h3>
          <p class="mb-4">¿Estás seguro de que deseas eliminar esta publicación?</p>
          <div class="flex justify-end space-x-2">
            <button @click="eliminarPublicacionConfirmado"
              class="bg-red-500 text-white py-2 px-4 rounded">Eliminar</button>
            <button @click="cancelarEliminacion" class="bg-gray-500 text-white py-2 px-4 rounded">Cancelar</button>
          </div>
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
      editModalVisible: false,
      publicacionesFiltradas: [],
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
      },
      idPublicacionAEliminar: null, // ID de la publicación a eliminar
      mostrarModal: false // Mostrar modal de confirmación
    };
  },
  async created() {
    try {
      this.comEncargado = localStorage.getItem('encargadoNombre') || 'Usuario';

      await this.fetchCompanyData();

      if (this.empresa && this.empresa.id) {
        await this.fetchPublicaciones();
      } else {
        console.error('El ID de la empresa no está disponible después de fetchCompanyData()');
      }
    } catch (error) {
      console.error('Error en created():', error.message);
    }
  },
  methods: {
    toggleMenu() {
      this.menuVisible = !this.menuVisible;
    },
    openEditModal(publicacion) {
      this.selectedPublication = { ...publicacion }; // Clonar la publicación seleccionada
      this.editModalVisible = true;
    },
    closeEditModal() {
      this.editModalVisible = false;
    },
    cerrarSesion() {
      localStorage.removeItem('authToken');
      localStorage.removeItem('empresaDni');
      localStorage.removeItem('empresaRole');
      localStorage.removeItem('encargadoNombre');
      this.$router.push('/login');
    },
    verPerfil(comId) {
      this.$router.push({ name: 'PerfilEmpresa', params: { comId } });
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

      // Valida el salario antes de continuar
      if (this.newPublication.pubSalario <= 0) {
        alert('El salario debe ser mayor que 0');
        this.isSubmitting = false; // Asegúrate de restaurar el estado de envío
        return; // Detén la ejecución si la validación falla
      }

      this.isSubmitting = true;

      try {
        // Asegúrate de tener el ID del usuario (comId) correctamente
        const response = await axios.post('http://172.24.0.11:5001/api/publicaciones', {
          pubTitulo: this.newPublication.pubTitulo,
          pubTema: this.newPublication.pubTema,
          pubDescripcion: this.newPublication.pubDescripcion,
          pubSalario: this.newPublication.pubSalario,
          comId: this.empresa.id, // Usa el ID de la empresa si es aplicable
          pubEstado: 'A',
          pubRol: 2,
          pubFecha: new Date().toISOString()
        });

        // Maneja la respuesta de éxito
        console.log('Publicación creada:', response.data);
        this.successMessage = 'Publicación creada exitosamente.';
        this.resetForm();
        this.modalVisible = false;

        // Recargar la página después de la creación exitosa
        window.location.reload();
      } catch (error) {
        console.error('Error al crear la publicación:', error.response ? error.response.data : error.message);
        this.errorMessage = 'Error al crear la publicación.';
      } finally {
        this.isSubmitting = false; // Restaura el estado de envío
      }
    },
    async editarPublicacion() {
      if (this.isSubmitting) return; // Evita envíos múltiples

      // Valida el salario antes de continuar
      if (this.selectedPublication.pubSalario <= 0) {
        alert('El salario debe ser mayor que 0');
        this.isSubmitting = false; // Asegúrate de restaurar el estado de envío
        return; // Detén la ejecución si la validación falla
      }

      this.isSubmitting = true;

      try {
        // Destructura el ID y los campos de la publicación seleccionada
        const { pubId, pubTitulo, pubTema, pubDescripcion, pubSalario, comId } = this.selectedPublication;

        // Asigna el valor fijo para pubRol y pubEstado
        const pubRol = 2; // Valor fijo para pubRol
        const pubEstado = 'A'; // Valor fijo para pubEstado

        console.log('Selected Publication:', { pubId, pubTitulo, pubTema, pubDescripcion, pubSalario, comId, pubRol, pubEstado });

        // Envía los datos ajustados a la API
        const response = await axios.put(`http://172.24.0.11:5001/api/publicaciones/${pubId}`, {
          pubId,
          pubTitulo,
          pubTema,
          pubDescripcion,
          pubSalario,
          comId,
          pubRol,
          pubEstado
        });

        // Maneja la respuesta de éxito
        if (response.status === 200) {
          this.successMessage = 'Publicación actualizada correctamente.';
          // Actualiza la lista de publicaciones
          await this.fetchPublicaciones();
          this.closeEditModal();
        } else {
          this.errorMessage = 'Error al actualizar la publicación. Inténtalo de nuevo.';
        }
      } catch (error) {
        this.errorMessage = `Error: ${error.message}`;
      } finally {
        this.isSubmitting = false; // Restaura el estado de envío
      }
    },
    confirmarEliminacion(pubId) {
      this.idPublicacionAEliminar = pubId;
      this.mostrarModal = true;
    },
    async eliminarPublicacionConfirmado() {
      try {
        const response = await axios.post(`http://172.24.0.11:5001/api/publicaciones/${this.idPublicacionAEliminar}`, { pubEstado: 'I' });
        if (response.status === 200) {
          this.publicacionesFiltradas = this.publicacionesFiltradas.filter(publicacion => publicacion.pubId !== this.idPublicacionAEliminar);
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
    resetForm() {
      this.newPublication = {
        pubTitulo: '',
        pubTema: '',
        pubDescripcion: '',
        pubSalario: ''
      };
    },
    async fetchPublicaciones() {
      try {
        if (!this.empresa.id) {
          throw new Error('El ID de la empresa no está definido.');
        }
        const response = await axios.get('http://172.24.0.11:5001/api/publicaciones');
        console.log('Publicaciones obtenidas:', response.data);
        console.log('ID de la empresa:', this.empresa.id);

        // Aplicar el filtro
        this.publicacionesFiltradas = response.data.filter(publicacion => {
          console.log('Comparando:', publicacion.comId, 'con', this.empresa.id);
          // Filtrar por ID de la empresa y estado "A"
          return publicacion.comId === this.empresa.id && publicacion.pubEstado === 'A';
        });

        console.log('Publicaciones filtradas:', this.publicacionesFiltradas);
      } catch (error) {
        console.error('Error al obtener publicaciones:', error);
        this.errorMessage = error.message;
      }
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