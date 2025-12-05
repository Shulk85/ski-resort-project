export namespace Trip {
  export type PackageComponentType =
    | 'hotel'
    | 'room'
    | 'skipass'
    | 'transfer'
    | 'flight'
    | 'insurance'
    | 'addons'

  export type PackageComponent = {
    id: string
    type: PackageComponentType
    title: string
    summary: string
    price: number
    editable?: boolean
    removable?: boolean
  }

  export type Resort = {
    name: string
    region: string
    imageUrl: string
    tags: string[]
  }
}
