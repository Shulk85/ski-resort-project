<template>
  <v-card class="hotel-card" variant="outlined" color="indigo" rounded="lg">
    <v-img :src="hotel.imageUrl" height="320" cover />

    <v-card-text class="hotel-card-content">
      <div class="text-subtitle-1 font-weight-medium">
        {{ hotel.name }}
      </div>

      <div class="hotel-card-stars">
        <v-icon
          v-for="i in hotel.stars"
          :key="i"
          icon="mdi-star-outline"
          color="indigo"
          size="18"
        />
      </div>

      <div class="text-body-2 text-medium-emphasis">
        {{ hotel.description }}
      </div>

      <div class="hotel-card-actions">
        <v-btn variant="outlined" color="indigo" rounded="xl" @click="$emit('change')">
          Change
        </v-btn>
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import type { Hotel } from '@/types/trip'

defineProps<{
  hotel: Hotel
}>()

defineEmits<{
  (e: 'change'): void
}>()
</script>

<style scoped lang="scss">
.hotel-card {
  width: 100%;
}

.hotel-card-content {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.hotel-card-stars {
  display: flex;
  gap: 6px;
}

.hotel-card-actions {
  display: flex;
  justify-content: flex-end;
}
</style>
