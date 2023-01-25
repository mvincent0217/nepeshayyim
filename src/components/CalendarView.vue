<template>
  <body>
    <div>
    <br>
    <br>
    <br>
    <div class="HiddenCalendar" v-if="this.CalendarLoadingStatus">
    <h3 class="display-5 mb-2 text-center" id="headertitle">Canteen Calendar</h3>
    <p class="display-7 mb-2 text-center" ><b>Reserve your food here!</b></p>
    <div class="row justify-content-left m-2">
    <div class="card" style="width: 12rem;">
    <label class="text-center"><b>Legend</b></label>
    <div>
    <div id="red" class="box"></div><span class="explanation">- For Reservation</span> <br><br>
    <div id="blue" class="box"></div><span class="explanation">- Reserved</span><br><br>
    </div>
    <!-- <label class="text-center"><span>Reserved</span>&nbsp;&nbsp;<span>🟥For Reservation</span></label> -->
    </div>
    </div>
    <br>
    <br>
    <div id="Calendar" style ="height: calc(10vh - 10vmax);">
    <full-calendar class="fullcalendar" :config="config" :events="events" ></full-calendar>
    </div>  
    </div>
    <div class="Loading" v-else>
    <div id ="Loading" >
    <div class="loader"></div>
    </div>
     </div>
    </div>
</body>
</template>

<script>
import moment from "moment";
import axios from "axios";
//import { FullCalendar } from "vue-full-calendar";
import "fullcalendar/dist/fullcalendar.css";
import Swal from 'sweetalert2'

var tempthis;
var tempevents;
// function execTransfer(event){
//   window.localStorage.setItem('oFoodMenu',JSON.stringify({'oCalendarIdx':event.Calendar_Idx,'oCalendarStart':event.start._i, 'oCalendarQuantity':event.quantity, 'oCalendarDatetime':event.tempStartDatetime}))
//   transfer.$router.push({
//             name: 'ViewMenu',
//           })
// }
async function getSchedule(event){
          tempevents = event;
          tempthis.GetCanteenMenu();
          if(moment().format("YYYY-MM-DD HH:mm:ss") < moment(event.tempStartDatetime).format("YYYY-MM-DD HH:mm:ss")){
            Swal.fire({
            title: 'Superstar!',
            text: "Are you going to eat?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes!',
            cancelButtonText: 'No!'
                }).then(async(result) => {
                  if (result.isConfirmed) {
                    Swal.fire({
                      title: 'Success!',
                      text : 'Thank you!.',
                      icon : 'success',
                      confirmButtonText: 'Yes!'
                  }).then(async(result) => {
                    if (result.isConfirmed) {
                    //remove if not needed
                    var index = 0;
                      index = tempthis.events.findIndex(elem => elem.Calendar_Idx === event.Calendar_Idx);
                      var oTempItem = {};
                      oTempItem = tempthis.events[index];
                      //delete oTempItem['color'];
                      oTempItem['color'] = 'rgb(17, 17, 223)';
                      oTempItem['quantity'] = 1;
                      tempthis.events[index] = oTempItem;
                      //end
                    await tempthis.CheckOutOrders();
                    await tempthis.GetAllOrder();
                    }
                  })
                  }else{
                    console.log(result);
                    Swal.fire({
                        title: 'Not Success!',
                        text : 'Thank you!.',
                        icon : 'success',
                    }).then(async(result) => {
                      if (result.isConfirmed) {

                        //remove if not needed
                        var index = 0;
                        index = tempthis.events.findIndex(elem => elem.Calendar_Idx === event.Calendar_Idx);
                        var oTempItem = {};
                        oTempItem = tempthis.events[index];
                        //delete oTempItem['color'];
                        oTempItem['color'] = 'd93636';
                        oTempItem['quantity'] = 0;
                        tempthis.events[index] = oTempItem;
                        //end

                        await tempthis.DeleteCanteenOrders();
                        await tempthis.GetAllOrder();
                      }
                    })
                  }
                })
              }
        }

