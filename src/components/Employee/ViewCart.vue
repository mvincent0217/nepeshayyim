<template>
    <div>
     <!-- Responsive navbar-->

        <!-- Page content-->
        <div class="container">


            <!--Shopping-->
            <section class="pt-5 pb-5">
                  <div class="col-sm-6 mb-3 mb-m-1 order-md-1 text-md-left">
                    <RouterLink class="btn btn-default submit" to="/OrderHistory">View Order History</routerlink>
                  </div>
              <div class="container">
                <div class="row w-100">
                    <div class="col-lg-12 col-md-12 col-12">
                        <h3 class="display-5 mb-2 text-center">Order Cart</h3>
                        <p class="mb-5 text-center"></p>
                        <table id="shoppingCart" class="table table-condensed table-responsive">
                            <thead>
                                <tr>
                                    <th style="width:50%"></th>

                                    <th style="width:10%">Quantity</th>
                                    <th style="width:19%"></th>
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
                                                <h4>{{ order.Name._text }}</h4>
                                                <p>{{ order.Description._text }}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td data-th="Quantity">
                                        <input type="number" class="form-control form-control-lg text-center" :value="order.quantity">
                                    </td>
                                    <td class="actions" data-th="">
                                        <div class="text-right">
                                            <button class="btn btn-white border-secondary bg-white btn-md mb-2">
                                                🗑️
                                            </button>
                                        </div>
                                    </td>
                                    <td data-th="Date">{{ date }}</td>
                                </tr>
<<<<<<< HEAD
=======
                                <!--Product 1-->
                                <!--Product 2-->
                                <tr>
                                    <td data-th="Product">
                                        <div class="row">
                                            <div class="col-md-3 text-left">
                                                <img src="https://via.placeholder.com/250x250/5fa9f8/ffffff" alt="" class="img-fluid d-none d-md-block rounded mb-2 shadow ">
                                            </div>
                                            <div class="col-md-9 text-left mt-sm-2">
                                                <h4>Food Name</h4>
                                                <p class="font-weight-light">Description</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td data-th="Quantity">
                                        <input type="number" class="form-control form-control-lg text-center" value="1">
                                    </td>
                                    <td class="actions" data-th="">
                                        <div class="text-right">
                                            <button class="btn btn-white border-secondary bg-white btn-md mb-2">
                                               🗑️
                                            </button>
                                        </div>
                                    </td>
                                    <td data-th="Date">12/3/2022</td>
                                </tr>
                                <!--Product 2-->

>>>>>>> ca5f87d5d4279b1cfb5e64a206d292c5267e5cb2
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="row mt-4 d-flex align-items-center">
                    <div class="col-sm-6 order-md-2 text-center">
                        <a href="file:///C:/Users/CRSC/Desktop/Food%20ordering%20system%20V2/Orders.html#" class="btn btn-primary mb-4 btn-lg pl-5 pr-5 text-md-center">Checkout</a>
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
            orders:[],
            date: null,
        }
    },
    methods:{
        
    },
    created(){
        this.date = localStorage.getItem("datetime")
        this.orders = JSON.parse(localStorage.getItem("orders"));
    }
}
</script>