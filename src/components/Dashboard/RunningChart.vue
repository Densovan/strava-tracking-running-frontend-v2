<template>
  <div class="rounded-xl border bg-card text-card-foreground shadow p-6">
    <div class="flex flex-col space-y-1.5 pb-4">
      <h3 class="text-lg font-semibold leading-none tracking-tight">Monthly Distance</h3>
      <p class="text-sm text-muted-foreground">Running progress over time</p>
    </div>
    <div class="h-[200px] sm:h-[300px]">
      <Line :data="chartData" :options="chartOptions" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted } from 'vue'
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

const windowWidth = ref(typeof window !== 'undefined' ? window.innerWidth : 1200)

const handleResize = () => {
  windowWidth.value = window.innerWidth
}

onMounted(() => {
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})

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

const chartOptions = computed(() => {
  const isMobile = windowWidth.value < 640

  return {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: !isMobile,
        position: 'top' as const,
        labels: {
          font: {
            family: "'Inter', sans-serif",
            weight: 'bold' as const,
            size: 10
          }
        }
      },
      tooltip: {
        padding: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleFont: {
          size: 12,
          weight: 'bold' as const
        },
        bodyFont: {
          size: 11
        }
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        },
        ticks: {
          font: {
            size: isMobile ? 8 : 10,
            weight: 'bold' as const
          },
          color: '#94a3b8'
        }
      },
      y: {
        beginAtZero: true,
        grid: {
          color: '#f1f5f9'
        },
        ticks: {
          font: {
            size: isMobile ? 8 : 10,
            weight: 'bold' as const
          },
          color: '#94a3b8',
          callback: (value: any) => isMobile ? `${value}k` : `${value} km`
        }
      }
    },
    elements: {
      line: {
        tension: 0.4,
        borderWidth: 3,
        borderColor: '#ea580c',
        backgroundColor: 'rgba(234, 88, 12, 0.1)',
        fill: true
      },
      point: {
        radius: isMobile ? 3 : 5,
        hoverRadius: isMobile ? 5 : 7,
        backgroundColor: '#ea580c',
        borderColor: '#fff',
        borderWidth: 2
      }
    }
  }
})
</script>
