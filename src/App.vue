<template>
  <div class="min-h-screen bg-background text-foreground transition-all duration-300">
    <header class="sticky top-0 z-40 w-full border-b border-border bg-background/80 backdrop-blur-md">
      <div class="container mx-auto px-3 sm:px-4 h-14 md:h-16 flex items-center justify-between">
        <h1 class="text-lg md:text-xl font-black flex items-center gap-1.5 text-foreground italic tracking-tighter shrink-0">
          <ActivityIcon class="text-orange-600" :size="24" />
          <span class="hidden xs:inline">STRAVA</span> DASH
        </h1>
        <div class="flex items-center gap-1.5 sm:gap-4">
          <button 
            @click="isCreateModalOpen = true"
            class="hidden sm:inline-flex items-center justify-center rounded-xl text-[10px] md:text-xs font-bold uppercase tracking-widest transition-all border-2 border-slate-200 bg-white hover:border-slate-900 hover:bg-slate-900 hover:text-white h-9 md:h-10 px-4 md:px-6"
          >
            Set Goal
          </button>
          <button 
            @click="isCreateModalOpen = true"
            class="sm:hidden flex items-center justify-center rounded-xl border-2 border-slate-200 bg-white h-9 w-9 shrink-0"
          >
            <Plus :size="18" />
          </button>
          <button 
            @click="toggleTheme"
            class="flex items-center justify-center rounded-xl border-2 border-border bg-card h-9 md:h-10 w-9 md:w-10 hover:border-foreground transition-all shrink-0"
            :title="isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'"
          >
            <Sun v-if="isDark" :size="18" class="text-orange-500" />
            <Moon v-else :size="18" class="text-slate-600 dark:text-slate-400" />
          </button>
          <button 
            @click="loginWithStrava" 
            class="inline-flex items-center justify-center rounded-xl text-[10px] md:text-xs font-bold uppercase tracking-widest bg-orange-600 text-white hover:bg-orange-700 transition-all shadow-lg shadow-orange-600/20 h-9 md:h-10 px-4 md:px-6 shrink-0"
          >
            Sync
          </button>
        </div>
      </div>
    </header>

    <main class="container mx-auto px-3 sm:px-4 py-6 md:py-10 space-y-8 md:space-y-14">
      <div class="flex flex-col md:flex-row justify-between items-start md:items-end gap-5 md:gap-6">
        <div class="space-y-0.5 md:space-y-1">
          <h2 class="text-2xl md:text-5xl font-black tracking-tighter text-foreground leading-tight">ACTIVITY</h2>
          <p class="text-[10px] md:text-sm text-muted-foreground font-medium">Reach your goals and track progress.</p>
        </div>
        <div class="w-full md:w-auto">
          <DateFilter @change="handleFilterChange" />
        </div>
      </div>

      <!-- Goals Section -->
      <section v-if="goalStatuses.length" class="space-y-4 md:space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div class="flex items-center justify-between border-b border-border pb-2">
          <h3 class="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Your Training Goals</h3>
          <span class="text-[9px] font-bold text-orange-600 bg-orange-500/10 px-2 py-0.5 rounded-full">{{ goalStatuses.length }} Active</span>
        </div>
        <div class="grid gap-4 md:gap-6 md:grid-cols-2 lg:grid-cols-3">
          <GoalCard 
            v-for="status in goalStatuses" 
            :key="status.goal.id" 
            :status="status"
            @delete="handleDeleteGoal"
          />
        </div>
      </section>

      <div class="grid gap-8 lg:gap-12 lg:grid-cols-3">
        <div class="lg:col-span-2 space-y-4 md:space-y-6">
          <div class="flex items-center justify-between border-b border-border pb-2">
            <h3 class="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Performance</h3>
          </div>
          <RunningChart v-if="activities.length" :activities="activities" />
        </div>
        
        <div class="space-y-4 md:space-y-6">
          <div class="flex items-center justify-between border-b border-border pb-2">
            <h3 class="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Total Progress</h3>
          </div>
          <StatsSummary v-if="stats" :stats="stats" />
        </div>
      </div>

      <div class="space-y-4 md:space-y-6">
        <div class="flex items-center justify-between border-b border-border pb-2">
          <h3 class="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">History</h3>
        </div>
        <ActivityList 
          v-if="activities.length" 
          :activities="activities" 
          :page="pagination.page"
          :totalPages="pagination.totalPages"
          :total="pagination.total"
          @page-change="handlePageChange"
        />
        <div v-else class="text-center py-12 md:py-20 text-muted-foreground border-2 border-dashed border-border rounded-2xl md:rounded-3xl bg-muted/30">
          <div class="flex flex-col items-center gap-3">
            <ActivityIcon :size="32" class="opacity-20" />
            <p class="text-sm font-bold tracking-tight px-4">No activities found for this range.</p>
          </div>
        </div>
      </div>
    </main>

    <CreateGoalModal 
      :isOpen="isCreateModalOpen"
      :loading="isCreatingGoal"
      @close="isCreateModalOpen = false"
      @submit="handleCreateGoal"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Activity as ActivityIcon, Plus, Sun, Moon } from 'lucide-vue-next'
