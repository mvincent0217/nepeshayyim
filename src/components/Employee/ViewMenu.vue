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
                    <tr v-if="!orders.length">No Order/s</tr>
                    <tr v-for="(order, index) in orders" :key="index">
                        <td data-th="Image">
                            <div class="row">
                                <div class="col-md-12 text-left">
                                    <img :src="order.FilePath._text" alt="">
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
                    </tr>
                </tbody>
            </table>

        </div>
    </div>

</div>
</section>
<!--Shopping-->
</div>
<input type="radio" id="Yes" name="Foodname" value="Yes">
<span>Yes</span>&nbsp;
<input type="radio" id="No" name="Foodname" value="No">
<span>No</span>
<h6>Are you going to eat?</h6>
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
            username: window.localStorage.getItem("username"),
            calendar_idx: window.localStorage.getItem("calendar_idx"),
            isLogin: true,
        }
    }
}
</script>

