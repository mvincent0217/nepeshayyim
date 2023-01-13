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
import Vue from 'vue'
import FullCalendar from "vue-full-calendar";
import "fullcalendar/dist/fullcalendar.min.css";
Vue.use(FullCalendar);
export default {
 // name: "hello",
  data() {
    return {

      events: [
        // {
        //   title: "est",
        //   allDay: true,
        //   start: moment(),
        //   end: moment().add(1, "d"),
        //   url: "google.com",
        // },
        // {
        //   title: "est",
        //   allDay: true,
        //   start: moment(),
        //   end: moment().add(1, "d"),
        //   url: "google.com",
        // },
      ],
      eventClick: function () {},
      config: {
        defaultView: "month",
        eventRender: function (event) {
          console.log(event);
        },
      },
    };
  },
  methods:{
    createCalendarRecords(){
      for(var iCal =0; iCal<=25; iCal++){
        var tempObj = {};
        tempObj['title'] = iCal+'PM';
        tempObj['allDay'] = true;
        tempObj['start'] = moment().add(iCal, "d");
        tempObj['end'] = moment().add(iCal, "d");
        this.events.push(tempObj);
      }
    }
  },
  created(){
    this.createCalendarRecords();
  }
};
</script>