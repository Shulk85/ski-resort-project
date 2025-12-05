<template>
  <v-dialog v-model="open" max-width="920">
    <v-card class="hotel-dialog-card" variant="outlined" color="indigo" rounded="lg">
      <v-card-title class="text-h6">
        Choose a hotel
      </v-card-title>

      <v-card-text class="hotel-dialog-content">
        <v-card
          v-for="hotel in hotels"
          :key="hotel.id"
          class="hotel-option"
          variant="outlined"
          rounded="lg"
          @click="$emit('select', hotel.id)"
        >
          <div class="hotel-option-inner">
            <v-img class="hotel-option-image" :src="hotel.imageUrl" cover />

            <div class="hotel-option-body">
              <div class="text-subtitle-1 font-weight-medium">
                {{ hotel.name }}
              </div>

              <div class="hotel-option-stars">
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
            </div>
          </div>
        </v-card>
      </v-card-text>

      <v-card-actions class="px-6 pb-6">
        <v-spacer />
        <v-btn variant="text" color="indigo" rounded="xl" @click="open = false">
          Close
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Hotel, Id } from '@/types/trip'

const props = defineProps<{
  modelValue: boolean
  hotels: Hotel[]
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'select', hotelId: Id): void
}>()

const open = computed({
  get: () => props.modelValue,
  set: (v: boolean) => emit('update:modelValue', v),
})
</script>

<style scoped lang="scss">
.hotel-dialog-content {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.hotel-dialog-card {
  background-color: rgb(var(--v-theme-surface));
}

.hotel-option {
  cursor: pointer;
  transition: transform 160ms ease, box-shadow 160ms ease;
}

.hotel-option:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 22px rgba(0, 0, 0, 0.12);
}

.hotel-option-inner {
  display: grid;
  grid-template-columns: 220px 1fr;
  gap: 16px;
  padding: 12px;
}

.hotel-option-image {
  height: 140px;
  border-radius: 14px;
  overflow: hidden;
}

.hotel-option-body {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-top: 2px;
}

.hotel-option-stars {
  display: flex;
  gap: 6px;
}
</style>
