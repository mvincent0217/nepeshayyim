<template>
    <div>
         <!-- Responsive navbar-->
         
        <!-- Page content-->
        <div class="container">
            <br><br>
            <div class="text-center">
                <h3 class="display-5 mb-2 text-center">SUPERSTAR! {{accountname}}</h3><br><br>
                <label for ="Date">Date of Order Reservation:</label> 
                <input type="date" id="date" class="col-sm-4 mb-3 mb-m-2 order-md-2 text-md-center" name="date" v-model="date" :min="this.MaxDate"  @change="showdate"><br>
                
                <!-- <input type="radio" id="lunch" value="10:30:00" v-model="picked" @change="showhour"/>
                <label for="two">12PM</label>&nbsp;
                <input type="radio" id="dinner" value="20:00:00" v-model="picked" @change="showhour" />
                <label for="two">7PM</label> -->

                
                <label v-for="(arDate, index) in arDates"  :key="index">
                <input type="radio" :id="index" :value="arDate.StartDate" name="Hour" :disabled="date == null" @change="showhour(arDate.StartDate, arDate.EndDate)" :key="index">{{arDate.StartDate}}
                </label>

            </div>
            <tbody>
                 <!-- Product 1-->
                 <tr v-if="!Foods.length">No Menu, Please Select Date and Time !</tr>
                <tr v-else v-for="(food, index) in Foods" :key="index">
                    <td data-th="Product">
                        <br>
                        <div class="row">
                            <div class="col-md-3 text-left">
                                <img src="../../../public/images/rice.jpg" alt="" class="img-fluid d-none d-md-block rounded mb-2 shadow ">
                            </div>
                            <div class="col-md-9 text-left mt-sm-2">
                                <h4>{{ food.Name._text }}</h4>
                                <p>{{ food.Description._text }}</p>
                                <input type="number" class="col-sm-1 mb-3 mb-m-1 order-md-1 text-md-center" value="1" min="0" max="50" onpaste="return false;" onkeypress="return event.charCode >= 48 && event.charCode <= 57" v-model="food.quantity" :key="index" @change="CheckQuantity(food.quantity, index)"> <br>
                                <button class="btn btn-white border-secondary bg-white btn-md mb-2" @click="FoodOrders(food)">Add to cart</button>
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
import moment from 'moment'

Vue.prototype.moment = moment
Vue.use(VueAxios, axios)

