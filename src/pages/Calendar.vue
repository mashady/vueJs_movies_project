<template>
    <div>
      <Calendar />
    </div>
  </template>
  
  <script setup>
  import { onMounted } from 'vue'
  import Calendar from '../components/CalendarComponent.vue'
  
  
  onMounted(() => {
  })
  </script>
  
  <style scoped>
  #app > main > div > div > div > div > div.vuecal__header > div.vuecal__title-bar > div > button{
    color: #FFF!important;
  }
  button{
    color: #FFF!important;

  }
  </style>
  