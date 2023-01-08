<template>
  <div>
    <!-- Responsive navbar-->

    <!-- Page content-->
    <div class="container">
    <div class="row justify-content-center m-5">
    <div class="card align-self-center w-auto">
      <section class="pt-7 pb-5">
        <div class="container">
          <form>
            <div class="text-center">
              <br><br>
              <img src="../../public/images/nepeshayyim logo.png" width="460" height="345" alt="">
            </div>
            <br /><br /><br/>
            <h2 class="text-center" style="color: navy;">Welcome!  Please login</h2>
            <br />
            <div>
            <div class="text-center">
              <input class="form-control"
                type="text"
                v-model="username"
                placeholder="Username"
                value="if.brm"
              /><br /><br />
            </div>
            <div class="text-center">
              <input id="pass" class="form-control"
                type="password"
                v-model="password" @keyup.enter="ValidateUserAccount"
                placeholder="Password"
                value="decatech"
              /><br /><br />
            </div>
            </div>
            <div class="text-center">
              <button id="btn"
                type="button"
                class="btn btn-primary btn-lg"
                @click="ValidateUserAccount">
                Log in
              </button>
            </div>
          </form>
        </div>
      </section>
   </div>
   </div>
    </div>
  </div>
</template>
<script>

import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
Vue.use(VueAxios, axios);


export default {
  data() {
    return {
      username: "",
      password: "",
      accountname: "",
      fullname: "",
      isLogin: false,
    };

  },
  methods: {
    ValidateUserAccount() {
      var convert = require("xml-js");
      if (this.password == "" || this.password == "") {
        alert("Empty Fields");
      } else {
      
        axios
          .post(
            "https://canteen.nepeshayyim.com/Decatech/BRM_Canteen_Web/ValidateUserAccount?username=" +
              this.username +
              "&password=" +
              this.password
          )
          .then((response) => {
            var result2 = convert.xml2json(response.data, { compact: true, spaces: 4 });
            result2 = JSON.parse(result2);

            this.username = result2.UserAccount.UserId._text;
            this.fullname = result2.UserAccount.FullName._text;

              if(this.username == undefined){
                  alert("User not found !");
                  this.username = '';
                  this.password = '';
              }else{
                this.isLogin = true;
                if(result2.UserAccount.FullName._text == undefined){
                  this.accountname = window.localStorage.setItem("accountname", this.username);
                }else{
                  this.accountname = window.localStorage.setItem("accountname", this.fullname)
                }
                window.localStorage.setItem("login", true);
                  var bAdmin = false;

                  var requiredRole = 'HR_Admin';
                 if(Array.isArray(result2.UserAccount.UserRoles["a:string"])){
                      var arUserRoles = [];
                      arUserRoles = result2.UserAccount.UserRoles["a:string"];
                      for(var iUser=0; iUser < arUserRoles.length; iUser++)
                      {
                        if(requiredRole==arUserRoles[iUser]._text)
                        {
                          bAdmin = true;
                        }
                      }
                  }
                  else{
                    var oUserRoles = {};
                    oUserRoles = result2.UserAccount.UserRoles["a:string"];
                    if(requiredRole==oUserRoles._text)
                      {
                        bAdmin = true;
                      }
                  }
                  if(bAdmin)
                  {
                    window.localStorage.setItem('username', this.username);
                    window.localStorage.setItem('bAdmin', true);
                    window.localStorage.setItem('bHasAccess', true);
                    this.$router.push("/FullCalendar");
                  }else{
                    window.localStorage.setItem('username', this.username);
                    window.localStorage.setItem('bHasAccess', true);
                    this.$router.push("/FullCalendar");
                    window.localStorage.setItem("UserRoles", "Employee");
                  }
              }
              window.location.reload();
          });      
      }
    }
  },
};

</script>
<style>
img {
  max-width: 100%;
  height: auto;
}
</style>