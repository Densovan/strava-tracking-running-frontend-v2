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
const isDarkMode = ref(false)

const handleResize = () => {
  windowWidth.value = window.innerWidth
  checkDarkMode()
}

const checkDarkMode = () => {
  isDarkMode.value = document.documentElement.classList.contains('dark')
}

let observer: MutationObserver | null = null

onMounted(() => {
  window.addEventListener('resize', handleResize)
  checkDarkMode()
  
  // Watch for theme changes
  observer = new MutationObserver(() => {
    checkDarkMode()
  })
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['class']
  })
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  if (observer) observer.disconnect()
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
  const isDark = isDarkMode.value

  return {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: !isMobile,
        position: 'top' as const,
        labels: {
          color: isDark ? '#94a3b8' : '#64748b',
          font: {
            family: "'Inter', sans-serif",
            weight: 'bold' as const,
            size: 10
          }
        }
      },
      tooltip: {
        padding: 12,
        backgroundColor: isDark ? 'rgba(15, 23, 42, 0.9)' : 'rgba(0, 0, 0, 0.8)',
        titleFont: {
          size: 13,
          weight: 'bold' as const
        },
        bodyFont: {
          size: 12
        },
        borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
        borderWidth: 1
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
          color: isDark ? '#64748b' : '#94a3b8'
        }
      },
      y: {
        beginAtZero: true,
        grid: {
          color: isDark ? 'rgba(255, 255, 255, 0.05)' : '#f1f5f9'
        },
        ticks: {
          font: {
            size: isMobile ? 8 : 10,
            weight: 'bold' as const
          },
          color: isDark ? '#64748b' : '#94a3b8',
          callback: (value: any) => isMobile ? `${value}k` : `${value} km`
        }
      }
    },
    elements: {
      line: {
        tension: 0.4,
        borderWidth: 4,
        borderColor: '#ea580c',
        backgroundColor: isDark ? 'rgba(234, 88, 12, 0.15)' : 'rgba(234, 88, 12, 0.08)',
        fill: true
      },
      point: {
        radius: isMobile ? 4 : 6,
        hoverRadius: isMobile ? 6 : 8,
        backgroundColor: '#ea580c',
        borderColor: isDark ? '#0f172a' : '#fff',
        borderWidth: 3
      }
    }
  }
})
</script>
