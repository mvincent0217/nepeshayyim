<template>
    <div>
     <!-- Responsive navbar-->

        <!-- Page content-->
        <div class="container">


            <!--Shopping-->
            <section class="pt-5 pb-5">
                   <div class="col-sm-6 mb-3 mb-m-1 order-md-1 text-md-left">
                    <router-link class="btn btn-default submit" to="/OrderHistory">Order History</router-link>
                  </div>
              <div class="container">
                <div class="row w-100">
                    <div class="col-lg-12 col-md-12 col-12">
                        <h3 class="display-5 mb-2 text-center">Order Cart</h3>
                        <p class="mb-5 text-center"></p>
                        <table id="shoppingCart" class="table table-condensed table-responsive">
                            <thead>
                                <tr>
                                    <th style="width:50%">Food</th>
                                    <th style="width:10%">Quantity</th>
                                    <th style="width:19%">Action</th>
                                    <th style="width:9%">Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                <!--Product 1-->
                                <tr v-for="(order, index) in orders" :key="index">
                                    <td data-th="Product">
                                        <div class="row">
                                            <div class="col-md-3 text-left">
                                                <img src="https://via.placeholder.com/250x250/5fa9f8/ffffff" alt="" class="img-fluid d-none d-md-block rounded mb-2 shadow ">
                                            </div>
                                            <div class="col-md-9 text-left mt-sm-2">
                                                <h4>{{ order.MenuItem.Name._text }}</h4>
                                                <p>{{ order.MenuItem.Description._text }}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td data-th="Quantity">
                                        <input type="number" class="form-control form-control-lg text-center" :value="order.Quantity">
                                    </td>
                                    <td class="actions" data-th="">
                                        <div class="text-right">
                                            <button class="btn btn-white border-secondary bg-white btn-md mb-2" @click="DeleteOrders"> 
                                                🗑️
                                            </button>
                                        </div>
                                    </td>
                                    <td data-th="Date">{{ date }}</td>
                                </tr>
                            </tbody>
                        </table>
                        <div class="float-right text-right">
                            <h4>Subtotal:</h4>
                            <h1>₱100.00</h1>
                        </div>
                    </div>
                </div>
                <div class="row mt-4 d-flex align-items-center">
                    <div class="col-sm-6 order-md-2 text-center">
                        <a href="#" class="btn btn-primary mb-4 btn-lg pl-5 pr-5 text-md-center">Checkout</a>
                    </div>
                    <div class="col-sm-6 mb-3 mb-m-1 order-md-1 text-md-left">
                    </div>
                </div>
            </div>
            </section>
            <!--Shopping-->
        </div>
        <router-view></router-view>
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
            orders: [],
            menuitem_idx: null,
            username: window.localStorage.getItem("username"),
            calendar_idx: window.localStorage.getItem("calendar_idx")
        }
    },
    methods:{
        
    },
    DeleteOrders(){
        axios.post("https://dev-b2b/Decatech/BRM_Canteen_Web/DeleteCanteenOrder?calendar_idx=" + this.calendar_idx + "&username=" + this.username + "&menuitem_idx=" + this.menuitem_idx ).then(response => {
               console.log(response);
        })
    },
    created(){
        var convert = require('xml-js');
        axios.post("https://dev-b2b/Decatech/BRM_Canteen_Web/GetCanteenOrders?calendar_idx=" + this.calendar_idx + "&username=" + this.username).then(response => {
                var result = convert.xml2json(response.data,
               {compact: true, spaces: 4});
                this.orders = JSON.parse(result);
                var orders = JSON.parse(result);
                this.orders = orders.CanteenOrder.OrderList.CanteenOrderItem;
                console.log(this.orders)
            })
        },
}
</script>