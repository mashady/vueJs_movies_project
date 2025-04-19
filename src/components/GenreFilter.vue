<template>
    <div class="genre-filter mb-4 d-flex justify-content-end container">
      <select 
        v-model="selectedGenre" 
        @change="handleGenreChange"
        class="form-select genre-select bg-dark text-light border-secondary"
      >
        <option value="">All Genres</option>
        <option 
          v-for="genre in store.genres"
          :key="genre.id"
          :value="genre.id"
        >
          {{ genre.name }}
        </option>
      </select>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import { useMovieStore } from '../stores/movieStore.js'
  
  const store = useMovieStore()
  const selectedGenre = ref('')
  
  const emit = defineEmits(['filter'])
  
  onMounted(async () => {
    if (store.genres.length === 0) {
      await store.fetchGenres('movie')
    }
  })
  
  const handleGenreChange = () => {
    emit('filter', selectedGenre.value)
  }
  </script>
  
  <style scoped>
  .genre-select {
    width: 200px;
  }
  </style>
  