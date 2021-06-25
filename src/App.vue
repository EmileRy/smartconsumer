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
      v-bind:isLoaded="isLoaded"
      v-bind:usable="this.usable"
      v-bind:not_usable="this.not_usable"
    />
  </div>
</template>

<script>
import Appliances from './components/Appliances';
import Weather from './components/Weather';
import Core from '../src/core/core';

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

      appareils: [],
      usable: [],
      not_usable: [],
    };
  },
  methods: {
    async setLocationName(name){
      this.locationName = name;
      console.log(name);

function fetch_retry(url, n) {
    return fetch(url).catch(function(error) {
        if (n === 1) throw error;
        return fetch_retry(url, n - 1);
    });
}
      let weatherResponse = null;
      weatherResponse = await fetch_retry(("http://api.openweathermap.org/data/2.5/weather?appid=cfe72599279e93c9239e58f6c82b29ab&q="+name),3);
      const weatherData = await weatherResponse.json();

      let waterResponse = null;
      waterResponse = await fetch_retry("https://hubeau.eaufrance.fr/api/v1/prelevements/chroniques?format=json&size=1&nom_commune="+name,3);
      const waterData = await waterResponse.json();

      let appareilsResponse = null;
        appareilsResponse = await fetch_retry("http://localhost:3000/api/appareils",3);
      const appareils = await appareilsResponse.json();

      let usableResponse = null;
        usableResponse = await fetch_retry("http://localhost:3000/api/location/"+name,3);
      const usable = await usableResponse.json();

      let notUsable = [];
      appareils.forEach(appareil => {
        var found = false;
        for(var i = 0; i < usable.length; i++) {
            if (usable[i].id == appareil.id) {
                found = true;
                break;
            }
        }
        if(!found){
          notUsable.push(appareil);
        }
      });

      this.usable = usable;
      this.not_usable = notUsable;

      this.weather = Core.getWeather(weatherData);
      this.degre = Core.getTemperature(weatherData);
      this.weatherIconUrl = Core.getWeatherIconURL(weatherData);
      this.water = Core.getWaterAvailability(waterData);

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
