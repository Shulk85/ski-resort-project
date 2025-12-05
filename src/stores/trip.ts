import { defineStore } from 'pinia'
import { tripData } from '@/mocks/trip-data'
import type { Id, Resort, Hotel, Room, Option, PackageType, PackageItemVm, PriceLine } from '@/types/trip'

export const useTripStore = defineStore('trip', {
  state: () => ({
    preferences: ['Ski-in/ski-out', 'Lively apres-ski', 'Mid-range budget'] as string[],

    selectedResortId: null as Id | null,

    selectedHotelId: '' as Id,
    selectedRoomId: '' as Id,

    selectedSkipassId: (tripData.options.skipass[1]?.id ?? tripData.options.skipass[0].id) as Id,
    selectedTransferId: (tripData.options.transfer[0]?.id ?? null) as Id | null,
    selectedFlightId: null as Id | null,
    selectedInsuranceId: (tripData.options.insurance[0]?.id ?? null) as Id | null,
    selectedAddonIds: ['ad_helmet', 'ad_lesson'] as Id[],
  }),

  getters: {
    resorts(): Resort[] {
      return tripData.resorts
    },

    selectedResort(): Resort {
      return tripData.resorts.find((r) => r.id === this.selectedResortId) ?? tripData.resorts[0]
    },

    hotelsForSelectedResort(): Hotel[] {
      return tripData.hotels.filter((h) => h.resortId === this.selectedResortId)
    },

    selectedHotel(): Hotel {
      const hotels = this.hotelsForSelectedResort
      return hotels.find((h) => h.id === this.selectedHotelId) ?? hotels[0] ?? tripData.hotels[0]
    },

    roomsForSelectedHotel(): Room[] {
      return tripData.rooms.filter((r) => r.hotelId === this.selectedHotel.id)
    },

    selectedRoom(): Room {
      const rooms = this.roomsForSelectedHotel
      return rooms.find((r) => r.id === this.selectedRoomId) ?? rooms[0] ?? tripData.rooms[0]
    },

    packageItems(): PackageItemVm[] {
      const byId = (list: Option[], id: Id | null) => (id ? list.find((o) => o.id === id) ?? null : null)

      const skipass = byId(tripData.options.skipass, this.selectedSkipassId)
      const transfer = byId(tripData.options.transfer, this.selectedTransferId)
      const flight = byId(tripData.options.flight, this.selectedFlightId)
      const insurance = byId(tripData.options.insurance, this.selectedInsuranceId)

      const addonsSelected = tripData.options.addons.filter((a) => this.selectedAddonIds.includes(a.id))
      const addonsPrice = addonsSelected.reduce((sum, a) => sum + a.price, 0)
      const addonsSummary = addonsSelected.length === 0 ? 'Not selected' : addonsSelected.map((a) => a.title).join(', ')

      return [
        {
          id: 'c_skipass',
          type: 'skipass',
          title: 'Ski pass',
          summary: skipass?.summary ?? 'Not selected',
          price: skipass?.price ?? 0,
          removable: false,
        },
        {
          id: 'c_transfer',
          type: 'transfer',
          title: 'Transfer',
          summary: transfer?.summary ?? 'Not selected',
          price: transfer?.price ?? 0,
          removable: true,
        },
        {
          id: 'c_flight',
          type: 'flight',
          title: 'Flight',
          summary: flight?.summary ?? 'Not selected',
          price: flight?.price ?? 0,
          removable: true,
        },
        {
          id: 'c_insurance',
          type: 'insurance',
          title: 'Insurance',
          summary: insurance?.summary ?? 'Not selected',
          price: insurance?.price ?? 0,
          removable: true,
        },
        {
          id: 'c_addons',
          type: 'addons',
          title: 'Add-ons',
          summary: addonsSummary,
          price: addonsPrice,
          removable: true,
        },
      ]
    },

    priceLines(): PriceLine[] {
      const roomLine: PriceLine = {
        id: 'room',
        title: 'Room',
        amount: this.selectedRoom.price,
      }

      const otherLines = this.packageItems.map((i) => ({
        id: i.id,
        title: i.title,
        amount: i.price,
      }))

      return [roomLine, ...otherLines]
    },

    totalPrice(): number {
      return this.priceLines.reduce((sum, l) => sum + l.amount, 0)
    },
  },

  actions: {
    initSelections() {
      const hotels = this.hotelsForSelectedResort
      this.selectedHotelId = hotels[0]?.id ?? ''
      const rooms = tripData.rooms.filter((r) => r.hotelId === this.selectedHotelId)
      this.selectedRoomId = rooms[0]?.id ?? ''
    },

    selectResort(resortId: Id) {
      this.selectedResortId = resortId
      const hotels = tripData.hotels.filter((h) => h.resortId === resortId)
      this.selectedHotelId = hotels[0]?.id ?? ''
      const rooms = tripData.rooms.filter((r) => r.hotelId === this.selectedHotelId)
      this.selectedRoomId = rooms[0]?.id ?? ''
    },

    selectHotel(hotelId: Id) {
      this.selectedHotelId = hotelId
      const rooms = tripData.rooms.filter((r) => r.hotelId === hotelId)
      this.selectedRoomId = rooms[0]?.id ?? ''
    },

    selectRoom(roomId: Id) {
      this.selectedRoomId = roomId
    },

    removePackageItem(type: PackageType) {
      if (type === 'transfer') this.selectedTransferId = null
      if (type === 'flight') this.selectedFlightId = null
      if (type === 'insurance') this.selectedInsuranceId = null
      if (type === 'addons') this.selectedAddonIds = []
    },
  },
})
