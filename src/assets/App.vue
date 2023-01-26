<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
            <div class="container">
                
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav ms-auto mb-2 mb-lg-0">  
                      <li class="nav-item" ><router-link class="nav-link" to="/employee-home">Home</router-link></li>  
                      <li class="nav-item" ><router-link class="nav-link" to="/viewHR">Home</router-link></li>   
                      <li class="nav-item" ><router-link class="nav-link" to="/viewCanteen">Home</router-link></li>              
                        <li class="nav-item" ><router-link class="nav-link" to="/view-order">Orders</router-link></li>
                        <li class="nav-item"><router-link class="nav-link" to="/view-cart">Your Cart</router-link></li>   
                                <li class="nav-item dropdown">
                                         <a class="nav-link dropdown-toggle" id="navbarDropdown" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"></a>
                                     <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                                            <li><router-link class="dropdown-item" to="/view-login">Logout</router-link></li>
                                    </ul>
                                </li>    
                    </ul>
                </div>
            </div>
        </nav>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',

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
