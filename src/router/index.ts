import Vue from 'vue'
import VueRouter, { Route } from 'vue-router'
import Login from '@/views/auth/LoginForm.vue'
import Registration from '@/views/auth/RegistrationForm.vue'
import store from '@/store'
import Configurator from '@/views/Configurator.vue'
import Profile from '@/views/Profile.vue'
import Purchase from '@/views/Purchase.vue'
import Questionnaire from '@/views/Questionnaire.vue'
import Projects from '@/views/Projects.vue'
import HomePage from '@/views/HomePage.vue'

Vue.use(VueRouter)

const whitelist = (name: string): boolean => {
  const list = ['login', 'registration']
  return list.includes(name)
}

const checkUndifinedQuestionnaireAndConveyor = (): boolean => !(store.state as any).configurator.questionnaire && !(store.state as any).configurator.conveyor

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
    path: '/configurator/:id',
    name: 'configurator',
    meta: { layout: 'main' },
    component: Configurator,
    props: true,
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
  {
    path: '/projects',
    name: 'projects',
    meta: { layout: 'main' },
    component: Projects,
  },
  {
    path: '/',
    name: 'home',
    meta: { layout: 'main' },
    component: HomePage,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

router.beforeEach((to: Route, from, next) => {
  if (store.getters.isAuthenticated) {
    if (whitelist(to.name!)) next({ name: 'home' })
    else if (store.getters.isAuthenticated) next()
    return
  }
  else {
    if (whitelist(to.name!)) next()
    else if (!whitelist(to.name!)) next({ name: 'login' })
  }
})

export default router