import StatsSummary from './components/Dashboard/StatsSummary.vue'
import ActivityList from './components/Dashboard/ActivityList.vue'
import DateFilter from './components/Dashboard/DateFilter.vue'
import RunningChart from './components/Dashboard/RunningChart.vue'
import GoalCard from './components/Dashboard/GoalCard.vue'
import CreateGoalModal from './components/Dashboard/CreateGoalModal.vue'
import { 
  getActivities, 
  getSummary, 
  loginWithStrava, 
  getGoals, 
  getGoalStatus, 
  createGoal, 
  deleteGoal 
} from './api/strava'

const isDark = ref(false)

const toggleTheme = () => {
  isDark.value = !isDark.value
  updateTheme()
}

const updateTheme = () => {
  if (isDark.value) {
    document.documentElement.classList.add('dark')
    localStorage.setItem('theme', 'dark')
  } else {
    document.documentElement.classList.remove('dark')
    localStorage.setItem('theme', 'light')
  }
}

const initTheme = () => {
  const savedTheme = localStorage.getItem('theme')
  if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    isDark.value = true
  } else {
    isDark.value = false
  }
  updateTheme()
}

const activities = ref<any[]>([])
const stats = ref<any>(null)
const goalStatuses = ref<any[]>([])
const isCreateModalOpen = ref(false)
const isCreatingGoal = ref(false)

const pagination = ref({
  page: 1,
  total: 0,
  totalPages: 0,
  limit: 10
})

const currentFilter = ref({
  start: '',
  end: ''
})

const fetchActivities = async () => {
  try {
    const res = await getActivities(
      currentFilter.value.start, 
      currentFilter.value.end, 
      pagination.value.page, 
      pagination.value.limit
    )
    activities.value = res.data.data
    pagination.value.total = res.data.total
    pagination.value.totalPages = res.data.totalPages
  } catch (error) {
    console.error('Error fetching activities:', error)
  }
}

const fetchStats = async () => {
  try {
    const res = await getSummary(currentFilter.value.start, currentFilter.value.end)
    stats.value = res.data
  } catch (error) {
    console.error('Error fetching stats:', error)
  }
}

const fetchGoals = async () => {
  try {
    const res = await getGoals()
    const goals = res.data
    
    // Fetch status for each goal
    const statusPromises = goals.map((g: any) => getGoalStatus(g.id))
    const statusResponses = await Promise.all(statusPromises)
    goalStatuses.value = statusResponses.map(r => r.data)
  } catch (error) {
    console.error('Error fetching goals:', error)
  }
}

const handleFilterChange = (range: { start: string, end: string }) => {
  currentFilter.value = range
  pagination.value.page = 1
  fetchActivities()
  fetchStats()
}

const handlePageChange = (newPage: number) => {
  pagination.value.page = newPage
  fetchActivities()
}

const handleCreateGoal = async (goalData: any) => {
  isCreatingGoal.value = true
  try {
    await createGoal(goalData)
    isCreateModalOpen.value = false
    fetchGoals()
  } catch (error) {
    console.error('Error creating goal:', error)
  } finally {
    isCreatingGoal.value = false
  }
}

const handleDeleteGoal = async (id: number) => {
  if (confirm('Are you sure you want to delete this goal?')) {
    try {
      await deleteGoal(id)
      fetchGoals()
    } catch (error) {
      console.error('Error deleting goal:', error)
    }
  }
}

onMounted(() => {
  initTheme()
  fetchActivities()
  fetchStats()
  fetchGoals()
})
</script>
