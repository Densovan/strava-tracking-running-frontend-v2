<template>
  <div class="min-h-screen bg-background">
    <header class="border-b bg-card">
      <div class="container mx-auto px-4 h-16 flex items-center justify-between">
        <h1 class="text-xl font-bold flex items-center gap-2">
          <Activity class="text-primary" />
          Strava Dash
        </h1>
        <button 
          @click="loginWithStrava" 
          class="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
        >
          Sync with Strava
        </button>
      </div>
    </header>

    <main class="container mx-auto px-4 py-8 space-y-8">
      <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 class="text-3xl font-bold tracking-tight">Dashboard</h2>
          <p class="text-muted-foreground">Monitor your running progress and stats.</p>
        </div>
        <DateFilter @change="handleFilterChange" />
      </div>

      <StatsSummary v-if="stats" :stats="stats" />
      
      <div class="grid gap-8 md:grid-cols-1">
        <RunningChart v-if="activities.length" :activities="activities" />
      </div>

      <div class="space-y-4">
        <h3 class="text-xl font-semibold">Recent Activities</h3>
        <ActivityList v-if="activities.length" :activities="activities" />
        <div v-else class="text-center py-12 text-muted-foreground border rounded-lg bg-card">
          No activities found for the selected range.
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Activity } from 'lucide-vue-next'
import StatsSummary from './components/Dashboard/StatsSummary.vue'
import ActivityList from './components/Dashboard/ActivityList.vue'
import DateFilter from './components/Dashboard/DateFilter.vue'
import RunningChart from './components/Dashboard/RunningChart.vue'
import { getActivities, getSummary, loginWithStrava } from './api/strava'

const activities = ref<any[]>([])
const stats = ref<any>(null)

const fetchData = async (startDate?: string, endDate?: string) => {
  try {
    const [actRes, statRes] = await Promise.all([
      getActivities(startDate, endDate),
      getSummary(startDate, endDate)
    ])
    activities.value = actRes.data
    stats.value = statRes.data
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}

const handleFilterChange = (range: { start: string, end: string }) => {
  fetchData(range.start, range.end)
}

onMounted(() => {
  fetchData()
})
</script>
