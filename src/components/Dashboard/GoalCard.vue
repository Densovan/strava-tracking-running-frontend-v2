<template>
  <div class="glass-card group overflow-hidden relative border-2 border-emerald-500/10 dark:border-emerald-500/30">
    <div class="relative p-8 md:p-10 space-y-8 md:space-y-10">
      <div class="flex justify-between items-start gap-4">
        <div class="space-y-1">
          <h3 class="text-lg md:text-2xl font-black leading-tight tracking-tighter text-foreground group-hover:liquid-text transition-all duration-500 italic uppercase">{{ status.goal.name }}</h3>
          <p class="text-[10px] md:text-xs font-bold text-muted-foreground/60 flex items-center gap-2 uppercase tracking-widest">
            <Calendar :size="12" />
            {{ formatDate(status.goal.startDate) }} - {{ formatDate(status.goal.endDate) }}
          </p>
        </div>
        <button 
          @click="$emit('delete', status.goal.id)"
          class="p-2 md:p-3 rounded-2xl text-muted-foreground/20 hover:text-destructive hover:bg-destructive/10 transition-all shrink-0 border border-transparent hover:border-destructive/20"
          title="Delete Goal"
        >
          <Trash2 :size="18" />
        </button>
      </div>

      <div class="space-y-4 md:space-y-5">
        <div class="flex justify-between items-end">
          <div class="flex flex-col">
            <span class="text-[9px] md:text-[11px] uppercase tracking-[0.2em] font-black text-muted-foreground/40">Efficiency</span>
            <span class="text-2xl md:text-4xl font-black tabular-nums italic tracking-tighter liquid-text">{{ status.progressPercentage.toFixed(1) }}<span class="text-sm md:text-lg ml-0.5">%</span></span>
          </div>
          <div class="text-right">
            <span class="block text-[9px] md:text-[11px] uppercase tracking-[0.2em] font-black text-muted-foreground/40 mb-1">Status</span>
            <span class="text-xs md:text-sm text-foreground font-black italic tracking-tight">{{ (status.currentDistance).toFixed(1) }} <span class="text-muted-foreground/50 not-italic">/</span> {{ (status.targetDistance).toFixed(1) }} <span class="text-emerald-600/50">km</span></span>
          </div>
        </div>
        <div class="h-4 md:h-6 w-full bg-emerald-500/5 dark:bg-emerald-500/10 rounded-full overflow-hidden border border-emerald-500/10 p-1">
          <div 
            class="h-full bg-gradient-to-r from-emerald-400 via-teal-500 to-emerald-600 rounded-full transition-all duration-1000 ease-out relative shadow-[0_0_20px_rgba(16,185,129,0.3)] group-hover:shadow-[0_0_30px_rgba(16,185,129,0.5)]" 
            :style="{ width: `${Math.min(100, status.progressPercentage)}%` }"
          >
            <div class="absolute inset-0 bg-gradient-to-b from-white/40 to-transparent opacity-50"></div>
            <div class="absolute inset-x-0 bottom-0 h-1/2 bg-black/10"></div>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-2 gap-4 md:gap-6 pt-6 md:pt-8 border-t border-emerald-500/10">
        <div class="space-y-1">
          <p class="text-[9px] md:text-[10px] text-muted-foreground/40 uppercase tracking-[0.25em] font-black">Achieved</p>
          <p class="text-lg md:text-2xl font-black italic tracking-tighter text-foreground">{{ status.currentDistance.toFixed(2) }} <span class="text-xs font-bold text-muted-foreground/30 not-italic ml-1">KM</span></p>
        </div>
        <div class="text-right space-y-1">
          <p class="text-[9px] md:text-[10px] text-muted-foreground/40 uppercase tracking-[0.25em] font-black">To Flow</p>
          <p class="text-lg md:text-2xl font-black text-emerald-500 italic tracking-tighter">{{ status.remainingDistance.toFixed(2) }} <span class="text-xs font-bold text-emerald-500/30 not-italic ml-1">KM</span></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Trash2, Calendar } from 'lucide-vue-next'
import { format } from 'date-fns'

defineProps<{
  status: {
    goal: {
      id: number
      name: string
      startDate: string
      endDate: string
    }
    currentDistance: number
    targetDistance: number
    remainingDistance: number
    progressPercentage: number
  }
}>()

defineEmits(['delete'])

const formatDate = (date: string) => format(new Date(date), 'MMM dd, yyyy')
</script>
