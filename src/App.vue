<template>
  <div id="app">
    <HelloPixi msg="Welcome to Your Pixi.js App"/>
  </div>
</template>

<script>
import HelloPixi from './components/HelloPixi.vue'

export default {
  name: 'app',
  components: {
    HelloPixi
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
