<template>
  <div class="search-container" :class="{ 'scrolled': isScrolled }">
    <div class="search-wrapper">
      <div class="search-content">
        <label for="searchInput" class="search-icon">
          <i class="bi bi-search"></i>
        </label>
        <input id="searchInput" type="search" placeholder="Search" class="search-input" v-model="search"
          @input="$emit('search', search)" autocomplete="off" />
        <button v-if="search.length > 0" class="clear-search" @click="clearSearch" aria-label="Clear search">
          <i class="bi bi-x"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { useRoute } from 'vue-router'

const search = ref('')
const isScrolled = ref(false)
const route = useRoute()

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

const clearSearch = () => {
  search.value = ''
  $emit('search', '')
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

watch(() => route.path, () => {
  search.value = ''
})
</script>

<style scoped>
.search-container {
  position: fixed;
  top: 90px;
  left: 0;
  right: 0;
  width: 100%;
  height: 50px;
  background-color: #2e2e2e;
  z-index: 1000;
  padding: 15px 0;
  transition: all 0.3s ease;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.search-container.scrolled {
  top: 60px;
  padding: 10px 0;
}

.search-wrapper {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  height: 100%;
  display: flex;
}

.search-content {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 600px;
  margin-left: 20%;
  transform: translateX(-50%);
}

.search-icon {
  margin-right: 10px;
  color: #787676;
  font-size: 1.2rem;
  font-weight: bold;
  cursor: pointer;
  transition: color 0.2s ease;
}

.search-input {
  width: 100%;
  padding: 8px 0;
  background-color: transparent;
  color: #bdbdbd;
  border: none;
  font-size: 1.2rem;
  outline: none;
  caret-color: #787676;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}

.search-input::-webkit-search-decoration,
.search-input::-webkit-search-cancel-button,
.search-input::-webkit-search-results-button,
.search-input::-webkit-search-results-decoration {
  -webkit-appearance: none;
  appearance: none;
}

.search-input::placeholder {
  color: #787676;
}

.search-input:focus {
  box-shadow: none;
  background-color: transparent;
}

.clear-search {
  background: transparent;
  border: none;
  color: #bdbdbd;
  cursor: pointer;
  font-size: 1.4rem;
  margin-left: 8px;
  padding: 0;
  transition: opacity 0.2s ease;
}

.clear-search:hover {
  opacity: 0.8;
}

@media (max-width: 1200px) {
  .search-content {
    margin-left: 20%;
    transform: translateX(-25%);
  }
}

@media (max-width: 992px) {
  .search-content {
    margin-left: 15%;
    transform: translateX(-20%);
  }
}

@media (max-width: 768px) {
  .search-container {
    top: 80px;
    height: 45px;
    padding: 10px 0;
  }

  .search-container.scrolled {
    top: 50px;
    padding: 5px 0;
  }

  .search-content {
    margin-left: 10%;
    transform: translateX(-10%);
    max-width: 80%;
  }

  .search-icon {
    font-size: 1.1rem;
  }

  .search-input {
    font-size: 1.1rem;
  }

  .clear-search {
    font-size: 1.2rem;
  }
}

@media (max-width: 480px) {
  .search-container {
    top: 75px;
    height: 40px;
  }

  .search-content {
    margin-left: 5%;
    transform: translateX(-5%);
    max-width: 90%;
  }

  .search-icon {
    font-size: 1rem;
    margin-right: 8px;
  }

  .search-input {
    font-size: 1rem;
    padding: 6px 0;
  }

  .clear-search {
    font-size: 1.1rem;
  }
}
</style>