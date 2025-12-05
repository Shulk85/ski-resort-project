<template>
  <v-container fluid class="page">
    <div class="app-shell">
      <transition name="fade" mode="out-in" appear>
        <ResortPicker
          v-if="!trip.selectedResortId"
          :resorts="trip.resorts"
        />
        <div v-else>
          <ResortBanner :resort="trip.selectedResort" class="mb-6" @change="onResortChange" />

          <v-row align="start">
            <v-col cols="12" md="8">
              <div class="d-flex align-center justify-space-between mb-3">
                <div class="text-h6">Trip package overview</div>
                <div class="text-body-2 text-medium-emphasis">
                  Make changes before checkout
                </div>
              </div>

              <HotelCard :hotel="trip.selectedHotel" class="mb-4" @change="onHotelChange" />

              <RoomCard :room="trip.selectedRoom" class="mb-4" @change="onRoomChange" />

              <PackageComponentCard
                v-for="item in trip.packageItems"
                :key="item.id"
                :item="item"
                class="mb-4"
                @change="onPackageChange"
                @remove="trip.removePackageItem"
              />

              <RecommendationCard class="mt-6" :preferences="trip.preferences" />
            </v-col>

            <v-col cols="12" md="4" class="right-col summary-sticky">
              <PriceSidebar :lines="trip.priceLines" :total="trip.totalPrice" @continue="onContinue" />
            </v-col>
          </v-row>
        </div>
      </transition>
    </div>
  </v-container>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { PackageType } from '@/types/trip'
import { useTripStore } from '@/stores/trip'

import ResortPicker from '@/components/ResortPicker.vue'
import ResortBanner from '@/components/ResortBanner.vue'
import HotelCard from '@/components/HotelCard.vue'
import RoomCard from '@/components/RoomCard.vue'
import PackageComponentCard from '@/components/PackageComponentCard.vue'
import PriceSidebar from '@/components/PriceSidebar.vue'
import RecommendationCard from '@/components/RecommendationCard.vue'

const trip = useTripStore()

onMounted(() => trip.initSelections())

function onResortChange() {
}

function onHotelChange() {
}

function onRoomChange() {
}

function onPackageChange(type: PackageType) {
}

function onContinue() {
}
</script>
