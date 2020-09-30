<template>
  <div class="container">
      <div class="d-flex justify-content-center h-100">
        <div class="search-bar" data-toggle="tooltip" data-placement="left" title="Possible searches on Title, Year, Actors, Directors and F">
          <input class="search-field" type="text" name="search" v-model="user_input" placeholder="Search Movies">
          <a href="#" class="search-icon"><i class="fas fa-search"></i></a>
        </div>
      </div>
      <div v-for="data in filteredMovies" :key="data._id">
      <div class="card flex-row flex-wrap">
          <div class="card-header border-0">
              <img :src="data.img_url" alt="data.title">
          </div>
          <div class="card-block px-4">
              <h2 class="card-title"><strong>{{data.title}}</strong> ({{data.year}})</h2>
              <p class="card-text">{{data.description}}</p>
              <p class="card-text"><strong> Directed By:</strong> {{data.director}}</p>
              <p class="card-text"><strong>Actors:</strong> {{data.actors}}</p>
          </div>
          <div class="w-100"></div>
          <div class="card-footer w-100 text-muted">
              <p class="card-text"><strong>Genre: </strong>{{data.genre}}</p>
              <p class="card-text"><strong>Ratings:</strong> {{data.ratings}}</p>
          </div>
      </div>
      <br>
    </div>
    </div>  
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      user_input: ''
    }
  },
  props: {
    movies: Array
  },
  computed: {
      filteredMovies:function(){
        const input = this.user_input.toLowerCase();
        return this.movies.filter((item) => {
           return (
              item.title.toLowerCase().indexOf(input) > -1 ||
              item.year.toLowerCase().indexOf(input) > -1 ||
              item.genre.toLowerCase().indexOf(input) > -1 ||
              // applying double-check on 'director' as its not consistent in all the existing movies.
              item.director && item.director.toLowerCase().indexOf(input) > -1 || 
              item.actors.toLowerCase().match(input)
            )       
        });
      }
    }
}
</script>

<style scoped>

.search-bar {
  border: double;
  margin-bottom: 1%;
}
.search-field {
  margin-right: 10px;
}

.card-block {
 background-color: azure;
}

.card-footer{
  display: flex;
  justify-content: space-between;
  background: border-box;
  height: 45px;
}
.search-icon {
  margin-right: 5px
 }
</style>
