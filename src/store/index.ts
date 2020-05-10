import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth'
import configurator from './modules/configurator'
import questionnaire from './modules/questionnaire'
import { Auth } from '@/store/modules/auth'
import { Configurator } from '@/store/modules/configurator'

Vue.use(Vuex)

const store = new Vuex.Store({
  strict: true,
  modules: {
    auth,
    configurator,
    questionnaire,
  },
})

export default store
