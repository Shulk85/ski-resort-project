<template>
  <v-dialog v-model="open" max-width="760">
    <v-card class="addons-dialog-card" variant="outlined" color="indigo" rounded="lg">
      <v-card-title class="text-h6">
        Edit add-ons
      </v-card-title>

      <v-card-text class="addons-dialog-content">
        <v-list class="addons-list" density="compact">
          <v-list-item
            v-for="a in addons"
            :key="a.id"
            class="addons-list-item"
            @click="toggle(a.id)"
          >
            <template #prepend>
              <v-checkbox-btn :model-value="localIds.includes(a.id)" color="indigo" />
            </template>

            <v-list-item-title>
              {{ a.title }}
            </v-list-item-title>

            <template #append>
              <span class="text-body-2">{{ formatMoney(a.price) }}</span>
            </template>
          </v-list-item>
        </v-list>

        <v-card class="addons-preview" variant="outlined" color="indigo" rounded="lg">
          <v-card-text class="d-flex align-center justify-space-between">
            <div>
              <div class="text-subtitle-2 font-weight-medium">Preview</div>
              <div class="text-body-2 text-medium-emphasis">
                {{ previewSummary }}
              </div>
            </div>

            <div class="text-subtitle-1 font-weight-semibold">
              {{ formatMoney(previewPrice) }}
            </div>
          </v-card-text>
        </v-card>
      </v-card-text>

      <v-card-actions class="px-6 pb-6">
        <v-spacer />
        <v-btn variant="text" color="indigo" rounded="xl" @click="open = false">
          Cancel
        </v-btn>
        <v-btn variant="outlined" color="indigo" rounded="xl" @click="save">
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import type { Id, Option } from '@/types/trip'
import { formatMoney } from '@/utils/money'

const props = defineProps<{
  modelValue: boolean
  addons: Option[]
  value: Id[]
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'save', value: Id[]): void
}>()

const open = computed({
  get: () => props.modelValue,
  set: (v: boolean) => emit('update:modelValue', v),
})

const localIds = ref<Id[]>([...props.value])

watch(
  () => props.value,
  (v) => {
    localIds.value = [...v]
  }
)

function toggle(id: Id) {
  localIds.value = localIds.value.includes(id)
    ? localIds.value.filter((x) => x !== id)
    : [...localIds.value, id]
}

const selectedAddons = computed(() => props.addons.filter((a) => localIds.value.includes(a.id)))
const previewPrice = computed(() => selectedAddons.value.reduce((sum, a) => sum + a.price, 0))
const previewSummary = computed(() => {
  if (!selectedAddons.value.length) return 'Not selected'
  return selectedAddons.value.map((a) => a.title).join(', ')
})

function save() {
  emit('save', localIds.value)
  open.value = false
}
</script>

<style scoped lang="scss">
.addons-dialog-card {
  background-color: rgb(var(--v-theme-surface)) !important;
}

.addons-dialog-content {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.addons-list-item {
  cursor: pointer;
}

.addons-preview {
  background-color: rgb(var(--v-theme-surface)) !important;
}
</style>
