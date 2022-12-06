import Vue from 'vue'
import App from './App.vue'

import VueRouter from 'vue-router'

import ViewHome from './components/Employee/ViewHome.vue'
import ViewCart from './components/Employee/ViewCart.vue'
import ViewOrder from './components/Employee/ViewOrder.vue'
import ViewLogin from './components/ViewLogin.vue'

Vue.use(VueRouter)

Vue.config.productionTip = false

const routes =[

  {path: '/', component: ViewHome,},
  {path: '/view-cart', component: ViewCart,},
  {path: '/view-order', component: ViewOrder,},
  {path: '/view-login', component: ViewLogin,},


];

const router =new VueRouter({

  mode: 'history',

  routes: routes

  });

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')

const cors = require('cors')

Vue.use(cors({ origin: ['http://localhost:8080'], }))
