<template>
  <div class="play-area">
    <h3>play</h3>
    <ul class="play-sheet"
      @dragover="onDragOver"
      @drop="onDrop" 
    >
      <li v-for="item in draggedList" v-bind:key="item">
        {{ item }}
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'PlayArea',
  components: {
  },
  props: {
    msg: String,
  },
  data: function(){
    return {
      isDragging: false,
      draggedList: [],
    }
  },
  computed: {
    ...mapState({
      draggedItem: 'draggedItem',
    }),
  },
  created : function(){
    this.$on("itemDrag", this.onItemDrag)
  },
  methods: {
    onDragOver : function(e){
      e.preventDefault()
    },

    onDrop : function(){
      if(this.draggedItem){
        this.draggedList.push(this.draggedItem);
      } 
    },

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.play-sheet {
  border: solid;
  width: 80px;
  height: 80%;
}
</style>
