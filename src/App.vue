<template>
  <div id="app">
    <h2>HelloPixi</h2>
    <HelloPixi msg="Welcome to Your Pixi.js App"/>
    <h2>MoveLogo</h2>
    <MoveLogo />
    <h2>CharacterAnimation</h2>
    <CharacterAnimation />
    <h2>CharacterMovement</h2>
    <CharacterMovement />
    <h2>CharacterMovement2</h2>
    <CharacterMovement2 />
  </div>
</template>

<script>
import HelloPixi from './components/HelloPixi.vue'
import MoveLogo from './components/MoveLogo.vue'
import CharacterAnimation from './components/CharacterAnimation.vue'
import CharacterMovement from './components/CharacterMovement.vue'
import CharacterMovement2 from './components/CharacterMovement2.vue'

export default {
  name: 'app',
  components: {
    HelloPixi,
    MoveLogo,
    CharacterAnimation,
    CharacterMovement,
    CharacterMovement2
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
