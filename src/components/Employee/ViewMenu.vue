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
            <h6>Are you going to eat?</h6>
            <input type="radio" id="Yes" name="Foodname" value="Yes">
            <span>Yes</span>&nbsp;
            <input type="radio" id="No" name="Foodname" value="No">
            <span>No</span>
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
            orders: [],
            dateorder: null,
            menuitem_idx: null,
            username: window.localStorage.getItem("username"),
            calendar_idx: window.localStorage.getItem("calendar_idx"),
            isLogin: true,
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
    if(order.Quantity < 0){
        order.Quantity = 0;
        return order.Quantity;
    }else{
        this.CheckOutOrders(order);
    }
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
            console.log(new_order)
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

