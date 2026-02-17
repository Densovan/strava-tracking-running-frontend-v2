<template>
  <div class="min-h-screen bg-background text-foreground transition-all duration-700 relative overflow-hidden">
    <!-- Liquid Background Blobs -->
    <div class="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <div class="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-emerald-400/10 dark:bg-emerald-500/5 blur-[120px] animate-morph animate-float"></div>
      <div class="absolute top-[20%] -right-[5%] w-[35%] h-[35%] bg-teal-400/10 dark:bg-teal-500/5 blur-[100px] animate-morph animate-float mt-20" style="animation-delay: -2s"></div>
      <div class="absolute -bottom-[10%] left-[20%] w-[50%] h-[50%] bg-emerald-500/10 dark:bg-emerald-600/5 blur-[150px] animate-morph animate-float" style="animation-delay: -4s"></div>
    </div>

    <header class="sticky top-0 z-40 w-full bg-background/0 backdrop-blur-0">
      <div class="max-w-8xl mx-auto px-4 sm:px-8 lg:px-12 py-4">
        <div class="glass-card flex items-center justify-between h-14 md:h-20 px-6 sm:px-10 border-white/40 dark:border-white/10">
          <h1 class="text-xl md:text-3xl font-black flex items-center gap-2 italic tracking-tighter shrink-0 liquid-text">
            <ActivityIcon class="text-emerald-500 animate-pulse-slow" :size="32" />
            <span class="hidden xs:inline">STRAVA</span> DASH
          </h1>
          <div class="flex items-center gap-2 sm:gap-4">
            <button 
              @click="isCreateModalOpen = true"
              class="hidden sm:inline-flex items-center justify-center rounded-2xl text-xs font-black uppercase tracking-widest transition-all border border-emerald-500/30 bg-emerald-500/10 hover:bg-emerald-500 hover:text-white h-10 md:h-12 px-6 md:px-8 shadow-lg shadow-emerald-500/10"
            >
              Set Goal
            </button>
            <button 
              @click="isCreateModalOpen = true"
              class="sm:hidden flex items-center justify-center rounded-2xl border border-emerald-500/30 bg-emerald-500/10 h-10 w-10 shrink-0"
            >
              <Plus :size="20" class="text-emerald-600 dark:text-emerald-400" />
            </button>
            <button 
              @click="toggleTheme"
              class="flex items-center justify-center rounded-2xl border border-border bg-card h-10 md:h-12 w-10 md:w-12 hover:border-emerald-500 transition-all shrink-0"
              :title="isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'"
            >
              <Sun v-if="isDark" :size="20" class="text-emerald-400" />
              <Moon v-else :size="20" class="text-emerald-600" />
            </button>
            <button 
              @click="loginWithStrava" 
              class="inline-flex items-center justify-center rounded-2xl text-xs font-black uppercase tracking-widest bg-emerald-600 text-white hover:bg-emerald-500 transition-all shadow-xl shadow-emerald-600/20 h-10 md:h-12 px-6 md:px-10 shrink-0"
            >
              Sync
            </button>
          </div>
        </div>
      </div>
    </header>

    <main class="max-w-8xl mx-auto px-4 sm:px-8 lg:px-12 py-12 md:py-24 space-y-24 md:space-y-40 relative z-10">
      <!-- Performance Pulse -->
      <section class="flex flex-col md:flex-row justify-between items-start md:items-end gap-10 md:gap-16">
        <div class="space-y-4">
          <h2 class="text-5xl md:text-8xl font-black tracking-tighter text-foreground leading-none italic uppercase liquid-text">Performance</h2>
          <p class="text-xs md:text-xl font-bold text-emerald-600/40 lowercase tracking-tight">Your running journey through a liquid lens.</p>
        </div>
        <div class="w-full md:w-auto">
          <DateFilter @change="handleFilterChange" />
        </div>
      </section>

      <!-- Grid layout for Chart and Vital Stats -->
      <section class="grid gap-16 lg:gap-24 lg:grid-cols-12">
        <div class="lg:col-span-8 space-y-10">
          <div class="flex items-center justify-between border-b-2 border-emerald-500/10 pb-6">
            <h3 class="text-xs md:text-sm font-black uppercase tracking-[0.4em] text-emerald-600/40">Kinetic Momentum</h3>
          </div>
          <RunningChart v-if="activities.length" :activities="activities" />
        </div>
        
        <div class="lg:col-span-4 space-y-10">
          <div class="flex items-center justify-between border-b-2 border-emerald-500/10 pb-6">
            <h3 class="text-xs md:text-sm font-black uppercase tracking-[0.4em] text-emerald-600/40">Vital Metrics</h3>
          </div>
          <StatsSummary v-if="stats" :stats="stats" />
        </div>
      </section>

      <!-- Active Objectives -->
      <section v-if="goalStatuses.length" class="space-y-10 animate-in fade-in slide-in-from-bottom-12 duration-1000">
        <div class="flex items-center justify-between border-b-2 border-emerald-500/10 pb-6">
          <h3 class="text-xs md:text-sm font-black uppercase tracking-[0.4em] text-emerald-600/40">Active Objectives</h3>
          <span class="text-[10px] md:text-xs font-black text-emerald-600 dark:text-emerald-400 bg-emerald-500/5 px-6 py-2 rounded-full border border-emerald-500/10 tracking-widest uppercase">{{ goalStatuses.length }} active</span>
        </div>
        <div class="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          <GoalCard 
            v-for="status in goalStatuses" 
            :key="status.goal.id" 
            :status="status"
            @delete="handleDeleteGoal"
          />
        </div>
      </section>

      <!-- Activity Stream -->
      <section class="space-y-10">
        <div class="flex items-center justify-between border-b-2 border-emerald-500/10 pb-6">
          <h3 class="text-xs md:text-sm font-black uppercase tracking-[0.4em] text-emerald-600/40">Activity Stream</h3>
        </div>
        <ActivityList 
          v-if="activities.length" 
          :activities="activities" 
          :page="pagination.page"
          :totalPages="pagination.totalPages"
          :total="pagination.total"
          @page-change="handlePageChange"
        />
        <div v-else class="text-center py-32 md:py-48 text-muted-foreground glass-card border-dashed-2 border-emerald-500/10">
          <div class="flex flex-col items-center gap-8">
            <ActivityIcon :size="64" class="text-emerald-500 opacity-10" />
            <p class="text-xl md:text-2xl font-black italic tracking-tight text-emerald-600/30">Liquidity waiting... no activities found.</p>
          </div>
        </div>
      </section>
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
