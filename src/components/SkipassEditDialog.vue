<template>
  <v-dialog v-model="open" max-width="720">
    <v-card class="skipass-dialog-card" variant="outlined" color="indigo" rounded="xl">
      <v-card-title class="text-h6">
        Edit skipass
      </v-card-title>

      <v-card-text class="skipass-dialog-content">
        <v-select
          v-model="localZoneId"
          label="Zone"
          :items="zoneItems"
          item-title="title"
          item-value="value"
          variant="outlined"
          color="indigo"
          hide-details
        />

        <v-select
          v-model="localDays"
          label="Days"
          :items="daysItems"
          item-title="title"
          item-value="value"
          variant="outlined"
          color="indigo"
          hide-details
        />

        <v-select
          v-model="localLevelId"
          label="Level"
          :items="levelItems"
          item-title="title"
          item-value="value"
          variant="outlined"
          color="indigo"
          hide-details
        />

        <v-card class="skipass-preview" variant="outlined" color="indigo" rounded="lg">
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
import type { Id, SkipassZone, SkipassLevel, SkipassSelection } from '@/types/trip'
import { formatMoney } from '@/utils/money'

const props = defineProps<{
  modelValue: boolean
  zones: SkipassZone[]
  days: number[]
  levels: SkipassLevel[]
  value: SkipassSelection
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'save', value: SkipassSelection): void
}>()

const open = computed({
  get: () => props.modelValue,
  set: (v: boolean) => emit('update:modelValue', v),
})

const localZoneId = ref<Id>(props.value.zoneId)
const localDays = ref<number>(props.value.days)
const localLevelId = ref<Id>(props.value.levelId)

watch(
  () => props.value,
  (v) => {
    localZoneId.value = v.zoneId
    localDays.value = v.days
    localLevelId.value = v.levelId
  }
)

const zoneItems = computed(() => props.zones.map((z) => ({ title: z.title, value: z.id })))
const levelItems = computed(() => props.levels.map((l) => ({ title: l.title, value: l.id })))
const daysItems = computed(() => props.days.map((d) => ({ title: `${d} days`, value: d })))

const previewSummary = computed(() => {
  const zone = props.zones.find((z) => z.id === localZoneId.value) ?? props.zones[0]
  const level = props.levels.find((l) => l.id === localLevelId.value) ?? props.levels[0]
  return `${localDays.value} days, ${zone.title.toLowerCase()} • ${level.title}`
})

const previewPrice = computed(() => {
  const zone = props.zones.find((z) => z.id === localZoneId.value) ?? props.zones[0]
  const level = props.levels.find((l) => l.id === localLevelId.value) ?? props.levels[0]
  return Math.round(localDays.value * zone.dayPrice * level.multiplier)
})

function save() {
  emit('save', {
    zoneId: localZoneId.value,
    days: localDays.value,
    levelId: localLevelId.value,
  })
  open.value = false
}
</script>

<style scoped lang="scss">
.skipass-dialog-card {
  background-color: rgb(var(--v-theme-surface)) !important;
}

.skipass-dialog-content {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.skipass-preview {
  background-color: rgb(var(--v-theme-surface)) !important;
}
</style>
