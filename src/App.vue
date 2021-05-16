<template>
  <div id="app">
    <Appliances
      v-bind:usable="['frigo', 'oven', 'iron', 'chauffage']"
      v-bind:not_usable="['dishwasher', 'wmachine', 'car', 'baignoire']"
    />
  </div>
</template>

<script>
import Appliances from './components/Appliances';

export default {
  name: 'App',
  components: {
    Appliances
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
