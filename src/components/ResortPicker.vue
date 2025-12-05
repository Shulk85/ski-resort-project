<template>
  <section class="resort-picker">
    <div class="resort-picker-header">
      <div class="text-h5 font-weight-semibold">
        Choose your resort
      </div>
      <div class="text-body-2 text-medium-emphasis">
        Select a resort to start building your trip package
      </div>
    </div>

    <transition-group name="fade-up" tag="div" class="resort-picker-grid" appear>
      <ResortCard
        v-for="resort in resorts"
        :key="resort.id"
        :resort="resort"
        @select="$emit('select', $event)"
      />
    </transition-group>
  </section>
</template>

<script setup lang="ts">
import type { Resort, Id } from '@/types/trip'
import ResortCard from './ResortCard.vue';

defineProps<{
  resorts: Resort[]
}>()

defineEmits<{
  (e: 'select', resortId: Id): void
}>()
</script>

<style scoped lang="scss">
.resort-picker {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.resort-picker-header {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.resort-picker-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.resort-card {
  cursor: pointer;
  width: 100%;
  transition: transform 180ms ease, box-shadow 180ms ease;
}

.resort-card:hover {
  transform: translateY(-6px);
}

.resort-card-content {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.fade-up-enter-active,
.fade-up-leave-active {
  transition: opacity 240ms ease, transform 240ms ease;
}

.fade-up-enter-from,
.fade-up-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

.resort-picker-grid > :nth-child(1) {
  transition-delay: 0ms;
}
.resort-picker-grid > :nth-child(2) {
  transition-delay: 60ms;
}
.resort-picker-grid > :nth-child(3) {
  transition-delay: 120ms;
}

.resort-picker-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.resort-card {
  width: 100%;
}

@media (max-width: 767px) {
  .resort-picker-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }
}
</style>
