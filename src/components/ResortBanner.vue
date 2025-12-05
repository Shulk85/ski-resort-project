<template>
  <v-card class="resort-banner" variant="outlined" color="indigo" rounded="lg">
    <v-img :src="resort.imageUrl" height="260" cover>
      <div class="resort-banner-overlay">
        <div class="resort-banner-content">
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

        <v-btn
          class="resort-banner-change-btn"
          variant="outlined"
          color="white"
          rounded="xl"
          @click="$emit('change')"
        >
          Change resort
        </v-btn>
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
  justify-content: space-between;
  align-items: flex-end;
  gap: 12px;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.55));
}

.resort-banner-content {
  width: fit-content;
  padding: 24px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 16px;
}

.resort-banner-change-btn {
  align-self: flex-end;
}

@media (max-width: 767px) {
  .resort-banner-overlay {
    flex-direction: column;
    align-items: stretch;
    justify-content: flex-end;
  }

  .resort-banner-content {
    width: 100%;
  }

  .resort-banner-change-btn {
    align-self: stretch;
  }
}
</style>
