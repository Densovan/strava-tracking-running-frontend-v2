<template>
  <div class="flex flex-col md:flex-row gap-4 items-end bg-card p-4 rounded-lg border shadow-sm">
    <div class="space-y-2">
      <label class="text-sm font-medium">Start Date</label>
      <input 
        type="date" 
        v-model="dates.start"
        @change="emitChange"
        class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
      />
    </div>
    <div class="space-y-2">
      <label class="text-sm font-medium">End Date</label>
      <input 
        type="date" 
        v-model="dates.end"
        @change="emitChange"
        class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
      />
    </div>
    <button 
      @click="reset" 
      class="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
    >
      Reset
    </button>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

const dates = reactive({
  start: '',
  end: ''
})

const emit = defineEmits(['change'])

const emitChange = () => {
  emit('change', { ...dates })
}

const reset = () => {
  dates.start = ''
  dates.end = ''
  emitChange()
}
</script>
