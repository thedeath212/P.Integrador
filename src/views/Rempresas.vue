<template>
  <div id="Registrar" class="min-h-screen flex flex-col items-center justify-start bg-gray-100 text-gray-800">
    <!-- Header -->
    <header class="w-full flex justify-start items-center p-4 bg-white shadow-md">
      <router-link to="/logemp" class="text-xl p-2">
        <img aria-hidden="true" alt="back-arrow" src="https://openui.fly.dev/openui/24x24.svg?text=←"
          class="h-6 w-6 md:h-8 md:w-8" />
      </router-link>
      <img src="../assets/MultiEmpleo.png" alt="multitrabajos logo" class="h-6 ml-4" />
      <router-link to="/logemp" class="text-pink-600 hover:underline ml-auto">Ingresa como empresa</router-link>
    </header>

    <!-- Contenido principal -->
    <main class="flex flex-col md:flex-row items-center justify-center w-full max-w-6xl mt-4 p-4">
      <!-- Sección izquierda (Imagen de perfil) -->
      <div class="w-full md:w-1/2 flex justify-center">
        <img src="https://i.imgur.com/tM9uwLh.jpeg" alt="Ilustración de una persona con un currículum"
          class="w-full max-w-md h-auto rounded-lg shadow-lg" />
      </div>

      <!-- Sección derecha (Formulario) -->
      <div class="w-full md:w-1/2 p-4">
        <div class="bg-white shadow-lg rounded-lg p-6">
          <h1 class="text-2xl font-bold text-blue-700 mb-4">Registra tu empresa en Multitrabajos</h1>
          <p class="text-muted-foreground mb-6">Todos los campos son obligatorios.</p>
          <form @submit.prevent="handleSubmit" class="space-y-4">
            <fieldset>
              <legend class="text-lg font-semibold mb-2">Completa la información de tu empresa</legend>
              <div class="space-y-4">
                <!-- Campos en fila -->
                <div class="flex flex-col md:flex-row md:space-x-4">
                  <div class="flex-1">
                    <label for="nombre" class="block text-sm font-medium">Nombre</label>
                    <input v-model="nombre" type="text" id="nombre"
                      class="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-blue-500" />
                    <span v-if="errors.nombre" class="text-red-600 text-sm">{{ errors.nombre }}</span>
                  </div>
                  <div class="flex-1">
                    <label for="apellidos" class="block text-sm font-medium">Apellidos</label>
                    <input v-model="apellidos" type="text" id="apellidos"
                      class="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-blue-500" />
                    <span v-if="errors.apellidos" class="text-red-600 text-sm">{{ errors.apellidos }}</span>
                  </div>
                </div>
                <div class="flex flex-col md:flex-row md:space-x-4">
                  <div class="flex-1">
                    <label for="encargado" class="block text-sm font-medium">Encargado</label>
                    <input v-model="encargado" type="text" id="encargado"
                      class="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-blue-500" />
                    <span v-if="errors.encargado" class="text-red-600 text-sm">{{ errors.encargado }}</span>
                  </div>
                  <div class="flex-1">
                    <label for="tipoDni" class="block text-sm font-medium">Tipo de DNI</label>
                    <select v-model="tipoDni" id="tipoDni"
                      class="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-blue-500">
                      <option value="1">RUC</option>
                    </select>
                    <span v-if="errors.tipoDni" class="text-red-600 text-sm">{{ errors.tipoDni }}</span>
                  </div>
                </div>
                <div class="flex flex-col md:flex-row md:space-x-4">
                  <div class="flex-1">
                    <label for="dni" class="block text-sm font-medium">Número de DNI</label>
                    <input v-model="dni" type="text" id="dni"
                      class="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-blue-500" />
                    <span v-if="errors.dni" class="text-red-600 text-sm">{{ errors.dni }}</span>
                  </div>
                  <div class="flex-1">
                    <label for="telefono" class="block text-sm font-medium">Teléfono</label>
                    <input v-model="telefono" type="text" id="telefono"
                      class="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-blue-500" />
                    <span v-if="errors.telefono" class="text-red-600 text-sm">{{ errors.telefono }}</span>
                  </div>
                </div>
                <div class="flex flex-col md:flex-row md:space-x-4">
                  <div class="flex-1">
                    <label for="direccion" class="block text-sm font-medium">Dirección</label>
                    <input v-model="direccion" type="text" id="direccion"
                      class="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-blue-500" />
                    <span v-if="errors.direccion" class="text-red-600 text-sm">{{ errors.direccion }}</span>
                  </div>
                  <div class="flex-1">
                    <label for="correo" class="block text-sm font-medium">Correo Electrónico</label>
                    <input v-model="correo" type="email" id="correo"
                      class="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-blue-500" />
                    <span v-if="errors.correo" class="text-red-600 text-sm">{{ errors.correo }}</span>
                  </div>
                </div>
                <div class="flex flex-col md:flex-row md:space-x-4">
                  <div class="flex-1">
                    <label for="nombreEmpresa" class="block text-sm font-medium">Nombre de la Empresa</label>
                    <input v-model="nombreEmpresa" type="text" id="nombreEmpresa"
                      class="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-blue-500" />
                    <span v-if="errors.nombreEmpresa" class="text-red-600 text-sm">{{ errors.nombreEmpresa }}</span>
                  </div>
                  <!-- Nuevos campos -->
                  <div class="flex-1">
                    <label for="comRazonSocial" class="block text-sm font-medium">Razón Social</label>
                    <input v-model="comRazonSocial" type="text" id="comRazonSocial"
                      class="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-blue-500" />
                    <span v-if="errors.comRazonSocial" class="text-red-600 text-sm">{{ errors.comRazonSocial }}</span>
                  </div>
                </div>
                <div class="flex flex-col md:flex-row md:space-x-4">
                  <div class="flex-1">
                    <label for="comClave" class="block text-sm font-medium">Clave</label>
                    <input v-model="comClave" type="password" id="comClave"
                      class="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-blue-500" />
                    <span v-if="errors.comClave" class="text-red-600 text-sm">{{ errors.comClave }}</span>
                  </div>
                </div>
              </div>
            </fieldset>
            <div class="space-y-4">
              <button type="submit"
                class="w-full py-2 px-4 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700">
                Registrar Empresa
              </button>
            </div>
          </form>
          <app-alert v-if="showSuccessAlert" type="success" :message="successMessage" @closed="limpiarAlertas" />
          <app-alert v-if="showErrorAlert" type="error" :message="errorMessage" @closed="limpiarAlertas" />
        </div>
      </div>
    </main>
  </div>
