import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import About from '@/views/About.vue'
import Login from '@/views/login/loginForm.vue'
import store from '@/store'
import Configurator from '@/views/Configurator.vue'

Vue.use(VueRouter)

// eslint-disable-next-line no-unused-vars
const ifNotAuthenticated = (to, from, next) => {
    if (!store.getters.isAuthenticated) {
        next()
        return
    }
    next('/')
}

// eslint-disable-next-line no-unused-vars
const ifAuthenticated = (to, from, next) => {
    if (store.getters.isAuthenticated) {
        next()
        return
    }
    next('/login')
}

const routes = [
    {
        path: '/home',
        name: 'home',
        component: Home,
        beforeEnter: ifNotAuthenticated
    },
    {
        path: '/about',
        name: 'about',
        component: About,
        beforeEnter: ifNotAuthenticated
    },
    {
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        path: '/',
        name: 'configurator',
        meta: { layout: 'main' },
        component: Configurator
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
