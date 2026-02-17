<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4">
    <div class="fixed inset-0 bg-emerald-950/40 backdrop-blur-xl transition-all duration-700" @click="$emit('close')"></div>
    <div class="glass-card relative w-full max-w-lg p-10 md:p-14 animate-in fade-in zoom-in duration-500 overflow-hidden">
      <!-- Premium background sweep -->
      <div class="absolute top-0 right-0 w-48 h-48 bg-emerald-500/10 blur-3xl rounded-full -mr-24 -mt-24 pointer-events-none animate-pulse-slow"></div>
      
      <div class="relative flex flex-col space-y-2 text-center sm:text-left mb-10">
        <h2 class="text-3xl md:text-5xl font-black italic tracking-tighter text-foreground uppercase liquid-text leading-none">Set New Goal</h2>
        <p class="text-[10px] md:text-xs font-black uppercase tracking-[0.3em] text-emerald-600/40">Challenge your momentum.</p>
      </div>

      <form @submit.prevent="handleSubmit" class="relative space-y-6 md:space-y-8">
        <div class="space-y-2">
          <label class="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-600/40 ml-2" for="name">Goal Designation</label>
          <input 
            v-model="form.name"
            id="name"
            placeholder="e.g. Marathon Flow"
            class="flex h-12 md:h-14 w-full rounded-2xl border border-emerald-500/10 bg-emerald-500/5 px-6 py-2 text-base font-bold text-foreground focus-visible:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all italic"
            required
          />
        </div>

        <div class="space-y-2">
          <label class="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-600/40 ml-2" for="target">Target Extension (km)</label>
          <input 
            v-model.number="form.targetDistance"
            id="target"
            type="number"
            step="0.1"
            placeholder="e.g. 42.2"
            class="flex h-12 md:h-14 w-full rounded-2xl border border-emerald-500/10 bg-emerald-500/5 px-6 py-2 text-base font-black text-foreground focus-visible:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all italic tabular-nums"
            required
          />
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
          <div class="space-y-2">
            <label class="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-600/40 ml-2" for="start">Initiate</label>
            <input 
              v-model="form.startDate"
              id="start"
              type="date"
              class="flex h-12 md:h-14 w-full rounded-2xl border border-emerald-500/10 bg-emerald-500/5 px-6 py-2 text-base font-bold text-foreground focus-visible:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all italic"
              required
            />
          </div>
          <div class="space-y-2">
            <label class="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-600/40 ml-2" for="end">Conclude</label>
            <input 
              v-model="form.endDate"
              id="end"
              type="date"
              class="flex h-12 md:h-14 w-full rounded-2xl border border-emerald-500/10 bg-emerald-500/5 px-6 py-2 text-base font-bold text-foreground focus-visible:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all italic"
              required
            />
          </div>
        </div>

        <div class="flex flex-col-reverse sm:flex-row sm:justify-end gap-4 pt-6">
          <button 
            type="button"
            @click="$emit('close')"
            class="glass inline-flex items-center justify-center rounded-2xl text-xs font-black uppercase tracking-widest transition-all border border-emerald-500/20 hover:border-emerald-500 hover:text-emerald-500 hover:bg-emerald-500/10 h-12 md:h-14 px-10"
          >
            Abort
          </button>
          <button 
            type="submit"
            :disabled="loading"
            class="inline-flex items-center justify-center rounded-2xl text-xs font-black uppercase tracking-widest bg-emerald-600 text-white hover:bg-emerald-500 transition-all shadow-xl shadow-emerald-600/20 disabled:pointer-events-none disabled:opacity-50 h-12 md:h-14 px-14"
          >
            {{ loading ? 'Synchronizing...' : 'Create Goal' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const props = defineProps<{
  isOpen: boolean;
  loading: boolean;
}>();

const emit = defineEmits(["close", "submit"]);

const form = ref({
  name: "",
  targetDistance: 0,
  startDate: new Date().toISOString().split("T")[0],
  endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split("T")[0],
});

const handleSubmit = () => {
  emit("submit", {
    ...form.value,
    targetDistance: form.value.targetDistance * 1000, // convert to meters
  });
};
</script>
