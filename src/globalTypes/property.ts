export enum PropertyImageType {
  MAIN = 'main',
  FLOOR_PLAN = 'floor_plan',
  VIDEO = 'video',
  IMAGE = 'image',
}
export interface PropertyImage {
  url: string
  type: PropertyImageType
}

export enum SEARCH_PURPOSES {
  SALE = 'sale',
  RENT = 'rent',
  SOLD = 'sold',
}

export const SEARCH_PURPOSES_MAP = {
  [SEARCH_PURPOSES.SALE]: 'For sale',
  [SEARCH_PURPOSES.RENT]: 'For rent',
  [SEARCH_PURPOSES.SOLD]: 'Sold',
}
export interface Property {
  id: number
  name: string
  description?: string
  price?: string
  bedNums?: number
  bathNums?: number
  area?: number
  address?: string
  city?: string
  state?: string
  zip?: string
  country?: string
  searchType?: SEARCH_PURPOSES
  images?: PropertyImage[]
  like: boolean
  createdAt: string
  coordinates: {
    lat: number
    lng: number
  }
}

export interface PropertyItemExtraInfo {
  name: string
  value: string | number
}
