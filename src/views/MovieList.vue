<template>
    <div class="container-fluid bg-dark min-vh-100 py-4">
      <h2 class="text-light text-center mb-3">{{ title }}</h2>
  
      
      <SearchBar @search="handleSearch" />
  
      <div v-if="store.loading" class="text-center text-light my-5">
        <div class="spinner-border text-light" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
  
      <div v-else-if="store.error" class="alert alert-danger text-center">
        Error: {{ store.error.message }}
      </div>
  
      <div class="container">
        <div class="row justify-content-center">
          <!-- Movie Cards -->
          <MovieCard
            v-for="movie in filteredMovies"
            :key="movie.id"
            :movie="movie"
            class="col-12 col-sm-6 col-md-4 col-lg-3 mb-4"
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
  import { ref, computed, onMounted, watch } from 'vue'
  import { useMovieStore } from '../stores/movieStore'
  import MovieCard from '../components/MovieCard.vue'
  import SearchBar from '../components/SearchBar.vue'
  
  const props = defineProps({
    title: String,
    type: String
  })
  
  const store = useMovieStore()
  const searchTerm = ref('')
  const currentPage = ref(1)
  
  const fetchPage = (page) => {
    store.fetchMovies(props.type, 'movie', page)
  }
  
  onMounted(() => {
    fetchPage(currentPage.value)
  })
  

  watch(() => props.type, (newType, oldType) => {
    currentPage.value = 1
    fetchPage(currentPage.value)
  })
  
  const goToPage = (page) => {
    if (page < 1) return
    currentPage.value = page
    fetchPage(page)
  }
  
  const handleSearch = (value) => {
    searchTerm.value = value.toLowerCase()
  }
  
  const filteredMovies = computed(() =>
    store.results.filter((movie) =>
      movie.title?.toLowerCase().includes(searchTerm.value)
    )
  )
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
  </style>
  