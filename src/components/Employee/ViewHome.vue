<template>
    <div>
         <!-- Responsive navbar-->
         
        <!-- Page content-->
        <div class="container">
            <br><br>
            <div class="text-center">
                <h3 class="display-5 mb-2 text-center">Goodmorning! {{fullname}}</h3><br><br>
                <label for ="Date">Date of Order Reservation:</label> 
                <input type="date" id="date" class="col-sm-4 mb-3 mb-m-2 order-md-2 text-md-center" name="date" v-model="date" @change="showdate"><br>
                <input type="radio" id="lunch" value="10:30:00" v-model="picked" @change="showhour"/>
                <label for="two">12PM</label>
                <input type="radio" id="dinner" value="20:00:00" v-model="picked" @change="showhour" />
                <label for="two">7PM</label>
            </div>
            <tbody>
                 <!-- Product 1-->
                 <tr v-if="!Foods.length">No Menu</tr>
                <tr v-else v-for="(food, index) in Foods" :key="index">
                    <td data-th="Product">
                        <br>
                        <div class="row">
                            <div class="col-md-3 text-left">
                                <img src="https://via.placeholder.com/250x250/5fa9f8/ffffff" alt="" class="img-fluid d-none d-md-block rounded mb-2 shadow ">
                            </div>
                            <div class="col-md-9 text-left mt-sm-2">
                                <h4>{{ food.Name._text }}</h4>
                                <input type="number" class="col-sm-1 mb-3 mb-m-1 order-md-1 text-md-center" value="1"> <br>
                                <button class="btn btn-white border-secondary bg-white btn-md mb-2">Add to cart</button>
                            </div>
                        </div>
                    </td>
                    
                    <td data-th="Quantity">

                    </td>
                    <td class="actions" data-th="">
                        <div class="text-right">
                        </div>
                    </td>
                </tr>
                <!-- Product 1-->
                <br>
            </tbody>
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
            fullname: window.localStorage.getItem("user"),
            Foods: [],
            date: null,
            date2: null,
            hour: null,
            calendar_idx: '',
            enddate: '',
            picked: null,
        }
    },
    methods:{
        GetCanteenMenuItems(){
            var convert = require('xml-js');
            axios.post("https://dev-b2b/Decatech/BRM_Canteen_Web/GetCanteenMenuItems").then(response => {
            var result = convert.xml2json(response.data,
               {compact: true, spaces: 4});
               console.log(result);
            })
        },
        showdate(){
            this.date;
        },
        showhour(){
            if(this.picked=="10:30:00"){
                this.enddate = this.date + " 12:30:00"
            }else{
                this.enddate = this.date + " 22:00:00"
            }
            this.date2 = this.date + " " + this.picked
            this.GetCanteenCalendarRecords();
        },
        GetCanteenCalendarRecords(){
            var convert = require('xml-js');
            axios.post("https://dev-b2b/Decatech/BRM_Canteen_Web/GetCanteenCalendarRecords?startdate="+ this.date2 + "&enddate=" + this.enddate ).then(response => {
                var result = convert.xml2json(response.data,
               {compact: true, spaces: 4});
               result = JSON.parse(result);
               var calendar_idx = result.ArrayOfCanteenCalendarRecord.CanteenCalendarRecord.Calendar_Idx._text;
               this.GetCanteenMenu(calendar_idx)
            })
        },
        GetCanteenMenu(id){
            var convert = require('xml-js');
            axios.post("https://dev-b2b/Decatech/BRM_Canteen_Web/GetCanteenMenu?calendar_idx=" + id).then(response => {
                var result = convert.xml2json(response.data,
               {compact: true, spaces: 4});
               result = JSON.parse(result);
                if(result.CanteenMenuSchedule.MenuItemList.CanteenMenuItem != undefined){
                    this.Foods = result.CanteenMenuSchedule.MenuItemList.CanteenMenuItem;
                }
            })
        }

    },
    created(){
        
    }
}
</script>

        