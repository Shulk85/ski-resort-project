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
          />

          <v-row align="start">
            <v-col cols="12" md="8">
              <div class="d-flex align-center justify-space-between mb-3">
                <div class="text-h6">Trip package overview</div>
                <div class="text-body-2 text-medium-emphasis">
                  Make changes before checkout
                </div>
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
                <PackageComponentCard
                  v-for="item in trip.packageItems"
                  :key="item.id"
                  :item="item"
                  @change="onPackageChange"
                  @remove="trip.removePackageItem"
                />

                <RecommendationCard :preferences="trip.preferences" class="mt-6" />
              </div>
            </v-col>

            <v-col cols="12" md="4" class="right-col summary-sticky">
              <PriceSidebar
                :lines="trip.priceLines"
                :total="trip.totalPrice"
                @continue="onContinue"
              />
            </v-col>
          </v-row>
        </div>
      </transition>
    </div>
  </v-container>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { Id, PackageType } from '@/types/trip'
import { useTripStore } from '@/stores/trip'

import ResortPicker from '@/components/ResortPicker.vue'
import ResortBanner from '@/components/ResortBanner.vue'

import HotelSelectDialog from '@/components/HotelSelectDialog.vue'

import HotelCard from '@/components/HotelCard.vue'
import RoomCard from '@/components/RoomCard.vue'
import PackageComponentCard from '@/components/PackageComponentCard.vue'
import PriceSidebar from '@/components/PriceSidebar.vue'
import RecommendationCard from '@/components/RecommendationCard.vue'

const trip = useTripStore()
const isHotelDialogOpen = ref(false)

onMounted(() => trip.resetFlow())

function onResortSelect(resortId: Id) {
  trip.selectResort(resortId)
}

function onResortChange() {
}

function onHotelChange() {
  isHotelDialogOpen.value = true
}

function onHotelSelect(hotelId: Id) {
  trip.selectHotel(hotelId)
  isHotelDialogOpen.value = false
}

function onRoomSelect(roomId: Id) {
  trip.selectRoom(roomId)
}

function onPackageChange(type: PackageType) {
}

function onContinue() {
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
}

</style>
