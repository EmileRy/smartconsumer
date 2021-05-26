<template>
  <div id="left">
    <div id="searchBox">
      <input type="text" v-model="textHolder" />
      <img src="../assets/image/search.png" id="search" @click="location"/>
    </div>
    <div id="weather">
      <div id="weatherImg">
        <img
          src="../assets/image/Sun.png"
          id="image"
          v-if="weatherIcon === 'Sun'"
        />
      </div>
      <div id="weatherDetail">
        <div id="weatherDegre">{{ degre }}°C</div>
        <div id="weatherText">{{ weather }}</div>
      </div>
    </div>
    <div id="water">
      <div id="waterImg">
        <img src="../assets/image/Water.png" id="image" />
      </div>
      <div id="waterDetail">
        <div id="waterText">{{ waterText }}</div>
        <div id="detailWaterText">{{ detailWaterText }}</div>
      </div>
    </div>
  </div>
</template>
<script>


export default {
 devServer: {
    proxy: 'http://localhost:8080'
  },
  name: "Weather",
  props: ["weatherFrom"],
  data: function () {
    return {
      textHolder: "Troyes",
      weather: "Ensoleillé",
      degre: "17",
      waterText: "Pas d'eau",
      detailWaterText: "Nappes vides",
      weatherIcon: this.weatherFrom,
      isLoaded : false
    };
  },
 
 async created() {
  
},
  methods: {
    
     async location() {
    const response = await fetch("http://api.openweathermap.org/data/2.5/weather?appid=cfe72599279e93c9239e58f6c82b29ab&q="+this.textHolder);
  const data = await response.json();
  console.log("OK FETCH")
  this.weather = data.weather[0].main;
    this.degre = parseFloat(data.main.temp - 273).toFixed();

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