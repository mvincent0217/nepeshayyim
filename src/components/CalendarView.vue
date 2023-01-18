<template>
  <body>
    
    <br>
    <br>
    <br>
    <h3 class="display-5 mb-2 text-center">Superstar Canteen Calendar</h3>
    <p class="display-7 mb-2 text-center"><b>Reserve your food here!</b></p>
    <div class="row justify-content-left m-2">
    <div class="card" style="width: 18rem;">
    <label class="text-center"><b>Legend</b></label>
    <label class="text-center"><span>🟦Reserved</span>&nbsp;&nbsp;<span>🟥For Reservation</span></label>
    </div>
    </div>
    <br>
    <br>
  <full-calendar :config="config" :events="events" ></full-calendar>
  
</body>
</template>

<script>
import moment from "moment";
import axios from "axios";
//import { FullCalendar } from "vue-full-calendar";
import "fullcalendar/dist/fullcalendar.min.css";

var transfer;

function execTransfer(event){
  window.localStorage.setItem('oFoodMenu',JSON.stringify({'oCalendarIdx':event.Calendar_Idx,'oCalendarStart':event.start._i, 'oCalendarQuantity':event.quantity, 'oCalendarTempStartDate':event.tempStartDate}))
  transfer.$router.push({
            name: 'ViewMenu',
          })
}

export default {
  components:{
    //FullCalendar
  },
  data() {
    return {
      orders: [],
      username: window.localStorage.getItem("username"),
      tempStartdate: null,
      tempEnddate: null,
      events: [

      ],
      config: {
        showNonCurrentDates: false,
        defaultView: "month",
        eventRender: function () {
          
        },
        eventClick: function (event) {
          execTransfer(event);
            console.log(event);
        //window.open(event.url);
        }
      },
    };
  },
  methods:{

    // GetCanteenCalendarIdx(){
    //   var attempstartdate = moment().format('YYYY-MM-DD');
    //   var attempenddate = moment().add(1,'year').format('YYYY-MM-DD');
    //   this.ttempstartdate = attempstartdate;
    //   this.ttempenddate = attempenddate;
    //         var convert = require('xml-js');
    //         axios.post("https://canteen.nepeshayyim.com/Decatech/BRM_Canteen_Web/GetCanteenCalendarRecords?startdate="+ attempstartdate + "&enddate=" + attempenddate ).then(response => {
    //             var result = convert.xml2json(response.data,
    //            {compact: true, spaces: 4});
    //            result = JSON.parse(result);
    //            console.log(result);
    //            var arCanteenCalendarRecord = [];
    //            arCanteenCalendarRecord = result.ArrayOfCanteenCalendarRecord.CanteenCalendarRecord;
    //            for(var iCCR = 0; iCCR < arCanteenCalendarRecord.length; iCCR++){

    //             //var tempStartDate = moment(arCanteenCalendarRecord[iCCR].StartDateTime._text).format('HH:mm:ss');
    //             //var tempEndDate = moment(arCanteenCalendarRecord[iCCR].EndDateTime._text).format('HH:mm:ss');
                
    //             var tempObj = {};
      
    //             //tempObj['allDay'] = true;
    //             tempObj['start'] = arCanteenCalendarRecord[iCCR].StartDateTime._text;
    //             tempObj['Calendar_Idx'] = arCanteenCalendarRecord[iCCR].Calendar_Idx._text;
    //             if(this.orders.includes(arCanteenCalendarRecord[iCCR].Calendar_Idx._text))
    //             {
    //               tempObj['color'] = 'green';
    //             }else
    //             {
    //               tempObj['color'] = 'red';
    //             }
    //             //tempObj['end'] = tempEndDate;
    //             // tempObj['url'] = '#/ViewMenu';
    //             this.events.push(tempObj);

    //            }
    //         })
    //     },

        GetAllOrder(){
            var convert = require('xml-js');
            axios.post("https://canteen.nepeshayyim.com/Decatech/BRM_Canteen_Web/GetAllCanteenOrders?username=" + this.username + "&startdate=" + this.tempStartdate + "&enddate=" + this.tempEnddate).then(response => {
                var result = convert.xml2json(response.data,
               {compact: true, spaces: 4});
                var orders = JSON.parse(result);
                var tempObj = {};
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
                                if(!this.orders.includes(temp.CalendarRecord.Calendar_Idx._text)){
                                  this.orders.push(temp.CalendarRecord.Calendar_Idx._text);
                                  tempObj = {};
                                  tempObj['start'] = temp.CalendarRecord.StartDateTime._text;
                                  tempObj['Calendar_Idx'] = temp.CalendarRecord.Calendar_Idx._text;
                                  tempObj['quantity'] = tempOrderList.CanteenOrderItem.Quantity._text;
                                  if(tempOrderList.CanteenOrderItem.Quantity._text == '0'){
                                    tempObj['color'] = '#d93636';
                                    }else{
                                    tempObj['color'] = 'blue';
                                  }
                                  tempObj['tempStartDate'] = this.tempStartdate;
                                  this.events.push(tempObj);
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
                                    tempObj['quantity'] = tempCanteenOrder.Quantity._text
                                    if(tempCanteenOrder.Quantity._text == '0'){
                                      tempObj['color'] = '#d93636';
                                    }else{
                                      tempObj['color'] = 'blue';
                                    }
                                    this.events.push(tempObj);
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
                              tempObj['quantity'] = tempCanteenOrder.Quantity._text
                              if(tempCanteenOrder.Quantity._text == '0'){
                                tempObj['color'] = '#d93636';
                              }else{
                                tempObj['color'] = 'blue';
                              }
                              this.events.push(tempObj);
                            }
                                
                        }
                    }                    
                }
                console.log(this.orders)
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
    this.tempStartdate = year + "-" + month + "-" + day + " " + "00:00:00";
    this.tempEnddate = moment().add(moment().daysInMonth() - moment().format("DD"), "d").format("YYYY-MM-DD 23:59:59");
   this.GetAllOrder()
   console.log(this.tempEnddate)
   transfer = this;
  }
};
</script>

<style>
</style>