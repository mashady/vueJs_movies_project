
<template>
  <div class="container-fluid min-vh-100 py-4">
    <h2 class="text-light text-center mb-3">Trending Movies</h2>
    <SearchBar @search="handleSearch" />

    <div class="d-flex justify-content-end mb-3 container">
      <TimeFilter @filter="handleTimeFilter" />
    </div>

    <div v-if="store.loading" class="text-center text-light my-5">
      <div class="spinner-border text-light" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>

    <div v-else-if="store.error" class="alert alert-danger text-center">
      Error: {{ store.error }}
    </div>

    <div class="container">
      <div class="row justify-content-center">
        <MovieCard v-for="movie in filteredMovies" :key="movie.id" :movie="movie"
          class="col-12 col-sm-6 col-md-4 col-lg-3 mb-4" />
      </div>

      <nav class="d-flex justify-content-center mt-4">
        <ul class="pagination pagination-dark">
          <li class="page-item" :class="{ disabled: store.currentPage === 1 }" @click="goToPage(store.currentPage - 1)">
            <a class="page-link bg-dark text-light border-light" href="#">Previous</a>
          </li>
          <li class="page-item disabled">
            <span class="page-link bg-dark text-light border-light">
              Page {{ store.currentPage }} of {{ store.totalPages }}
            </span>
          </li>
          <li class="page-item" :class="{ disabled: store.currentPage === store.totalPages }"
            @click="goToPage(store.currentPage + 1)">
            <a class="page-link bg-dark text-light border-light" href="#">Next</a>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useMovieStore } from '../stores/movieStore'
import MovieCard from '../components/MovieCard.vue'
import SearchBar from '../components/SearchBar.vue'
import TimeFilter from '../components/TrendFilter.vue'

const store = useMovieStore()
const searchTerm = ref('')

const selectedTimePeriod = ref('day')

const handleTimeFilter = (timePeriod) => {
  selectedTimePeriod.value = timePeriod
  loadPage(1) 
}

const loadPage = (page = 1) => {
  store.fetchTrending('movie', selectedTimePeriod.value, page)
}

const handleSearch = (value) => {
  searchTerm.value = value.toLowerCase()
}

onMounted(() => {
  loadPage(1)
})

const filteredMovies = computed(() =>
  store.results.filter((movie) =>
    (movie.title || movie.name).toLowerCase().includes(searchTerm.value)
  )
)

const goToPage = (page) => {
  if (page < 1 || page > store.totalPages) return
  loadPage(page)
}
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
  .pagination{
    gap:5px!important
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
  </style>
  