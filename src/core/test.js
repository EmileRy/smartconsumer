const SmartConsumerCore = require("./core.js");

let appareils = SmartConsumerCore.getUsableDevices("Troyes")

appareils.forEach(appareil => {
    console.log(appareil.name);
})