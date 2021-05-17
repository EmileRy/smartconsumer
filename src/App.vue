<template>
  <div id="app">
    <Weather v-bind:weatherFrom="'Sun'" />
    <Appliances
      v-bind:usable="['frigo', 'oven', 'iron', 'chauffage']"
      v-bind:not_usable="['dishwasher', 'wmachine', 'car', 'baignoire']"
    />
  </div>
</template>

<script>
import Appliances from './components/Appliances';
import Weather from './components/Weather';
export default {
  name: 'App',
  components: {
    Appliances,
    Weather
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
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
}
body{
  background-color: #e2e7e9;
}
</style>
