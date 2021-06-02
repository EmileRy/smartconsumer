<template>
  <div id="right">
    <section id="not_loaded" v-if="!isLoaded">
      <p>Veuillez spécifier une ville</p>
    </section>
    <section id="usable" class="container" v-if="isLoaded">
    <h2>Utilisable maintenant</h2>
      <div class='img-container' v-for="appareil in usable" :key="appareil.id" :v-bind="appareil.id" :id="appareil.id+'-c'" v-bind:style="{order:setOrder(appareil.id)}">
        <img :src="require('../assets/image/' + appareil.image_name)" :alt="appareil.name" />
        <svg 
          xmlns="http://www.w3.org/2000/svg"
          viewBox="-10 -30 595 575"
          width="30"
          v-on:click="toggle_opacity(appareil.id)"
        >
          <path
            :id="appareil.id"
            fill="#FFE87C"
            stroke="black"
            stroke-width="60"
            :fill-opacity="setOpacity(appareil.id)"
            d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"
          ></path>
        </svg>
      </div>
    </section>

    <section id="not_usable" class="container" v-if="isLoaded">
      <h2>Attendre avant d'utiliser</h2>
      <div class='img-container' v-for="appareil in not_usable" :key="appareil.id" :v-bind="appareil.id" :id="appareil.id+'-c'" v-bind:style="{order:setOrder(appareil.id)}">
        <img :src="require('../assets/image/' + appareil.image_name)" :alt="appareil.name" />
        <svg 
          xmlns="http://www.w3.org/2000/svg"
          viewBox="-10 -30 595 575"
          width="30"
          v-on:click="toggle_opacity(appareil.id)"
        >
          <path
            :id="appareil.id"
            fill="#FFE87C"
            stroke="black"
            stroke-width="60"
            :fill-opacity="setOpacity(appareil.id)"
            d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"
          ></path>
        </svg>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "Appliances",
  props: {
    isLoaded: Boolean,
    usable: Array,
    not_usable: Array,
  },
  methods:{
    setOpacity(key){
      return this.$cookies.isKey(key)?1:0;
    },
    setOrder(key){
      return this.$cookies.isKey(key)?0:1;
    },
    toggle_opacity(e){
      let star = document.getElementById(e)
      let container = document.getElementById(e+'-c')
      if (star.style.fillOpacity == 0){
        star.style.fillOpacity = 1;
        this.$cookies.set(e,1);
        container.style.order = 0;
      }
      else{
        star.style.fillOpacity = 0;
        this.$cookies.remove(e);
        container.style.order = 1;
      }
    }
  }
};
</script>

<style scoped>
#right {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  flex-grow: 2;
  max-width: 1200px;
}
#usable {
  background: #d9ead3ff;
}
#not_usable {
  background: #f4ccccff;
}
img {
  padding: 40px;
  width: 150px;
}
.container {
  display: flex;
  flex-wrap: wrap;
  max-width: 460px;
  align-content: flex-start;
  justify-content: center;
  border: 5px solid black;
}
.img-container{
  position: relative;
  height: fit-content;
}
svg{
  position: absolute;
  bottom: 20px;
  right: 20px;
  cursor: pointer;
}
h2{
  text-align: center;
  width: 100%;
}
</style>