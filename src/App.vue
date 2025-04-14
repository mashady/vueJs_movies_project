<template>
   <NavBar />
  <main>
     
      <RouterView />
    </main>
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
import 'bootstrap-icons/font/bootstrap-icons.css'
</script>

<style scoped>
#app {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  padding: 1rem;
}
  main{
    margin-top:100px;
  }

</style>
