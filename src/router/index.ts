import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/auth/LoginForm.vue'
import Registration from '@/views/auth/RegistrationForm.vue'
import store from '@/store'
import Configurator from '@/views/Configurator.vue'
import Profile from '@/views/Profile.vue'
import Purchase from '@/views/Purchase.vue'
import Questionnaire from '@/views/Questionnaire.vue'

Vue.use(VueRouter)

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
  {
    path: '/settings',
    redirect: { name: 'profile' },
  },
  {
    path: '/settings/profile',
    name: 'profile',
    meta: { layout: 'main' },
    component: Profile,
  },
  {
    path: '/purchase',
    name: 'purchase',
    meta: { layout: 'main' },
    component: Purchase,
  },
  {
    path: '/questionnaire',
    name: 'questionnaire',
    meta: { layout: 'main' },
    component: Questionnaire,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

// router.beforeEach((to, from, next) => {
//   if (to.name !== 'login' && !store.getters.isAuthenticated) next({ name: 'login' })
//   else next()
// })

export default router
