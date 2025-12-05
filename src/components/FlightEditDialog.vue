<template>
  <v-dialog v-model="open" max-width="720">
    <v-card class="flight-dialog-card" variant="outlined" color="indigo" rounded="lg">
      <v-card-title class="text-h6">
        Edit flight
      </v-card-title>

      <v-card-text class="flight-dialog-content">
        <v-select
          v-model="localAirlineId"
          label="Airline"
          :items="airlineItems"
          item-title="title"
          item-value="value"
          variant="outlined"
          color="indigo"
          hide-details
        />

        <v-select
          v-model="localClassId"
          label="Class"
          :items="classItems"
          item-title="title"
          item-value="value"
          variant="outlined"
          color="indigo"
          hide-details
        />

        <v-select
          v-model="localDeparture"
          label="Departure"
          :items="departureItems"
          item-title="title"
          item-value="value"
          variant="outlined"
          color="indigo"
          hide-details
        />

        <v-card class="flight-preview" variant="outlined" color="indigo" rounded="lg">
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
import type { Id, Option, FlightClass, FlightSelection } from '@/types/trip'
import { formatMoney } from '@/utils/money'

const props = defineProps<{
  modelValue: boolean
  airlines: Option[]
  classes: FlightClass[]
  departures: string[]
  value: FlightSelection
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'save', value: FlightSelection): void
}>()

const open = computed({
  get: () => props.modelValue,
  set: (v: boolean) => emit('update:modelValue', v),
})

const fallbackAirlineId = (props.airlines[0]?.id ?? '') as Id
const fallbackClassId = (props.classes[0]?.id ?? '') as Id
const fallbackDeparture = props.departures[0] ?? '12.01 15:40'

const localAirlineId = ref<Id>((props.value.airlineId ?? fallbackAirlineId) as Id)
const localClassId = ref<Id>(props.value.classId ?? fallbackClassId)
const localDeparture = ref<string>(props.value.departure ?? fallbackDeparture)

watch(
  () => props.value,
  (v) => {
    localAirlineId.value = (v.airlineId ?? fallbackAirlineId) as Id
    localClassId.value = v.classId ?? fallbackClassId
    localDeparture.value = v.departure ?? fallbackDeparture
  }
)

const airlineItems = computed(() => props.airlines.map((a) => ({ title: a.title, value: a.id })))
const classItems = computed(() => props.classes.map((c) => ({ title: c.title, value: c.id })))
const departureItems = computed(() => props.departures.map((d) => ({ title: d, value: d })))

const previewAirline = computed(() => props.airlines.find((a) => a.id === localAirlineId.value) ?? props.airlines[0])
const previewClass = computed(() => props.classes.find((c) => c.id === localClassId.value) ?? props.classes[0])

const previewSummary = computed(() => {
  return `${previewAirline.value?.title ?? ''}, ${previewClass.value?.title ?? ''}, ${localDeparture.value}`
})

const previewPrice = computed(() => {
  const base = previewAirline.value?.price ?? 0
  const m = previewClass.value?.multiplier ?? 1
  return Math.round(base * m)
})

function save() {
  emit('save', {
    airlineId: localAirlineId.value,
    classId: localClassId.value,
    departure: localDeparture.value,
  })
  open.value = false
}
</script>

<style scoped lang="scss">
.flight-dialog-card {
  background-color: rgb(var(--v-theme-surface)) !important;
}

.flight-dialog-content {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.flight-preview {
  background-color: rgb(var(--v-theme-surface)) !important;
}
</style>