export default {
    data() {
        return{
            username: window.localStorage.getItem("username"),
            accountname: window.localStorage.getItem("accountname").toUpperCase(),
            Foods: [],
            date: null,
            date2: null,
            hour: null,
            calendar_idx: '',
            enddate: '',
            picked: null,
            orders: [],
            quantity: 0,
            minDate: null,
            arDates: [],
            DateToday: null,
            MaxDate: null,
        }
    },
    methods:{
        GetCanteenMenuItems(){
            var convert = require('xml-js');
            axios.post("https://canteen.nepeshayyim.com/Decatech/BRM_Canteen_Web/GetCanteenMenuItems").then(response => {
            var result = convert.xml2json(response.data,
               {compact: true, spaces: 4});
               console.log(result);
            })
        },
        showdate(){
            this.date;
            this.RefreshCalendarRecords();
        },
        showhour(StartDate, EndDate){
            // if(this.picked=="10:30:00"){
            //     this.enddate = this.date + " 12:30:00";
            // }else{
            //     this.enddate = this.date + " 22:00:00";
            // }
            this.enddate = this.date + " " + EndDate;
            this.date2 = this.date + " " + StartDate;
            this.GetCanteenCalendarRecords();
        },
        RefreshCalendarRecords(){
            this.calendar_idx = '';
            this.Foods = [];
        },
        GetCanteenCalendarIdx(){
            var convert = require('xml-js');
            axios.post("https://canteen.nepeshayyim.com/Decatech/BRM_Canteen_Web/GetCanteenCalendarRecords?startdate="+ this.date2 + "&enddate=" + this.enddate ).then(response => {
                var result = convert.xml2json(response.data,
               {compact: true, spaces: 4});
               result = JSON.parse(result);
               var arCanteenCalendarRecord = [];
               arCanteenCalendarRecord = result.ArrayOfCanteenCalendarRecord.CanteenCalendarRecord;
               for(var iCCR = 0; iCCR < arCanteenCalendarRecord.length; iCCR++){

                var tempStartDate = moment(arCanteenCalendarRecord[iCCR].StartDateTime._text).format('HH:mm:ss');
                var tempEndDate = moment(arCanteenCalendarRecord[iCCR].EndDateTime._text).format('HH:mm:ss');
                var oDate = {};
                oDate['StartDate'] = tempStartDate;
                oDate['EndDate'] = tempEndDate;
                this.arDates.push(oDate);
               }
            })
        },
        GetCanteenCalendarRecords(){
            var convert = require('xml-js');
            axios.post("https://canteen.nepeshayyim.com/Decatech/BRM_Canteen_Web/GetCanteenCalendarRecords?startdate="+ this.date2 + "&enddate=" + this.enddate ).then(response => {
                var result = convert.xml2json(response.data,
               {compact: true, spaces: 4});
               result = JSON.parse(result);
               this.calendar_idx = result.ArrayOfCanteenCalendarRecord.CanteenCalendarRecord.Calendar_Idx._text;
               this.GetCanteenMenu(this.calendar_idx);
            })
        },
        GetCanteenMenu(id){
            this.calendar_idx = id;
            this.Foods = [];
            var convert = require('xml-js');
            axios.post("https://canteen.nepeshayyim.com/Decatech/BRM_Canteen_Web/GetCanteenMenu?calendar_idx=" + id).then(response => {
                var result = convert.xml2json(response.data,
               {compact: true, spaces: 4});
               result = JSON.parse(result);
                if(result.CanteenMenuSchedule.MenuItemList.CanteenMenuItem != undefined){
                    this.Foods = result.CanteenMenuSchedule.MenuItemList.CanteenMenuItem;
                }
            })
        },
        FoodOrders(food){
            var convert = require('xml-js');
            axios.post("https://canteen.nepeshayyim.com/Decatech/BRM_Canteen_Web/SaveCanteenOrder?calendar_idx=" + this.calendar_idx + "&username=" + this.username  +"&menuitem_idx=" + food.MenuItem_Idx._text.toString() + "&quantity=" + food.quantity).then(response => {
                var result = convert.xml2json(response.data,
               {compact: true, spaces: 4});
               result = JSON.parse(result);
               console.log(result);
            this.orders.push(food);
            console.log(this.orders)
            localStorage.setItem("calendar_idx", this.calendar_idx);
            localStorage.setItem("datetime", this.date2);
            localStorage.setItem("orders", JSON.stringify(this.orders));
            alert("Your food is ordered. Kindly Check your Order!");
            })
        },
        CheckQuantity(quantity, index){
            this.Foods.forEach((item,i) =>{
                if(i == index){
                    if(item.quantity <= 0)
                    {
                       item.quantity = 1;
                    }
                }
            })
        },
        addDays(date, days) {
            var result = new Date(date);
            result.setDate(result.getDate() + days);
            return result;
        }
    },
    created(){
        this.date = null;
        this.minDate = moment().format('YYYY-MM-DD');
        this.date2 = moment().format('YYYY-MM-DD') + ' 00:00:00';
        this.enddate = moment().format('YYYY-MM-DD') + ' 23:59:59';
        this.GetCanteenCalendarIdx();
        this.DateToday = new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000).toISOString().split("T")[0];
        this.MaxDate = moment(this.addDays(this.DateToday,2)).format('YYYY-MM-DD')
    }
}
</script>