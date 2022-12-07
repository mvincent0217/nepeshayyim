<template>
    <div>
         <!-- Responsive navbar-->
         
        <!-- Page content-->
        <div class="container">
            <br><br>
            <div class="text-center">
                <h3 class="display-5 mb-2 text-center">Goodmorning! {{fullname}}</h3><br><br>
                <label for ="Date">Date of Order Reservation:</label> 
                 <input type="datetime-local" id="date" class="col-sm-4 mb-3 mb-m-2 order-md-2 text-md-center" name="date">
            </div>
            <tbody>
                 <!-- Product 1-->
                <tr v-for="(food, index) in Foods" :key="index">
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
                                <button class="btn btn-white border-secondary bg-white btn-md mb-2">Order</button>
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

        