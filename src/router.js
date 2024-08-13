import { createRouter, createWebHistory } from 'vue-router';

// Importación de componentes
import HelloWorld from './views/HelloWorld.vue';
import Registrar from './views/Registrar.vue';
import UsuariosList from './views/CrudViews/Index.vue';
import Login from './views/Login.vue';
import UsuarioPage from './views/Usuario.vue';
import EmpresasList from './views/CrudViews/Empresas.vue';
import PublicacionesList from './views/CrudViews/Publicaciones.vue';
import DashboardPage from './views/CrudViews/Dashboard.vue';
import EditarPage from './views/FuncionCrud/EditarU.vue';
import CrearPage from './views/FuncionCrud/Crear.vue';
import LoginEmp from './views/LoginEmp.vue';
import Rempresas from './views/Rempresas.vue';
import DashboardEmpresa from './views/DashboardEmpresa.vue';
import CrearP from './views/FuncionCrud/CrearP.vue';
import EditarPubli from './views/FuncionCrud/EditarP.vue';
import CrearEmpresa from './views/FuncionCrud/CrearE.vue';
import EditarEmpresa from './views/FuncionCrud/EditarE.vue';

// Definición de rutas
const routes = [
  // Sección Principal
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
    path: '/login',
    name: 'LoginPage',
    component: Login
  },
  {
    path: '/logemp',
    name: 'LoginEmpresa',
    component: LoginEmp
  },

  // Sección Usuario
  {
    path: '/usuarios',
    name: 'UsuariosList',
    component: UsuariosList,
    meta: { requiresAuth: true, allowedRoles: [1] }
  },
  {
    path: '/user',
    name: 'UsuarioPage',
    component: UsuarioPage,
    meta: { requiresAuth: true, allowedRoles: [2] }
  },
  {
    path: '/editar-usuario/:id',
    name: 'EditarPage',
    component: EditarPage,
    props: true,
    meta: { requiresAuth: true, allowedRoles: [1] }
  },
  {
    path: '/crear',
    name: 'CrearPage',
    component: CrearPage,
    meta: { requiresAuth: true, allowedRoles: [1] }
  },

  // Sección Empresa
  {
    path: '/empresas',
    name: 'EmpresasList',
    component: EmpresasList,
    meta: { requiresAuth: true, allowedRoles: [1] }
  },
  {
    path: '/crearE',
    name: 'CrearE',
    component: CrearEmpresa,
    meta: { requiresAuth: true, allowedRoles: [1] }
  },
  {
    path: '/editar-empresa/:id',
    name: 'EditarEmpresa',
    component: EditarEmpresa,
    props: true,
    meta: { requiresAuth: true, allowedRoles: [1] }
  },
  {
    path: '/dashempresas',
    name: 'DashEmpresas',
    component: DashboardEmpresa,
    meta: { requiresAuth: true, allowedRoles: [1] }
  },
  {
    path: '/rempesas',
    name: 'RegistroEmpresa',
    component: Rempresas
  },

  // Sección Publicaciones
  {
    path: '/publicaciones',
    name: 'PublicacionesList',
    component: PublicacionesList,
    meta: { requiresAuth: true, allowedRoles: [1, 2] }
  },
  {
    path: '/crearP',
    name: 'CrearP',
    component: CrearP,
    props: route => ({
      usuId: route.params.usuId
    }),
    meta: { requiresAuth: true, allowedRoles: [1] }
  },
  {
    path: '/editar-publicacion/:id',
    name: 'EditarPubli',
    component: EditarPubli,
    props: true,
    meta: { requiresAuth: true, allowedRoles: [1] }
  },

  // Sección Dashboard
  {
    path: '/dashboard',
    name: 'DashboardPage',
    component: DashboardPage,
    meta: { requiresAuth: true, allowedRoles: [1] }
  }
];

// Creación del router
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

// Middleware de autenticación
router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('authToken');
  const userRole = parseInt(localStorage.getItem('userRole'), 10);

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isAuthenticated) {
      next('/login');
    } else if (to.meta.allowedRoles && !to.meta.allowedRoles.includes(userRole)) {
      next('/user'); 
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
