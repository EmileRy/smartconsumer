<template>
  <div id="left">
    <div id="searchBox">
      <input type="text" v-model="textHolder" />
      <img src="../assets/image/search.png" id="search" @click="location"/>
    </div>
    <div id="weather" v-if="isLoaded">
      <div id="weatherImg">
        <img
          :src="weatherIconUrl"
          id="image"
        />
      </div>
      <div id="weatherDetail">
        <div id="weatherDegre">{{ degre }}°C</div>
        <div id="weatherText">{{ weather }}</div>
      </div>
    </div>
    <div id="water" v-if="isLoaded">
      <div id="waterImg">
        <img src="../assets/image/Water.png" id="image" />
      </div>
      <div id="waterDetail">
        <div id="waterText">Quantité d'eau</div>
        <div id="detailWaterText">{{ water }}</div>
      </div>
    </div>
  </div>
</template>
<script>

//import Core from "../core/core.js";

export default {
 devServer: {
    proxy: 'http://localhost:8080'
  },
  name: "Weather",
  props: ["isLoaded", "weather", "weatherIconUrl", "degre", "water"],
  data: function () {
    return {
      textHolder: "Troyes"
    };
  },
 
 async created() {
  
},
  methods: {
    async location() {
      /*const weatherResponse = await fetch("http://api.openweathermap.org/data/2.5/weather?appid=cfe72599279e93c9239e58f6c82b29ab&q="+this.textHolder);
      const weatherData = await weatherResponse.json();

      const waterResponse = await fetch("https://hubeau.eaufrance.fr/api/vbeta/prelevements/chroniques?format=json&size=1&nom_commune="+this.textHolder);
      const waterData = await waterResponse.json();

      this.weather = Core.getWeather(weatherData);
      this.degre = Core.getTemperature(weatherData);
      this.weatherIconUrl = Core.getWeatherIconURL(weatherData);
      this.detailWaterText = Core.getWaterAvailability(waterData);

      let appareils = Core.getUsableDevices(weatherData);
      appareils.forEach(element => {
        console.log(element);
      });*/
      this.$emit("setLocationName", this.textHolder);
    },
},

watch:{
    isLoaded(newValue) {
      if (newValue == true) {
        console.log("OKKKKK")
        console.log(this.weather)
      }
    }
  },
};
</script>


<style scoped>
#left{
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
  height: 460px;
}
#searchBox {
  display: flex;
  justify-content: center;
  align-items: center;
}
#searchBox > input {
  height: 50px;
  width: 350px;
  border-radius: 5px;
}
#search {
  position: absolute;
  transform: translateX(155px);
  height: 25px;
  width: 25px;
}
#weather,
#water {
  padding-left: 50px;
  display: flex;
  width: 100%;
}
#weatherImg,
#waterImg {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 150px;
}
#image {
  width: 140px;
  height: 140px;
  border-radius: 50%;
}
#weatherDetail,
#waterDetail {
  flex: 1;
  display: flex;
  flex-direction: column;
}
#weatherDegre {
  padding-left: 10px;
  padding-top: 20px;
  font-size: 50px;
}
#waterText {
  padding-left: 10px;
  padding-top: 30px;
  font-size: 30px;
}
#weatherText,
#detailWaterText {
  padding-left: 10px;
  font-size: 20px;
}
</style>