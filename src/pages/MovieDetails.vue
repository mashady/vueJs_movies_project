<template>
  <div class="container text-light py-5">
    <div v-if="movie" class="movie-detail-container">
      <div class="card bg-dark text-light shadow-lg p-4">
        <div class="row g-4">
          <div class="col-md-4 text-center">
            <img :src="'https://image.tmdb.org/t/p/w500/' + movie.poster_path" alt="Poster"
              class="img-fluid rounded shadow" />
          </div>
          <div class="col-md-8">
            <h2 class="mb-3">{{ movie.title }}</h2>
            <p class="lead">{{ movie.overview }}</p>

            <ul class="list-unstyled">
              <li><strong>Release Date:</strong> {{ movie.release_date }}</li>
              <li><strong>Rating:</strong> {{ movie.vote_average }}</li>
              <li><strong>Runtime:</strong> {{ movie.runtime }} min</li>
            </ul>

            <div class="mt-3">
              <strong class="me-2">Genres:</strong>
              <span v-for="genre in movie.genres" :key="genre.id" class="badge text-light me-1">
                {{ genre.name }}
              </span>
            </div>

            <div class="mt-4 d-flex gap-2 flex-wrap">
              <button @click="handleAddToWatchList" class="btn fw-bold watchlist-btn"
                :class="isInWatchList(movie.id) ? 'btn-outline-secondary' : 'btn-warning'"
                :disabled="isInWatchList(movie.id)">
                {{ isInWatchList(movie.id) ? 'Added to Watchlist' : 'Add to Watchlist' }}
              </button>


              <DatePicker :event-data="{ title: movie.title }" />
            </div>
          </div>
        </div>
      </div>

      <div v-if="trailerKey" class="mt-5">
        <h4 class="text-center mb-3">Watch Trailer</h4>
        <div class="ratio ratio-16x9">
          <iframe :src="`https://www.youtube.com/embed/${trailerKey}`" allow="autoplay; encrypted-media"
            allowfullscreen></iframe>
        </div>
      </div>

      <div v-if="cast.length" class="mt-5">
        <h4 class="text-center mb-4"> Top Cast</h4>
        <div class="d-flex flex-wrap justify-content-center gap-4">
          <div v-for="actor in cast.slice(0, 6)" :key="actor.cast_id" class="text-center" style="width: 120px">
            <img
              :src="actor.profile_path ? 'https://image.tmdb.org/t/p/w200/' + actor.profile_path : 'https://via.placeholder.com/100x150?text=No+Image'"
              class="img-fluid rounded" alt="Cast Member" />
            <small class="d-block mt-1">{{ actor.name }}</small>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="text-center my-5">
      <div class="spinner-border text-light" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import DatePicker from '../components/DatePicker.vue'
import { useWatchListStore } from '../stores/watchListStore'
import { useToast } from 'vue-toastification'

const route = useRoute()
const movie = ref(null)
const trailerKey = ref(null)
const cast = ref([])
const movieId = route.params.id

const watchListStore = useWatchListStore()
const toast = useToast()

const API_KEY =
  'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMmI0OTlhOTlmYTU5MDBiNjFkMTgxOTE3ZDBkNDdhNyIsInN1YiI6IjY1NjM2MmYwN2RmZGE2NTkzMjY1YTNkOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.h8ApO6AOrN20N_-68defSJ4dd6kJV9OjEeJwN9Cv8qA'

onMounted(async () => {
  try {
    const movieResponse = await axios.get(
      `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
      {
        headers: {
          accept: 'application/json',
          Authorization: API_KEY,
        },
      }
    )
    movie.value = movieResponse.data

    const videoResponse = await axios.get(
      `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`,
      {
        headers: {
          accept: 'application/json',
          Authorization: API_KEY,
        },
      }
    )
    const trailer = videoResponse.data.results.find(
      (v) => v.type === 'Trailer' && v.site === 'YouTube'
    )
    if (trailer) trailerKey.value = trailer.key

    const castResponse = await axios.get(
      `https://api.themoviedb.org/3/movie/${movieId}/credits`,
      {
        headers: {
          accept: 'application/json',
          Authorization: API_KEY,
        },
      }
    )
    cast.value = castResponse.data.cast
  } catch (err) {
    console.error('Error fetching movie data:', err)
  }
})

const handleAddToWatchList = async () => {
  try {
    await watchListStore.addToWatchList(movie.value)
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
img {
  max-width: 300px;
  border-radius: 0.5rem;
}

iframe {
  border-radius: 0.5rem;
}

.badge {
  background-color: magenta;
}

.watchlist-btn {
  background-image: linear-gradient(to right, #913af5, #e934a2);
  color: white;
  border: none;
  padding: 0.5rem 1.5rem;
  transition: all 0.3s ease;
}

.watchlist-btn:hover {
  background-image: linear-gradient(to right, #a24cf7, #f03db0);
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(145, 58, 245, 0.4);
  color: white;
}

.watchlist-btn:disabled {
  background-image: linear-gradient(to right, #6a2cb5, #b82a8b);
  opacity: 0.7;
  cursor: not-allowed;
  color: white;
}

@media (max-width: 576px) {

  .watchlist-btn,
  .datepicker-btn {
    width: 100%;
    margin-bottom: 0.5rem;
  }
}
</style>
