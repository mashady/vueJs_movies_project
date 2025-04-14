<template>
    <div>
      <h2>home page</h2>
    </div>
  </template>
  
  <script setup>
  import { onMounted } from 'vue'
  import { useMovieStore } from '../stores/movieStore'
  
  const movieStore = useMovieStore()
  
  onMounted(() => {
  })
  </script>
  
  <style scoped>
  </style>
  