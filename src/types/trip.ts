export type Id = string

export type Resort = {
  id: Id
  name: string
  region: string
  description: string
  imageUrl: string
  tags: string[]
}

export type Hotel = {
  id: Id
  resortId: Id
  name: string
  stars: number
  description: string
  imageUrl: string
}

export type Room = {
  id: Id
  hotelId: Id
  name: string
  description: string
  price: number
  imageUrls: string[]
}

export type Option = {
  id: Id
  title: string
  summary: string
  price: number
}

export type PackageType = 'skipass' | 'transfer' | 'flight' | 'insurance' | 'addons'

export type PackageItemVm = {
  id: Id
  type: PackageType
  title: string
  summary: string
  price: number
  removable: boolean
}

export type PriceLine = {
  id: Id
  title: string
  amount: number
}

export type SkipassZone = {
  id: Id
  title: string
  dayPrice: number
}

export type SkipassLevel = {
  id: Id
  title: string
  multiplier: number
}

export type SkipassSelection = {
  zoneId: Id
  days: number
  levelId: Id
}