</template>
<script>
import axios from 'axios';
import AppAlert from '../components/Alert.vue';

export default {
  name: 'CrearEmpresa',
  components: {
    AppAlert
  },
  data() {
    return {
      nombre: '',
      apellidos: '',
      encargado: '',
      tipoDni: '1', // RUC predeterminado
      dni: '',
      telefono: '',
      direccion: '',
      correo: '',
      nombreEmpresa: '',
      comRazonSocial: '', // Valor predeterminado
      comClave: '', // Valor predeterminado
      errors: {},
      showSuccessAlert: false,
      showErrorAlert: false,
      successMessage: '',
      errorMessage: ''
    };
  },
  methods: {
    async checkRucExists(ruc) {
      try {
        const { data } = await axios.get('http://172.24.0.11:5001/api/empresas');
        const rucExists = data.some(empresa => empresa.comDni === ruc);
        return rucExists;
      } catch (error) {
        this.errorMessage = 'Error al verificar el RUC. Inténtelo nuevamente.';
        this.showErrorAlert = true;
        return false;
      }
    },
    validate() {
      this.errors = {};
      // Validaciones de los campos
      if (!this.nombre) this.errors.nombre = 'El nombre es obligatorio.';
      if (!this.apellidos) this.errors.apellidos = 'Los apellidos son obligatorios.';
      if (!this.encargado) this.errors.encargado = 'El encargado es obligatorio.';
      if (!this.tipoDni) this.errors.tipoDni = 'El tipo de DNI es obligatorio.';
      if (!this.dni) this.errors.dni = 'El DNI es obligatorio.';
      if (!this.telefono) this.errors.telefono = 'El teléfono es obligatorio.';
      if (!this.direccion) this.errors.direccion = 'La dirección es obligatoria.';
      if (!this.correo) this.errors.correo = 'El correo electrónico es obligatorio.';
      if (!this.nombreEmpresa) this.errors.nombreEmpresa = 'El nombre de la empresa es obligatorio.';
      return Object.keys(this.errors).length === 0;
    },
    async handleSubmit() {
      if (!this.validate()) {
        return;
      }

      const rucExists = await this.checkRucExists(this.dni);
      if (rucExists) {
        this.errorMessage = 'Ya existe una empresa con el mismo RUC.';
        this.showErrorAlert = true;
        return;
      }

      const data = {
        comNombres: this.nombre,
        comApellidos: this.apellidos,
        comEncargado: this.encargado,
        comTipoDni: this.tipoDni,
        comDni: this.dni,
        comTelefono: this.telefono,
        comDireccion: this.direccion,
        comCorreo: this.correo,
        comNombreEmpresa: this.nombreEmpresa,
        comRazonSocial: this.comRazonSocial,
        comClave: this.comClave,
        comEstado: 'A' // Establece el estado como "A"
      };

      try {
        await axios.post('http://172.24.0.11:5001/api/empresas', data);
        this.successMessage = 'Empresa registrada exitosamente';
        this.showSuccessAlert = true;

        // Esperar 5 segundos antes de redirigir
        setTimeout(() => {
          this.$router.push('/logemp');
        }, 5000); // 5000 ms = 5 segundos

        this.limpiarCampos();
      } catch (error) {
        console.error('Error al registrar la empresa:', error.response.data);
        this.errorMessage = 'Error al registrar la empresa. Inténtelo nuevamente.';
        this.showErrorAlert = true;
      }
    },
    limpiarCampos() {
      this.nombre = '';
      this.apellidos = '';
      this.encargado = '';
      this.tipoDni = '1'; // RUC predeterminado
      this.dni = '';
      this.telefono = '';
      this.direccion = '';
      this.correo = '';
      this.nombreEmpresa = '';
      this.comRazonSocial = 'a'; // Valor predeterminado
      this.comClave = '123';
      // Valor predeterminado
    },
    limpiarAlertas() {
      this.showSuccessAlert = false;
      this.showErrorAlert = false;
    }
  }
};
</script>
