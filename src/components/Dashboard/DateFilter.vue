<template>
  <div class="glass flex flex-col sm:flex-row gap-4 items-stretch sm:items-end p-4 rounded-3xl border border-emerald-500/10 w-full md:w-auto relative overflow-hidden">
    <div class="relative flex-1 space-y-1.5">
      <label class="text-[9px] font-black uppercase tracking-[0.2em] text-emerald-600/40 ml-2">Initiate</label>
      <input 
        type="date" 
        v-model="dates.start"
        @change="emitChange"
        class="flex h-12 w-full rounded-2xl border border-emerald-500/10 bg-emerald-500/5 px-4 py-2 text-sm font-bold text-foreground focus-visible:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all italic"
      />
    </div>
    <div class="relative flex-1 space-y-1.5">
      <label class="text-[9px] font-black uppercase tracking-[0.2em] text-emerald-600/40 ml-2">Conclude</label>
      <input 
        type="date" 
        v-model="dates.end"
        @change="emitChange"
        class="flex h-12 w-full rounded-2xl border border-emerald-500/10 bg-emerald-500/5 px-4 py-2 text-sm font-bold text-foreground focus-visible:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all italic"
      />
    </div>
    <button 
      @click="reset" 
      class="glass inline-flex items-center justify-center rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all border border-emerald-500/20 hover:border-emerald-500 hover:text-emerald-500 hover:bg-emerald-500/10 h-12 px-8 mt-1 sm:mt-0"
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
