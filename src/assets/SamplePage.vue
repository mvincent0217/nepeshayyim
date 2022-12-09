<template>
    <div class="hello">
      <h3>Canteen order tracking System</h3>
      <table align="center">
        <tr>
        <span style="color:red">{{ loginerrmsg }}</span>
        </tr>
        <tr>
            <td>INITIALS: </td>
            <td><input type="text" v-model="initials" placeholder="Enter your INITIALS" required></td>
      </tr>
      <tr>
            <td>Password: </td>
            <td><input type="Password" v-model="pword" placeholder="Enter your Password" required></td>
      </tr>
      <tr>
            <td> </td>
            <td><button @click="getAPIdev1">SUBMIT_1</button><button @click="login">SUBMIT_2</button></td>
      </tr>
      <tr>
            <td>{{ resinitials }}</td>
            <td>{{ respword }}</td>
      </tr>
      <tr>
            <td>{{ text }}</td>
      </tr>
      <br>
      <br>
      <tr>
        <td>SAMPLE:</td>
        <td><input v-model="message" placeholder="Type Anything"></td>
      </tr>
      <tr>
        <td>Output is: </td>
        <td>{{ message }}</td>
      </tr>
      </table>
    </div>
  </template>
  
  <script>
    import Vue from 'vue'
    import axios from 'axios'
    import VueAxios from 'vue-axios'
    
    Vue.use(VueAxios, axios)


    export default {
    name: 'SamplePage',
    props: {
      msg: String
    },
    data() {
        return{
            message:'',
            initials:'',
            pword:'',
            text:'',
            records: {},
            loginerrmsg: '',
            resinitials:null,
            respword:null
        }
        
    },
    methods:{

      
        getTextAPI(){
        axios.post("http://ncfs-l1:8001/api/EUMS/TestApi").then(({ data }) => {
          this.text=data;
          console.log(data);
          })
        },
        login(){

          if(this.initials == '' || this.pword == ''){
            alert("Empty Fields");
          }else{
            axios.post("http://dev-kiss3.nepeshayyim.com/mesapi/MESController/mPostJob", { username:this.initials, password:this.pword }).then(({ data }) => {
                this.records = data.sPayload;
                this.resinitials = this.records.username;
                this.respword = this.records.password;
                this.loginerrmsg = this.records.sError;
                console.log(data);
            })
          }
        },
        getAPIdev1(){
          var convert = require('xml-js');
          var url="/api";
          if(this.initials == '' || this.pword == ''){
            alert("Empty Fields");
          }else{
            axios
            .post(url)
            .then((response) => {
              var result2 = convert.xml2json(
                response.data, {compact: true, spaces: 4
                });
                  result2 = JSON.parse(result2);
                  console.log(response.data.elements);
                  console.log(result2);
            })
          }
          }
    }
  }
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
  </style>
  