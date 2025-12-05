<template>
  <v-dialog v-model="open" max-width="720">
    <v-card class="transfer-dialog-card" variant="outlined" color="indigo" rounded="lg">
      <v-card-title class="text-h6">
        Edit transfer
      </v-card-title>

      <v-card-text class="transfer-dialog-content">
        <v-select
          v-model="localTypeId"
          label="Transport type"
          :items="typeItems"
          item-title="title"
          item-value="value"
          variant="outlined"
          color="indigo"
          hide-details
        />

        <v-select
          v-model="localTime"
          label="Time"
          :items="timeItems"
          item-title="title"
          item-value="value"
          variant="outlined"
          color="indigo"
          hide-details
        />

        <v-card class="transfer-preview" variant="outlined" color="indigo" rounded="lg">
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
import type { Id, Option, TransferSelection } from '@/types/trip'
import { formatMoney } from '@/utils/money'

const props = defineProps<{
  modelValue: boolean
  from: string
  types: Option[]
  times: string[]
  value: TransferSelection
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'save', value: TransferSelection): void
}>()

const open = computed({
  get: () => props.modelValue,
  set: (v: boolean) => emit('update:modelValue', v),
})

const localTypeId = ref<Id>((props.value.typeId ?? props.types[0]?.id) as Id)
const localTime = ref<string>(props.value.time)

watch(
  () => props.value,
  (v) => {
    localTypeId.value = (v.typeId ?? props.types[0]?.id) as Id
    localTime.value = v.time
  }
)

const typeItems = computed(() => props.types.map((t) => ({ title: t.title, value: t.id })))
const timeItems = computed(() => props.times.map((t) => ({ title: t, value: t })))

const previewType = computed(() => props.types.find((t) => t.id === localTypeId.value) ?? props.types[0])
const previewSummary = computed(() => `${props.from} • ${previewType.value?.title ?? ''} • ${localTime.value}`)
const previewPrice = computed(() => previewType.value?.price ?? 0)

function save() {
  emit('save', { typeId: localTypeId.value, time: localTime.value })
  open.value = false
}
</script>

<style scoped lang="scss">
.transfer-dialog-card {
  background-color: rgb(var(--v-theme-surface)) !important;
}

.transfer-dialog-content {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.transfer-preview {
  background-color: rgb(var(--v-theme-surface)) !important;
}
</style>
