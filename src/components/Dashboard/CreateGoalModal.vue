<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4">
    <div class="fixed inset-0 bg-background/80 backdrop-blur-sm" @click="$emit('close')"></div>
    <div class="relative w-full max-w-lg rounded-lg border bg-card p-6 shadow-lg sm:p-8 animate-in fade-in zoom-in duration-200">
      <div class="flex flex-col space-y-1.5 text-center sm:text-left mb-6">
        <h2 class="text-lg font-semibold leading-none tracking-tight">Create Running Goal</h2>
        <p class="text-sm text-muted-foreground">Set a distance target for a specific date range.</p>
      </div>

      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div class="space-y-2">
          <label class="text-sm font-medium leading-none" for="name">Goal Name</label>
          <input 
            v-model="form.name"
            id="name"
            placeholder="e.g. Marathon Training"
            class="flex h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus:ring-2 focus:ring-orange-600/20 focus:border-orange-600 transition-all md:text-sm"
            required
          />
        </div>

        <div class="space-y-2">
          <label class="text-sm font-medium leading-none" for="target">Target Distance (km)</label>
          <input 
            v-model.number="form.targetDistance"
            id="target"
            type="number"
            step="0.01"
            placeholder="e.g. 42.2"
            class="flex h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 md:text-sm"
            required
          />
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div class="space-y-2">
            <label class="text-sm font-medium leading-none" for="start">Start Date</label>
            <input 
              v-model="form.startDate"
              id="start"
              type="date"
              class="flex h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background focus-visible:outline-none focus:ring-2 focus:ring-orange-600/20 focus:border-orange-600 transition-all md:text-sm"
              required
            />
          </div>
          <div class="space-y-2">
            <label class="text-sm font-medium leading-none" for="end">End Date</label>
            <input 
              v-model="form.endDate"
              id="end"
              type="date"
              class="flex h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background focus-visible:outline-none focus:ring-2 focus:ring-orange-600/20 focus:border-orange-600 transition-all md:text-sm"
              required
            />
          </div>
        </div>

        <div class="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 pt-4">
          <button 
            type="button"
            @click="$emit('close')"
            class="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
          >
            Cancel
          </button>
          <button 
            type="submit"
            :disabled="loading"
            class="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
          >
            {{ loading ? 'Creating...' : 'Create Goal' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  isOpen: boolean
  loading: boolean
}>()

const emit = defineEmits(['close', 'submit'])

const form = ref({
  name: '',
  targetDistance: 0,
  startDate: new Date().toISOString().split('T')[0],
  endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
})

const handleSubmit = () => {
  emit('submit', {
    ...form.value,
    targetDistance: form.value.targetDistance * 1000 // convert to meters
  })
}
</script>
