/* eslint-disable no-shadow */
export enum SIZES {
  SMALL = 'small',
  MIDDLE = 'middle',
  LARGE = 'large',
}

export enum LOCATION_TYPES {
  CURRENT = 1,
  COMMON,
  SAVED,
  PREVIOUS_KEY,
}

export type LocationSearchItem = {
  type: LOCATION_TYPES
  location: string
}
