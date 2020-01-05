<template>
  <div class='event-ctl'>
    <input type="time" :value="ctlingStart" @change="onChangeStart" />
    <input type="time" :value="ctlingEnd" @change="onChangeEnd" />
    <button @click="changeTime">change</button>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import moment from 'moment';

export default {
  name: 'eventCtl',
  components: {
  },
  data() {
    return {
      startTime: null,
      endTime: null,
    }
  },
  updated() {
    this.startTime = null;
    this.endTime = null;
  },
  computed: {
    ...mapState({
      ctlingEvent: 'ctlingEvent',
    }),

    ctlingStart() {
      return moment(this.ctlingEvent.start).format("HH:mm");
    },

    ctlingEnd() {
      return moment(this.ctlingEvent.end).format("HH:mm");
    },

  },
  methods: {
    ...mapActions({
      setDateCtlingEvent: 'setDateCtlingEvent',
    }),

    onChangeStart(event) {
      this.startTime = event.target.value
    },

    onChangeEnd(event) {
      this.endTime = event.target.value
    },

    changeTime() {
      let event = this.ctlingEvent;

      let start = event.start;
      if (this.startTime){
        let splitStartTime = this.startTime.split(':');
        start = moment(event.start).hour(splitStartTime[0]).minutes(splitStartTime[1]).format('YYYY-MM-DDTHH:mm:ss');
      }

      let end = event.end;
      if (this.endTime){
        let splitEndTime = this.endTime.split(':');
        end = moment(event.end).hour(splitEndTime[0]).minutes(splitEndTime[1]).format('YYYY-MM-DDTHH:mm:ss');
      }

      event.setDates(start, end);
      this.$store.dispatch("setCtlingEvent", event);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.event-ctl {
  display: flex;
}

</style>
