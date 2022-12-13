<template>
        <div class="text-center">
            <br><br>
            <h3 class="display-5 mb-2 text-center">Superstar! Test Name</h3>

                <input type="radio" id="html" name="fav_language" value="Existing" v-model ="Existingfood" @change="Select">
                <label for="html">Existing Food</label> 
                <label for="html" class="ml-2"> </label> &nbsp;
                <input type="radio" class="mx-auto" id="html" name="fav_language" value="Nonexisting" v-model ="Existingfood" @change ="Select">
                <label for="html">Upload New Food</label><br><br>

                <div>

                    <div v-if="isexisting">

                        <label for="cars">Select Existing Foods: &nbsp;</label>
                        <select name="food" id="" >
                        <option v-for="(food,index) in Foods" value="volvo" :key="index">{{food.Name._text}}</option>
                        </select>

                    </div>

                <div v-else>
                <label for ="Date">Date of Order Reservation: &nbsp;</label>
                <input type="date" id="date" name="date"> <br><br>
                <label for="img">Select image: &nbsp;</label>
                <input type="file" id="myFile" name="filename"> <br><br>

                <label for="img">Food Name:</label>
                <input type="text" id="Foodname" name="Foodname"><br><br>
                <label for="img">Description:</label> <br>
                <textarea id="Description" name="Description" rows="4" cols="50"></textarea><br>
                </div>
                <br><input type="submit">

                </div>
  
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
            Existingfood: null,
            fullname: window.localStorage.getItem("user"),
            Foods: [],
            isexisting:false
        }
    },
    methods:{
        GetCanteenMenuItems(){
            var convert = require('xml-js');
            axios.post("https://dev-b2b/Decatech/BRM_Canteen_Web/GetCanteenMenuItems").then(response => {
                var result2 = convert.xml2json(response.data,
               {compact: true, spaces: 4});
               result2 = JSON.parse(result2);
               this.Foods = result2.ArrayOfCanteenMenuItem.CanteenMenuItem;
            })
        },

        Select(){

            if (this.Existingfood=="Existing"){

                this.isexisting=true
            }
            else{

                this.isexisting=false
            }


        }

    },
    created(){
        this.GetCanteenMenuItems();
    }
}
</script>