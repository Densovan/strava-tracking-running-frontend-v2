<template>
  <div class="glass-card p-10 md:p-14 space-y-10 border-2 border-emerald-500/10 dark:border-emerald-500/30">
    <div class="flex flex-col space-y-3">
      <h3 class="text-2xl md:text-4xl font-black italic tracking-tighter liquid-text uppercase">Kinetic Flow</h3>
      <p class="text-[11px] md:text-sm font-black uppercase tracking-[0.3em] text-emerald-600/40">Distance dynamics over time</p>
    </div>
    <div class="h-[300px] md:h-[500px]">
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
        label: 'Momentum (km)',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        borderColor: '#10b981',
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
          color: isDark ? '#10b981' : '#047857',
          font: {
            family: "'Inter', sans-serif",
            weight: 900 as const,
            size: 10
          }
        }
      },
      tooltip: {
        padding: 16,
        backgroundColor: isDark ? 'rgba(6, 78, 59, 0.9)' : 'rgba(255, 255, 255, 0.9)',
        titleColor: isDark ? '#fff' : '#064e3b',
        bodyColor: isDark ? '#10b981' : '#059669',
        titleFont: {
          size: 14,
          weight: 900 as const
        },
        bodyFont: {
          size: 12,
          weight: 700 as const
        },
        borderColor: 'rgba(16, 185, 129, 0.2)',
        borderWidth: 1,
        displayColors: false
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        },
        ticks: {
          font: {
            size: isMobile ? 9 : 11,
            weight: 900 as const
          },
          color: isDark ? '#065f46' : '#10b981'
        }
      },
      y: {
        beginAtZero: true,
        grid: {
          color: isDark ? 'rgba(16, 185, 129, 0.05)' : 'rgba(16, 185, 129, 0.03)'
        },
        ticks: {
          font: {
            size: isMobile ? 9 : 11,
            weight: 900 as const
          },
          color: isDark ? '#065f46' : '#10b981',
          callback: (value: any) => isMobile ? `${value}k` : `${value} KM`
        }
      }
    },
    elements: {
      line: {
        tension: 0.5,
        borderWidth: 6,
        borderColor: '#10b981',
        backgroundColor: isDark ? 'rgba(16, 185, 129, 0.2)' : 'rgba(16, 185, 129, 0.05)',
        fill: true,
        capBezierPoints: true
      },
      point: {
        radius: isMobile ? 5 : 8,
        hoverRadius: isMobile ? 8 : 12,
        backgroundColor: '#059669',
        borderColor: isDark ? '#022c22' : '#fff',
        borderWidth: 4,
        hoverBorderWidth: 6
      }
    }
  }
})
</script>
