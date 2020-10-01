<template>
  <div id="app">
    <div class="header">
      <img alt="IMDB logo" src="./assets/imdb.png" id="imdb-logo">
      <h1 v-bind:style="{'font-weight': 'bolder', 'color': 'lightsalmon'}" >Top Rated Movies</h1>
    </div>
    <template v-if="!isMovieListPresent">
      <div class="crawl-btn" @click="crawl"><button type="button" class="btn btn-primary ">Crawl IMDB</button></div>
    </template>
    <template v-else>
      <Home :movies="moviesArray" />
    </template>
  </div>
</template>

<script>
import axios from 'axios';
import Home from './components/Home.vue'

const API_URL = "http://localhost:8081/crawl";
export default {
  name: 'App',
  components: {
    Home
  },
  data() {
    return {
      isMovieListPresent: false,
    }
  },
  mounted() {
    try {
      /**
       * Conditionally checking for the presence of the JSON file [Dynamic import]
       */
      this.moviesArray = require('./../../../imdb-output.json') ? require('./../../../imdb-output.json').movies : [];
      this.component = "Home";
    } catch (e) {
      this.moviesArray = []
    }
  },
  methods: {
    crawl: function() {
      return axios.get(API_URL).then((res) => {
        this.moviesArray = res.data.movies;
        this.isMovieListPresent = true
      })
    }
  }
  
}
</script>

<style>
#app {
  background-color: antiquewhite;
}

#imdb-logo {
  width: 80px;
  height: 60px;
  margin: 1%;
}

.header {
    display: flex;
    align-items: center;
    justify-content: space-around;
}

.crawl-btn {
  display: flex;
  justify-content: center;
}
</style>
