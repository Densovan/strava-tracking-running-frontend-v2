<template>
  <div class="grid gap-4 grid-cols-2 lg:grid-cols-3">
    <div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-3">
      <div class="flex items-center justify-between">
        <h3 class="text-[10px] font-black uppercase tracking-widest text-slate-400">Total Dist</h3>
        <ActivityIcon class="text-orange-600 opacity-50" :size="16" />
      </div>
      <div>
        <div class="text-2xl font-black tracking-tight text-slate-900">{{ stats.totalDistance.toFixed(1) }} <span class="text-xs font-normal text-slate-500">km</span></div>
      </div>
    </div>
    <div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-3">
      <div class="flex items-center justify-between">
        <h3 class="text-[10px] font-black uppercase tracking-widest text-slate-400">Activities</h3>
        <FootprintsIcon class="text-orange-600 opacity-50" :size="16" />
      </div>
      <div>
        <div class="text-2xl font-black tracking-tight text-slate-900">{{ stats.totalCount }}</div>
      </div>
    </div>
    <div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-3 col-span-2 lg:col-span-1">
      <div class="flex items-center justify-between">
        <h3 class="text-[10px] font-black uppercase tracking-widest text-slate-400">Avg Pace</h3>
        <TimerIcon class="text-orange-600 opacity-50" :size="16" />
      </div>
      <div>
        <div class="text-2xl font-black tracking-tight text-slate-900">{{ formatPace(stats.averagePace) }} <span class="text-xs font-normal text-slate-500">/km</span></div>
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
