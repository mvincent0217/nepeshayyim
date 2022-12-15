<template>
    <div>
     <!-- Responsive navbar-->

        <!-- Page content-->
        <div class="container">

            <!--Shopping-->
            <section class="pt-5 pb-5">
              <div class="container">
                <div class="row w-100">
                    <div class="col-lg-12 col-md-12 col-12">
                        <h3 class="display-5 mb-2 text-center">SUPERSTAR! {{accountname}}</h3>
                        <h3 class="display-5 mb-2 text-center">🛒 Order Cart 🛒</h3>
                        <p class="mb-5 text-center"></p>
                        <table id="shoppingCart" class="table table-condensed table-responsive">
                            <thead>
                                <tr>
                                    <th style="width:50%">Product</th>
                                    <th style="width:10%">Quantity</th>
                                    <th style="width:5%">Day</th>
                                    <th style="width:15%">Date</th>
                                    <th style="width:10%">Time</th>
                                    <th style="width:10%">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <!--Product 1-->
                                <!-- <tr v-if="!orders.length">No Order/s</tr> -->
                                <tr v-if="!orders.length">No Order/s</tr>
                                <tr v-for="(order, index) in orders" :key="index">
                                    <td data-th="Product">
                                        <div class="row">
                                            <div class="col-md-3 text-left">
                                                <img src="https://via.placeholder.com/250x250/5fa9f8/ffffff" alt="" class="img-fluid d-none d-md-block rounded mb-2 shadow ">
                                            </div>
                                            <div class="col-md-9 text-left mt-sm-2">
                                                <h4>{{ order.Name._text }}</h4>
                                                <p>{{ order.Description._text }}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td data-th="Quantity">
                                        <label for="">-</label><input type="number" class="form-control form-control-lg text-center" min="0" max="10" onpaste="return false;" onkeypress="return event.charCode >= 48 && event.charCode <= 57" v-model="order.Quantity" @change="checkquantity(order.Quantity)" :disabled="order.Locked == 'true'"><label for="">+</label>
                                    </td>
                                    <td data-th="Day">{{ moment(order.DateTime).format('dddd') }}</td>
                                    <td data-th="Date">{{ moment(order.DateTime).format('MMM DD YYYY') }}</td>
                                    <td data-th="Date">{{ moment(order.DateTime).format('hh:mmA') }}</td>
                                    <td class="actions" data-th="">
                                        <div class="text-right">
                                            <button class="btn btn-white border-secondary bg-danger btn-md mb-2" @click="DeleteCanteenOrders(order)" :disabled="order.Locked == 'true'"> 
                                                🗑️
                                            </button> &nbsp;
                                            <button class="btn btn-white border-secondary bg-primary btn-md mb-2" @click="CheckOutOrders(order)" :disabled="order.Locked == 'true'"> 
                                                ✓
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="row mt-4 d-flex align-items-center">
                    <div class="col-sm-6 order-md-2 text-center">
                        <a href="#" class="btn btn-primary mb-4 btn-lg pl-5 pr-5 text-md-center" @click="CheckOutOrders">Checkout</a>
                    </div>
                </div>
            </div>
            </section>
            <!--Shopping-->
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

window.onscroll = function() {scrollFunction()};

function scrollFunction() {

    document.getElementById("navbar").style.top = "0";

}

