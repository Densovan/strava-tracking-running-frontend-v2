<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4">
    <div class="fixed inset-0 bg-background/60 dark:bg-slate-950/80 backdrop-blur-md transition-all duration-500" @click="$emit('close')"></div>
    <div class="relative w-full max-w-lg rounded-2xl md:rounded-3xl border border-border bg-card p-6 shadow-2xl sm:p-10 animate-in fade-in zoom-in duration-300 overflow-hidden">
      <!-- Premium background sweep -->
      <div class="absolute top-0 right-0 w-32 h-32 bg-orange-600/5 blur-3xl rounded-full -mr-16 -mt-16 pointer-events-none"></div>
      
      <div class="relative flex flex-col space-y-1 text-center sm:text-left mb-8">
        <h2 class="text-2xl md:text-3xl font-black italic tracking-tighter text-foreground">Set New Goal</h2>
        <p class="text-xs md:text-sm font-medium text-muted-foreground">Challenge yourself with a distance target.</p>
      </div>

      <form @submit.prevent="handleSubmit" class="relative space-y-5 md:space-y-6">
        <div class="space-y-2">
          <label class="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1" for="name">Goal Name</label>
          <input 
            v-model="form.name"
            id="name"
            placeholder="e.g. Marathon Training"
            class="flex h-12 w-full rounded-xl border border-border bg-muted/30 dark:bg-slate-900/50 px-4 py-2 text-base text-foreground ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus:ring-2 focus:ring-orange-600/20 focus:border-orange-600 transition-all md:text-sm"
            required
          />
        </div>

        <div class="space-y-2">
          <label class="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1" for="target">Target Distance (km)</label>
          <input 
            v-model.number="form.targetDistance"
            id="target"
            type="number"
            step="0.1"
            placeholder="e.g. 42.2"
            class="flex h-12 w-full rounded-xl border border-border bg-muted/30 dark:bg-slate-900/50 px-4 py-2 text-base text-foreground ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus:ring-2 focus:ring-orange-600/20 focus:border-orange-600 transition-all md:text-sm tabular-nums italic font-bold"
            required
          />
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div class="space-y-2">
            <label class="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1" for="start">Start Date</label>
            <input 
              v-model="form.startDate"
              id="start"
              type="date"
              class="flex h-12 w-full rounded-xl border border-border bg-muted/30 dark:bg-slate-900/50 px-4 py-2 text-base text-foreground ring-offset-background focus-visible:outline-none focus:ring-2 focus:ring-orange-600/20 focus:border-orange-600 transition-all md:text-sm"
              required
            />
          </div>
          <div class="space-y-2">
            <label class="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1" for="end">End Date</label>
            <input 
              v-model="form.endDate"
              id="end"
              type="date"
              class="flex h-12 w-full rounded-xl border border-border bg-muted/30 dark:bg-slate-900/50 px-4 py-2 text-base text-foreground ring-offset-background focus-visible:outline-none focus:ring-2 focus:ring-orange-600/20 focus:border-orange-600 transition-all md:text-sm"
              required
            />
          </div>
        </div>

        <div class="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 pt-4">
          <button 
            type="button"
            @click="$emit('close')"
            class="inline-flex items-center justify-center rounded-xl text-xs font-bold uppercase tracking-widest transition-all border-2 border-border bg-background dark:bg-slate-900 hover:border-foreground dark:hover:border-slate-100 dark:text-slate-100 h-11 px-8"
          >
            Cancel
          </button>
          <button 
            type="submit"
            :disabled="loading"
            class="inline-flex items-center justify-center rounded-xl text-xs font-bold uppercase tracking-widest bg-orange-600 text-white hover:bg-orange-700 transition-all shadow-lg shadow-orange-600/20 disabled:pointer-events-none disabled:opacity-50 h-11 px-10"
          >
            {{ loading ? 'Creating...' : 'Create Goal' }}
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
