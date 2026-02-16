<template>
  <div class="grid gap-4 md:grid-cols-3">
    <div class="rounded-xl border bg-card text-card-foreground shadow">
      <div class="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
        <h3 class="tracking-tight text-sm font-medium">Total Distance</h3>
        <Activity class="h-4 w-4 text-muted-foreground" />
      </div>
      <div class="p-6 pt-0">
        <div class="text-2xl font-bold">{{ stats.totalDistance.toFixed(2) }} km</div>
        <p class="text-xs text-muted-foreground">All time running</p>
      </div>
    </div>
    <div class="rounded-xl border bg-card text-card-foreground shadow">
      <div class="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
        <h3 class="tracking-tight text-sm font-medium">Activities</h3>
        <Footprints class="h-4 w-4 text-muted-foreground" />
      </div>
      <div class="p-6 pt-0">
        <div class="text-2xl font-bold">{{ stats.totalCount }}</div>
        <p class="text-xs text-muted-foreground">Recorded runs</p>
      </div>
    </div>
    <div class="rounded-xl border bg-card text-card-foreground shadow">
      <div class="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
        <h3 class="tracking-tight text-sm font-medium">Avg Pace</h3>
        <Timer class="h-4 w-4 text-muted-foreground" />
      </div>
      <div class="p-6 pt-0">
        <div class="text-2xl font-bold">{{ formatPace(stats.averagePace) }} /km</div>
        <p class="text-xs text-muted-foreground">Average across all runs</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Activity, Footprints, Timer } from 'lucide-vue-next'

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
