import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store'
import axios from 'axios'
import iView from 'iview'
import config from '@/config'
import 'iview/dist/styles/iview.css'
// import 'iview/dist/styles/iview.css'

// import './index.less'

Vue.use(iView)
Vue.prototype.$axios = axios
Vue.prototype.$config = config
Vue.config.productionTip = false


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
