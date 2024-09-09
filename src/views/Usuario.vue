<template>
  <div class="min-h-screen bg-background  bg-rose-50 text-foreground p-4">
    <header class="flex items-center justify-between p-4 bg-white shadow-2xl">
      <div class="flex items-center space-x-4">
        <img src="https://i.imgur.com/RCpUHKA.png" alt="Logo Multitrabajos" class="h-10">
        <input v-model="searchSalary" type="number" placeholder="Sueldo deseado"
          class="border rounded-md p-2 w-64 focus:ring-2 focus:ring-primary">
        <input v-model="searchTitle" type="text" placeholder="Título del empleo"
          class="border rounded-md p-2 w-64 focus:ring-2 focus:ring-primary">
        <button @click="buscarEmpleo"
          class="bg-primary text-primary-foreground p-2 rounded-md hover:bg-primary/80 transition">Buscar</button>
      </div>
      <div class="relative">
        <button @click="toggleMenu" class="flex items-center space-x-2">
          <img src="../assets/personita.png" style="width: 40px; height: 40px;" alt="User Icon">
          <p>{{ usuarioDatos?.usuUser }}</p>
          <svg class="h-4 w-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </button>
        <div v-if="menuVisible" class="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-2xl z-10">
          <router-link to="/postulaciones">
            <button class="w-full text-left px-4 py-2 hover:bg-gray-100 transition">Ver Postulaciones</button>
          </router-link>
          <router-link :to="`/perfil/${usuarioDatos.usuId}`">
            <button class="w-full text-left px-4 py-2 hover:bg-gray-100 transition">Ver Perfil</button>
          </router-link>
          <button @click="cerrarSesion" class="w-full text-left px-4 py-2 hover:bg-gray-100 transition">Cerrar
            sesión</button>
        </div>
      </div>
    </header>
    <div class="grid grid-cols-1 lg:grid-cols-4 gap-4 mt-4">
      <aside class="col-span-1 bg-white p-4 rounded-lg border border-gray-300 shadow-lg">
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
            <div class="flex justify-between">
              <span class="font-semibold text-blue-800">Direccion:</span>
              <span>{{ usuarioDatos.usuDireccion }}</span>
            </div>
            <div class="flex justify-between" v-if="usuarioDatos.proId !== undefined">
              <span class="font-semibold text-blue-800">Provincia:</span>
              <span>{{ obtenerNombreProvincia(usuarioDatos.proId) }}</span>
            </div>


          </div>
          <!-- Sección para subir CV en PDF -->
          <section class="bg-white p-4 rounded-lg border border-gray-300 shadow-lg hover:shadow-xl transition mt-4">
            <h3 class="text-lg font-semibold text-blue-800">Subir CV en PDF</h3>
            <input type="file" accept=".pdf" @change="handleCurriculumChange" class="border rounded-md p-2 w-full">
            <p v-if="uploadError" class="text-red-500 mt-2">{{ uploadError }}</p>
            <button @click="uploadPDF"
              class="bg-primary text-primary-foreground p-2 rounded-md mt-4 hover:bg-primary/80 transition">
              Subir PDF
            </button>

          </section>
        </div>
      </aside>
      <!-- Sección -->
      <main class="col-span-3 grid grid-cols-1 lg:grid-cols-2 gap-4">
        <section class="bg-white p-4 rounded-lg border border-gray-300 shadow-lg hover:shadow-xl transition">
          <h3 class="text-lg font-semibold text-blue-800">Publicaciones</h3>
          <div v-if="publicaciones.length === 0" class="text-center text-gray-500 mt-4">
            No hay publicaciones disponibles.
          </div>
          <div v-else class="mt-4 max-h-[43rem] overflow-y-auto">
            <!-- Ajusta max-h para mostrar aproximadamente 4 publicaciones -->
            <!-- Muestra todas las publicaciones -->
            <div v-for="publicacion in publicaciones" :key="publicacion.pubId"
              class="relative bg-gray-100 p-4 rounded-lg border border-gray-300 shadow-md mb-4">
              <div class="flex flex-col space-y-2 absolute top-4 right-4">
                <!-- Contenedor flex para los botones -->
                <button @click="verPublicacion(publicacion.pubId)"
                  class="bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition">
                  Ver publicación
                </button>
              </div>
              <h4 class="text-lg font-semibold text-blue-800">{{ publicacion.pubTitulo }}</h4>
              <p class="text-md mt-2 text-gray-700">{{ publicacion.pubTema }}</p>
              <p class="mt-2">{{ publicacion.pubDescripcion }}</p>
              <p class="mt-2 font-bold">Salario: ${{ publicacion.pubSalario }}</p>
            </div>
          </div>
        </section>

        <!-- Sección Experiencias -->
        <section class="bg-white p-4 rounded-lg border border-gray-300 shadow-lg hover:shadow-xl transition">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-semibold text-blue-800">Experiencias</h3>
            <button @click="openModal"
              class="bg-primary text-primary-foreground p-2 rounded-md hover:bg-primary/80 transition">
              Añadir Experiencia
            </button>
          </div>
          <div v-if="experiencias.length === 0" class="text-center text-gray-500">
            No hay experiencias disponibles.
          </div>
          <div v-else class="relative">
            <div class="overflow-y-auto max-h-50 pr-2"> <!-- Ajusta la altura máxima aquí -->
              <ul class="space-y-4">
                <li v-for="(exp, index) in experiencias" :key="index"
                  class="bg-gray-100 p-4 rounded-md border border-gray-300 shadow-md flex items-start justify-between">
                  <div class="flex-grow">
                    <h4 class="text-md font-semibold text-blue-700">{{ exp.expTitulo }}</h4>
                    <p class="text-sm text-gray-600"><strong>Puesto:</strong> {{ exp.expPuesto }}</p>
                    <p class="text-sm text-gray-600"><strong>Descripción:</strong> {{ exp.expDescripcion }}</p>
                    <p class="text-sm text-gray-600"><strong>Fecha de Inicio:</strong> {{ new
                      Date(exp.expFechaInicio).toLocaleDateString() }}</p>
                    <p class="text-sm text-gray-600"><strong>Fecha de Finalización:</strong> {{ new
                      Date(exp.expFechaFinalizacion).toLocaleDateString() }}</p>
                  </div>
                  <div class="flex space-x-2">
                    <button @click="openEditModal(exp)"
                      class="bg-yellow-500 text-white p-2 rounded-full hover:bg-yellow-600 transition flex items-center justify-center">
                      <i class="fas fa-edit"></i>
                    </button>
                    <button @click="openDeleteModal(exp)"
                      class="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition flex items-center justify-center">
                      <i class="fas fa-trash"></i>
                    </button>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <br>
          <br>
          
          <!-- Sección de Estudios -->
          <section class="bg-white p-4 rounded-lg border border-gray-300 shadow-lg hover:shadow-xl transition mt-4">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-lg font-semibold text-blue-800">Estudios</h3>
              <button @click="openAddStudyModal"
                class="bg-primary text-primary-foreground p-2 rounded-md hover:bg-primary/80 transition">
                Añadir Estudio
              </button>
            </div>
            <div v-if="estudios.length === 0" class="text-center text-gray-500">
              No hay estudios disponibles.
            </div>
            <div v-else class="overflow-y-auto max-h-40"> <!-- Ajusta la altura máxima aquí -->
              <ul class="space-y-4">
                <li v-for="(estudio, index) in estudios" :key="index"
                  class="bg-gray-100 p-4 rounded-md border border-gray-300 shadow-md flex items-start justify-between">
                  <div class="flex-grow">
                    <h4 class="text-md font-semibold text-blue-700">{{ estudio.estTitulo }}</h4>
                    <p class="text-sm text-gray-600"><strong>Institución:</strong> {{ estudio.esInstitucion }}</p>
                    <p class="text-sm text-gray-600"><strong>Descripción:</strong> {{ estudio.esDescripcion }}</p>
                  </div>
                  <div class="flex space-x-2">
                    <button @click="openEditStudyModal(estudio)"
                      class="bg-yellow-500 text-white p-2 rounded-full hover:bg-yellow-600 transition flex items-center justify-center">
                      <i class="fas fa-edit"></i>
                    </button>
                    <button @click="openDeleteStudyModal(estudio)"
                      class="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition flex items-center justify-center">
                      <i class="fas fa-trash"></i>
                    </button>
                  </div>
                </li>
              </ul>
            </div>
          </section>
        </section>

      </main>
    </div>
    <!-- Modal para añadir experiencia -->
    <transition name="fade">
      <div v-if="modalVisible" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
          <h3 class="text-lg font-semibold text-blue-800 mb-4">Añadir Experiencia</h3>
          <form @submit.prevent="añadirExperiencia">
            <div class="space-y-4">
              <div>
                <label class="block text-gray-700">Título:</label>
                <input v-model="nuevaExperiencia.expTitulo" type="text" class="border rounded-md p-2 w-full" required>
              </div>
              <div>
                <label class="block text-gray-700">Puesto:</label>
                <input v-model="nuevaExperiencia.expPuesto" type="text" class="border rounded-md p-2 w-full" required>
              </div>
              <div>
                <label class="block text-gray-700">Descripción:</label>
                <textarea v-model="nuevaExperiencia.expDescripcion" class="border rounded-md p-2 w-full"
                  required></textarea>
              </div>
              <div class="flex space-x-4">
                <div>
                  <label class="block text-gray-700">Fecha de Inicio:</label>
                  <input v-model="nuevaExperiencia.expFechaInicio" type="date" class="border rounded-md p-2 w-full"
                    required>
                </div>
                <div>
                  <label class="block text-gray-700">Fecha de Finalización:</label>
                  <input v-model="nuevaExperiencia.expFechaFinalizacion" type="date"
                    class="border rounded-md p-2 w-full" required>
                </div>
              </div>
              <div class="flex justify-end space-x-4">
                <button type="button" @click="closeModal"
                  class="bg-gray-500 text-white p-2 rounded-md hover:bg-gray-600 transition">Cancelar</button>
                <button type="submit"
                  class="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition">Guardar</button>

              </div>
            </div>
          </form>
        </div>
      </div>
    </transition>
    <!-- Modal para editar experiencia -->
    <transition name="fade">
      <div v-if="editModalVisible" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
          <h3 class="text-lg font-semibold text-blue-800 mb-4">Editar Experiencia</h3>
          <form @submit.prevent="editarExperiencia">
            <div class="space-y-4">
              <div>
                <label class="block text-gray-700">Título:</label>
                <input v-model="experienciaEditada.expTitulo" type="text" class="border rounded-md p-2 w-full" required>
              </div>
              <div>
                <label class="block text-gray-700">Puesto:</label>
                <input v-model="experienciaEditada.expPuesto" type="text" class="border rounded-md p-2 w-full" required>
              </div>
              <div>
                <label class="block text-gray-700">Descripción:</label>
                <textarea v-model="experienciaEditada.expDescripcion" class="border rounded-md p-2 w-full"
                  required></textarea>
              </div>
              <div class="flex space-x-4">
                <div>
                  <label class="block text-gray-700">Fecha de Inicio:</label>
                  <input v-model="experienciaEditada.expFechaInicio" type="date" class="border rounded-md p-2 w-full"
                    required>
                </div>
                <div>
                  <label class="block text-gray-700">Fecha de Finalización:</label>
                  <input v-model="experienciaEditada.expFechaFinalizacion" type="date"
                    class="border rounded-md p-2 w-full" required>
                </div>
              </div>
              <div class="flex justify-end space-x-4">
                <button type="button" @click="closeEditModal"
                  class="bg-gray-500 text-white p-2 rounded-md hover:bg-gray-600 transition">Cancelar</button>
                <button type="submit"
                  class="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition">Guardar</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </transition>
    <!-- Modal para confirmar eliminación -->
    <transition name="fade">
      <div v-if="deleteModalVisible" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
          <h3 class="text-lg font-semibold text-blue-800 mb-4">Confirmar Eliminación</h3>
          <p>¿Estás seguro de que deseas eliminar esta experiencia?</p>
          <div class="flex justify-end space-x-4 mt-4">
            <button type="button" @click="closeDeleteModal"
              class="bg-gray-500 text-white p-2 rounded-md hover:bg-gray-600 transition">Cancelar</button>
            <button @click="eliminarExperiencia"
              class="bg-red-500 text-white p-2 rounded-md hover:bg-red-600 transition">Eliminar</button>
          </div>
        </div>
      </div>
    </transition>


    <transition name="fade">
      <div v-if="showSuccessAlert" class="alert-container">
        <AppAlert type="success" :message="successMessage" />
      </div>
    </transition>
  </div>

  <transition name="fade">
    <div v-if="showAddStudyModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h3 class="text-lg font-semibold text-blue-800 mb-4">Añadir Estudio</h3>
        <form @submit.prevent="añadirEstudio">
          <div class="space-y-4">
            <div>
              <label class="block text-gray-700">Descripción:</label>
              <textarea v-model="nuevoEstudio.esDescripcion" class="border rounded-md p-2 w-full" required></textarea>
            </div>
            <div>
              <label class="block text-gray-700">Institución:</label>
              <input v-model="nuevoEstudio.esInstitucion" type="text" class="border rounded-md p-2 w-full" required>
            </div>
            <div class="flex justify-end space-x-4">
              <button type="button" @click="closeAddStudyModal"
                class="bg-gray-500 text-white p-2 rounded-md hover:bg-gray-600 transition">Cancelar</button>
              <button type="submit"
                class="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition">Guardar</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </transition>

  <!-- Modal para editar estudio -->
  <transition name="fade">
    <div v-if="showEditStudyModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h3 class="text-lg font-semibold text-blue-800 mb-4">Editar Estudio</h3>
        <form @submit.prevent="editarEstudio">
          <div class="space-y-4">
            <div>
              <label class="block text-gray-700">Descripción:</label>
              <textarea v-model="estudioEditado.esDescripcion" class="border rounded-md p-2 w-full" required></textarea>
            </div>
            <div>
              <label class="block text-gray-700">Institución:</label>
              <input v-model="estudioEditado.esInstitucion" type="text" class="border rounded-md p-2 w-full" required>
            </div>
            <div class="flex justify-end space-x-4">
              <button type="button" @click="closeEditStudyModal"
                class="bg-gray-500 text-white p-2 rounded-md hover:bg-gray-600 transition">Cancelar</button>
              <button type="submit"
                class="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition">Guardar</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </transition>

  <!-- Modal para confirmar eliminación -->
  <transition name="fade">
    <div v-if="deleteModalVisible" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h3 class="text-lg font-semibold text-blue-800 mb-4">Confirmar Eliminación</h3>
        <p>¿Estás seguro de que deseas eliminar esta experiencia?</p>
        <div class="flex justify-end space-x-4 mt-4">
          <button type="button" @click="closeDeleteModal"
            class="bg-gray-500 text-white p-2 rounded-md hover:bg-gray-600 transition">Cancelar</button>
          <button @click="eliminarEstudio"
            class="bg-red-500 text-white p-2 rounded-md hover:bg-red-600 transition">Eliminar</button>
        </div>
      </div>
    </div>
  </transition>

