// router/index.js

import { createRouter, createWebHistory } from 'vue-router';
import HelloWorld from './views/HelloWorld.vue'; // Ajusta la ruta según la ubicación real de tu vista principal
import Registrar from './views/Registrar.vue'; 
import UsuariosList from    './views/CrudViews/Index.vue';
<<<<<<< HEAD
import Login from './views/Login.vue';
import Usuario from './views/Usuario.vue';
=======
import PublicacionesList from './views/CrudViews/Publicaciones.vue'
import DashboardPage from './views/CrudViews/Dashboard.vue'
import EmpresasList from './views/CrudViews/Empresas.vue';
>>>>>>> 64783e134742e60303340ee5f1af7860806db53d

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
    
  },
  {
<<<<<<< HEAD
    path: '/login',
    name: 'Login',
    component: Login
    
  },
  {
    path: '/user',
    name: 'Usuario',
    component: Usuario
    
=======
    path: '/empresas',
    name: 'EmpresasList',
    component: EmpresasList
    
  },
  {
    path: '/publicaciones',
    name: 'PublicacionesList',
    component: PublicacionesList
    
  },
  {
    path: '/dashboard',
    name: 'DashboardPage',
    component: DashboardPage
>>>>>>> 64783e134742e60303340ee5f1af7860806db53d
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;

