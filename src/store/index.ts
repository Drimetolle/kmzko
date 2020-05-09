import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth'
import configurator from './modules/configurator'
import { Auth } from '@/store/modules/auth'
import { Configurator } from '@/store/modules/configurator'

Vue.use(Vuex)

const store = new Vuex.Store({
  strict: true,
  modules: {
    auth,
    configurator,
  },
})

export default store
