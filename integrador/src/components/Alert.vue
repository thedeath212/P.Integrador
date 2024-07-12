<template>
  <transition name="fade">
    <div v-if="visible" class="alert-container">
      <div :class="['alert', typeClass]">
        <p>{{ message }}</p>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'AppAlert',
  props: {
    message: {
      type: String,
      required: true
    },
    type: {
      type: String,
      default: 'success' // Default type is success
    }
  },
  data() {
    return {
      visible: true
    };
  },
  mounted() {
    // Auto-cerrar la alerta después de 5 segundos, independientemente del tipo
    setTimeout(() => {
      this.closeAlert();
    }, 5000); // 5000 milisegundos = 5 segundos
  },
  methods: {
    closeAlert() {
      this.visible = false;
      this.$emit('closed');
    }
  },
  computed: {
    typeClass() {
      return this.type === 'success' ? 'alert-success' : 'alert-error';
    }
  }
};
</script>

<style scoped>
.alert-container {
  position: fixed;
  top: 20px; /* Ajusta según sea necesario */
  right: 20px; /* Ajusta según sea necesario */
  z-index: 9999;
}

.alert {
  padding: 1rem;
  margin-bottom: 1rem;
  border: 1px solid transparent;
  border-radius: 0.25rem;
}

.alert-success {
  background-color: #d4edda;
  border-color: #c3e6cb;
  color: #155724;
}

.alert-error {
  background-color: #f8d7da;
  border-color: #f5c6cb;
  color: #721c24;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>