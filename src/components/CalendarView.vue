<template>
  <body>
    <br>
    <br>
    <br>
  <full-calendar :config="config" :events="events" />
</body>
</template>

<script>
import moment from "moment";
import axios from "axios";
import Vue from 'vue'
import FullCalendar from "vue-full-calendar";
import "fullcalendar/dist/fullcalendar.min.css";
Vue.use(FullCalendar);
export default {
 // name: "hello",
  data() {
    return {
      ttempstartdate: null,
      ttempenddate: null,
      


      events: [

      ],
      config: {
        defaultView: "month",
        eventRender: function () {
    
        },
        eventClick: function (event) {
            console.log(event.url);
        //window.open(event.url);

        }
      },
    };
  },
  methods:{

    GetCanteenCalendarIdx(){
      var attempstartdate = moment().format('YYYY-MM-DD');
      var attempenddate = moment().add(10,'weeks').format('YYYY-MM-DD');
      this.ttempstartdate = attempstartdate;
      this.ttempenddate = attempenddate;
            var convert = require('xml-js');
            axios.post("https://canteen.nepeshayyim.com/Decatech/BRM_Canteen_Web/GetCanteenCalendarRecords?startdate="+ attempstartdate + "&enddate=" + attempenddate ).then(response => {
                var result = convert.xml2json(response.data,
               {compact: true, spaces: 4});
               result = JSON.parse(result);
               console.log(result);
               var arCanteenCalendarRecord = [];
               arCanteenCalendarRecord = result.ArrayOfCanteenCalendarRecord.CanteenCalendarRecord;
               for(var iCCR = 0; iCCR < arCanteenCalendarRecord.length; iCCR++){

                //var tempStartDate = moment(arCanteenCalendarRecord[iCCR].StartDateTime._text).format('HH:mm:ss');
                //var tempEndDate = moment(arCanteenCalendarRecord[iCCR].EndDateTime._text).format('HH:mm:ss');
                
                var tempObj = {};
      
                //tempObj['allDay'] = true;
                tempObj['start'] = arCanteenCalendarRecord[iCCR].StartDateTime._text;
                tempObj['Calendar_Idx'] = arCanteenCalendarRecord[iCCR].Calendar_Idx._text;
                //tempObj['end'] = tempEndDate;
                tempObj['url'] = '#/ViewMenu';
                this.events.push(tempObj);
                //localStorage['Calendar_Idx'] = arCanteenCalendarRecord[iCCR].Calendar_Idx._text;

               }
            })
        },


        



    // createCalendarRecords(){
    //   for(var iCal =0; iCal<=14; iCal++){
    //     var tempObj = {};
    //     tempObj['title'] = iCal+'PM';
    //     tempObj['allDay'] = true;
    //     tempObj['start'] = moment().add(iCal, "d");
    //     tempObj['end'] = moment().add(iCal, "d");
    //     this.events.push(tempObj);
    //   }
    //   console.log(tempObj);
    // }
  },
  created(){
   // this.createCalendarRecords();
   this.GetCanteenCalendarIdx()

  }
};
</script>