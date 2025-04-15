<template>
  <div class="container mt-4">
    <h2 class="mb-3">Now Playing</h2>

    <div v-if="movieStore.error" class="alert alert-danger">
      {{ movieStore.error.message }}
    </div>

    <div class="row g-3">
      <div
        v-for="movie in limitedResults"
        :key="movie.id"
        class="col-sm-6 col-md-4 col-lg-3"
      >
        <div class="card h-100">
          <img
            :src="`https://image.tmdb.org/t/p/w500/${movie.poster_path}`"
            class="card-img-top"
            alt="Movie Poster"
          />
          <div class="card-body">
            <h5 class="card-title">{{ movie.title }}</h5>
            <p class="card-text">{{ movie.release_date }}</p>

            <DatePicker
  :event-data="{ title: movie.title }"
/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useMovieStore } from '../stores/movieStore'
import DatePicker from '../components/DatePicker.vue'

const movieStore = useMovieStore()

onMounted(() => {
  movieStore.fetchMovies('now_playing')
})

const limitedResults = computed(() => movieStore.results.slice(0, 4))



</script>
