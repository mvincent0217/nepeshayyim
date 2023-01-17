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
            <input type="button" id="Yes" name="Foodname" value="Yes" >&nbsp;
            <input type="button" id="No" name="Foodname" value="No" disabled>
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
            CalendarDateTime: null
        }
    },
    props: ['items'],

methods:{

// CheckOutOrders(order){
//     console.log(order.Quantity)
//     if(order.Quantity == 0){
//         this.DeleteCanteenOrders(order);
//     }else{
//             var convert = require('xml-js');
//             axios.post("https://canteen.nepeshayyim.com/Decatech/BRM_Canteen_Web/SaveCanteenOrder?calendar_idx=" + order.Calendar_Idx + "&username=" + this.username  +"&menuitem_idx=" + order.MenuItem_Idx._text + "&quantity=" + order.Quantity).then(response => {
//             var result = convert.xml2json(response.data,
//         {compact: true, spaces: 4});
//         result = JSON.parse(result);
//         console.log(result);
//             localStorage.setItem("datetime", this.date2)
//             localStorage.setItem("orders", JSON.stringify(this.orders))
//             })
//     }
// },
GetCanteenMenu(){
            this.Foods = [];
            var convert = require('xml-js');
            axios.post("https://canteen.nepeshayyim.com/Decatech/BRM_Canteen_Web/GetCanteenMenu?calendar_idx=" + this.CalendarDateTime.iCalendarIdx).then(response => {
                var result = convert.xml2json(response.data,
               {compact: true, spaces: 4});
               result = JSON.parse(result);
                if(result.CanteenMenuSchedule.MenuItemList.CanteenMenuItem != undefined){
                    this.Foods = result.CanteenMenuSchedule.MenuItemList.CanteenMenuItem;
                }
                console.log(this.Foods)
            })
        },
},

created(){
    // this.GetAllOrder();
    // if(this.username == null){
    //     this.$router.push("/login");
    // }
    // console.log(this.$route.params.items);
    this.CalendarDateTime = JSON.parse(window.localStorage.getItem('iFoodMenu'))
    this.GetCanteenMenu()
},
}


</script>

