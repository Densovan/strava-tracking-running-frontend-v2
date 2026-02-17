<template>
  <div class="flex flex-col gap-6">
    <div v-for="(stat, index) in [
      { label: 'Cumulative Flow', value: stats.totalDistance.toFixed(1), unit: 'KM', icon: ActivityIcon },
      { label: 'Total Cycles', value: stats.totalCount, unit: '', icon: FootprintsIcon },
      { label: 'Average Tempo', value: formatPace(stats.averagePace), unit: '/KM', icon: TimerIcon }
    ]" :key="index" class="glass-card group p-8 lg:p-10 space-y-4 relative overflow-hidden border-2 border-emerald-500/10 dark:border-emerald-500/30 hover:scale-[1.02] transition-transform">
      <!-- Premium inner light -->
      <div class="absolute inset-0 bg-gradient-to-br from-emerald-500/[0.05] to-transparent pointer-events-none"></div>
      <div class="relative flex items-center justify-between">
        <h3 class="text-[10px] md:text-[11px] font-black uppercase tracking-[0.4em] text-emerald-600/40">{{ stat.label }}</h3>
        <component :is="stat.icon" class="text-emerald-500 transition-all duration-700 group-hover:scale-125 group-hover:rotate-12 animate-pulse-slow shrink-0" :size="24" />
      </div>
      <div class="relative">
        <div class="text-4xl md:text-5xl lg:text-5xl font-black tracking-tighter liquid-text italic leading-none">{{ stat.value }} <span v-if="stat.unit" class="text-xs md:text-xl font-black not-italic text-emerald-500/30 ml-1">{{ stat.unit }}</span></div>
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
