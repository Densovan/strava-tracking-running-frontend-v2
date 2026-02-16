<template>
  <div class="group rounded-xl md:rounded-2xl border border-slate-200 bg-white text-card-foreground shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
    <div class="p-4 md:p-6 space-y-4 md:space-y-5">
      <div class="flex justify-between items-start gap-2">
        <div class="space-y-0.5 md:space-y-1">
          <h3 class="text-base md:text-lg font-bold leading-tight tracking-tight group-hover:text-primary transition-colors line-clamp-1">{{ status.goal.name }}</h3>
          <p class="text-[9px] md:text-xs font-medium text-slate-400 flex items-center gap-1">
            <Calendar :size="10" class="md:hidden" />
            <Calendar :size="12" class="hidden md:block" />
            {{ formatDate(status.goal.startDate) }} - {{ formatDate(status.goal.endDate) }}
          </p>
        </div>
        <button 
          @click="$emit('delete', status.goal.id)"
          class="p-1.5 md:p-2 -mr-1 md:-mr-2 rounded-full text-slate-300 hover:text-destructive hover:bg-destructive/10 transition-all shrink-0"
          title="Delete Goal"
        >
          <Trash2 :size="14" class="md:hidden" />
          <Trash2 :size="16" class="hidden md:block" />
        </button>
      </div>

      <div class="space-y-2.5 md:space-y-3">
        <div class="flex justify-between items-end text-sm">
          <div class="flex flex-col">
            <span class="text-[8px] md:text-[10px] uppercase tracking-wider font-black text-slate-400">Progress</span>
            <span class="text-xl md:text-2xl font-black tabular-nums italic tracking-tighter">{{ status.progressPercentage.toFixed(1) }}%</span>
          </div>
          <span class="text-[10px] md:text-xs text-slate-400 mb-0.5 md:mb-1 font-bold">{{ (status.currentDistance).toFixed(1) }} / {{ (status.targetDistance).toFixed(1) }} km</span>
        </div>
        <div class="h-2 md:h-2.5 w-full bg-slate-100 rounded-full overflow-hidden">
          <div 
            class="h-full bg-orange-500 transition-all duration-1000 ease-out relative" 
            :style="{ width: `${Math.min(100, status.progressPercentage)}%` }"
          >
            <div class="absolute inset-0 bg-white/20 animate-pulse"></div>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-2 gap-3 md:gap-4 pt-3 md:pt-4 border-t border-slate-100">
        <div class="space-y-0.5">
          <p class="text-[8px] md:text-[10px] text-slate-400 uppercase tracking-widest font-black">Current</p>
          <p class="text-sm md:text-base font-black italic tracking-tighter">{{ status.currentDistance.toFixed(2) }} <span class="text-[10px] font-normal italic text-slate-400">km</span></p>
        </div>
        <div class="text-right space-y-0.5">
          <p class="text-[8px] md:text-[10px] text-slate-400 uppercase tracking-widest font-black">Remaining</p>
          <p class="text-sm md:text-base font-black text-orange-600 italic tracking-tighter">{{ status.remainingDistance.toFixed(2) }} <span class="text-[10px] font-normal italic text-slate-400">km</span></p>
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
