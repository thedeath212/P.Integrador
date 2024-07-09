// router/index.js

import { createRouter, createWebHistory } from 'vue-router';
import HelloWorld from './views/HelloWorld.vue'; // Ajusta la ruta según la ubicación real de tu vista principal
import Registrar from './views/Registrar.vue'; // Ajusta la ruta según la ubicación real de tu vista de registro

const routes = [
  {
    path: '/',
    name: 'HelloWorld',
    component: HelloWorld
  },
  {
    path: '/register',
    name: 'Registrar',
    component: Registrar
  }
  // Agrega más rutas según sea necesario
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;

