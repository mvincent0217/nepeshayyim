<template>
        <div class="text-center">
            <br><br>
            <h3 class="display-5 mb-2 text-center">Goodmorning! Test Name</h3>
         
    
                <br><br>
                <label for ="Date">Date of Order Reservation:</label>
                <input type="date" id="date" name="date"> <br><br>
                <label for="img">Select image:</label>
                <input type="file" id="myFile" name="filename"> <br><br>

                <label for="cars">Select Existing Foods:</label>

                <select name="food" id="food" >

                <option v-for="(food,index) in Foods" value="volvo" :key="index">{{food.Name._text}}</option>

                </select> <br><br>



                <label for="img">Food Name:</label>
                <input type="text" id="Foodname" name="Foodname"><br><br>
                <label for="img">Description:</label> <br>
                <textarea id="Description" name="Description" rows="4" cols="50"></textarea><br><br>
                <input type="submit">
  
        </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)

export default {
    data() {
        return{
            fullname: window.localStorage.getItem("user"),
            Foods: [],
        }
    },
    methods:{
        GetCanteenMenuItems(){
            var convert = require('xml-js');
            axios.post("https://dev-b2b/Decatech/BRM_Canteen_Web/GetCanteenMenuItems").then(response => {
                var result2 = convert.xml2json(response.data,
               {compact: true, spaces: 4});
               result2 = JSON.parse(result2);
               this.Foods = result2.ArrayOfCanteenMenuItem.CanteenMenuItem
               console.log(result2);
                console.log(response);
            })
        }

    },
    created(){
        this.GetCanteenMenuItems();
    }
}
</script>