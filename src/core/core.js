const fetch = require("node-fetch");
const appareils = require('./appareils.json')

const SmartConsumerCore = {

    getUsableDevices(locationName){
        //const weatherData = this.getWeatherData(locationName);
        //const waterData = this.getWeatherData(locationName);
        
        //const electricityLevel = getSolarElectricityAvailabilityLevel(weatherData);
        //const waterLevel = this.getWaterAvailabilityLevel(waterData);
        const electricityLevel = 1;
        const waterLevel = 3;

        let result = [];

        appareils.forEach(appareil => {
            if(appareil.levels.electricity <= electricityLevel && appareil.levels.water <= waterLevel)
                result.push(appareil)
        })

        return result;
    },

    getWeatherData(locationName){
        fetch("http://api.openweathermap.org/data/2.5/weather?appid=cfe72599279e93c9239e58f6c82b29ab&q=" + locationName)
        .then(response => response.text())
        .then(data => {
            let json = JSON.parse(data);
            return json;
        });
    },

    getWeather(weatherData){
        return weatherData.weather[0].main;
    },

    getWeatherIconURL(weatherData){
        return "http://openweathermap.org/img/wn/" + weatherData.weather[0].icon + "@4x.png";
    },

    getTemperature(weatherData){
        return parseFloat(weatherData.main.temp - 273).toFixed();
    },

    getCloudiness(weatherData){
        return weatherData.clouds.all;
    },

    getWaterData(locationName){
        fetch("https://hubeau.eaufrance.fr/api/vbeta/prelevements/chroniques?format=json&size=1&nom_commune=" + locationName)
        .then(response => response.text())
        .then(data => {
            let json = JSON.parse(data);
            return json;
        });
    },

    getWaterAvailability(waterData){
        return waterData.data[0].libelle_qualification_volume
    },

    getWaterAvailabilityLevel(waterData){
        if(getWaterAvailability(waterData) == "Correcte")
            return 3;
        else
            return 0;
    },

    getSolarElectricityAvailabilityLevel(weatherData){
        var d = new Date();
        var n = d.getHours();
        if(d.getHours < 6 || d.getHours > 20)
            return 1;
        //const cloudiness = this.getCloudiness(weatherData);
        const cloudiness = 50;
        if(cloudiness < 20){
            return 3;
        } else if (cloudiness < 50){
            return 2;
        } else {
            return 1;
        }
    },

}

module.exports = SmartConsumerCore;