import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')

const cors = require('cors')

Vue.use(cors({ origin: ['http://localhost:8080'], }))
