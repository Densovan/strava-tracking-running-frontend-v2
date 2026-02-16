<template>
  <div class="space-y-4">
    <!-- Desktop Table View -->
    <div class="hidden md:block rounded-xl border bg-card overflow-hidden shadow-sm">
      <table class="w-full text-sm">
        <thead class="bg-muted/30">
          <tr class="border-b transition-colors">
            <th class="h-12 px-4 text-left align-middle font-bold text-muted-foreground uppercase tracking-wider text-[10px]">Activity</th>
            <th class="h-12 px-4 text-left align-middle font-bold text-muted-foreground uppercase tracking-wider text-[10px]">Date</th>
            <th class="h-12 px-4 text-left align-middle font-bold text-muted-foreground uppercase tracking-wider text-[10px]">Distance</th>
            <th class="h-12 px-4 text-left align-middle font-bold text-muted-foreground uppercase tracking-wider text-[10px]">Time</th>
            <th class="h-12 px-4 text-left align-middle font-bold text-muted-foreground uppercase tracking-wider text-[10px]">Pace</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="act in activities" :key="act.id" class="border-b last:border-0 transition-colors hover:bg-muted/20 group">
            <td class="p-4 align-middle font-semibold group-hover:text-primary transition-colors">{{ act.name }}</td>
            <td class="p-4 align-middle text-muted-foreground">{{ formatDate(act.startDate) }}</td>
            <td class="p-4 align-middle font-medium">{{ (act.distance / 1000).toFixed(2) }} km</td>
            <td class="p-4 align-middle text-muted-foreground">{{ formatDuration(act.movingTime) }}</td>
            <td class="p-4 align-middle font-medium">{{ calculatePace(act.distance, act.movingTime) }} /km</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Mobile Card View -->
    <div class="grid gap-2.5 md:hidden">
      <div 
        v-for="act in activities" 
        :key="act.id" 
        class="p-3.5 rounded-xl border border-slate-200 bg-white shadow-sm space-y-2.5"
      >
        <div class="flex justify-between items-start gap-2">
          <h4 class="font-bold text-sm leading-tight text-slate-900 line-clamp-2">{{ act.name }}</h4>
          <span class="text-[8px] font-black uppercase py-0.5 px-1.5 bg-slate-100 rounded text-slate-500 shrink-0">
            {{ formatDate(act.startDate) }}
          </span>
        </div>
        <div class="grid grid-cols-3 gap-1 py-2 border-y border-slate-100">
          <div class="space-y-0.5">
            <p class="text-[8px] uppercase font-black text-slate-400 tracking-wider">Dist</p>
            <p class="text-xs font-black text-slate-900 italic tracking-tighter">{{ (act.distance / 1000).toFixed(1) }}k</p>
          </div>
          <div class="space-y-0.5">
            <p class="text-[8px] uppercase font-black text-slate-400 tracking-wider">Time</p>
            <p class="text-xs font-black text-slate-900 italic tracking-tighter">{{ formatDurationShort(act.movingTime) }}</p>
          </div>
          <div class="space-y-0.5">
            <p class="text-[8px] uppercase font-black text-slate-400 tracking-wider">Pace</p>
            <p class="text-xs font-black text-orange-600 italic tracking-tighter">{{ calculatePace(act.distance, act.movingTime) }}</p>
          </div>
        </div>
      </div>
    </div>

    <div v-if="totalPages > 1" class="flex items-center justify-between">
      <p class="text-sm text-muted-foreground">
        Page {{ page }} of {{ totalPages }} (Total: {{ total }})
      </p>
      <div class="flex items-center space-x-2">
        <button 
          @click="$emit('page-change', page - 1)"
          :disabled="page <= 1"
          class="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2"
        >
          Previous
        </button>
        <button 
          @click="$emit('page-change', page + 1)"
          :disabled="page >= totalPages"
          class="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2"
        >
          Next
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { format } from 'date-fns'

defineProps<{
  activities: any[]
  page: number
  totalPages: number
  total: number
}>()

defineEmits(['page-change'])

const formatDate = (date: string) => format(new Date(date), 'MMM dd, yyyy')

const formatDuration = (seconds: number) => {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins}m ${secs}s`
}

const formatDurationShort = (seconds: number) => {
  const hrs = Math.floor(seconds / 3600)
  const mins = Math.floor((seconds % 3600) / 60)
  return hrs > 0 ? `${hrs}h ${mins}m` : `${mins}m`
}

const calculatePace = (distance: number, time: number) => {
  const paceSeconds = time / (distance / 1000)
  const mins = Math.floor(paceSeconds / 60)
  const secs = Math.round(paceSeconds % 60)
  return `${mins}:${secs.toString().padStart(2, '0')}`
}
</script>
