<template>
  <div class="container-fluid bg-dark min-vh-100 py-4">
    <h2 class="text-light text-center mb-3">Top Rated Movies</h2>

    <!-- Search Bar -->
    <SearchBar @search="handleSearch" />

    <div v-if="movieStore.loading" class="text-center text-light my-5">
      <div class="spinner-border text-light" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>

    <div v-else-if="movieStore.error" class="alert alert-danger text-center">
      Error: {{ movieStore.error.message }}
    </div>

    <div class="container">
      <div class="row justify-content-center">
        <!-- استدعاء الكومبوننت Card لكل فيلم -->
        <MovieCard
          v-for="movie in filteredMovies"
          :key="movie.id"
          :movie="movie"
        />
      </div>

      <!-- Pagination -->
      <nav class="d-flex justify-content-center mt-4">
        <ul class="pagination pagination-dark">
          <li
            class="page-item"
            :class="{ disabled: currentPage === 1 }"
            @click="goToPage(currentPage - 1)"
          >
            <a class="page-link bg-dark text-light border-light" href="#">Previous</a>
          </li>
          <li class="page-item disabled">
            <span class="page-link bg-dark text-light border-light">
              Page {{ currentPage }}
            </span>
          </li>
          <li class="page-item" @click="goToPage(currentPage + 1)">
            <a class="page-link bg-dark text-light border-light" href="#">Next</a>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useMovieStore } from '../stores/movieStore'
import SearchBar from '../components/SearchBar.vue'
import MovieCard from '../components/MovieCard.vue'

const movieStore = useMovieStore()
const currentPage = ref(1)
const searchTerm = ref('')

onMounted(() => {
  movieStore.fetchMovies('top_rated', 'movie', currentPage.value)
})

const goToPage = (page) => {
  if (page < 1) return
  currentPage.value = page
  movieStore.fetchMovies('top_rated', 'movie', page)
}

const handleSearch = (value) => {
  searchTerm.value = value.toLowerCase()
}

const filteredMovies = computed(() =>
  movieStore.results.filter((movie) =>
    movie.title.toLowerCase().includes(searchTerm.value)
  )
)
</script>

<style scoped>
body {
  background-color: #000;
}
</style>
