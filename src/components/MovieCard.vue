<template>
    <div class="col-12 col-sm-6 col-md-4 col-lg-3 mb-4 d-flex">
      <div class="card h-100 w-100 bg-secondary text-light border-0 shadow movie-card">
        <img
          :src="'https://image.tmdb.org/t/p/w500/' + movie.poster_path"
          class="card-img-top"
          :alt="movie.title"
        />
        <div class="card-body d-flex flex-column">
          <h5 class="card-title">{{ movie.title }}</h5>
          <p class="card-text small">{{ movie.overview.slice(0, 100) }}...</p>
          <div class="mt-auto">
            <p class="card-text mb-1">
              <small>
                Rating:
                <span v-html="renderStars(movie.vote_average)"></span>
              </small>
            </p>
            <p class="card-text">
              <small>Year: {{ new Date(movie.release_date).getFullYear() }}</small>
            </p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { defineProps } from 'vue'
  
  const props = defineProps({
    movie: Object
  })
  
  const renderStars = (rating) => {
    const stars = Math.round(rating / 2)
    return '★'.repeat(stars) + '☆'.repeat(5 - stars)
  }
  </script>
  
  <style scoped>
  .movie-card {
    transition: transform 0.3s ease;
  }
  .movie-card:hover {
    transform: scale(1.05);
  }
  </style>
  