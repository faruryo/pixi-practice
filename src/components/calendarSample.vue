<template>
  <div class="calendar-sample-area">
    <calendar />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import calendar from './calendar.vue'

export default {
  name: 'CalendarSample',
  components: {
    calendar,
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
  display: flex;
  width: 100%;
  /* height: 400px; */
  /* margin: 20px; */
  background-color: lightblue;
}

</style>
