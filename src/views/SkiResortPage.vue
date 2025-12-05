<template>
  <v-container fluid class="page">
    <div class="app-shell">
      <ResortBanner :resort="trip.resort" class="mb-6" />

      <v-row align="start">
        <v-col cols="12" md="8">
          <div class="d-flex align-center justify-space-between mb-3">
            <div class="text-h6">Trip package overview</div>
            <div class="text-body-2 text-medium-emphasis">
              Make changes before checkout
            </div>
          </div>

          <v-card
            v-for="c in trip.components"
            :key="c.id"
            class="mb-4"
            rounded="xl"
            elevation="1"
          >
            <v-card-text class="d-flex align-center justify-space-between ga-4">
              <div>
                <div class="text-subtitle-1 font-weight-medium">
                  {{ c.title }}
                </div>
                <div class="text-body-2 text-medium-emphasis">
                  {{ c.summary }}
                </div>
              </div>

              <div class="d-flex align-center ga-3">
                <div class="text-subtitle-1 font-weight-semibold">
                  {{ formatMoney(c.price) }}
                </div>

                <v-btn variant="tonal" rounded="xl" :disabled="!c.editable">
                  Change
                </v-btn>

                <v-btn
                  v-if="c.removable"
                  variant="text"
                  rounded="xl"
                  @click="trip.removeComponent(c.id)"
                >
                  Remove
                </v-btn>
              </div>
            </v-card-text>
          </v-card>

          <v-card rounded="xl" elevation="1" class="mt-6">
            <v-card-text>
              <div class="text-subtitle-1 font-weight-medium mb-2">
                Recommended for you
              </div>
              <div class="text-body-2 text-medium-emphasis">
                Based on your preferences:
              </div>

              <div class="mt-3 d-flex ga-2 flex-wrap">
                <v-chip
                  v-for="p in trip.preferences"
                  :key="p"
                  size="small"
                  variant="outlined"
                >
                  {{ p }}
                </v-chip>
              </div>
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="12" md="4" class="right-col summary-sticky">
          <div>
            <v-card rounded="xl" elevation="2">
              <v-card-text>
                <div class="text-h6 mb-2">Total</div>

                <div class="text-h4 font-weight-bold mb-4">
                  {{ formatMoney(trip.totalPrice) }}
                </div>

                <v-divider class="my-4" />

                <div class="d-flex flex-column ga-2 text-body-2">
                  <div
                    v-for="c in trip.components"
                    :key="c.id"
                    class="d-flex justify-space-between"
                  >
                    <span class="text-medium-emphasis">{{ c.title }}</span>
                    <span>{{ formatMoney(c.price) }}</span>
                  </div>
                </div>

                <v-btn class="mt-5" size="large" block rounded="xl">
                  Continue to checkout
                </v-btn>
              </v-card-text>
            </v-card>
          </div>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script setup lang="ts">
import { useTripStore } from '@/stores/trip'
import ResortBanner from '@/components/ResortBanner.vue'

const trip = useTripStore()

function formatMoney(value: number) {
  return `$${value.toFixed(0)}`
}
</script>
