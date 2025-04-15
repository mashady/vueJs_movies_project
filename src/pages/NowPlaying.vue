<template>
  <div class="container mt-5 pt-5">
    <h2 class="mb-4">Now Playing</h2>
    
    <div v-if="movieStore.loading" class="text-center my-5">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
    
    <div v-if="movieStore.error" class="alert alert-danger">
      Error: {{ movieStore.error.message }}
    </div>
    
    <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
      <div v-for="movie in limitedResults" :key="movie.id" class="col">
        <div class="card h-100 shadow-sm">
          <img
            :src="movie.poster_path ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : 'https://via.placeholder.com/500x750?text=No+Poster'"
            class="card-img-top"
            :alt="movie.title + ' Poster'"
          >
          <div class="card-body">
            <h5 class="card-title">{{ movie.title }}</h5>
            <p class="card-text text-muted">
              <small>{{ formatDate(movie.release_date) }}</small>
            </p>
            <div class="d-flex justify-content-between align-items-center">
              <span class="badge bg-primary">{{ movie.vote_average.toFixed(1) }}</span>
              <button class="btn btn-sm btn-outline-primary" @click="viewDetails(movie.id)">
                Details
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useMovieStore } from '../stores/movieStore'

const movieStore = useMovieStore()
const router = useRouter()

onMounted(() => {
  movieStore.fetchMovies('now_playing')
})

const limitedResults = computed(() => movieStore.results.slice(0, 4))

const formatDate = (dateString) => {
  if (!dateString) return 'Unknown date'
  const options = { year: 'numeric', month: 'short', day: 'numeric' }
  return new Date(dateString).toLocaleDateString('en-US', options)
}

const viewDetails = (movieId) => {
  router.push({ name: 'MovieDetails', params: { id: movieId } })
}
</script>

<style scoped>
.card {
  transition: transform 0.2s;
}
.card:hover {
  transform: translateY(-5px);
}
.card-img-top {
  height: 375px;
  object-fit: cover;
}
</style>