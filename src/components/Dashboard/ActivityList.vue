<template>
  <div class="rounded-md border">
    <table class="w-full text-sm">
      <thead class="bg-muted/50">
        <tr class="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
          <th class="h-10 px-4 text-left align-middle font-medium text-muted-foreground">Name</th>
          <th class="h-10 px-4 text-left align-middle font-medium text-muted-foreground">Date</th>
          <th class="h-10 px-4 text-left align-middle font-medium text-muted-foreground">Distance</th>
          <th class="h-10 px-4 text-left align-middle font-medium text-muted-foreground">Time</th>
          <th class="h-10 px-4 text-left align-middle font-medium text-muted-foreground">Pace</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="act in activities" :key="act.id" class="border-b transition-colors hover:bg-muted/50">
          <td class="p-4 align-middle font-medium">{{ act.name }}</td>
          <td class="p-4 align-middle">{{ formatDate(act.startDate) }}</td>
          <td class="p-4 align-middle">{{ (act.distance / 1000).toFixed(2) }} km</td>
          <td class="p-4 align-middle">{{ formatDuration(act.movingTime) }}</td>
          <td class="p-4 align-middle">{{ calculatePace(act.distance, act.movingTime) }} /km</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { format } from 'date-fns'

defineProps<{
  activities: any[]
}>()

const formatDate = (date: string) => format(new Date(date), 'MMM dd, yyyy')

const formatDuration = (seconds: number) => {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins}m ${secs}s`
}

const calculatePace = (distance: number, time: number) => {
  const paceSeconds = time / (distance / 1000)
  const mins = Math.floor(paceSeconds / 60)
  const secs = Math.round(paceSeconds % 60)
  return `${mins}:${secs.toString().padStart(2, '0')}`
}
</script>
