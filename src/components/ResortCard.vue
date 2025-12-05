<template>
  <v-card
    class="resort-card"
    variant="outlined"
    color="indigo"
    rounded="lg"
    @click="$emit('select', resort.id)"
  >
    <v-img :src="resort.imageUrl" height="180" cover />

    <v-card-text class="resort-card-content">
      <div class="text-subtitle-1 font-weight-medium">
        {{ resort.name }}
      </div>

      <div class="text-body-2 text-medium-emphasis">
        {{ resort.description }}
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import type { Resort, Id } from '@/types/trip'

defineProps<{
  resort: Resort
}>()

defineEmits<{
  (e: 'select', resortId: Id): void
}>()
</script>

<style scoped lang="scss">
.resort-card {
  cursor: pointer;
  width: 100%;
  transition: transform 180ms ease, box-shadow 180ms ease;
}

.resort-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.14);
}

.resort-card-content {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
</style>
