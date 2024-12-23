import { createRouter, createWebHistory } from 'vue-router';
import Registro from './components/Registro.vue';
import Tareas from './components/Tareas.vue';
import Login from './components/Login.vue';

const routes = [
    {
        path: '/',
        redirect: '/login'
    },
    {
        path: '/registro',
        name: 'Registro',
        component: Registro,
    },
    {
        path: '/tareas',
        name: 'Tareas',
        component: Tareas,
        meta: { requiresAuth: true }
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
    },
];

const router =createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next)=>{
    const isAuthenticated = !!localStorage.getItem('token');
    if(to.meta.requiresAuth && !isAuthenticated){
        next('/login');
    } else {
        next();
    }
});

export default router;