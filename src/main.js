import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import FullCalendar from "vue-full-calendar";
//import "fullcalendar/dist/fullcalendar.min.css";
Vue.use(FullCalendar);
//window.jQuery = window.$ = require('jquery')
//Vue.use(require('vue-full-calendar'))
Vue.config.productionTip = false
import CalendarView from '../src/components/CalendarView.vue'
import ViewHome from './components/Employee/ViewHome.vue'
//import ViewCart from './components/Employee/ViewCart.vue'
//import OrderHistory from './components/Employee/OrderHistory.vue'
import ViewLogin from './components/ViewLogin.vue'
import ViewHR from './components/HR/ViewHR.vue'
import OrderViewCart from './components/Employee/OrderViewCart.vue'
import ViewMenu from './components/Employee/ViewMenu.vue'
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
    next({ name: 'calendarview' })
  //next('/login')
  }
},


  {path: '/CalendarView', component: CalendarView, name: 'calendarview'},
  {path: '/ViewHome', component: ViewHome},
  {path: '/login', component: ViewLogin, name: 'login'},
  {path: '/ViewMenu', component: ViewMenu, name: 'ViewMenu'},
  {path: '/viewHR', component: ViewHR, name: '_ViewHR' , meta:{ requiresAuth: true }},
  {path: '/OrderViewCart', component: OrderViewCart, name: 'orderviewcart',
  meta:{
    requiresAuth: true
  }}
];
const router =new VueRouter({
  mode: 'hash',
  routes: routes

  });
  router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
      // this route requires auth, check if logged in
      // if not, redirect to login page.
      var bHasAccess = window.localStorage.getItem('bHasAccess');
      //var bAdmin = window.localStorage.setItem('bAdmin');
      if (!bHasAccess) {
        next({ name: 'login' })
      } 
      else {
        next();
        // if(bAdmin)
        // {
        //   next() // go to wherever I'm going
        // }
        // else{
        //   next({ name: 'orderviewcart' })
        // }
      }
    } else {
      next() // does not require auth, make sure to always call next()!
    }
  })

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')

const cors = require('cors')

Vue.use(cors({ origin: ['http://localhost:8080'], }))
