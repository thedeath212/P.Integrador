// router.js
import { createRouter, createWebHistory } from 'vue-router';
import HelloWorld from './views/HelloWorld.vue';
import Registrar from './views/Registrar.vue'; 
import UsuariosList from './views/CrudViews/Index.vue';
import Login from './views/Login.vue';
import Usuario from './views/Usuario.vue';
import EmpresasList from './views/CrudViews/Empresas.vue';
import PublicacionesList from './views/CrudViews/Publicaciones.vue';
import DashboardPage from './views/CrudViews/Dashboard.vue';
import EditarPage from './views/FuncionCrud/EditarU.vue';
import CrearPage from './views/FuncionCrud/Crear.vue';
import auth from './auth';
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
    component: UsuariosList,
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/user',
    name: 'Usuario',
    component: Usuario,
    meta: { requiresAuth: true }
  },
  {
    path: '/empresas',
    name: 'EmpresasList',
    component: EmpresasList,
    meta: { requiresAuth: true }
  },
  {
    path: '/publicaciones',
    name: 'PublicacionesList',
    component: PublicacionesList,
    meta: { requiresAuth: true }
  },
  {
    path: '/dashboard',
    name: 'DashboardPage',
    component: DashboardPage,
    meta: { requiresAuth: true }
  },
  {
    path: '/editar-usuario/:id',
    name: 'EditarPage',
    component: EditarPage,
    props: true,
    meta: { requiresAuth: true }
  },
  {
    path: '/crear',
    name: 'CrearPage',
    component: CrearPage,
    meta: { requiresAuth: true }
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

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!auth.isAuthenticated()) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
