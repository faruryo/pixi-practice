<template>
  <div class="sandbox-area">
    <div>{{ message }}</div>
    <div class="control">
      <PlayArea />
      <PanelArea />
    </div>
    <CharacterAnimation />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import PlayArea from './PlayArea.vue';
import PanelArea from './PanelArea.vue';
import CharacterAnimation from './CharacterAnimation.vue';

export default {
  name: 'Sandbox',
  components: {
    PlayArea,
    PanelArea,
    CharacterAnimation,
  },
  props: {
    msg: String
  },
  computed: {
    ...mapState({
      message: 'message',
    }),
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.sandbox-area {
  display: flex;
  width: 100%;
  /* height: 400px; */
  margin: 20px;
}

.control {
  display: flex;
  background-color: wheat;
}
</style>
