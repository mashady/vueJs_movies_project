
<template>
  <div class="btn-group" role="group">
    <button
      type="button"
      class="btn btn-dark"
      :class="{'active': selectedTime === 'day'}"
      @click="selectTime('day')"
    >
      Daily
    </button>
    <button
      type="button"
      class="btn btn-dark"
      :class="{'active': selectedTime === 'week'}"
      @click="selectTime('week')"
    >
      Weekly
    </button>
  </div>
</template>

<script setup>
import { defineEmits, ref } from 'vue'

const emit = defineEmits(['filter'])

const selectedTime = ref('day')

const selectTime = (timePeriod) => {
  selectedTime.value = timePeriod
  emit('filter', timePeriod)
}
</script>

<style scoped>
.btn-group .btn {
  transition: background-color 0.3s ease;
}

.btn-group .btn.active {
  background-color: #555;
}
</style>
