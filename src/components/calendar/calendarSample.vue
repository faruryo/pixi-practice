<template>
  <div class="calendar-sample-area">
    <calendar />
    <div style="display: flex; flex-direction: column;">
      <spotList />
      <event-ctl v-if="isEventCtl" />
    </div>
    <scheduleView />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import calendar from './calendar.vue'
import spotList from './spotList.vue'
import scheduleView from './scheduleView.vue'
import eventCtl from './eventCtl.vue'

export default {
  name: 'CalendarSample',
  components: {
    calendar,
    spotList,
    scheduleView,
    eventCtl,
  },
  props: {
  },
  computed: {
    ...mapState({
      isEventCtl: 'isEventCtl',
    }),
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.calendar-sample-area {
  display: flex;
  width: 100%;
  height: 600px;
  /* margin: 20px; */
  background-color: lightblue;
}

</style>
