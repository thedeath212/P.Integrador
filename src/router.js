// router/index.js

import { createRouter, createWebHistory } from 'vue-router';
import HelloWorld from './views/HelloWorld.vue'; // Ajusta la ruta según la ubicación real de tu vista principal
import Registrar from './views/Registrar.vue'; 
import UsuariosList from    './views/CrudViews/Index.vue';

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
  },
  {
    path: '/usuarios',
    name: 'UsuariosList',
    component: UsuariosList
    
  }
 
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;

