<template>
  <div class="rounded-xl border bg-card text-card-foreground shadow p-6">
    <div class="flex flex-col space-y-1.5 pb-4">
      <h3 class="text-lg font-semibold leading-none tracking-tight">Monthly Distance</h3>
      <p class="text-sm text-muted-foreground">Running progress over time</p>
    </div>
    <div class="h-[300px]">
      <Line :data="chartData" :options="chartOptions" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import { Line } from 'vue-chartjs'
import { format, eachMonthOfInterval, subMonths } from 'date-fns'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

const props = defineProps<{
  activities: any[]
}>()

const chartData = computed(() => {
  const months = eachMonthOfInterval({
    start: subMonths(new Date(), 5),
    end: new Date()
  })

  const labels = months.map(m => format(m, 'MMM yyyy'))
  const data = months.map(m => {
    const monthStr = format(m, 'yyyy-MM')
    return props.activities
      .filter(a => format(new Date(a.startDate), 'yyyy-MM') === monthStr)
      .reduce((acc, curr) => acc + (curr.distance / 1000), 0)
  })

  return {
    labels,
    datasets: [
      {
        label: 'Distance (km)',
        backgroundColor: '#f87171',
        borderColor: '#ef4444',
        data
      }
    ]
  }
})

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      beginAtZero: true,
      title: {
        display: true,
        text: 'Kilometers'
      }
    }
  }
}
</script>
