<template>
  <div id="app">
    <Weather 
      v-bind:isLoaded="isLoaded"
      v-bind:weather="weather"
      v-bind:weatherIconUrl="weatherIconUrl"
      v-bind:degre="degre"
      v-bind:water="water"
      @setLocationName="setLocationName" />
    <Appliances
      v-bind:usable="this.usable"
      v-bind:not_usable="this.not_usable"
    />
  </div>
</template>

<script>
import Appliances from './components/Appliances';
import Weather from './components/Weather';
import Core from "./core/core.js";

export default {
  name: 'App',
  components: {
    Appliances,
    Weather
  },
  data: function () {
    return {
      locationName: "",
      isLoaded: false,

      weather: "",
      degre: "",
      water: "",

      appareils: require('./core/appareils.json'),
      usable: [],
      not_usable: [],
    };
  },
  methods: {
    async setLocationName(name){
      this.locationName = name;
      console.log(name);

      const weatherResponse = await fetch("http://api.openweathermap.org/data/2.5/weather?appid=cfe72599279e93c9239e58f6c82b29ab&q="+name);
      const weatherData = await weatherResponse.json();

      const waterResponse = await fetch("https://hubeau.eaufrance.fr/api/vbeta/prelevements/chroniques?format=json&size=1&nom_commune="+name);
      const waterData = await waterResponse.json();

      this.weather = Core.getWeather(weatherData);
      this.degre = Core.getTemperature(weatherData);
      this.weatherIconUrl = Core.getWeatherIconURL(weatherData);
      this.water = Core.getWaterAvailability(waterData);

      this.usable = Core.getUsableDevices(weatherData, waterData);
      this.not_usable = this.appareils.filter( ( el ) => !this.usable.includes( el ) );

      this.isLoaded = true;
    }
  }
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
