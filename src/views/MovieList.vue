<template>
  <div class="container-fluid min-vh-100 py-4">
    <h2 class="text-light text-center mb-3">{{ title }}</h2>

    <SearchBar @search="handleSearch" />
    <div class="d-flex justify-content-end">
  <GenreFilter @filter="handleGenreFilter" />
  <YearFilter @filter="handleYearFilter" />
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
        <p class="no-movies">No movies found </p>
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
import { ref, computed, watch, onMounted } from 'vue'
import { useMovieStore } from '../stores/movieStore'
import MovieCard from '../components/MovieCard.vue'
import SearchBar from '../components/SearchBar.vue'
import GenreFilter from '../components/GenreFilter.vue'
import YearFilter from '../components/YearFilter.vue'

const props = defineProps({
  title: String,
  type: String
})

const store = useMovieStore()
const searchTerm = ref('')
const activeGenre = ref(null)
const activeYear = ref(null)

const loadPage = (page = 1) => {
  store.fetchByFilters({
    genreId: activeGenre.value,
    year: activeYear.value,
    page
  })
}

const handleSearch = (value) => {
  searchTerm.value = value.toLowerCase()
}

const handleGenreFilter = (genreId) => {
  activeGenre.value = genreId || null
  loadPage(1)
}

const handleYearFilter = (year) => {
  activeYear.value = year || null
  loadPage(1)
}

const goToPage = (page) => {
  if (page < 1 || page > store.totalPages) return
  loadPage(page)
}

const loadContent = () => {
  if (searchTerm.value || activeGenre.value || activeYear.value) {
    loadPage(1)
  } else {
    store.fetchMovies(props.type, 'movie', 1)
  }
}

onMounted(() => {
  loadContent()
})

watch(() => props.type, () => {
  activeGenre.value = null
  activeYear.value = null
  searchTerm.value = ''
  loadContent()
})




const filteredMovies = computed(() => {
  if (!searchTerm.value) return store.results
  return store.results.filter(movie =>
    movie.title?.toLowerCase().includes(searchTerm.value)
  )
})
</script>


<style scoped>
body {
  background-color: #000;
}

.spinner-border {
  width: 3rem;
  height: 3rem;
  border-width: 0.3rem;
}

.pagination .page-item .page-link {
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  transition: background-color 0.3s ease;
}

.pagination .page-item:hover .page-link {
  background-color: #444;
}

.pagination .page-item.disabled .page-link {
  cursor: not-allowed;
}

.card-body {
  padding: 1rem;
  background-color: #333;
  border-radius: 0.5rem;
}

.movie-card {
  transition: transform 0.3s ease;
  background-color: #222;
  border-radius: 0.5rem;
}

.movie-card:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
}

.card-title {
  font-size: 1.25rem;
  color: #f5f5f5;
}

.card-text {
  font-size: 0.875rem;
  color: #bbb;
}

.search-bar {
  margin-bottom: 1.5rem;
}
.pagination{
    gap:5px!important
}
.no-movies {
  font-size: 1.5rem;
  font-weight: 600;
}
</style>