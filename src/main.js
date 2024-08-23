import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './tailwind.css';

const app = createApp(App);
app.use(router); // Usa Vue Router en tu aplicación
app.mount('#app');
