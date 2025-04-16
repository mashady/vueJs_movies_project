<template>
  <NavBar />
  <main class="main-content " style="min-height: 150vh">
<div class="">
  <RouterView />

</div>
  </main>
  <Footer />
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
import 'bootstrap-icons/font/bootstrap-icons.css'
</script>

<style>
.custom-toast {
  background-image: linear-gradient(to right, #913af5, #e934a2);
  color: white;
  border-radius: 8px;
  font-weight: 500;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}
</style>

<style scoped>
#app {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  padding: 1rem;
}
  main{
    padding-top:100px;
  }
  .main-content{
    background-color: #151515;
    color: #FFF;
  }

</style>
