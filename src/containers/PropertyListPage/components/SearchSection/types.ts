import { RANGE_SELECTION } from 'globalTypes/form'

/* eslint-disable no-shadow */
export type SearchForm = {
  purpose: SEARCH_PURPOSES
  bed: number
  bedExact: boolean
  bathRoom: number
  homeTypes?: HOME_TYPES[]
  squareFeet: RANGE_SELECTION
  lotSize: RANGE_SELECTION
  yearBuilt: RANGE_SELECTION
  basement: boolean
  numberOfStories: boolean
  tours: boolean
  pets?: PET_TYPES[]
  other?: OTHER_AMENITIES[]
  view?: VIEW_TYPES[]
}

export enum SEARCH_PURPOSES {
  SALE = 'sale',
  RENT = 'rent',
  SOLD = 'sold',
}

export enum HOME_TYPES {
  HOUSES = 1,
  APARTMENTS,
  TOWN_HOMES,
}

export enum PET_TYPES {
  ALLOW_LARGE_DOG = 1,
  ALLOW_SMALL_DOG,
  ALLOW_CAT,
}

export enum OTHER_AMENITIES {
  HAVE_AC = 1,
  HAVE_POOL,
  WATER_FRONT,
  PARKING,
  LAUNDRY,
  INCOME_RESTRICTED,
  COMMUNITY,
}

export enum VIEW_TYPES {
  CITY = 1,
  MOUNTAIN,
  PARK,
  WATER,
}

export type SearchItemProps = {
  value: SearchForm
  setSearchFormValue: (val: SearchForm) => void
  dropdown?: boolean
}
