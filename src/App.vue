<template>
  <div id="app">
    <h1>otamesi murata3</h1>
    <router-view />
    <router-link tag="li" to="/HelloPixi">
      <a>HelloPixi</a>
    </router-link>
    <router-link tag="li" to="/MoveLogo">
      <a>MoveLogo</a>
    </router-link>
    <router-link tag="li" to="/CharacterAnimation">
      <a>CharacterAnimation</a>
    </router-link>
    <router-link tag="li" to="/CharacterMovement">
      <a>CharacterMovement</a>
    </router-link>
    <router-link tag="li" to="/CharacterMovement2">
      <a>CharacterMovement2</a>
    </router-link>
    <router-link tag="li" to="/CharacterMovement3">
      <a>CharacterMovement3</a>
    </router-link>
    <router-link tag="li" to="/BattleEffect1">
      <a>BattleEffect1</a>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "app",
  components: {}
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
