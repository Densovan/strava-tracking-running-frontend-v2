<template>
  <div class="space-y-4">
    <!-- Desktop Table View -->
    <div class="hidden md:block rounded-xl border border-border bg-card overflow-hidden shadow-sm">
      <table class="w-full text-sm">
        <thead class="bg-muted/50">
          <tr class="border-b border-border transition-colors">
            <th class="h-12 px-4 text-left align-middle font-black text-muted-foreground uppercase tracking-widest text-[9px]">Activity</th>
            <th class="h-12 px-4 text-left align-middle font-black text-muted-foreground uppercase tracking-widest text-[9px]">Date</th>
            <th class="h-12 px-4 text-left align-middle font-black text-muted-foreground uppercase tracking-widest text-[9px]">Distance</th>
            <th class="h-12 px-4 text-left align-middle font-black text-muted-foreground uppercase tracking-widest text-[9px]">Time</th>
            <th class="h-12 px-4 text-left align-middle font-black text-muted-foreground uppercase tracking-widest text-[9px]">Pace</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="act in activities" :key="act.id" class="border-b border-border last:border-0 transition-colors hover:bg-muted/30 group">
            <td class="p-4 align-middle font-bold text-foreground group-hover:text-orange-600 transition-colors italic tracking-tight">{{ act.name }}</td>
            <td class="p-4 align-middle text-muted-foreground font-medium">{{ formatDate(act.startDate) }}</td>
            <td class="p-4 align-middle font-black text-foreground italic tracking-tighter">{{ (act.distance / 1000).toFixed(2) }} km</td>
            <td class="p-4 align-middle text-muted-foreground font-medium">{{ formatDuration(act.movingTime) }}</td>
            <td class="p-4 align-middle font-black text-orange-600 italic tracking-tighter">{{ calculatePace(act.distance, act.movingTime) }} /km</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Mobile Card View -->
    <div class="grid gap-2.5 md:hidden">
      <div 
        v-for="act in activities" 
        :key="act.id" 
        class="p-4 rounded-xl border border-border bg-card shadow-sm space-y-3 relative overflow-hidden group"
      >
        <div class="absolute inset-0 bg-gradient-to-br from-transparent to-slate-50/20 dark:to-slate-900/10 pointer-events-none"></div>
        <div class="relative flex justify-between items-start gap-2">
          <h4 class="font-bold text-sm leading-tight text-foreground line-clamp-2 italic tracking-tight group-hover:text-orange-600 transition-colors">{{ act.name }}</h4>
          <span class="text-[8px] font-black uppercase py-0.5 px-1.5 bg-muted rounded text-muted-foreground shrink-0 border border-border">
            {{ formatDate(act.startDate) }}
          </span>
        </div>
        <div class="relative grid grid-cols-3 gap-1 py-2 border-y border-border">
          <div class="space-y-0.5">
            <p class="text-[8px] uppercase font-black text-muted-foreground tracking-wider">Dist</p>
            <p class="text-xs font-black text-foreground italic tracking-tighter">{{ (act.distance / 1000).toFixed(1) }}k</p>
          </div>
          <div class="space-y-0.5">
            <p class="text-[8px] uppercase font-black text-muted-foreground tracking-wider">Time</p>
            <p class="text-xs font-black text-foreground italic tracking-tighter">{{ formatDurationShort(act.movingTime) }}</p>
          </div>
          <div class="space-y-0.5">
            <p class="text-[8px] uppercase font-black text-muted-foreground tracking-wider">Pace</p>
            <p class="text-xs font-black text-orange-600 italic tracking-tighter">{{ calculatePace(act.distance, act.movingTime) }}</p>
          </div>
        </div>
      </div>
    </div>

    <div v-if="totalPages > 1" class="flex items-center justify-between border-t border-border pt-6">
      <p class="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
        Page {{ page }} / {{ totalPages }}
      </p>
      <div class="flex items-center space-x-2">
        <button 
          @click="$emit('page-change', page - 1)"
          :disabled="page <= 1"
          class="inline-flex items-center justify-center rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all border-2 border-border bg-background/50 hover:border-orange-600 disabled:opacity-20 disabled:hover:border-border h-9 px-4 shrink-0"
        >
          Prev
        </button>
        <button 
          @click="$emit('page-change', page + 1)"
          :disabled="page >= totalPages"
          class="inline-flex items-center justify-center rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all border-2 border-border bg-background/50 hover:border-orange-600 disabled:opacity-20 disabled:hover:border-border h-9 px-4 shrink-0"
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
