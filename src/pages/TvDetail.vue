<template>
    <div class="container text-light py-5">
      <div v-if="tvShow" class="tv-show-detail-container">
        <div class="card bg-dark text-light shadow-lg p-4">
          <div class="row g-4">
            <div class="col-md-4 text-center">
              <img :src="'https://image.tmdb.org/t/p/w500/' + tvShow.poster_path" alt="Poster"
                class="img-fluid rounded shadow" />
            </div>
            <div class="col-md-8">
              <h2 class="mb-3">{{ tvShow.name }}</h2>
              <p class="lead">{{ tvShow.overview }}</p>
  
              <ul class="list-unstyled">
                <li><strong>First Air Date:</strong> {{ tvShow.first_air_date }}</li>
                <li><strong>Rating:</strong> {{ tvShow.vote_average }}</li>
                <li><strong>Number of Episodes:</strong> {{ tvShow.number_of_episodes }}</li>
              </ul>
  
              <div class="mt-3">
                <strong class="me-2">Genres:</strong>
                <span v-for="genre in tvShow.genres" :key="genre.id" class="badge bg-info text-dark me-1">
                  {{ genre.name }}
                </span>
              </div>
  
              <div class="mt-4 d-flex gap-2 flex-wrap">
                <button @click="handleAddToWatchList" class="btn fw-bold"
                  :class="isInWatchList(tvShow.id) ? 'btn-outline-secondary' : 'btn-warning'"
                  :disabled="isInWatchList(tvShow.id)">
                  {{ isInWatchList(tvShow.id) ? 'Added to Watchlist' : 'Add to Watchlist' }}
                </button>
  
                <DatePicker :event-data="{ title: tvShow.name }" />
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
  <h4 class="text-center mb-4">Top Cast</h4>
  <div class="d-flex flex-wrap justify-content-center gap-4">
    <div v-for="actor in cast.slice(0, 6)" :key="actor.cast_id" class="text-center" style="width: 120px">
      <img
        :src="getActorImage(actor.profile_path)"
        class="img-fluid rounded cast-image"
        :alt="actor.name"
        @error="handleImageError"
      />
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
  const tvShow = ref(null)
  const trailerKey = ref(null)
  const cast = ref([])
  const tvShowId = route.params.id
  
  const watchListStore = useWatchListStore()
  const toast = useToast()
  
  const API_KEY =
    'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMmI0OTlhOTlmYTU5MDBiNjFkMTgxOTE3ZDBkNDdhNyIsInN1YiI6IjY1NjM2MmYwN2RmZGE2NTkzMjY1YTNkOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.h8ApO6AOrN20N_-68defSJ4dd6kJV9OjEeJwN9Cv8qA'
  
  onMounted(async () => {
    try {
      const tvShowResponse = await axios.get(
        `https://api.themoviedb.org/3/tv/${tvShowId}?language=en-US`,
        {
          headers: {
            accept: 'application/json',
            Authorization: API_KEY,
          },
        }
      )
      tvShow.value = tvShowResponse.data
  
      const videoResponse = await axios.get(
        `https://api.themoviedb.org/3/tv/${tvShowId}/videos?language=en-US`,
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
        `https://api.themoviedb.org/3/tv/${tvShowId}/credits`,
        {
          headers: {
            accept: 'application/json',
            Authorization: API_KEY,
          },
        }
      )
      cast.value = castResponse.data.cast
    } catch (err) {
      console.error('Error fetching TV show data:', err)
    }
  })
  
  const handleAddToWatchList = async () => {
    try {
      await watchListStore.addToWatchList(tvShow.value)
      toast.success('Added to watchlist!')
    } catch (error) {
      toast.error('Failed to add to watchlist.')
    }
  }
  
  const getActorImage = (profilePath) => {
  return profilePath 
    ? `https://image.tmdb.org/t/p/w200/${profilePath}`
    : '/default-actor.png';
};

const handleImageError = (event) => {
  event.target.src = '/default-actor.png';
};
  const isInWatchList = (tvShowId) => {
    return watchListStore.isInWatchList(tvShowId)
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
  .cast-image {
  width: 100px;
  height: 150px;
  object-fit: cover;
  border: 1px solid #444;
}

.cast-image[src*="default-actor.png"] {
  background-color: #333;
  padding: 10px;
}
  </style>
  