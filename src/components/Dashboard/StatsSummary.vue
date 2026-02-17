<template>
  <div class="grid gap-4 grid-cols-2 lg:grid-cols-3">
    <div class="rounded-xl md:rounded-2xl border border-border bg-card p-5 shadow-sm space-y-3 relative overflow-hidden group">
      <div class="absolute inset-0 bg-gradient-to-br from-transparent to-slate-50/20 dark:to-slate-900/10 pointer-events-none"></div>
      <div class="relative flex items-center justify-between">
        <h3 class="text-[9px] font-black uppercase tracking-widest text-muted-foreground">Total Dist</h3>
        <ActivityIcon class="text-orange-600 transition-transform group-hover:scale-110" :size="16" />
      </div>
      <div class="relative">
        <div class="text-2xl font-black tracking-tighter text-foreground italic">{{ stats.totalDistance.toFixed(1) }} <span class="text-[10px] font-medium not-italic text-muted-foreground ml-0.5">km</span></div>
      </div>
    </div>
    <div class="rounded-xl md:rounded-2xl border border-border bg-card p-5 shadow-sm space-y-3 relative overflow-hidden group">
      <div class="absolute inset-0 bg-gradient-to-br from-transparent to-slate-50/20 dark:to-slate-900/10 pointer-events-none"></div>
      <div class="relative flex items-center justify-between">
        <h3 class="text-[9px] font-black uppercase tracking-widest text-muted-foreground">Activities</h3>
        <FootprintsIcon class="text-orange-600 transition-transform group-hover:scale-110" :size="16" />
      </div>
      <div class="relative">
        <div class="text-2xl font-black tracking-tighter text-foreground italic">{{ stats.totalCount }}</div>
      </div>
    </div>
    <div class="rounded-xl md:rounded-2xl border border-border bg-card p-5 shadow-sm space-y-3 col-span-2 lg:col-span-1 relative overflow-hidden group">
      <div class="absolute inset-0 bg-gradient-to-br from-transparent to-slate-50/20 dark:to-slate-900/10 pointer-events-none"></div>
      <div class="relative flex items-center justify-between">
        <h3 class="text-[9px] font-black uppercase tracking-widest text-muted-foreground">Avg Pace</h3>
        <TimerIcon class="text-orange-600 transition-transform group-hover:scale-110" :size="16" />
      </div>
      <div class="relative">
        <div class="text-2xl font-black tracking-tighter text-foreground italic">{{ formatPace(stats.averagePace) }} <span class="text-[10px] font-medium not-italic text-muted-foreground ml-0.5">/km</span></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Activity as ActivityIcon, Footprints as FootprintsIcon, Timer as TimerIcon } from 'lucide-vue-next'

defineProps<{
  stats: {
    totalDistance: number;
    totalCount: number;
    averagePace: number;
  }
}>()

const formatPace = (seconds: number) => {
  if (!seconds) return '0:00'
  const mins = Math.floor(seconds / 60)
  const secs = Math.round(seconds % 60)
  return `${mins}:${secs.toString().padStart(2, '0')}`
}
</script>
