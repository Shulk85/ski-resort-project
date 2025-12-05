<template>
  <v-card class="package-component-card" variant="outlined" color="indigo" rounded="lg">
    <v-card-text class="package-component-card-content">
      <div class="package-component-card-text">
        <div class="text-subtitle-1 font-weight-medium">
          {{ item.title }}
        </div>
        <div class="text-body-2 text-medium-emphasis">
          {{ item.summary }}
        </div>
      </div>

      <div class="package-component-card-footer">
        <div class="text-subtitle-1 font-weight-semibold">
          {{ formatMoney(item.price) }}
        </div>

        <div class="package-component-card-actions">
          <v-btn
            icon="mdi-pencil-outline"
            variant="outlined"
            color="green"
            size="small"
            class="rounded-circle"
            :aria-label="`Edit ${item.title}`"
            @click="$emit('change', item.type)"
          />

          <v-btn
            v-if="item.removable"
            icon="mdi-trash-can-outline"
            variant="outlined"
            color="red"
            size="small"
            class="rounded-circle"
            :aria-label="`Remove ${item.title}`"
            @click="$emit('remove', item.type)"
          />
        </div>
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
  height: 100%;
  display: flex;
  flex-direction: column;
}

.package-component-card-content {
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.package-component-card-text {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 24px;
}

.package-component-card-footer {
  margin-top: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.package-component-card-actions {
  display: flex;
  justify-content: flex-end;
  gap: 6px;
  flex-wrap: wrap;
}

.package-component-card {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  transition: transform 160ms ease, box-shadow 160ms ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 22px rgba(0, 0, 0, 0.12);
  }
}
</style>
