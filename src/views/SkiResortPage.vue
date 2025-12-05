<template>
  <v-container fluid class="page">
    <div class="app-shell">
      <transition name="fade" mode="out-in" appear>
        <ResortPicker
          v-if="!trip.selectedResortId"
          :resorts="trip.resorts"
          @select="onResortSelect"
        />
        <div v-else>
          <ResortBanner
            v-if="trip.selectedResort"
            :resort="trip.selectedResort"
            class="mb-6"
            @change="onResortChange"
          />

          <v-row align="start">
            <v-col cols="12" md="8">
              <div class="d-flex align-center justify-space-between mb-3">
                <div class="text-h4">Trip package overview</div>
              </div>

              <div class="builder-stack">
                <div class="text-h6 mb-3">Select a hotel</div>
                <HotelCard
                  v-if="trip.selectedHotel"
                  :hotel="trip.selectedHotel"
                  @change="onHotelChange"
                />

                <HotelSelectDialog
                  v-model="isHotelDialogOpen"
                  :hotels="trip.hotelsForSelectedResort"
                  @select="onHotelSelect"
                />

                <div class="text-h6 mb-3 mt-6">Select a room</div>
                <v-row v-if="trip.roomsForSelectedHotel.length" class="room-grid">
                  <v-col
                    v-for="room in trip.roomsForSelectedHotel"
                    :key="room.id"
                    cols="12"
                    md="4"
                    class="room-grid-col"
                  >
                    <RoomCard
                      :room="room"
                      :selected="trip.selectedRoomId === room.id"
                      @select="trip.selectRoom"
                    />
                  </v-col>
                </v-row>


                <div v-else class="text-body-2 text-medium-emphasis">
                  No rooms available for this hotel
                </div>

                <div class="text-h6 mb-3 mt-6">Select a service</div>
                <v-row class="service-grid">
                  <v-col
                    v-for="item in trip.packageItems"
                    :key="item.id"
                    cols="12"
                    md="4"
                    class="service-grid-col"
                  >
                    <PackageComponentCard
                      :item="item"
                      @change="onPackageChange"
                      @remove="trip.removePackageItem"
                    />
                  </v-col>
                </v-row>

                <RecommendationCard :preferences="trip.preferences" class="mt-6" />
              </div>
            </v-col>

            <v-col cols="12" md="4" class="right-col summary-sticky">
              <PriceSidebar
                :lines="trip.priceLines"
                :total="trip.totalPrice"
              />
            </v-col>
          </v-row>

          <SkipassEditDialog
            v-model="isSkipassDialogOpen"
            :zones="tripData.skipass.zones"
            :days="tripData.skipass.days"
            :levels="tripData.skipass.levels"
            :value="trip.skipassSelection"
            @save="onSkipassSave"
          />

          <TransferEditDialog
            v-model="isTransferDialogOpen"
            :from="trip.transferFrom"
            :types="trip.transferTypes"
            :times="trip.transferTimes"
            :value="trip.transferSelection"
            @save="onTransferSave"
          />

          <FlightEditDialog
            v-model="isFlightDialogOpen"
            :airlines="trip.flightAirlines"
            :classes="trip.flightClasses"
            :departures="trip.flightDepartures"
            :value="trip.flightSelection"
            @save="onFlightSave"
          />

          <InsuranceEditDialog
            v-model="isInsuranceDialogOpen"
            :types="trip.insuranceTypes"
            :value="trip.insuranceTypeId"
            @save="trip.updateInsurance"
          />

          <AddonsEditDialog
            v-model="isAddonsDialogOpen"
            :addons="trip.addonOptions"
            :value="trip.selectedAddonIds"
            @save="trip.updateAddons"
          />
        </div>
      </transition>
    </div>
  </v-container>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { Id, PackageType, SkipassSelection, TransferSelection, FlightSelection } from '@/types/trip'
import { useTripStore } from '@/stores/trip'
import { tripData } from '@/mocks/trip-data'

import ResortPicker from '@/components/ResortPicker.vue'
import ResortBanner from '@/components/ResortBanner.vue'

import HotelSelectDialog from '@/components/dialogs/HotelSelectDialog.vue'
import SkipassEditDialog from '@/components/dialogs/SkipassEditDialog.vue'
import TransferEditDialog from '@/components/dialogs/TransferEditDialog.vue'
import FlightEditDialog from '@/components/dialogs/FlightEditDialog.vue'
import InsuranceEditDialog from '@/components/dialogs/InsuranceEditDialog.vue'
import AddonsEditDialog from '@/components/dialogs/AddonsEditDialog.vue'

import HotelCard from '@/components/HotelCard.vue'
import RoomCard from '@/components/RoomCard.vue'
import PackageComponentCard from '@/components/PackageComponentCard.vue'
import PriceSidebar from '@/components/PriceSidebar.vue'
import RecommendationCard from '@/components/RecommendationCard.vue'

const trip = useTripStore()

const isHotelDialogOpen = ref(false)
const isSkipassDialogOpen = ref(false)
const isTransferDialogOpen = ref(false)
const isFlightDialogOpen = ref(false)
const isInsuranceDialogOpen = ref(false)
const isAddonsDialogOpen = ref(false)

onMounted(() => trip.resetFlow())

function onResortSelect(resortId: Id) {
  trip.selectResort(resortId)
}

function onHotelChange() {
  isHotelDialogOpen.value = true
}

function onHotelSelect(hotelId: Id) {
  trip.selectHotel(hotelId)
  isHotelDialogOpen.value = false
}

function onPackageChange(type: PackageType) {
  if (type === 'skipass') {
    isSkipassDialogOpen.value = true
    return
  }
  if (type === 'transfer') {
    isTransferDialogOpen.value = true
    return
  }
  if (type === 'flight') {
    isFlightDialogOpen.value = true
    return
  }
  if (type === 'insurance') {
    isInsuranceDialogOpen.value = true
    return
  }
  if (type === 'addons') {
    isAddonsDialogOpen.value = true
    return
  }
}

function onSkipassSave(value: SkipassSelection) {
  trip.updateSkipass(value)
}

function onTransferSave(value: TransferSelection) {
  trip.updateTransfer(value)
}

function onFlightSave(value: FlightSelection) {
  trip.updateFlight(value)
}

function onResortChange() {
  trip.resetFlow()
}
</script>

<style scoped lang="scss">
.builder-stack {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 200ms ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.room-grid {
  align-items: stretch;
}

.room-grid-col {
  display: flex;
  flex-direction: column;
}

.room-grid-col :deep(.room-card) {
  width: 100%;
}

@media (max-width: 1024px) {
  .room-grid-col {
    flex: 0 0 100% !important;
    max-width: 100% !important;
  }
}

.service-grid {
  align-items: stretch;
}

.service-grid-col {
  display: flex;
}
</style>
