import { SelectOption } from 'globalTypes/form'
import { SEARCH_PURPOSES, HOME_TYPES, VIEW_TYPES, OTHER_AMENITIES, PET_TYPES } from '../SearchSection/types'

export const SEARCH_PURPOSE_OPTIONS: SelectOption<SEARCH_PURPOSES>[] = [
  {
    value: SEARCH_PURPOSES.SALE,
    label: 'For Sale',
  },
  {
    value: SEARCH_PURPOSES.RENT,
    label: 'For Rent',
  },
  {
    value: SEARCH_PURPOSES.SOLD,
    label: 'For Sold',
  },
]

export const BED_OPTIONS: SelectOption[] = [
  {
    value: 0,
    label: 'Any',
    rangeLabel: 'Studio',
  },
  {
    value: 1,
    label: '1',
    rangeLabel: '1+',
  },
  {
    value: 2,
    label: '2',
    rangeLabel: '2+',
  },
  {
    value: 3,
    label: '3',
    rangeLabel: '3+',
  },
  {
    value: 4,
    label: '4',
    rangeLabel: '4+',
  },
  {
    value: 5,
    label: '5',
    rangeLabel: '5+',
  },
]

export const BATH_ROOM_OPTIONS: SelectOption[] = [
  {
    value: 0,
    label: 'Any',
  },
  {
    value: 1,
    label: '1+',
  },
  {
    value: 2,
    label: '2+',
  },
  {
    value: 3,
    label: '3+',
  },
  {
    value: 4,
    label: '4+',
  },
  {
    value: 5,
    label: '5+',
  },
]

export const HOME_TYPE_OPTIONS: SelectOption<HOME_TYPES>[] = [
  {
    value: HOME_TYPES.HOUSES,
    label: 'Houses',
  },
  {
    value: HOME_TYPES.APARTMENTS,
    label: 'Apartments/Condos/Co-ops',
  },
  {
    value: HOME_TYPES.TOWN_HOMES,
    label: 'Townhomes',
  },
]

export const SQUARE_FEET_OPTIONS: SelectOption[] = [
  {
    value: 0,
    label: 'Any',
  },
  {
    value: 500,
    label: '500',
  },
  {
    value: 750,
    label: '750',
  },
  {
    value: 1000,
    label: '1,000',
  },
  {
    value: 1250,
    label: '1,250',
  },
  {
    value: 1500,
    label: '1,500',
  },
  {
    value: 1750,
    label: '1,750',
  },
  {
    value: 2000,
    label: '2,000',
  },
  {
    value: 2250,
    label: '2,250',
  },
  {
    value: 2500,
    label: '2,500',
  },
  {
    value: 3000,
    label: '3,000',
  },
  {
    value: 3500,
    label: '3,500',
  },
  {
    value: 4000,
    label: '4,000',
  },
  {
    value: 5000,
    label: '5,000',
  },
  {
    value: 7500,
    label: '7,500',
  },
]

export const PET_OPTIONS: SelectOption<PET_TYPES>[] = [
  {
    value: PET_TYPES.ALLOW_LARGE_DOG,
    label: 'Allows large dogs',
  },
  {
    value: PET_TYPES.ALLOW_SMALL_DOG,
    label: 'Allows small dogs',
  },
  {
    value: PET_TYPES.ALLOW_CAT,
    label: 'Allows cats',
  },
]

export const OTHER_AMENITY_OPTIONS: SelectOption<OTHER_AMENITIES>[] = [
  {
    value: OTHER_AMENITIES.HAVE_AC,
    label: 'Must have A/C',
  },
  {
    value: OTHER_AMENITIES.HAVE_POOL,
    label: 'Must have pool',
  },
  {
    value: OTHER_AMENITIES.WATER_FRONT,
    label: 'Waterfront',
  },
  {
    value: OTHER_AMENITIES.PARKING,
    label: 'On-site Parking',
  },
  {
    value: OTHER_AMENITIES.LAUNDRY,
    label: 'In-unit Laundry',
  },
  {
    value: OTHER_AMENITIES.INCOME_RESTRICTED,
    label: 'Income restricted',
  },
  {
    value: OTHER_AMENITIES.COMMUNITY,
    label: 'Apartment Community',
  },
]

export const VIEW_OPTIONS: SelectOption<VIEW_TYPES>[] = [
  {
    value: VIEW_TYPES.CITY,
    label: 'City',
  },
  {
    value: VIEW_TYPES.MOUNTAIN,
    label: 'Mountain',
  },
  {
    value: VIEW_TYPES.PARK,
    label: 'Park',
  },
  {
    value: VIEW_TYPES.WATER,
    label: 'Water',
  },
]
