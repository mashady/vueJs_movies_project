<template>
    <div class="container text-light py-4">
      <h2 class="text-center mb-4">Movie Details</h2>
      <div v-if="movie">
        <div class="d-flex flex-column align-items-center">
          <img
            :src="'https://image.tmdb.org/t/p/w500/' + movie.poster_path"
            alt="Poster"
            class="img-fluid mb-3"
          />
          <h3>{{ movie.title }}</h3>
          <p class="text-center">{{ movie.overview }}</p>
          <p><strong>Release Date:</strong> {{ movie.release_date }}</p>
          <p><strong>Rating:</strong> {{ movie.vote_average }}</p>
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
  
  const route = useRoute()
  const movie = ref(null)
  const movieId = route.params.id
  
  onMounted(async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
        {
          headers: {
            accept: 'application/json',
            Authorization:
              'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMmI0OTlhOTlmYTU5MDBiNjFkMTgxOTE3ZDBkNDdhNyIsInN1YiI6IjY1NjM2MmYwN2RmZGE2NTkzMjY1YTNkOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.h8ApO6AOrN20N_-68defSJ4dd6kJV9OjEeJwN9Cv8qA',
          },
        }
      )
      movie.value = response.data
    } catch (err) {
      console.error('Error fetching movie:', err)
    }
  })
  </script>
  
  <style scoped>
  img {
    max-width: 300px;
    border-radius: 0.5rem;
  }
  </style>
  