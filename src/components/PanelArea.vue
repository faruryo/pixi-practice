<template>
  <div class="panel-area">
    <h3>panel</h3>
    <ul @dragstart="onDragStart"
      @dragend="dragEnd">
      <li class="panel-parts" draggable="true" value="up">↑UP</li>
      <li class="panel-parts" draggable="true" value="down">↓DOWN</li>
      <li class="panel-parts" draggable="true" value="left">←LEFT</li>
      <li class="panel-parts" draggable="true" value="right">→RIGHT</li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'PanelArea',
  components: {
  },
  props: {
    msg: String
  },
  data: function(){
    return {
      isDragging: false,
    }
  },
  computed: {
    ...mapState({
      draggedItem: 'draggedItem',
    }),
  },
  methods: {
    ...mapActions({
      saveDraggedItem: 'saveDraggedItem',
    }),
    onDragStart : function(e){
      this.isDragging = true;
      this.$store.dispatch("saveDraggedItem", e.target.getAttribute("value"))

    },
    dragEnd : function(){
      this.isDragging = false;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.panel-parts {
  border: solid;
}

</style>
