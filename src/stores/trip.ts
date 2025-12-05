import { defineStore } from 'pinia'
import { tripData } from '@/mocks/trip-data'
import type { Id, Resort, Hotel, Room, Option, PackageType, PackageItemVm, PriceLine } from '@/types/trip'

export const useTripStore = defineStore('trip', {
  state: () => ({
    preferences: ['Ski-in/ski-out', 'Lively apres-ski', 'Mid-range budget'] as string[],

    selectedResortId: null as Id | null,
    selectedHotelId: null as Id | null,
    selectedRoomId: null as Id | null,

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

    hotelsForSelectedResort(): Hotel[] {
      if (!this.selectedResortId) return []
      return tripData.hotels.filter((h) => h.resortId === this.selectedResortId)
    },

    selectedResort(): Resort | null {
      if (!this.selectedResortId) return null
      return tripData.resorts.find((r) => r.id === this.selectedResortId) ?? null
    },

    selectedHotel(): Hotel | null {
      if (!this.selectedHotelId) return null
      return tripData.hotels.find((h) => h.id === this.selectedHotelId) ?? null
    },

    roomsForSelectedHotel(): Room[] {
      if (!this.selectedHotelId) return []
      return tripData.rooms.filter((r) => r.hotelId === this.selectedHotelId)
    },

    selectedRoom(): Room | null {
      if (!this.selectedRoomId) return null
      return tripData.rooms.find((r) => r.id === this.selectedRoomId) ?? null
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
      if (!this.selectedRoom) return []
      const roomLine: PriceLine = { id: 'room', title: 'Room', amount: this.selectedRoom.price }
      const otherLines = this.packageItems.map((i) => ({ id: i.id, title: i.title, amount: i.price }))
      return [roomLine, ...otherLines]
    },

    totalPrice(): number {
      return this.priceLines.reduce((sum, l) => sum + l.amount, 0)
    },
  },


  actions: {
    resetFlow() {
      this.selectedResortId = null
      this.selectedHotelId = null
      this.selectedRoomId = null
    },

    selectResort(resortId: Id) {
      this.selectedResortId = resortId

      const hotels = tripData.hotels.filter((h) => h.resortId === resortId)
      const firstHotel = hotels[0] ?? null
      this.selectedHotelId = firstHotel?.id ?? null

      const rooms = firstHotel ? tripData.rooms.filter((r) => r.hotelId === firstHotel.id) : []
      this.selectedRoomId = rooms[0]?.id ?? null
    },

    initSelections() {
      const hotels = this.hotelsForSelectedResort
      this.selectedHotelId = hotels[0]?.id ?? ''
      const rooms = tripData.rooms.filter((r) => r.hotelId === this.selectedHotelId)
      this.selectedRoomId = rooms[0]?.id ?? ''
    },

    selectHotel(hotelId: Id) {
      this.selectedHotelId = hotelId
      const rooms = tripData.rooms.filter((r) => r.hotelId === hotelId)
      this.selectedRoomId = rooms[0]?.id ?? null
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
