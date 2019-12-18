<template>
  <FullCalendar defaultView="timeGridDay" :plugins="calendarPlugins"
  :height="parent" :allDaySlot="false" :editable="true" 
  :events="[
    { title: 'event 1', startTime: '10:45:00', endTime: '12:45:00', overlap: false},
    { title: 'event 2', startTime: '12:45:00', endTime: '13:15:00', overlap: true, rendering: 'background'},
    { title: 'event 3', startTime: '13:15:00', endTime: '14:00:00', overlap: false}

  ]" />
</template>

<script>
import { mapState } from 'vuex';

import FullCalendar from '@fullcalendar/vue'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin, { Draggable } from '@fullcalendar/interaction';

import '@fullcalendar/core/main.css';
import '@fullcalendar/timegrid/main.css';

export default {
  name: 'Calendar',
  components: {
    FullCalendar,
  },
  data() {
    return {
      calendarPlugins: [ timeGridPlugin, interactionPlugin ]
    }
  },
  props: {
  },
  computed: {
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.calendar-sample-area {
  width: 100%;
  /* height: 400px; */
  /* margin: 20px; */
  background-color: lightblue;
}

</style>
