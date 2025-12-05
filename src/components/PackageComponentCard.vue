<template>
  <v-card class="package-component-card" variant="outlined" color="indigo" rounded="lg">
    <v-card-text class="d-flex align-center justify-space-between ga-4">
      <div>
        <div class="text-subtitle-1 font-weight-medium">
          {{ item.title }}
        </div>
        <div class="text-body-2 text-medium-emphasis">
          {{ item.summary }}
        </div>
      </div>

      <div class="d-flex align-center ga-3">
        <div class="text-subtitle-1 font-weight-semibold">
          {{ formatMoney(item.price) }}
        </div>

        <v-btn
          variant="outlined"
          color="indigo"
          rounded="xl"
          @click="$emit('change', item.type)"
        >
          Change
        </v-btn>

        <v-btn
          v-if="item.removable"
          variant="text"
          color="indigo"
          rounded="xl"
          @click="$emit('remove', item.type)"
        >
          Remove
        </v-btn>
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import type { PackageItemVm, PackageType } from '@/types/trip'
import { formatMoney } from '@/utils/money'

defineProps<{
  item: PackageItemVm
}>()

defineEmits<{
  (e: 'change', type: PackageType): void
  (e: 'remove', type: PackageType): void
}>()
</script>

<style scoped lang="scss">
.package-component-card {
  width: 100%;
}
</style>
