<template>
    <div class="search-wrapper mb-4">
      <div class="form-outline">
        <input
          type="search"
          class="form-control form-control-lg text-white border-0 rounded-3"
          placeholder="Search for a movie..."
          aria-label="Search"
          v-model="search"
          @input="$emit('search', search)"
        />
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  const search = ref('')
  </script>
  
  <style scoped>
  .search-wrapper {
    padding: 0 1rem;
  }
  
  .form-control {
    background-color: #2e2e2e;
    color: #fff;
    width: 100%;
  }
  
  .form-control::placeholder {
    color: #ccc;
    opacity: 1; 
  }
  </style>
  