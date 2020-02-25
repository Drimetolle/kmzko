import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '@/views/auth/LoginForm.vue';
import Registration from '@/views/auth/RegistrationForm.vue';
import store from '@/store';
import Configurator from '@/views/Configurator.vue';

Vue.use(VueRouter);

const routes = [
{
    path: '/login',
    name: 'login',
    meta: { layout: 'empty' },
    component: Login,
},
{
    path: '/registration',
    name: 'registration',
    meta: { layout: 'empty' },
    component: Registration,
},
{
    path: '/',
    name: 'configurator',
    meta: { layout: 'main' },
    component: Configurator,
},
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
