<template>
  <div class="col-12 col-sm-6 col-md-4 col-lg-3 mb-4 d-flex">
    <div class="card movie-card text-light border-0 shadow w-100">
      <img :src="'https://image.tmdb.org/t/p/w500/' + movie.poster_path" class="card-img-top movie-img"
        :alt="movie.title" />
      <div class="card-body d-flex flex-column">
        <h5 class="card-title">{{ movie.title }}</h5>
        <p class="card-text small">
          {{ movie.overview?.slice(0, 100) }}...
        </p>
        <div class="mt-auto">
          <p class="card-text mb-1">
            <small>
              Rating:
              <span v-html="renderStars(movie.vote_average)"></span>
            </small>
          </p>

          <p class="card-text" v-if="movie.release_date">
            <small>Year: {{ new Date(movie.release_date).getFullYear() }}</small>
          </p>
        </div>
      </div>

      <div class="card-footer bg-transparent border-top-0">
        <button @click="addToWatchList(movie)"
          class="btn w-100 fw-semibold d-flex align-items-center justify-content-center gap-2"
          :class="isInWatchList(movie.id) ? 'btn-outline-secondary' : 'btn-primary'"
          :disabled="isInWatchList(movie.id)">
          <i :class="isInWatchList(movie.id) ? 'bi bi-check-circle' : 'bi bi-plus-circle'"></i>
          {{ isInWatchList(movie.id) ? 'Added' : 'Add to Watchlist' }}
        </button>

      </div>
    </div>
  </div>
</template>
  
  <script setup>
  import { useWatchListStore } from '../stores/watchListStore'
  import { useToast } from 'vue-toastification'
  import { computed } from 'vue'

  const watchListStore = useWatchListStore()
  const toast = useToast()

  defineProps(['movie', 'addToWatchList', 'isInWatchList'])
  
  const renderStars = (rating) => {
    const stars = Math.round(rating / 2)
    return '★'.repeat(stars) + '☆'.repeat(5 - stars)
  }

  const addToWatchList = async (movie) => {
    try {
      await watchListStore.addToWatchList(movie)
      toast.success('Added to watchlist!')
    } catch (error) {
      toast.error('Failed to add to watchlist.')
    }
  }

  const isInWatchList = (movieId) => {
    return watchListStore.isInWatchList(movieId)
  }

  </script>
  
  <style scoped>
  .movie-card {
    background-color: #343a40;
    height: 100%; 
    min-height: 500px; 
    display: flex;
    flex-direction: column;
    transition: transform 0.3s ease;
    border-radius: 0.5rem;
  }
  
  .movie-card:hover {
    transform: scale(1.05);
    box-shadow: 0 0 15px rgba(255, 255, 255, 0.2);
  }
  
  .movie-img {
    height: 350px;
    object-fit: cover;
    border-top-left-radius: 0.5rem;
    border-top-right-radius: 0.5rem;
  }
  
  .card-body {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 1rem;
  }
  </style>
  