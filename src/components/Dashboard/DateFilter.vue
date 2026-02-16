<template>
  <div class="flex flex-col sm:flex-row gap-3 items-stretch sm:items-end bg-white p-3 sm:p-4 rounded-xl md:rounded-2xl border border-slate-200 shadow-sm w-full md:w-auto">
    <div class="flex-1 space-y-1">
      <label class="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-1">Start</label>
      <input 
        type="date" 
        v-model="dates.start"
        @change="emitChange"
        class="flex h-10 sm:h-11 w-full rounded-lg sm:rounded-xl border border-slate-200 bg-slate-50 px-2 sm:px-3 py-2 text-xs sm:text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus:ring-2 focus:ring-orange-600/20 focus:border-orange-600 transition-all"
      />
    </div>
    <div class="flex-1 space-y-1">
      <label class="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-1">End</label>
      <input 
        type="date" 
        v-model="dates.end"
        @change="emitChange"
        class="flex h-10 sm:h-11 w-full rounded-lg sm:rounded-xl border border-slate-200 bg-slate-50 px-2 sm:px-3 py-2 text-xs sm:text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus:ring-2 focus:ring-orange-600/20 focus:border-orange-600 transition-all"
      />
    </div>
    <button 
      @click="reset" 
      class="inline-flex items-center justify-center rounded-lg sm:rounded-xl text-[10px] sm:text-xs font-bold uppercase tracking-widest transition-all border-2 border-slate-200 bg-white hover:border-slate-900 hover:bg-slate-900 hover:text-white h-10 sm:h-11 px-6 mt-1 sm:mt-0"
    >
      Reset
    </button>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

const dates = reactive({
  start: '',
  end: ''
})

const emit = defineEmits(['change'])

const emitChange = () => {
  emit('change', { ...dates })
}

const reset = () => {
  dates.start = ''
  dates.end = ''
  emitChange()
}
</script>
