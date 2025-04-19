<template>
  <div>
    <button class="date-picker-button" @click="openPicker" :disabled="loading">
      <span v-if="loading">
        <span class="spinner"></span> {{ loadingText }}
      </span>
      <span v-else>
        Add to Calendar
      </span>
    </button>

    <div v-if="showPicker" class="modal-overlay" @click.self="closePicker">
      <div class="modal-content">
        <div class="modal-header">
          <h3>Select a Date</h3>
          <button class="modal-close" @click="closePicker">x</button>
        </div>
        <div class="modal-body">
          <div class="date-input-group">
            <label for="date-input">Date</label>
            <input id="date-input" type="date" v-model="selectedDate" :disabled="loading" />
          </div>
        </div>
        <div class="modal-footer">
          <button class="modal-button secondary" @click="closePicker" :disabled="loading">
            Cancel
          </button>
          <button class="modal-button primary" @click="saveDate" :disabled="!selectedDate || loading">
            <span v-if="loading">
              <span class="spinner"></span> Saving...
            </span>
            <span v-else>
              Save
            </span>
          </button>
        </div>
      </div>
    </div>

    <div v-if="showConfirmation" class="modal-overlay" @click.self="closeConfirmation">
      <div class="modal-content confirmation-popup">
        <div class="modal-header">
          <h3><i class="icon-success"></i> Success!</h3>
          <button class="modal-close" @click="closeConfirmation">x</button>
        </div>
        <div class="modal-body">
          <p>{{ confirmationMessage }}</p>
        </div>
        <div class="modal-footer">
          <button class="modal-button primary" @click="closeConfirmation">
            OK
          </button>
        </div>
      </div>
    </div>

    <div v-if="showError" class="modal-overlay" @click.self="closeError">
      <div class="modal-content error-popup">
        <div class="modal-header">
          <h3><i class="icon-error"></i> Error</h3>
          <button class="modal-close" @click="closeError">x</button>
        </div>
        <div class="modal-body">
          <p>{{ errorMessage }}</p>
        </div>
        <div class="modal-footer">
          <button class="modal-button primary" @click="closeError">
            OK
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useMovieCalendarStore } from '../stores/calendarStore'

const store = useMovieCalendarStore()
const props = defineProps({
  eventData: {
    type: Object,
    required: true
  },
})


const showPicker = ref(false)
const showConfirmation = ref(false)
const showError = ref(false)
const selectedDate = ref('')
const loading = ref(false)
const confirmationMessage = ref('')
const errorMessage = ref('')


const openPicker = () => {
  showPicker.value = true
}

const closePicker = () => {
  if (!loading.value) {
    showPicker.value = false
  }
}

const closeConfirmation = () => {
  showConfirmation.value = false
}

const closeError = () => {
  showError.value = false
}

const saveDate = async () => {
  if (!selectedDate.value) return

  loading.value = true

  try {
    const event = {
      ...props.eventData,
      date: selectedDate.value
    }
    let userId = JSON.parse(localStorage.getItem('user')).id
    console.log(userId)
    await store.addEvent(event, userId)


    confirmationMessage.value = `${props.eventData.title} added to calendar on ${formatDate(selectedDate.value)}!`
    showPicker.value = false

    showConfirmation.value = true

    closePicker()
  } catch (err) {
    errorMessage.value = err.message || 'Failed to save date'
    showError.value = true
  } finally {
    loading.value = false
  }
}

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' }
  return new Date(dateString).toLocaleDateString(undefined, options)
}
</script>

<style scoped>
.date-picker-button {
  background-color: #913af5;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.date-picker-button:hover:not(:disabled) {
  background-color: #913af5;
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(145, 58, 245, 0.4);
}

.date-picker-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  backdrop-filter: blur(2px);
}

.modal-content {
  background-color: white;
  border-radius: 12px;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  transform: translateY(0);
  transition: all 0.3s ease;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
}

.modal-header {
  padding: 18px 24px;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-header h3 {
  margin: 0;
  font-size: 20px;
  color: #333;
  display: flex;
  align-items: center;
  gap: 8px;
}

.modal-close {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #777;
  transition: color 0.2s;
}

.modal-close:hover {
  color: #333;
}

.modal-body {
  padding: 24px;
  flex-grow: 1;
  overflow-y: auto;
}

.modal-footer {
  padding: 16px 24px;
  border-top: 1px solid #eee;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}

.date-input-group {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.date-input-group label {
  font-size: 14px;
  color: #555;
  font-weight: 500;
}

.date-input-group input {
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
  transition: border-color 0.2s;
}

.date-input-group input:focus {
  outline: none;
  border-color: #6c63ff;
  box-shadow: 0 0 0 2px rgba(108, 99, 255, 0.2);
}

.modal-button {
  padding: 10px 20px;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
  font-weight: 500;
}

.modal-button.primary {
  background-color: #913af5;
  color: white;
  border: none;
}

.modal-button.primary:hover:not(:disabled) {
  background-color: #913af5;
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(145, 58, 245, 0.4);
}

.modal-button.secondary {
  background-color: white;
  color: #333;
  border: 1px solid #ddd;
}

.modal-button.secondary:hover:not(:disabled) {
  background-color: #f5f5f5;
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(145, 58, 245, 0.4);
}

.modal-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none !important;
  box-shadow: none !important;
}

.spinner {
  display: inline-block;
  width: 14px;
  height: 14px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: white;
  animation: spin 1s ease-in-out infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.confirmation-popup {
  max-width: 350px;
  text-align: center;
}

.confirmation-popup .modal-body p {
  margin: 0;
  font-size: 16px;
  color: #333;
  line-height: 1.5;
}

.confirmation-popup .modal-footer {
  justify-content: center;
}

.error-popup {
  max-width: 350px;
}

.error-popup .modal-header h3 {
  color: #f44336;
}
</style>