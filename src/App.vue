<template>
  <div id="app">
  <div v-if="login">

    <nav class="navbar navbar-expand-sm fixed-top navbar-dark bg-dark">
            <div class="container navbar-inverse navbar-fixed-top">
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" style="background-color:#e9ecef"><span class="navbar-toggler-icon" ></span></button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav ms-auto mb-2 mb-lg-0">  
                      <li class="nav-item" hidden><router-link class="nav-link" to="/employee-home">Menu ☰</router-link></li>  
                      <li class="nav-item" ><router-link class="nav-link" to="/viewHR" v-if="UserRoles == 'HR_Admin'">Upload Food</router-link></li>              
                        <li class="nav-item" hidden><router-link class="nav-link" to="/view-cart">My Orders 🛒</router-link></li>
                        <li class="nav-item"><router-link class="nav-link" to="/OrderViewCart">Order 🛒</router-link></li>
                        <li class="nav-item nav-link">{{ this.username.toUpperCase() }}👤</li>   
                                <li class="nav-item dropdown">
                                         <a class="nav-link dropdown-toggle" id="navbarDropdown" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false" style="color: white;"></a>
                                     <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                                      <li @click="logout" class="dropdown-item">Logout</li>
                                    </ul>
                                </li>
                                
                    </ul>
                </div>
            </div>
        </nav>
    <router-view></router-view>

  </div>
  
  <div v-else>
    <router-view></router-view>
  </div>
  </div>

</template>

<script>

export default {

  name: 'App',
  data()
  {
    return{
      login: false,
      UserRoles: window.localStorage.getItem("UserRoles"),
      username : window.localStorage.getItem("username"),
    }

  },

  methods:{
  logout(){
  localStorage.clear()
  this.$router.push({name: 'login'})
  this.$router.replace()
  window.location.reload()
  }

  },
  created(){
    this.login=localStorage.getItem("login")
  }

}
</script>

<style>
/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */

</style>
