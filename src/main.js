import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import 'lodash'
import '@/utils/veeValidate'
import Alert from './components/modules/alert/index'

Vue.use(Alert)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
