<template>
  <v-dialog v-model="open" max-width="720">
    <v-card class="insurance-dialog-card" variant="outlined" color="indigo" rounded="lg">
      <v-card-title class="text-h6">
        Edit insurance
      </v-card-title>

      <v-card-text class="insurance-dialog-content">
        <v-select
          v-model="localTypeId"
          label="Type"
          :items="typeItems"
          item-title="title"
          item-value="value"
          variant="outlined"
          color="indigo"
          hide-details
        />

        <v-card class="insurance-preview" variant="outlined" color="indigo" rounded="lg">
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
  types: Option[]
  value: Id | null
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'save', value: Id): void
}>()

const open = computed({
  get: () => props.modelValue,
  set: (v: boolean) => emit('update:modelValue', v),
})

const fallbackId = (props.types[0]?.id ?? '') as Id
const localTypeId = ref<Id>((props.value ?? fallbackId) as Id)

watch(
  () => props.value,
  (v) => {
    localTypeId.value = (v ?? fallbackId) as Id
  }
)

const typeItems = computed(() => props.types.map((t) => ({ title: `${t.title} (${formatMoney(t.price)})`, value: t.id })))

const previewType = computed(() => props.types.find((t) => t.id === localTypeId.value) ?? props.types[0])
const previewSummary = computed(() => `Included, ${(previewType.value?.title ?? '').toLowerCase()}`)
const previewPrice = computed(() => previewType.value?.price ?? 0)

function save() {
  emit('save', localTypeId.value)
  open.value = false
}
</script>

<style scoped lang="scss">
.insurance-dialog-card {
  background-color: rgb(var(--v-theme-surface)) !important;
}

.insurance-dialog-content {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.insurance-preview {
  background-color: rgb(var(--v-theme-surface)) !important;
}
</style>
