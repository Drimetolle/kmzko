import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import vuetify from './plugins/vuetify'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import currencyFilter from './filters/currency.filter.js'
import axios from 'axios'

Vue.config.productionTip = false

Vue.filter('currency', currencyFilter)

/**
 * axios config
 */
axios.defaults.baseURL = 'http://localhost:8081/api'

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app')
