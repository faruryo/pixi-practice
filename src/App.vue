<template>
  <div id="app">
    <h2>HelloPixi</h2>
    <HelloPixi msg="Welcome to Your Pixi.js App"/>
    <h2>MoveLogo</h2>
    <MoveLogo />
  </div>
</template>

<script>
import HelloPixi from './components/HelloPixi.vue'
import MoveLogo from './components/MoveLogo.vue'

export default {
  name: 'app',
  components: {
    HelloPixi,
    MoveLogo
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
