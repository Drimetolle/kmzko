import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import configAxios from './axios/config'
import './registerServiceWorker'
import vuetify from './plugins/vuetify'
import i18n from './plugins/i18n'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import currencyFilter from './filters/currency.filter.ts'
import rateFilter from './filters/rate.filter.ts'
import pieceFilter from './filters/count.filter.ts'

Vue.config.productionTip = false

Vue.filter('currency', currencyFilter)
Vue.filter('characteristic', rateFilter)
Vue.filter('piece', pieceFilter)

configAxios()

new Vue({
  router,
  store,
  vuetify,
  i18n,
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  render: (h) => h(App),
}).$mount('#app')
