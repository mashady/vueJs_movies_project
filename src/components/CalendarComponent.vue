<template>
  <div>
    <vue-cal
      :events="store.events"
      default-view="month"
      style="height: 800px"
      :time="false"
      @event-click="showMovieDetails"
    />

    <div v-if="store.selectedMovie" class="modal-backdrop" @click="closeMovieModal">
      <div class="movie-modal" @click.stop>
        <button class="close-btn" @click="closeMovieModal">&times;</button>
        <h3 class="text-xl font-bold mb-2">{{ store.selectedMovie.title }}</h3>
        <p class="mb-2"><strong>Date:</strong> {{ store.selectedMovie.start }}</p>
        <p v-if="store.selectedMovie.description" class="mb-2">{{ store.selectedMovie.description }}</p>
        
        <div class="flex gap-2 mt-4">
          <button 
            v-if="!store.selectedMovie.watched" 
            class="action-btn bg-purple-600" 
            @click="markAsWatched(store.selectedMovie.id)"
          >
            Mark as watched
          </button>
          <button 
            class="action-btn bg-red-600" 
            @click="confirmDeleteMovie(store.selectedMovie.id)"
          >
            Delete
          </button>
        </div>
      </div>
    </div>

    <div v-if="showConfirmDelete" class="modal-backdrop" @click="showConfirmDelete = false">
      <div class="confirm-modal" @click.stop>
        <h3 class="text-lg font-bold mb-4">Confirm Delete</h3>
        <p>Are you sure you want to delete this movie from your calendar?</p>
        
        <div class="flex gap-4 mt-4">
          <button 
            class="action-btn bg-gray-600" 
            @click="showConfirmDelete = false"
          >
            Cancel
          </button>
          <button 
            class="action-btn bg-red-600" 
            @click="deleteMovie"
            :disabled="store.loading"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import VueCal from 'vue-cal'
import 'vue-cal/dist/vuecal.css'
import { useMovieCalendarStore } from '../stores/calendarStore'

const store = useMovieCalendarStore()
const showConfirmDelete = ref(false)
const movieIdToDelete = ref(null)

const showMovieDetails = (event) => {
  store.setSelectedMovie(event)
}

const closeMovieModal = () => {
  store.clearSelectedMovie()
}

const markAsWatched = async (movieId) => {
  try {
    await store.markAsWatched(movieId)
  } catch (error) {
    console.error(error)
  }
}

const confirmDeleteMovie = (movieId) => {
  movieIdToDelete.value = movieId
  showConfirmDelete.value = true
}

const deleteMovie = async () => {
  try {
    await store.deleteEvent(movieIdToDelete.value)
    showConfirmDelete.value = false
    movieIdToDelete.value = null
  } catch (error) {
    console.error(error)
  }
}

store.fetchEvents()
</script>

<style scoped>
.vuecal__event {
  background-color: #a970ff;
  color: white;
  border-radius: 4px;
  padding: 2px 4px;
  font-size: 12px;
  cursor: pointer;
}

::v-deep(.vuecal__title button) {
  color: #6c63ff !important;
}

::v-deep(.vuecal__arrow) {
  color: white !important;
  fill: white !important;
}

.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.movie-modal, .confirm-modal {
  background: #151515;
  padding: 20px;
  border-radius: 8px;
  max-width: 500px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
}

.close-btn {
  color:#FFF;
  float: right;
  font-size: 1.5rem;
  background: none;
  border: none;
  cursor: pointer;
}

.action-btn {
  color: white;
  background-color: #6c63ff !important;
  padding: 8px 16px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
margin-right: 5px;
}
</style>