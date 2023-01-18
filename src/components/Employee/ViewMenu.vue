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
            <div class="text-center">
            <h6>Are you going to eat?</h6>
            <button class="btn bg-primary custom"  id="Yes" value="Reserve" @click="CheckEating(1)" :disabled="this.Quantity == 1">📜 {{ Reservebtn }} </button>&nbsp;
            <button class="btn bg-secondary custom"  id="No" value="Cancel Reservation" @click="CheckEating(0)" :disabled="this.Quantity == 0">🚫 Cancel Reservation</button>
            </div>
            <br>
            <div class="">
                <label>This is the <b>menu</b> for </label> {{moment(this.CalendarDateTime.iCalendarStart).format('MMM DD YYYY')}} {{moment(this.CalendarDateTime.iCalendarStart).format('hh:mmA')}}
            </div>
            
            <table class="table table-condensed table-responsive">
                <thead>
                    <tr w-auto>
                        <th style="width:70%">Image</th>
                        <th style="width:30%">Product</th>
                    </tr>
                </thead>
                <tbody>
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
            <div id="snackbar">{{ToastMessage}}</div>
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
            username: window.localStorage.getItem("username"),
            isLogin: true,
            CalendarDateTime: null,
            Quantity: null,
            ToastMessage: null,
            Reservebtn: "Reserve",
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
    var x = document.getElementById("snackbar");
    x.className = "show";
    if(i == 1)
    {
        this.Quantity = 1;
        this.ToastMessage = "Reserved";
        this.Reservebtn = "Reserved";
        setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
        this.CheckOutOrders();
    }else
    {
        this.Quantity = 0;
        this.ToastMessage = "Not Reserved";
        this.Reservebtn = "Reserve";
        setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
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

<style>
.custom{
    width: 200px !important;
}
#snackbar {
  visibility: hidden;
  min-width: 250px;
  margin-left: -125px;
  background-color: #333;
  color: #fff;
  text-align: center;
  border-radius: 2px;
  padding: 16px;
  position: fixed;
  z-index: 1;
  left: 50%;
  bottom: 30px;
  font-size: 17px;
}

#snackbar.show {
  visibility: visible;
  -webkit-animation: fadein 0.5s, fadeout 0.5s 2.5s;
  animation: fadein 0.5s, fadeout 0.5s 2.5s;
}

@-webkit-keyframes fadein {
  from {bottom: 0; opacity: 0;} 
  to {bottom: 30px; opacity: 1;}
}

@keyframes fadein {
  from {bottom: 0; opacity: 0;}
  to {bottom: 30px; opacity: 1;}
}

@-webkit-keyframes fadeout {
  from {bottom: 30px; opacity: 1;} 
  to {bottom: 0; opacity: 0;}
}

@keyframes fadeout {
  from {bottom: 30px; opacity: 1;}
  to {bottom: 0; opacity: 0;}
}
</style>