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
import pieceFilter from './filters/count.filter.ts'
import Vuelidate from 'vuelidate'

Vue.config.productionTip = false

Vue.filter('currency', currencyFilter)
Vue.filter('characteristic', rateFilter)
Vue.filter('piece', pieceFilter)

Vue.use(Vuelidate)

new Vue({
  router,
  store,
  vuetify,
  i18n,
  render: (h) => h(App),
}).$mount('#app')
