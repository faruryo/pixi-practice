<template>
  <!-- <div id='external-events'> -->
  <div class='spot-list'>
    <ul class="play-sheet">
      <li v-for="(s, index) in schedule" v-bind:key="index">
        {{ s.start }}
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'scheduleView',
  components: {
  },
  props: {
  },
  computed: {
    ...mapState({
      schedule: 'schedule',
    }),
  },
  methods: {
    ...mapActions({
      setScheduleItem: 'setScheduleItem',
    }),

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
