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
                value="if.brm"
              /><br /><br />
            </div>
            <div class="text-center">
              <input
                type="password"
                v-model="password"
                placeholder="Password"
                value="decatech"
              /><br /><br />
            </div>
            <div class="text-center">
              <button
                type="button"
                class="btn btn-default submit"
                @click="ValidateUserAccount"
              >
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
      } else {
        window.localStorage.setItem("username", this.username);
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

            if(result2.UserAccount.FullName._text == undefined){
              this.accountname = window.localStorage.setItem("accountname", this.username);
            }else{
              this.accountname = window.localStorage.setItem("accountname", this.fullname)
            }

            window.localStorage.setItem("login", true);
            this.$router.push("/employee-home");
            console.log(result2);
          });
      }
    },
  },
};

</script>
