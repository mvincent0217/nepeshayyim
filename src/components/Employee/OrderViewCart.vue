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
                        <br><br>

                        <h3 class="display-5 mb-2 text-center">SUPERSTAR! {{accountname}}</h3>
                        <h3 class="display-5 mb-2 text-center">Order Cart </h3>
                        <p class="mb-5 text-center"></p>
                        <p class="text-center"> Once pre ordered considered sold</p>
                        <p class="text-center"> Orders will be lock 2 days before</p>
                        

                        <table id="shoppingCart" class="table table-condensed table-responsive">
                            <thead>
                                <tr w-auto>
                                    <th style="width:60%">Image</th>
                                    <th style="width:10%">Product</th>
                                    <th style="width:8%">Quantity</th>
                                    <th style="width:5%">Day</th>
                                    <th style="width:10%">Date</th>
                                    <th style="width:10%">Time</th>
                                </tr>
                            </thead>
                            <tbody>
                                <!--Product 1-->
                                <!-- <tr v-if="!orders.length">No Order/s</tr> -->
                                <tr v-if="!orders.length">No Order/s</tr>
                                <tr v-for="(order, index) in orders" :key="index">
                                    <td data-th="Image">
                                        <div class="row">
                                            <div class="col-md-3 text-left">
                                                <img src="../../../public/images/menu.jpg" width="600" height="600" alt="">
                                            </div>
                                        </div>
                                    </td>
                                    <td data-th="Product">
                                        <div class="row">
                                            <div class="col-md-9 text-left mt-sm-2">
                                                <h4>{{ order.Name._text }}</h4>
                                                <p>{{ order.Description._text }}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td data-th="Quantity" style="text-align:center">
                                        <div class="text-right d-flex" >
                                            <button class="btn btn-white bg-white btn-md mb-2" @click="DeductQuantity(order)" :disabled="order.Locked == 'true'">➖</button> &nbsp;                       
                                            <input style="width:50px;" type="number" class="form-control form-control-md text-center" v-model="order.Quantity" @change="checkquantity(order.Quantity)" disabled>&nbsp;
                                            <button class="btn btn-white bg-white btn-md mb-2" @click="AddQuantity(order)" :disabled="order.Locked == 'true'">➕</button>
                                        </div>
                                    </td>
                                    <td data-th="Day">{{ moment(order.DateTime).format('dddd') }}</td>
                                    <td data-th="Date">{{ moment(order.DateTime).format('MMM DD YYYY') }}</td>
                                    <td data-th="Date">{{ moment(order.DateTime).format('hh:mmA') }}</td>
                                </tr>
                            </tbody>
                        </table>
       
                    </div>
                </div>
                <div class="col-sm-6 order-md-2 text-center">
                    <!-- <nav aria-label="Page navigation example">
                     <ul class="pagination">
                      <li class="page-item"><a class="page-link" href="#">Previous</a></li>
                     <li class="page-item"><a class="page-link" href="#">1</a></li>
                     <li class="page-item"><a class="page-link" href="#">2</a></li>
                     <li class="page-item"><a class="page-link" href="#">3</a></li>
                     <li class="page-item"><a class="page-link" href="#">Next</a></li>
                    </ul>
                    </nav> -->
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

export default {
    data() {
        return{
            accountname: window.localStorage.getItem("accountname").toUpperCase(),
            orders: [],
            dateorder: null,
            menuitem_idx: null,
            quantity: 0,
            username: window.localStorage.getItem("username"),
            calendar_idx: window.localStorage.getItem("calendar_idx")
        }
    },
    methods:{

        DeleteCanteenOrders(order){
            axios.post("https://canteen.nepeshayyim.com/Decatech/BRM_Canteen_Web/DeleteCanteenOrder?calendar_idx=" + order.Calendar_Idx + "&username=" + this.username + "&menuitem_idx=" + order.MenuItem_Idx._text ).then(response => {
                console.log(response);
            })

        },

        checkquantity(order){
            if(order=="")
            {
                order.Quantity = 0;
            }
        },

        DeductQuantity(order){
            order.Quantity = Number(order.Quantity) - 1;
            this.CheckOutOrders(order);
        },

        AddQuantity(order){
            order.Quantity = Number(order.Quantity) + 1;
            this.CheckOutOrders(order);
        },

        CheckOutOrders(order){
            console.log(order.Quantity)
            if(order.Quantity == 0){
                this.DeleteCanteenOrders(order);
            }else{
                    var convert = require('xml-js');
                    axios.post("https://canteen.nepeshayyim.com/Decatech/BRM_Canteen_Web/SaveCanteenOrder?calendar_idx=" + order.Calendar_Idx + "&username=" + this.username  +"&menuitem_idx=" + order.MenuItem_Idx._text + "&quantity=" + order.Quantity).then(response => {
                    var result = convert.xml2json(response.data,
                {compact: true, spaces: 4});
                result = JSON.parse(result);
                console.log(result);
                    localStorage.setItem("datetime", this.date2)
                    localStorage.setItem("orders", JSON.stringify(this.orders))
                    })
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
            })
        },
    },

    created(){
            this.GetAllOrder();
            if(this.username == null){
                this.$router.push("/login");
            }
            
        },
}
</script>

<style>
img {
  max-width: 100%;
  height: auto;
}
</style>