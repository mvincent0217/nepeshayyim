import Vue from 'vue'
import App from './App.vue'

import VueRouter from 'vue-router'

import ViewHome from './components/Employee/ViewHome.vue'
import ViewCart from './components/Employee/ViewCart.vue'
import ViewOrder from './components/Employee/ViewOrder.vue'
import ViewLogin from './components/ViewLogin.vue'
import ViewHR from './components/HR/ViewHR.vue'
import ViewCanteen from './components/Canteen/ViewCanteen.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)

Vue.use(VueRouter)

Vue.config.productionTip = false

const routes =[
  { 
  path: '/',
  component: 
  require('./components/ViewLogin.vue').default,
  beforeEnter: (to, from, next) => {
  next('/login')
  }
},
  {path: '/employee-home', component: ViewHome},
  {path: '/view-cart', component: ViewCart},
  {path: '/view-order', component: ViewOrder},
  {path: '/login', component: ViewLogin},
  {path: '/viewHR', component: ViewHR},
  {path: '/viewCanteen', component: ViewCanteen},



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
