import Vue from 'vue'
import router from './router'
import App from './App.vue'
import UUID from 'vue-uuid'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faChevronLeft,
  faCheckCircle,
  faPlayCircle,
  faPlusCircle
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faChevronLeft, faCheckCircle, faPlayCircle, faPlusCircle)
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.use(UUID)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