</template>

<script>
import axios from 'axios';
import AppAlert from '../components/Alert.vue';

export default {
  name: 'UsuarioPage',
  components: {
    AppAlert
  },
  data() {
    return {
      searchSalary: '',
      searchTitle: '',
      menuVisible: false,
      editModalVisible: false,
      deleteModalVisible: false,
      modalVisible: false,
      showAddStudyModal: false,
      showEditStudyModal: false,
      showDeleteStudyModal: false,
      selectedStudy: null,
      experiencias: [],
      publicaciones: [],
      estudios: [],
      nuevaExperiencia: {
        expId: 0,
        expUsuario: null,
        expTitulo: '',
        expPuesto: '',
        expDescripcion: '',
        expFechaInicio: '',
        expFechaFinalizacion: '',
        expEstado: 'A'
      },
      experienciaEditada: {
        expId: 0,
        expTitulo: '',
        expPuesto: '',
        expDescripcion: '',
        expFechaInicio: '',
        expFechaFinalizacion: ''
      },
      nuevoEstudio: {
        esDescripcion: '',
        esInstitucion: '',
        esEstado: 'A' // Por defecto puede ser 'A' para activo
      },
      estudioEditado: {
        esId: 0,
        esDescripcion: '',
        esInstitucion: '',
        esEstado: 'A'
      },
      usuarioDatos: {},
      provinces: [],
      uploadError: '',
      showSuccessAlert: false,
      successMessage: '',
      userProfileImage: 'https://genesistoxical.com/wp-content/uploads/2022/07/CFS_P.png',
      selectedFile: null,
    };
  },
  mounted() {
    this.obtenerDatosUsuario();
    this.obtenerPublicaciones();
    this.obtenerExperiencias();
    this.obtenerEstudios();
    this.fetchEstudios();
    this.obtenerProvincias();
  },
  methods: {
    toggleMenu() {
      this.menuVisible = !this.menuVisible;

    },
    verPublicacion(pubId) {
      this.$router.push({ name: 'VerPublicacion', params: { pubId } });
    },
    async obtenerProvincias() {
      try {
        const response = await axios.get('http://172.24.0.11:5001/api/provincias');
        if (response.status === 200) {
          this.provincias = response.data || []; // Asegúrate de que `provincias` sea un array
        }
      } catch (error) {
        console.error('Error al obtener provincias:', error);
      }
    },
    obtenerNombreProvincia(proId) {
      // Asegúrate de que `this.provincias` esté definido y sea un array
      if (!this.provincias || !Array.isArray(this.provincias)) {
        console.error('Las provincias no están disponibles.');
        return 'Nombre de provincia no disponible';
      }

      const provincia = this.provincias.find(p => p.proId === proId);
      return provincia ? provincia.proNombre : 'Nombre de provincia no disponible';
    },
    buscarEmpleo() {
      // Obtiene todas las publicaciones primero
      this.obtenerPublicaciones().then(() => {
        // Filtra las publicaciones según el sueldo y el título
        this.publicaciones = this.publicaciones.filter(publicacion => {
          const cumpleSueldo = this.searchSalary ? publicacion.pubSalario >= this.searchSalary : true;
          const cumpleTitulo = this.searchTitle ? publicacion.pubTitulo.toLowerCase().includes(this.searchTitle.toLowerCase()) : true;
          return cumpleSueldo && cumpleTitulo;
        });
      });
    },
    async handleCurriculumChange(event) {
      const curriculumFile = event.target.files[0];
      const formData = new FormData();
      formData.append('curriculum', curriculumFile);

      try {
        const response = await axios.post('http://172.24.0.11:5001/api/curriculums', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });

        if (response.status === 201) {
          this.userProfileImage = response.data.CumId;
        }
      } catch (error) {
        console.error('Error al subir el currículum:', error);
      }
    },
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
          this.nuevaExperiencia.expUsuario = usuario.usuId;
        }
      } catch (error) {
        console.error('Error:', error);
      }
    },
    formatFecha(date) {
      if (!date) return '';
      const options = { year: 'numeric', month: 'short', day: 'numeric' };
      return new Date(date).toLocaleDateString(undefined, options);
    },
    async obtenerPublicaciones() {
      try {
        const response = await axios.get('http://172.24.0.11:5001/api/publicaciones');
        if (response.status === 200) {
          // Filtrar publicaciones que tienen pubEstado igual a "A"
          this.publicaciones = response.data.filter(publicacion => publicacion.pubEstado === 'A');
        }
      } catch (error) {
        console.error('Error al obtener publicaciones:', error);
      }
    },
    obtenerSexo(sexo) {
      const sexos = {
        '1': 'Masculino',
        '2': 'Femenino'
      };
      return sexos[sexo] || 'No especificado';
    },
    async fetchEstudios() {
      try {
        const response = await axios.get('http://172.24.0.11:5001/api/estudios');
        this.estudios = response.data;
      } catch (error) {
        console.error('Error fetching estudios:', error);
      }
    },
    async obtenerExperiencias() {
      try {
        const correo = localStorage.getItem('userCorreo');
        if (!correo) {
          throw new Error('Correo del usuario no encontrado en el almacenamiento local');
        }

        const responseUsuario = await fetch('http://172.24.0.11:5001/api/usuario');
        if (!responseUsuario.ok) {
          throw new Error('Error al obtener los datos del usuario');
        }

        const usuarios = await responseUsuario.json();
        const usuario = usuarios.find(user => user.usuCorreo === correo);

        if (!usuario) {
          throw new Error('Usuario no encontrado');
        }

        const usuarioId = usuario.usuId;
        const responseExperiencias = await axios.get('http://172.24.0.11:5001/api/experiencias');

        if (responseExperiencias.status === 200) {
          // Filtrar experiencias del usuario y mostrar solo las que están activas
          this.experiencias = responseExperiencias.data
            .filter(exp => exp.expUsuario === usuarioId && exp.expEstado === 'A');
        }
      } catch (error) {
        console.error('Error al obtener experiencias:', error);
      }
    },
    async cerrarSesion() {
      try {
        // Limpiar almacenamiento local
        localStorage.removeItem('userCorreo');
        localStorage.removeItem('userToken'); // Si estás almacenando un token de autenticación

        // Redirigir al usuario a la página de inicio de sesión
        this.$router.push('/login'); // Cambia '/login' por la ruta de tu página de inicio de sesión
      } catch (error) {
        console.error('Error al cerrar sesión:', error);
      }
    },
    async uploadPDF() {
      if (!this.selectedFile) {
        this.uploadError = 'Por favor, selecciona un archivo PDF para subir.';
        return;
      }
      const formData = new FormData();
      formData.append('file', this.selectedFile);

      try {
        await axios.post('http://172.24.0.11:5001/api/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });

        this.successMessage = 'CV subido exitosamente.';
        this.showSuccessAlert = true;
        this.uploadError = '';
      } catch (error) {
        this.uploadError = 'Error al subir el archivo. Inténtalo de nuevo.';
        console.error('Error al subir el archivo:', error);
      }
    },
    async obtenerEstudios() {
      try {
        const correo = localStorage.getItem('userCorreo');
        if (!correo) {
          throw new Error('Correo del usuario no encontrado en el almacenamiento local');
        }

        // Obtener los datos del usuario para encontrar el usuario logueado
        const responseUsuario = await fetch('http://172.24.0.11:5001/api/usuario');
        if (!responseUsuario.ok) {
          throw new Error('Error al obtener los datos del usuario');
        }

        const usuarios = await responseUsuario.json();
        const usuario = usuarios.find(user => user.usuCorreo === correo);

        if (!usuario) {
          throw new Error('Usuario no encontrado');
        }

        const usuarioId = usuario.usuId;

        // Obtener todos los estudios
        const responseEstudios = await axios.get('http://172.24.0.11:5001/api/estudios');

        if (responseEstudios.status === 200) {
          // Filtrar estudios del usuario y mostrar solo los que están activos
          this.estudios = responseEstudios.data
            .filter(estudio => estudio.usuId === usuarioId && estudio.esEstado === 'A');
        }
      } catch (error) {
        console.error('Error al obtener estudios:', error);
      }
    },

    openAddStudyModal() {
      this.showAddStudyModal = true;
    },
    closeAddStudyModal() {
      this.showAddStudyModal = false;
    },
    openModal() {
      this.modalVisible = true;
    },
    closeModal() {
      this.modalVisible = false;
    },
    openEditModal(exp) {
      this.experienciaEditada = { ...exp };
      this.editModalVisible = true;
    },
    closeEditModal() {
      this.editModalVisible = false;
    },
    openDeleteModal(exp) {
      this.experienciaAEliminar = exp;
      this.deleteModalVisible = true;
    },
    closeDeleteModal() {
      this.deleteModalVisible = false;
    },
    openEditStudyModal(estudio) {
      this.estudioEditado = { ...estudio }; // Crea una copia del estudio para editar
      this.showEditStudyModal = true; // Muestra el modal
    },
    closeEditStudyModal() {
      this.showEditStudyModal = false;
    },
    openDeleteStudyModal(estudio) {
      this.estudioAEliminar = estudio; // Guarda el estudio a eliminar
      this.deleteModalVisible = true;
    },

    async añadirEstudio() {
      try {
        this.nuevoEstudio.usuId = this.usuarioDatos.usuId;
        await axios.post('http://172.24.0.11:5001/api/estudios', this.nuevoEstudio);
        this.successMessage = 'Estudio añadido exitosamente.';
        this.showSuccessAlert = true;
        this.nuevoEstudio = {}; // Limpiar el formulario
        this.obtenerEstudios(); // Actualizar la lista de estudios
        this.closeModal(); // Cerrar el modal
      } catch (error) {
        console.error('Error al añadir estudio:', error);
      }
    },
    async editarEstudio() {
      try {
        await axios.put(`http://172.24.0.11:5001/api/estudios/${this.estudioEditado.esId}`, this.estudioEditado);
        this.successMessage = 'Estudio editado exitosamente.';
        this.showSuccessAlert = true;
        this.obtenerEstudios(); // Actualizar la lista de estudios
        this.closeEditModal(); // Cerrar el modal
      } catch (error) {
        console.error('Error al editar estudio:', error);
      }
    },
    async eliminarEstudio() {
      try {
        // Verifica que estudioAEliminar y esId estén definidos
        if (!this.estudioAEliminar || !this.estudioAEliminar.esId) {
          console.error('El estudio a eliminar no está definido o no tiene un esId válido.');
          return;
        }

        // Envía la solicitud POST para cambiar el estado del estudio a 'I'
        await axios.post(`http://172.24.0.11:5001/api/estudios/${this.estudioAEliminar.esId}`, {
          esEstado: 'I' // Cambia el estado a 'I' para inactivo
        });

        // Actualiza el mensaje de éxito y muestra la alerta
        this.successMessage = 'Estudio eliminado exitosamente.';
        this.showSuccessAlert = true;

        // Actualiza la lista de estudios y cierra el modal
        this.obtenerEstudios(); // Actualizar la lista de estudios
        this.closeDeleteModal(); // Cerrar el modal
      } catch (error) {
        console.error('Error al eliminar estudio:', error);
      }
    },
    async añadirExperiencia() {
      try {
        await axios.post('http://172.24.0.11:5001/api/experiencias', this.nuevaExperiencia);
        this.successMessage = 'Experiencia añadida exitosamente.';
        this.showSuccessAlert = true;
        this.nuevaExperiencia = {}; // Limpiar el formulario
        this.obtenerExperiencias(); // Actualizar la lista de experiencias
        this.closeModal(); // Cerrar el modal
      } catch (error) {
        console.error('Error al añadir experiencia:', error);
      }
    },
    async editarExperiencia() {
      try {
        await axios.put(`http://172.24.0.11:5001/api/experiencias/${this.experienciaEditada.expId}`, this.experienciaEditada);
        this.successMessage = 'Experiencia editada exitosamente.';
        this.showSuccessAlert = true;
        this.obtenerExperiencias(); // Actualizar la lista de experiencias
        this.closeEditModal(); // Cerrar el modal
      } catch (error) {
        console.error('Error al editar experiencia:', error);
      }
    },
    async eliminarExperiencia() {
      try {
        await axios.post(`http://172.24.0.11:5001/api/experiencias/${this.experienciaAEliminar.expId}`);
        this.successMessage = 'Experiencia eliminada exitosamente.';
        this.showSuccessAlert = true;
        this.obtenerExperiencias(); // Actualizar la lista de experiencias
        this.closeDeleteModal(); // Cerrar el modal
      } catch (error) {
        console.error('Error al eliminar experiencia:', error);
      }
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