<template>
  <v-card class="price-sidebar" variant="outlined" color="indigo" rounded="lg">
    <v-card-text>
      <div class="text-h6 mb-2">Total</div>

      <div class="text-h4 font-weight-bold mb-4">
        {{ formatMoney(total) }}
      </div>

      <v-divider class="my-4" />

      <div class="d-flex flex-column ga-2 text-body-2">
        <div
          v-for="l in lines"
          :key="l.id"
          class="d-flex justify-space-between"
        >
          <span class="text-medium-emphasis">{{ l.title }}</span>
          <span>{{ formatMoney(l.amount) }}</span>
        </div>
      </div>

      <v-btn
        class="mt-5"
        size="large"
        block
        rounded="xl"
        color="indigo"
        @click="$emit('continue')"
      >
        Continue to checkout
      </v-btn>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import type { PriceLine } from '@/types/trip'
import { formatMoney } from '@/utils/money'

defineProps<{
  lines: PriceLine[]
  total: number
}>()

defineEmits<{
  (e: 'continue'): void
}>()
</script>

<style scoped lang="scss">
.price-sidebar {
  width: 100%;
}
</style>
