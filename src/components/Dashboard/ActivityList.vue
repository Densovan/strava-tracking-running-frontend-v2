<template>
  <div class="space-y-10">
    <!-- Desktop Table View -->
    <div class="hidden md:block glass-card overflow-hidden">
      <table class="w-full text-sm border-collapse">
        <thead class="bg-emerald-500/5 backdrop-blur-md">
          <tr>
            <th class="h-16 px-8 text-left align-middle font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-[0.3em] text-[10px]">Movement</th>
            <th class="h-16 px-8 text-left align-middle font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-[0.3em] text-[10px]">Timeline</th>
            <th class="h-16 px-8 text-left align-middle font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-[0.3em] text-[10px]">Impact (km)</th>
            <th class="h-16 px-8 text-left align-middle font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-[0.3em] text-[10px]">Duration</th>
            <th class="h-16 px-8 text-left align-middle font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-[0.3em] text-[10px]">Intensity</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="act in activities" :key="act.id" class="border-b border-emerald-500/5 last:border-0 transition-all duration-300 hover:bg-emerald-500/10 group">
            <td class="p-8 align-middle font-black text-lg text-foreground group-hover:liquid-text transition-all italic tracking-tighter">{{ act.name }}</td>
            <td class="p-8 align-middle text-muted-foreground/60 font-bold uppercase tracking-widest text-[10px]">{{ formatDate(act.startDate) }}</td>
            <td class="p-8 align-middle font-black text-xl text-foreground italic tracking-tighter">{{ (act.distance / 1000).toFixed(2) }}<span class="text-xs opacity-30 ml-1">K</span></td>
            <td class="p-8 align-middle text-muted-foreground/60 font-bold uppercase tracking-widest text-[10px]">{{ formatDuration(act.movingTime) }}</td>
            <td class="p-8 align-middle">
              <span class="font-black text-xl text-emerald-500 italic tracking-tighter group-hover:scale-110 transition-transform inline-block">{{ calculatePace(act.distance, act.movingTime) }}</span>
              <span class="text-[10px] font-black text-emerald-500/30 uppercase tracking-widest ml-1 italic">/km</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Mobile Card View -->
    <div class="grid gap-6 md:hidden">
      <div 
        v-for="act in activities" 
        :key="act.id" 
        class="glass-card p-6 space-y-5 group"
      >
        <div class="flex justify-between items-start gap-3">
          <h4 class="font-black text-lg leading-tight text-foreground italic tracking-tighter group-hover:liquid-text transition-all">{{ act.name }}</h4>
          <span class="text-[9px] font-black uppercase py-1 px-3 bg-emerald-500/10 rounded-full text-emerald-600 dark:text-emerald-400 border border-emerald-500/10 shrink-0">
            {{ formatDate(act.startDate) }}
          </span>
        </div>
        <div class="grid grid-cols-3 gap-4 py-4 border-y border-emerald-500/10">
          <div class="space-y-1">
            <p class="text-[9px] uppercase font-black text-muted-foreground/40 tracking-[0.2em]">Flow</p>
            <p class="text-base font-black text-foreground italic tracking-tighter">{{ (act.distance / 1000).toFixed(1) }}k</p>
          </div>
          <div class="space-y-1">
            <p class="text-[9px] uppercase font-black text-muted-foreground/40 tracking-[0.2em]">Time</p>
            <p class="text-base font-black text-foreground italic tracking-tighter">{{ formatDurationShort(act.movingTime) }}</p>
          </div>
          <div class="space-y-1">
            <p class="text-[9px] uppercase font-black text-muted-foreground/40 tracking-[0.2em]">Pace</p>
            <p class="text-base font-black text-emerald-500 italic tracking-tighter">{{ calculatePace(act.distance, act.movingTime) }}</p>
          </div>
        </div>
      </div>
    </div>

    <div v-if="totalPages > 1" class="flex items-center justify-between pt-10 px-4">
      <p class="text-xs font-black uppercase tracking-[0.3em] text-emerald-600/40 dark:text-emerald-400/30">
        Cycle {{ page }} of {{ totalPages }}
      </p>
      <div class="flex items-center space-x-4">
        <button 
          @click="$emit('page-change', page - 1)"
          :disabled="page <= 1"
          class="glass h-12 px-8 rounded-2xl text-xs font-black uppercase tracking-widest border border-emerald-500/20 hover:border-emerald-500 disabled:opacity-20 transition-all text-emerald-600 dark:text-emerald-400"
        >
          Prev
        </button>
        <button 
          @click="$emit('page-change', page + 1)"
          :disabled="page >= totalPages"
          class="glass h-12 px-8 rounded-2xl text-xs font-black uppercase tracking-widest border border-emerald-500/20 hover:border-emerald-500 disabled:opacity-20 transition-all text-emerald-600 dark:text-emerald-400"
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
