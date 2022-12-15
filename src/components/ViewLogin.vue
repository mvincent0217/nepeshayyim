<template>
  <div>
    <!-- Responsive navbar-->

    <!-- Page content-->
    <div class="container">
      <section class="pt-7 pb-5">
        <div class="container">
          <form>
            <br /><br /><br /><br /><br /><br />
            <h1 class="text-center">Login Form</h1>
            <br />
            <div class="text-center">
              <input
                type="text"
                v-model="username"
                placeholder="Username"
              /><br /><br />
            </div>
            <div class="text-center">
              <input
                type="password"
                v-model="password"
                placeholder="Password"
              /><br /><br />
            </div>
            <div class="text-center">
              <button
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
    };

  },
  methods: {
    ValidateUserAccount() {
      var convert = require("xml-js");
      if (this.password == "" || this.password == "") {
        alert("Empty Fields");
      } else{
        axios
          .post(
            "https://canteen.nepeshayyim.com/Decatech/BRM_Canteen_Web/ValidateUserAccount?username=" +
              this.username +
              "&password=" +
              this.password
          )
          .then((response) => {
            var result = convert.xml2json(response.data, { compact: true, spaces: 4 });
            result = JSON.parse(result);

            this.username = result.UserAccount.UserId._text;
            this.fullname = result.UserAccount.FullName._text;

              if(this.username == undefined){
                  alert("User not found !");
                  this.username = '';
                  this.password = '';
              }else{
                window.localStorage.setItem('username', this.username);
                if(result.UserAccount.FullName._text == undefined){
                  this.accountname = window.localStorage.setItem("accountname", this.username);
                }else{
                  this.accountname = window.localStorage.setItem("accountname", this.fullname)
                }
                window.localStorage.setItem("login", true);
                  var bAdmin = false;
                  if(Array.isArray(result.UserAccount.UserRoles["a:string"])){
                      var arUserRoles = [];
                      arUserRoles = result.UserAccount.UserRoles["a:string"];
                      var requiredRole = 'HR_Admin';
                      for(var iUser=0; iUser < arUserRoles.length; iUser++)
                      {
                        if(requiredRole==arUserRoles[iUser]._text)
                        {
                          bAdmin = true;
                        }
                      }
                  }
                  if(bAdmin)
                  {
                    this.$router.push("/viewHR");
                  }else{
                    this.$router.push("/employee-home");
                    window.localStorage.setItem("UserRoles", "Employee");
                  }
              }
              window.location.reload();
          });      
      }
    },
  },
};

</script>
