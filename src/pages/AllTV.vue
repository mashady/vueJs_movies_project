<template>
  <div class="container-fluid min-vh-100 py-4 list-container">
    <h2 class="text-light text-center mb-3">All TV Shows</h2>

    <SearchBar @search="handleSearch" />

    <div class="d-flex justify-content-end mb-3">
      <GenreFilter @filter="handleGenreFilter" />
    
    </div>

    <div v-if="store.loading" class="text-center text-light my-5">
      <div class="spinner-border text-light" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>

    <div v-else-if="store.error" class="alert alert-danger text-center">
      Error: {{ store.error }}
    </div>

    <div v-else>
      <div v-if="filteredMovies.length === 0" class="text-center text-warning fs-4 mt-5">
        <p class="no-movies">No TV shows found</p>
      </div>

      <div v-else class="container">
        <div class="row justify-content-center">
          <MovieCard
            v-for="movie in filteredMovies"
            :key="movie.id"
            :movie="movie"
            class="col-12 col-sm-6 col-md-4 col-lg-3 mb-4"
          />
        </div>

        <nav class="d-flex justify-content-center mt-4">
          <ul class="pagination pagination-dark">
            <li
              class="page-item"
              :class="{ disabled: store.currentPage === 1 }"
              @click="goToPage(store.currentPage - 1)"
            >
              <a class="page-link bg-dark text-light border-light" href="#">Previous</a>
            </li>
            <li class="page-item disabled">
              <span class="page-link bg-dark text-light border-light">
                Page {{ store.currentPage }} of {{ store.totalPages }}
              </span>
            </li>
            <li
              class="page-item"
              :class="{ disabled: store.currentPage === store.totalPages }"
              @click="goToPage(store.currentPage + 1)"
            >
              <a class="page-link bg-dark text-light border-light" href="#">Next</a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useMovieStore } from '../stores/movieStore'
import SearchBar from '../components/SearchBar.vue'
import GenreFilter from '../components/GenreFilter.vue'

import MovieCard from '../components/MovieCard.vue'

const store = useMovieStore()
const searchTerm = ref('')
const activeGenre = ref(null)
const activeYear = ref(null)

const handleSearch = (value) => {
  searchTerm.value = value.toLowerCase()
}

const handleGenreFilter = (genreId) => {
  activeGenre.value = genreId || null
  loadPage(1)
}



const goToPage = (page) => {
  if (page < 1 || page > store.totalPages) return
  loadPage(page)
}

const loadPage = (page = 1) => {
  store.fetchByFilters({
    genreId: activeGenre.value,
    year: activeYear.value,
    page,
    category: 'tv' 
  })
}

onMounted(() => {
  loadPage(1)
})

const filteredMovies = computed(() =>
  store.results.filter((movie) =>
    (movie.name || movie.title)?.toLowerCase().includes(searchTerm.value)
  )
)
</script>
<style scoped>
.list-container{
  margin-top: 80px;
}
</style>