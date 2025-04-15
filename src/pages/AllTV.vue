<template>
    <div class="container-fluid bg-dark min-vh-100 py-4">
      <h2 class="text-light text-center mb-3">All TV Shows</h2>
      <SearchBar @search="handleSearch" />
      
      <div class="container">
        <div class="row justify-content-center">
          <MovieCard
            v-for="movie in filteredMovies"
            :key="movie.id"
            :movie="movie"
          />
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, computed } from 'vue'
  import { useMovieStore } from '../stores/movieStore'
  import SearchBar from '../components/SearchBar.vue'
  import MovieCard from '../components/MovieCard.vue'
  
  const movieStore = useMovieStore()
  const searchTerm = ref('')
  
  onMounted(() => {
    movieStore.fetchMovies('popular', 'tv')
  })
  
  const handleSearch = (value) => {
    searchTerm.value = value.toLowerCase()
  }
  
  const filteredMovies = computed(() =>
    movieStore.results.filter((movie) =>
      (movie.title || movie.name).toLowerCase().includes(searchTerm.value)
    )
  )
  </script>
  