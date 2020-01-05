<template>
  <div id="full-calendar"> 
    <button class="push-button" @click="pushButton">show events</button>
    <FullCalendar id="full-calendar" ref="fullCalendar"
    defaultView="timeGridDay" :plugins="calendarPlugins"
    :height="fcHeight" :allDaySlot="true" :editable="true" 
    :events="events" @eventPositioned="eventRender"
    />
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
        { title: 'spotA', start: '2020-01-06T10:45:00', end: '2020-01-06T12:45:00'},
      ],
    }
  },
  props: {
  },
  computed: {
  },
  mounted() {
    var containerEl = document.getElementsByClassName('spot-list');

    new Draggable(containerEl[0], {
      itemSelector:  '.fc-event',
      eventData: function(eventEl) {
        return {
          title: eventEl.innerText,
          duration: '01:00'
        };
      }
    })
  },
  methods: {
    ...mapActions({
      setScheduleItem: 'setScheduleItem',
      setIsEventCtl: 'setIsEventCtl',
      setCtlingEvent: 'setCtlingEvent',
    }),

    pushButton() {
      let calendarApi = this.$refs.fullCalendar.getApi();
      this.$store.dispatch("setScheduleItem", calendarApi.getEvents());
    },

    eventRender(info) {
      let targets = info.el.getElementsByClassName("fc-time");
      for(let i = 0; i < targets.length; i++){
        targets[i].addEventListener("click",() => {
          this.$store.dispatch("setIsEventCtl", true);
          this.$store.dispatch("setCtlingEvent", info.event);
        }, false);
      }
    },
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
