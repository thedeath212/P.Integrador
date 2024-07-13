
import { createRouter, createWebHistory } from 'vue-router';
import HelloWorld from './views/HelloWorld.vue'; // Ajusta la ruta según la ubicación real de tu vista principal
import Registrar from './views/Registrar.vue'; 
import UsuariosList from    './views/CrudViews/Index.vue';
import Login from './views/Login.vue';
import Usuario from './views/Usuario.vue';
import EmpresasList from './views/CrudViews/Empresas.vue';
import PublicacionesList from './views/CrudViews/Publicaciones.vue';
import DashboardPage from './views/CrudViews/Dashboard.vue';
import LoginEmp from './views/LoginEmp.vue';
import Rempresas from './views/Rempresas.vue';
import DashboardEmpresa from './views/DashboardEmpresa.vue';

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
    path: '/login',
    name: 'Login',
    component: Login
    
  },
  {
    path: '/user',
    name: 'Usuario',
    component: Usuario
    
  },
  {
    path: '/empresas',
    name: 'EmpresasList',
    component: EmpresasList
  },
  {
    path: '/publicaciones',
    name: 'PublicacionesList',
    component: PublicacionesList
  }  ,
  {
    path: '/dashboard',
    name: 'DashboardPage',
    component: DashboardPage
  },
  {
    path: "/logemp",
    name: "LoginEmpresa",
    component: LoginEmp
  },
  {
    path: '/rempresas',
    name: 'RegistroEmpresa',
    component: Rempresas
  },
  {
    path: '/dashempresas',
    name: 'DashEmpresas',
    component: DashboardEmpresa
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});


export default router;

