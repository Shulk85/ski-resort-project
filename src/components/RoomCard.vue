<template>
  <v-card class="room-card" variant="outlined" color="indigo">
    <v-carousel
      height="220"
      hide-delimiter-background
      show-arrows="hover"
    >
      <v-carousel-item
        v-for="(src, idx) in room.imageUrls"
        :key="`${idx}-${src}`"
      >
        <v-img :src="src" height="220" cover />
      </v-carousel-item>
    </v-carousel>

    <v-card-text class="room-card-content">
      <div class="room-card-title">
        <div class="text-subtitle-1 font-weight-medium">
          {{ room.name }}
        </div>

        <div class="text-subtitle-1 font-weight-semibold">
          {{ formatMoney(room.price) }}
        </div>
      </div>

      <div class="text-body-2 text-medium-emphasis">
        {{ room.description }}
      </div>

      <div class="room-card-actions">
        <v-btn variant="outlined" color="indigo" rounded="xl" @click="$emit('change')">
          Change
        </v-btn>
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import type { Room } from '@/types/trip'
import { formatMoney } from '@/utils/money'

defineProps<{
  room: Room
}>()

defineEmits<{
  (e: 'change'): void
}>()
</script>


<style scoped lang="scss">
.room-card {
  width: 100%;
}

.room-card-content {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.room-card-title {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 12px;
}

.room-card-actions {
  display: flex;
  justify-content: flex-end;
}
</style>
