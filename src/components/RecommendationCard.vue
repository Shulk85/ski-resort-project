<template>
  <v-card variant="outlined" color="indigo" rounded="lg">
    <v-card-text>
      <div class="text-subtitle-1 font-weight-medium mb-2">
        Recommended for you
      </div>

      <div class="text-body-2 text-medium-emphasis">
        Based on your preferences:
      </div>

      <div class="mt-3 d-flex ga-2 flex-wrap">
        <v-chip
          v-for="p in preferences"
          :key="p"
          size="small"
          variant="outlined"
        >
          {{ p }}
        </v-chip>
      </div>

      <div v-if="recommendedResort" class="recommended-resort">
        <ResortCard :resort="recommendedResort" @select="$emit('select-resort', $event)" />
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import type { Resort, Id } from '@/types/trip'
import ResortCard from '@/components/ResortCard.vue'

defineProps<{
  preferences: string[]
  recommendedResort: Resort | null
}>()

defineEmits<{
  (e: 'select-resort', resortId: Id): void
}>()
</script>

<style scoped lang="scss">
.recommended-resort {
  margin-top: 16px;
}
</style>
