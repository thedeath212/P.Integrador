<template>
  <transition name="fade">
    <div v-if="showModal" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div class="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 class="text-xl font-bold mb-4">Recuperación de Contraseña</h2>
        <form @submit.prevent="handleRecovery">
          <div class="mb-4">
            <label for="email" class="block text-sm font-medium text-gray-700">Correo electrónico</label>
            <input type="email" id="email" v-model="usuCorreo" autocomplete="off"
              class="w-full p-2 border border-gray-300 rounded-lg" required />
          </div>
          <div class="mb-4">
            <label for="dni" class="block text-sm font-medium text-gray-700">DNI</label>
            <input type="text" id="dni" v-model="usuDni" autocomplete="off"
              class="w-full p-2 border border-gray-300 rounded-lg" required />
            <p v-if="dniError" class="text-red-500 text-sm">{{ dniErrorMessage }}</p>
          </div>
          <div class="mb-4">
            <label for="telefono" class="block text-sm font-medium text-gray-700">Teléfono</label>
            <input type="tel" id="telefono" v-model="usuTelefono" autocomplete="off"
              class="w-full p-2 border border-gray-300 rounded-lg" required />
            <p v-if="telefonoError" class="text-red-500 text-sm">{{ telefonoErrorMessage }}</p>
          </div>
          <div class="flex justify-end">
            <button type="button" @click="closeModal" class="mr-2 p-2 bg-gray-300 rounded-lg">Cancelar</button>
            <button type="submit" class="p-2 bg-blue-600 text-white rounded-lg">Enviar</button>
          </div>
        </form>
        <p v-if="showError" class="text-red-500 mt-4">{{ errorMessage }}</p>
      </div>
    </div>
  </transition>

  <!-- Modal for displaying the recovery key -->
  <transition name="fade">
    <div v-if="showRecoveryModal" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div class="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 class="text-xl font-bold mb-4">Clave Temporal</h2>
        <p class="text-lg mb-4">{{ recoveryMessage }}</p>
        <div class="flex justify-end">
          <button @click="redirectToLogin" class="p-2 bg-blue-600 text-white rounded-lg">Aceptar</button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    showModal: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      usuCorreo: '',
      usuDni: '',
      usuTelefono: '',
      dniError: false,
      dniErrorMessage: '',
      telefonoError: false,
      telefonoErrorMessage: '',
      showError: false,
      errorMessage: '',
      showRecoveryModal: false,
      recoveryMessage: ''
    };
  },
  methods: {
    handleRecovery() {
      this.dniError = false;
      this.telefonoError = false;

      // Validación del DNI (10 dígitos y no puede ser 22222)
      if (this.usuDni.length !== 10 || this.usuDni === '22222') {
        this.dniError = true;
        this.dniErrorMessage = 'El DNI debe tener 10 dígitos y no puede ser 22222.';
        return;
      }

      // Validación del teléfono (10 dígitos)
      if (this.usuTelefono.length !== 10) {
        this.telefonoError = true;
        this.telefonoErrorMessage = 'El número de teléfono debe tener 10 dígitos.';
        return;
      }

      // Si las validaciones son correctas, continuar con el proceso de recuperación
      this.processRecovery();
    },
    async processRecovery() {
      try {
        // Solicitud de validación de recuperación de contraseña
        const validationResponse = await fetch('http://172.24.0.11:5001/api/usuario/passrecover', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            usuCorreo: this.usuCorreo,
            usuDni: this.usuDni,
            usuTelefono: this.usuTelefono
          }),
        });

        if (!validationResponse.ok) {
          this.showError = true;
          this.errorMessage = 'No se encontró la información proporcionada.';
          return;
        }

        const usersResponse = await fetch('http://172.24.0.11:5001/api/usuario');
        if (!usersResponse.ok) {
          this.showError = true;
          this.errorMessage = 'No se pudo recuperar la lista de usuarios.';
          return;
        }

        const usersData = await usersResponse.json();
        const user = usersData.find(u => u.usuCorreo === this.usuCorreo);

        if (user && user.usuClave) {
          this.recoveryMessage = `Su clave temporal es: ${user.usuClave}`;
          this.showRecoveryModal = true;
          this.$emit('close'); // Cierra el primer modal
        } else {
          this.showError = true;
          this.errorMessage = 'No se encontró la clave temporal.';
        }

        this.usuCorreo = '';
        this.usuDni = '';
        this.usuTelefono = '';

      } catch (error) {
        this.showError = true;
        this.errorMessage = 'Hubo un error en la solicitud.';
      }
    },
    closeModal() {
      this.$emit('close'); // Cierra el modal
    },
    redirectToLogin() {
      this.showRecoveryModal = false;
      this.$router.push('/login'); // Redirige a la ruta /login
    }
  }
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
