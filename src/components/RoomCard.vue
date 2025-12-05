<template>
  <v-card
    class="room-card"
    :class="selected ? 'room-card--selected' : 'room-card--inactive'"
    variant="outlined"
    color="indigo"
    rounded="lg"
    tabindex="0"
    role="button"
    :aria-selected="selected"
    @click="onCardClick"
    @keydown.enter.prevent="emitSelect"
    @keydown.space.prevent="emitSelect"
  >
    <div class="room-card-media">
      <v-carousel height="180" hide-delimiter-background show-arrows="hover">
        <v-carousel-item
          v-for="(src, idx) in room.imageUrls"
          :key="`${idx}-${src}`"
        >
          <v-img :src="src" height="180" cover />
        </v-carousel-item>
      </v-carousel>
    </div>

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
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import type { Room, Id } from '@/types/trip'
import { formatMoney } from '@/utils/money'

const props = defineProps<{
  room: Room
  selected: boolean
}>()

const emit = defineEmits<{
  (e: 'select', roomId: Id): void
}>()

function emitSelect() {
  emit('select', props.room.id)
}

function onCardClick(e: MouseEvent) {
  const target = e.target as HTMLElement | null
  if (target?.closest('.room-card-media button') || target?.closest('.room-card-media .v-btn')) return

  emitSelect()
}

</script>

<style scoped lang="scss">
.room-card {
  cursor: pointer;
  transition: transform 160ms ease, box-shadow 160ms ease, opacity 160ms ease;
}

.room-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 22px rgba(0, 0, 0, 0.12);
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

.room-card--inactive :deep(.v-img__img) {
  filter: grayscale(1) brightness(0.75);
}

.room-card--inactive {
  opacity: 0.92;
}

.room-card--selected {
  opacity: 1;
}

.room-card {
  cursor: pointer;
  transition: transform 160ms ease, box-shadow 160ms ease, opacity 160ms ease;

  height: 100%;
  display: flex;
  flex-direction: column;
}

.room-card-media {
  flex: 0 0 auto;
}

.room-card-content {
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
