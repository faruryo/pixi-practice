<template>
  <div id="full-calendar"> 
    <button class="push-button" @click="pushButton">show events</button>
    <FullCalendar id="full-calendar" ref="fullCalendar"
    defaultView="timeGridDay" :plugins="calendarPlugins"
    :height="fcHeight" :allDaySlot="true" :editable="true" 
    :events="events" />
  </div>
</template>

<script>
import { mapActions } from 'vuex';
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
      calendarPlugins: [ timeGridPlugin, interactionPlugin ],
      fcHeight: "parent",
      events: [
        { title: 'spotA', start: '2019-12-22T10:45:00', end: '2019-12-22T12:45:00', overlap: true},
        { title: 'move', start: '2019-12-22T12:45:00', end: '2019-12-22T13:15:00', overlap: true, rendering: 'background'},
        { title: 'spotB', start: '2019-12-22 13:15:00', end: '2019-12-22 14:00:00', overlap: true},
        { title: 'move', start: '2019-12-22T14:00:00', end: '2019-12-22T15:00:00', overlap: true, rendering: 'background'},
        { title: 'spotC', start: '2019-12-22T15:00:00', end: '2019-12-22T16:00:00', overlap: true},
      ]
    }
  },
  props: {
  },
  computed: {
  },
  mounted() {
    // var containerEl = document.getElementById('external-events');
    var containerEl = document.getElementsByClassName('spot-list');

    new Draggable(containerEl[0], {
      itemSelector:  '.fc-event',
      eventData: function(eventEl) {
        return {
          title: eventEl.innerText
        };
      }
    })
  },
  methods: {
    ...mapActions({
      setScheduleItem: 'setScheduleItem',
    }),

    pushButton() {
      // let calendarApi = this.$refs.fullCalendar.getApi();
      // let calendarApi = document.getElementById('full-calendar').$refs.fullCalendar;
      let calendarApi = this.$refs.fullCalendar.getApi();
      this.$store.dispatch("setScheduleItem", calendarApi.getEvents());
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

#full-calendar {
  flex-direction: column;
  width: 400px;
  background-color: lightblue;
}

.push-button {
  width: 100px;
  height: 30px;
  margin: 10px;
}

</style>
