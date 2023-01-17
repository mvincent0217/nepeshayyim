<template>
    <div class="center">
    
        <div class="container">

        <!--Shopping-->
        <section class="pt-5 pb-5">
        <div class="container">
        <div class="row w-100">
        <div class="col-lg-12 col-md-12 col-12">
            <br><br>

            <h3 class="display-5 mb-2 text-center">SUPERSTAR! {{accountname}}</h3>
            <p class="mb-5 text-center"></p>
            <div class="text-center">
                <label>Date: </label>{{moment(this.CalendarDateTime.iCalendarStart).format('MMM DD YYYY')}}<br>
                <label>Time: </label>{{moment(this.CalendarDateTime.iCalendarStart).format('hh:mmA')}}
            </div>

            <div class="text-center">
            <h6>Are you going to eat?</h6>
            <input class="bg-success"  type="button" id="Yes" value="Yes" @click="CheckEating(1)" :disabled="this.Quantity == 1">&nbsp;
            <input class="bg-danger" type="button" id="No" value="No" @click="CheckEating(0)" :disabled="this.Quantity == 0">
            </div>
            
            <table class="table table-condensed table-responsive">
                <thead>
                    <tr w-auto>
                        <th style="width:70%">Image</th>
                        <th style="width:30%">Product</th>
                    </tr>
                </thead>
                <tbody>
                    <!--Product 1-->
                    <!-- <tr v-if="!orders.length">No Order/s</tr> -->
                    <tr v-if="!Foods.length">No Order/s</tr>
                    <tr v-for="(food, index) in Foods" :key="index">
                        <td data-th="Image">
                            <div class="row">
                                <div class="col-md-12 text-left">
                                    <img :src="food.FilePath._text" alt="">
                                </div>
                            </div>
                        </td>
                        <td data-th="Product">
                            <div class="row">
                                <div class="col-md-9 text-left mt-sm-2">
                                    <h4>{{ food.Name._text }}</h4>
                                    <p>{{ food.Description._text }}</p>
                                </div>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>

        </div>
    </div>

</div>
</section>
<!--Shopping-->
</div>
<br>
</div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import moment from 'moment'


Vue.prototype.moment = moment
Vue.use(VueAxios, axios)

export default {
    data() {
        return{
            
            accountname: window.localStorage.getItem("accountname").toUpperCase(),
            Foods: [],
            dateorder: null,
            menuitem_idx: null,
            username: window.localStorage.getItem("username"),
            isLogin: true,
            CalendarDateTime: null,
            Quantity: null,
        }
    },
    props: ['items'],

methods:{

DeleteCanteenOrders(){
    for(var i = 0; i < this.Foods.length; i++){
        axios.post("https://canteen.nepeshayyim.com/Decatech/BRM_Canteen_Web/DeleteCanteenOrder?calendar_idx=" + this.CalendarDateTime.iCalendarIdx + "&username=" + this.username + "&menuitem_idx=" + this.Foods[i].MenuItem_Idx._text ).then(response => {
            console.log(response);
        })
    }
},

CheckEating(i){
    if(i == 1)
    {
        this.Quantity = 1;
        this.CheckOutOrders();
    }else
    {
        this.Quantity = 0;
        this.DeleteCanteenOrders();
    }
},
CheckOutOrders(){
        for(var i = 0; i < this.Foods.length; i++){
            axios.post("https://canteen.nepeshayyim.com/Decatech/BRM_Canteen_Web/SaveCanteenOrder?calendar_idx=" + 
            this.CalendarDateTime.iCalendarIdx + "&username=" + this.username  +"&menuitem_idx=" + this.Foods[i].MenuItem_Idx._text + "&quantity=" + this.Quantity)
        }
},
GetCanteenMenu(){
            this.Foods = [];
            var convert = require('xml-js');
            axios.post("https://canteen.nepeshayyim.com/Decatech/BRM_Canteen_Web/GetCanteenMenu?calendar_idx=" + this.CalendarDateTime.iCalendarIdx).then(response => {
                var result = convert.xml2json(response.data,
               {compact: true, spaces: 4});
               result = JSON.parse(result);
                if(result.CanteenMenuSchedule.MenuItemList.CanteenMenuItem != undefined){
                    if(Array.isArray(result.CanteenMenuSchedule.MenuItemList.CanteenMenuItem)){
                        this.Foods = result.CanteenMenuSchedule.MenuItemList.CanteenMenuItem;    
                    }else
                    {
                        this.Foods.push(result.CanteenMenuSchedule.MenuItemList.CanteenMenuItem);
                    }
                }
                console.log(result)
            })
        },
},

created(){
    this.CalendarDateTime = JSON.parse(window.localStorage.getItem('iFoodMenu'));
    this.Quantity = this.CalendarDateTime.iCalendarQuantity;
    this.GetCanteenMenu()
},
}


</script>
