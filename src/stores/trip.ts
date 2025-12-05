import { defineStore } from 'pinia'
import { tripData } from '@/mocks/trip-data'
import type {
  Id,
  Resort,
  Hotel,
  Room,
  Option,
  PackageType,
  PackageItemVm,
  PriceLine,
  SkipassSelection,
  TransferSelection,
  FlightSelection,
  FlightClass
} from '@/types/trip'

export const useTripStore = defineStore('trip', {
  state: () => ({
    preferences: ['Ski-in/ski-out', 'Lively apres-ski', 'Mid-range budget'] as string[],

    selectedResortId: null as Id | null,
    selectedHotelId: null as Id | null,
    selectedRoomId: null as Id | null,

    skipassSelection: {
      zoneId: tripData.skipass.zones[1].id,
      days: 3,
      levelId: tripData.skipass.levels[1].id,
    } as SkipassSelection,

    transferSelection: {
      typeId: tripData.options.transfer[0]?.id ?? null,
      time: tripData.transferMeta.times[1] ?? tripData.transferMeta.times[0] ?? '10:00',
    } as TransferSelection,

    flightSelection: {
      airlineId: tripData.options.flight[0]?.id ?? null,
      classId: tripData.flightMeta.classes[0]?.id ?? 'fc_economy',
      departure: tripData.flightMeta.departures[0] ?? '12.01 15:40',
    } as FlightSelection,

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

    transferTypes(): Option[] {
      return tripData.options.transfer
    },

    transferTimes(): string[] {
      return tripData.transferMeta.times
    },

    transferFrom(): string {
      return tripData.transferMeta.from
    },

    flightAirlines(): Option[] {
      return tripData.options.flight
    },

    flightClasses(): FlightClass[] {
      return tripData.flightMeta.classes
    },

    flightDepartures(): string[] {
      return tripData.flightMeta.departures
    },

    packageItems(): PackageItemVm[] {
      const byId = (list: Option[], id: Id | null) => (id ? list.find((o) => o.id === id) ?? null : null)

      const skipass = this.skipassVm
      const transferType = this.transferSelection.typeId
        ? tripData.options.transfer.find((o) => o.id === this.transferSelection.typeId) ?? null
        : null
      const transferSummary = transferType
        ? `${tripData.transferMeta.from} • ${transferType.title} • ${this.transferSelection.time}`
        : 'Not selected'
      const transferPrice = transferType ? transferType.price : 0
      const airline = this.flightSelection.airlineId
        ? tripData.options.flight.find((o) => o.id === this.flightSelection.airlineId) ?? null
        : null

      const flightClass =
        tripData.flightMeta.classes.find((c) => c.id === this.flightSelection.classId) ??
        tripData.flightMeta.classes[0]

      const flightSummary = airline
        ? `${airline.title}, ${flightClass.title}, ${this.flightSelection.departure}`
        : 'Not selected'

      const flightPrice = airline ? Math.round(airline.price * flightClass.multiplier) : 0

      const insurance = byId(tripData.options.insurance, this.selectedInsuranceId)

      const addonsSelected = tripData.options.addons.filter((a) => this.selectedAddonIds.includes(a.id))
      const addonsPrice = addonsSelected.reduce((sum, a) => sum + a.price, 0)
      const addonsSummary = addonsSelected.length === 0 ? 'Not selected' : addonsSelected.map((a) => a.title).join(', ')

      return [
        {
          id: 'c_skipass',
          type: 'skipass',
          title: 'Skipass',
          summary: skipass.summary,
          price: skipass.price,
          removable: false,
        },
        {
          id: 'c_transfer',
          type: 'transfer',
          title: 'Transfer',
          summary: transferSummary,
          price: transferPrice,
          removable: true,
        },
        {
          id: 'c_flight',
          type: 'flight',
          title: 'Flight',
          summary: flightSummary,
          price: flightPrice,
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

    skipassVm(): { summary: string; price: number } {
      const zone = tripData.skipass.zones.find((z) => z.id === this.skipassSelection.zoneId) ?? tripData.skipass.zones[0]
      const level = tripData.skipass.levels.find((l) => l.id === this.skipassSelection.levelId) ?? tripData.skipass.levels[0]
      const days = this.skipassSelection.days

      const price = Math.round(days * zone.dayPrice * level.multiplier)
      const summary = `${days} days, ${zone.title.toLowerCase()} • ${level.title}`

      return { summary, price }
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
      if (type === 'transfer') this.transferSelection.typeId = null
      if (type === 'flight') this.flightSelection.airlineId = null
      if (type === 'insurance') this.selectedInsuranceId = null
      if (type === 'addons') this.selectedAddonIds = []
    },

    updateSkipass(selection: SkipassSelection) {
      this.skipassSelection = selection
    },

    updateTransfer(value: TransferSelection) {
      this.transferSelection = value
    },
    updateFlight(value: FlightSelection) {
      this.flightSelection = value
    },
  },
})