export default {
  components:{
    //FullCalendar
  },
  data() {
    
    return {
      CalendarLoadingStatus: false,
      orders: [],
      orderItem: {},
      Foods: [],
      username: window.localStorage.getItem("username"),
      tempStartdate: null,
      tempEnddate: null,
      CurrentDate: null,
      events: [],
      config: {
        showNonCurrentDates: false,
        defaultView: "month",
        eventRender: function () {
          
        },
        eventClick: function (event) {
          getSchedule(event);
        }
      },
    };
  },
  methods:{
        async CheckOutOrders(){
          for(var i = 0; i < this.Foods.length; i++){
            axios.post("https://canteen.nepeshayyim.com/Decatech/BRM_Canteen_Web/SaveCanteenOrder?calendar_idx=" + 
            tempevents.Calendar_Idx + "&username=" + this.username  +"&menuitem_idx=" + this.Foods[i].MenuItem_Idx._text + "&quantity=1")
          }
        },
        async DeleteCanteenOrders(){
            for(var i = 0; i < this.Foods.length; i++){
                axios.post("https://canteen.nepeshayyim.com/Decatech/BRM_Canteen_Web/DeleteCanteenOrder?calendar_idx=" + tempevents.Calendar_Idx + "&username=" + this.username + "&menuitem_idx=" + this.Foods[i].MenuItem_Idx._text ).then(response => {
                    console.log(response);
                })
            }
        },
        GetCanteenMenu(){
            this.Foods = [];
            var convert = require('xml-js');
            axios.post("https://canteen.nepeshayyim.com/Decatech/BRM_Canteen_Web/GetCanteenMenu?calendar_idx=" + tempevents.Calendar_Idx).then(response => {
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
            })
        },
        GetAllOrder(){
            //this.orders = [];
            //this.events = [];
            var index = 0;
            var convert = require('xml-js');
            axios.post("https://canteen.nepeshayyim.com/Decatech/BRM_Canteen_Web/GetAllCanteenOrders?username=" + this.username + "&startdate=" + this.tempStartdate + "&enddate=" + this.tempEnddate).then(response => {
                var result= convert.xml2json(response.data,
               {compact: true, spaces: 4});
                var orders = JSON.parse(result);
                var tempObj = {};
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
                                if(!this.orders.includes(temp.CalendarRecord.Calendar_Idx._text)){
                                  this.orders.push(temp.CalendarRecord.Calendar_Idx._text);
                                  tempObj = {};
                                  tempObj['start'] = temp.CalendarRecord.StartDateTime._text;
                                  tempObj['Calendar_Idx'] = temp.CalendarRecord.Calendar_Idx._text;
                                  tempObj['quantity'] = tempOrderList.CanteenOrderItem.Quantity._text;
                                  tempObj['tempStartDatetime'] = new_order[iArr].CalendarRecord.DateTime._text;
                                  if(tempOrderList.CanteenOrderItem.Quantity._text == '0'){
                                    tempObj['color'] = '#d93636';
                                    }else{
                                    tempObj['color'] = 'rgb(17, 17, 223)';
                                  }
                                  tempObj['tempStartDate'] = this.tempStartdate;
                                  this.events.push(tempObj);
                                  
                                  index = this.events.findIndex(elem => elem.Calendar_Idx === temp.CalendarRecord.Calendar_Idx._text);
                                  //console.log('if '+ index);
                                }
                                else
                                {
                                  index = this.events.findIndex(elem => elem.Calendar_Idx === temp.CalendarRecord.Calendar_Idx._text);
                                  //console.log('else '+index);
                                  var oTempItem = {};
                                  oTempItem = this.events[iArr];
                                  if(oTempItem.quantity == '0'){
                                    oTempItem.color = '#d93636';
                                    }else{
                                      oTempItem.color = 'rgb(17, 17, 223)';
                                  }
                                  this.events[iArr] = oTempItem;
                                }
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
                                if(!this.orders.includes(temp.CalendarRecord.Calendar_Idx._text)){
                                    this.orders.push(temp.CalendarRecord.Calendar_Idx._text);
                                    tempObj = {};
                                    tempObj['start'] = temp.CalendarRecord.StartDateTime._text;
                                    tempObj['Calendar_Idx'] = temp.CalendarRecord.Calendar_Idx._text;
                                    tempObj['quantity'] = tempCanteenOrder.Quantity._text;
                                    tempObj['tempStartDatetime'] = new_order[iArr].CalendarRecord.DateTime._text;
                                    if(tempCanteenOrder.Quantity._text == '0'){
                                      tempObj['color'] = '#d93636';
                                    }else{
                                      tempObj['color'] = 'rgb(17, 17, 223)';
                                    }
                                    this.events.push(tempObj);
                                    }
                                    else
                                    {
                                      index = 0;
                                      index = this.events.findIndex(elem => elem.Calendar_Idx === temp.CalendarRecord.Calendar_Idx._text);
                                      if(this.events[iArr].quantity == '0'){
                                        this.events[iArr].color = '#d93636';
                                        }else{
                                          this.events[iArr].color = 'rgb(17, 17, 223)';
                                      }
                                    }     
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
                            if(!this.orders.includes(new_order.CalendarRecord.Calendar_Idx._text)){
                              this.orders.push(new_order.CalendarRecord.Calendar_Idx._text);
                              tempObj = {};
                              tempObj['start'] = new_order.CalendarRecord.StartDateTime._text;
                              tempObj['Calendar_Idx'] = new_order.CalendarRecord.Calendar_Idx._text;
                              tempObj['quantity'] = tempCanteenOrder.Quantity._text;
                              tempObj['tempStartDatetime'] = new_order[iArr].CalendarRecord.DateTime._text;
                              if(tempCanteenOrder.Quantity._text == '0'){
                                tempObj['color'] = '#d93636';
                              }else{
                                tempObj['color'] = 'rgb(17, 17, 223)';
                              }
                              this.events.push(tempObj);
                            }
                            else
                                {
                                  index = 0;
                                  index = this.events.findIndex(elem => elem.Calendar_Idx === temp.CalendarRecord.Calendar_Idx._text);
                                  if(this.events[index].quantity == '0'){
                                    this.events[index].color = '#d93636';
                                    }else{
                                      this.events[index].color = 'rgb(17, 17, 223)';
                                  }
                                }
                                
                        }
                    }                    
                }

                if(this.events.length < 0){
                this.CalendarLoadingStatus = false;
                 }else{
                 this.CalendarLoadingStatus = true;
                }

            })
        },     
  },
  
  created(){
    if(this.username == null){
                this.$router.push("/login");
            }
    var month = moment().format('MM');
    var year = moment().format('YYYY');
    var day = '01';
    //var time = moment().format('')
    this.tempStartdate = year + "-" + month + "-" + day + " " + "00:00:00";
    this.tempEnddate = moment().add(moment().daysInMonth() - moment().format("DD"), "d").format("YYYY-MM-DD 23:59:59");
    this.GetAllOrder()
    tempthis = this;
  }
};
</script>

<style>
.loader {
  border: 16px solid #f3f3f3;
  border-radius: 50%;
  border-top: 16px solid rgb(17, 17, 223);
  width: 120px;
  height: 120px;
  -webkit-animation: spin 2s linear infinite; /* Safari */
  animation: spin 2s linear infinite;
}

/* Safari */
@-webkit-keyframes spin {
  0% { -webkit-transform: rotate(0deg); }
  100% { -webkit-transform: rotate(360deg); }
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

#Loading
{
position: fixed;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
}

.box {
    width: 20px;
    height: 20px;
    display: inline-block;
    vertical-align: middle;
}

.explanation {
    margin-left: 5px;
    vertical-align: middle;
}

#red {
    background-color:#d93636;
}
#blue {
    background-color: rgb(17, 17, 223);
}

</style>