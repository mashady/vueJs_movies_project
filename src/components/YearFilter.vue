<template>
    <div class="year-filter mb-4 d-flex justify-content-end">
      <select 
        v-model="selectedYear" 
        @change="handleYearChange"
        class="form-select year-select bg-dark text-light border-secondary"
      >
        <option value="">All Years</option>
        <option 
          v-for="year in years"
          :key="year"
          :value="year"
        >
          {{ year }}
        </option>
      </select>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  const selectedYear = ref('')
  const emit = defineEmits(['filter'])
  
  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: 50 }, (_, i) => currentYear - i)
  
  const handleYearChange = () => {
    emit('filter', selectedYear.value)
  }
  </script>
  
  <style scoped>
  .year-select {
    width: 200px;
    margin-left: 1rem;
  }
  </style>
  