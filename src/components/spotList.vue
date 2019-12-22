<template>
  <!-- <div id='external-events'> -->
  <div class='spot-list'>

    <p>
      <strong>スポット一覧</strong>
    </p>
    <div class='fc-event'>
      <span>spotD</span>
      <img src="../../img/furit_mark15_momo.png" width="30" height="30"/>
    </div>
    <div class='fc-event'>
      <span>spotE</span>
      <img src="../../img/furit_mark15_momo.png" width="30" height="30"/>
    </div>
    <div class='fc-event'>
      <span>spotF</span>
      <img src="../../img/furit_mark15_momo.png" width="30" height="30"/>
    </div>
    <div class='fc-event'>spotG</div>
    <div class='fc-event'>spotH</div>
    <div class='fc-event'>spotI</div>
    <p>
      <input type='checkbox' id='drop-remove' />
      <label for='drop-remove'>remove after drop</label>
    </p>
  </div>
</template>

<script>
// import { mapState } from 'vuex';

export default {
  name: 'spotList',
  components: {
  },
  props: {
  },
  computed: {
  },
  methods: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.spot-list {
  display: flex;
  flex-direction: column;
  width: 50%;
  height: 600px;
  /* margin: 20px; */
  background-color: lightblue;
}

.fc-event {
  display: flex;
  justify-content: center;
  align-items: center;
}

</style>
