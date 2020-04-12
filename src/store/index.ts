import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth'
import configurator from './modules/configurator'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  modules: {
    auth,
    configurator,
  },
})
