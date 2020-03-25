import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import vuetify from './plugins/vuetify'
import i18n from './plugins/i18n'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import currencyFilter from './filters/currency.filter.ts'
import rateFilter from './filters/rate.filter.ts'
import axios from 'axios'

Vue.config.productionTip = false

Vue.filter('currency', currencyFilter)
Vue.filter('characteristic', rateFilter)

new Vue({
  router,
  store,
  vuetify,
  i18n,
  render: (h) => h(App),
}).$mount('#app')