export default {
    data() {
        return{
            accountname: window.localStorage.getItem("accountname").toUpperCase(),
            orders: [],
            dateorder: null,
            menuitem_idx: null,
            username: window.localStorage.getItem("username"),
            calendar_idx: window.localStorage.getItem("calendar_idx"),
        }
    },
    methods:{

        DeleteCanteenOrders(order){
            axios.post("https://canteen.nepeshayyim.com/Decatech/BRM_Canteen_Web/DeleteCanteenOrder?calendar_idx=" + order.Calendar_Idx + "&username=" + this.username + "&menuitem_idx=" + order.MenuItem_Idx._text ).then(response => {
                console.log(response);
                this.orders = [];
                this.GetAllOrder();
            })

        },
        checkquantity(order){
            if(order=="")
            {
                order.Quantity = 0;
            }
        },
        CheckOutOrders(order){
            console.log(order.Quantity)
            if(order.Quantity == 0){
                this.DeleteCanteenOrders(order);
            }else{
                for(var x = 0; x < this.orders.length;x++)
                {
                    var convert = require('xml-js');
                    axios.post("https://canteen.nepeshayyim.com/Decatech/BRM_Canteen_Web/SaveCanteenOrder?calendar_idx=" + order.calendar_idx + "&username=" + order.username  +"&menuitem_idx=" + order.orders[x].MenuItem.MenuItem_Idx._text.toString() + "&quantity=" + this.orders[x].Quantity._text).then(response => {
                    var result = convert.xml2json(response.data,
                {compact: true, spaces: 4});
                result = JSON.parse(result);
                console.log(result);
                    localStorage.setItem("datetime", this.date2)
                    localStorage.setItem("orders", JSON.stringify(this.orders))
                    })
                }
            }
        },
        GetAllOrder(){
            var convert = require('xml-js');
            axios.post("https://canteen.nepeshayyim.com/Decatech/BRM_Canteen_Web/GetAllCanteenOrders?username=" + this.username).then(response => {
                var result = convert.xml2json(response.data,
               {compact: true, spaces: 4});
                var orders = JSON.parse(result);
                
                if(Array.isArray(orders)){
                    this.orders = orders.ArrayOfCanteenOrder.CanteenOrder;
                }else{                        
                    var new_order = orders.ArrayOfCanteenOrder.CanteenOrder;
                    let array = []
                    var bSpecialCase = false;
                    if(Array.isArray(new_order))
                    {
                        array = new_order;
                    }
                    else{
                        bSpecialCase = true;
                        array = new_order.OrderList.CanteenOrderItem;
                    }
                    if(!bSpecialCase)
                    {
                        for(var iArr= 0; iArr < array.length; iArr++){
                            var temp = {};
                            temp = array[iArr];
                            var tempOrderList = {};
                            tempOrderList = temp.OrderList;
                            if(!Array.isArray(tempOrderList.CanteenOrderItem))
                            {
                                tempOrderList.CanteenOrderItem.MenuItem['Locked'] = temp.Locked._text;
                                tempOrderList.CanteenOrderItem.MenuItem['Calendar_Idx'] = temp.CalendarRecord.Calendar_Idx._text;
                                tempOrderList.CanteenOrderItem.MenuItem['DateTime'] = temp.CalendarRecord.DateTime._text;
                                tempOrderList.CanteenOrderItem.MenuItem['Quantity'] = tempOrderList.CanteenOrderItem.Quantity._text;
                                this.orders.push(tempOrderList.CanteenOrderItem.MenuItem);
                            }
                            else{
                                var tempCanteenOrderItem = [];
                                tempCanteenOrderItem = tempOrderList.CanteenOrderItem;
                                for(var iOrder = 0; iOrder < tempCanteenOrderItem.length; iOrder++)
                                {
                                    var tempCanteenOrder = {};
                                    tempCanteenOrder = tempCanteenOrderItem[iOrder];
                                    tempCanteenOrder.MenuItem['Locked'] = temp.Locked._text;
                                    tempCanteenOrder.MenuItem['Calendar_Idx'] = temp.CalendarRecord.Calendar_Idx._text;
                                    tempCanteenOrder.MenuItem['DateTime'] = temp.CalendarRecord.DateTime._text;
                                    tempCanteenOrder.MenuItem['Quantity'] = tempCanteenOrder.Quantity._text;
                                    this.orders.push(tempCanteenOrder.MenuItem);
                                }
                            }
                        }
                    }
                    else{
                        for(var i = 0; i < array.length; i++)
                        {
                            tempCanteenOrder = {};
                            tempCanteenOrder = array[i];
                            tempCanteenOrder.MenuItem['Locked'] = new_order.Locked._text;
                            tempCanteenOrder.MenuItem['Calendar_Idx'] = new_order.CalendarRecord.Calendar_Idx._text;
                            tempCanteenOrder.MenuItem['DateTime'] = new_order.CalendarRecord.DateTime._text;
                            tempCanteenOrder.MenuItem['Quantity'] = tempCanteenOrder.Quantity._text;
                            this.orders.push(tempCanteenOrder.MenuItem);
                        }
                    }
                    
                }
                console.log(this.orders)
            })
        },
    },
    created(){
            this.GetAllOrder();

        },
}

</script>