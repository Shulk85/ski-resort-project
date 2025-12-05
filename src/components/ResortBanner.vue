<template>
  <v-card class="resort-banner" variant="outlined" color="indigo" rounded="lg">
    <v-img :src="resort.imageUrl" height="260" cover>
      <div class="resort-banner-overlay">
        <div class="text-h4 font-weight-semibold text-white">
          {{ resort.name }}
        </div>

        <div class="text-subtitle-1 text-white opacity-90">
          {{ resort.region }}
        </div>

        <div class="mt-3 d-flex ga-2 flex-wrap">
          <v-chip
            v-for="t in resort.tags"
            :key="t"
            size="small"
            variant="flat"
            color="white"
          >
            {{ t }}
          </v-chip>
        </div>
      </div>
    </v-img>
  </v-card>
</template>

<script setup lang="ts">
import type { Resort } from '@/types/trip'

defineProps<{
  resort: Resort
}>()

defineEmits<{
  (e: 'change'): void
}>()
</script>

<style scoped lang="scss">
.resort-banner {
  overflow: hidden;
}

.resort-banner-overlay {
  height: 100%;
  padding: 24px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.55));
}
</style>
