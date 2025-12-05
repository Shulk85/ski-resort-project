import { defineStore } from 'pinia'
import type { Trip } from '@/types/trip'

export const useTripStore = defineStore('trip', {
  state: () => ({
    resort: {
      name: 'St. Anton am Arlberg',
      region: 'Austria / Tyrol',
      imageUrl:
        'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1600&q=80',
      tags: ['Intermediate', 'Alps', 'Party vibe'],
    } satisfies Trip.Resort,
    preferences: ['Ski-in/ski-out', 'Lively apres-ski', 'Mid-range budget'],
    components: [
      {
        id: 'c_hotel',
        type: 'hotel',
        title: 'Hotel',
        summary: 'Hotel Alpina, 4★. 700m to lift',
        price: 980,
        editable: true,
      },
      {
        id: 'c_room',
        type: 'room',
        title: 'Room',
        summary: 'Double Room. Breakfast included',
        price: 420,
        editable: true,
      },
      {
        id: 'c_skipass',
        type: 'skipass',
        title: 'Ski pass',
        summary: '6 days. Arlberg area',
        price: 360,
        editable: true,
      },
      {
        id: 'c_transfer',
        type: 'transfer',
        title: 'Transfer',
        summary: 'Shared shuttle. Innsbruck Resort',
        price: 80,
        editable: true,
        removable: true,
      },
      {
        id: 'c_insurance',
        type: 'insurance',
        title: 'Insurance',
        summary: 'Standard coverage',
        price: 35,
        editable: true,
        removable: true,
      },
      {
        id: 'c_addons',
        type: 'addons',
        title: 'Add-ons',
        summary: 'Helmet rental, 1 lesson',
        price: 110,
        editable: true,
        removable: true,
      },
    ] as Trip.PackageComponent[],
  }),

  getters: {
    totalPrice(state) {
      return state.components.reduce((sum, c) => sum + c.price, 0)
    },
  },

  actions: {
    removeComponent(componentId: string) {
      this.components = this.components.filter((c) => c.id !== componentId)
    },
  },
})
