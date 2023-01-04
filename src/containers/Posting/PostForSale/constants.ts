import { SelectOption } from 'globalTypes/form'
import {
  PropertyConstructionStatus,
  PropertyFacilities,
  PropertyFurnitures,
  PropertyHousingType,
  PropertyVerifyStatus,
} from 'globalTypes/property'

type CheckboxOption = {
  value: number
  label: string
}

export const HOUSING_TYPE_OPTIONS: SelectOption<PropertyHousingType>[] = [
  {
    label: 'Condominium',
    value: 'condominium',
  },
  {
    label: 'Apartment',
    value: 'apartment',
  },
  {
    label: 'Private Home',
    value: 'private_homes',
  },
  {
    label: 'Hotel',
    value: 'hotels',
  },
  {
    label: 'Short Stays',
    value: 'short_stays',
  },
]

export const FACILITY_OPTIONS: SelectOption<PropertyFacilities>[] = [
  {
    label: 'Allow Pets',
    value: 'allow_pets',
  },
  {
    label: 'Finish Construction',
    value: 'finish_construction',
  },
  {
    label: 'Near School',
    value: 'near_school',
  },
  {
    label: 'Near Super Market',
    value: 'near_super_market',
  },
  {
    label: 'Wifi',
    value: 'wifi',
  },
]

export const FURNITURE_OPTIONS: SelectOption<PropertyFurnitures>[] = [
  {
    label: 'Coil',
    value: 'coil',
  },
  {
    label: 'Downdraft',
    value: 'downdraft',
  },
  {
    label: 'Electric',
    value: 'electric',
  },
  {
    label: 'Gas',
    value: 'gas',
  },
  {
    label: 'Induction',
    value: 'induction',
  },
  {
    label: 'Overhead Hood',
    value: 'overhead_hood',
  },
  {
    label: 'Smooth Top',
    value: 'smothtop',
  },
]

export const VERIFY_STATUS_OPTIONS: SelectOption<PropertyVerifyStatus>[] = [
  {
    label: 'None',
    value: 'none',
  },
  {
    label: 'Verification',
    value: 'verification',
  },
]

export const CONSTRUCTION_STATUS_OPTIONS: SelectOption<PropertyConstructionStatus>[] = [
  {
    label: 'Not Finished',
    value: 'not_finished',
  },
  {
    label: 'Finished',
    value: 'finished',
  },
]

export const APPLIANCES_OPTIONS: CheckboxOption[] = [
  {
    label: 'Dishwasher',
    value: 1,
  },
  {
    label: 'Dryer',
    value: 2,
  },
  {
    label: 'Freezer',
    value: 3,
  },
  {
    label: 'Garbage disposal',
    value: 4,
  },
  {
    label: 'Microwave',
    value: 5,
  },
  {
    label: 'Range / Oven',
    value: 6,
  },
  {
    label: 'Refrigerator',
    value: 7,
  },
  {
    label: 'Trash compactor',
    value: 8,
  },
]

export const BASEMENT: CheckboxOption[] = [
  {
    value: 1,
    label: 'Finished',
  },
  {
    value: 2,
    label: 'Unfinished',
  },
  {
    value: 3,
    label: 'Partially finished',
  },
  {
    value: 4,
    label: 'None',
  },
]

export const FLOOR_COVERING: CheckboxOption[] = [
  {
    value: 1,
    label: 'Carpet',
  },
  {
    value: 2,
    label: 'Slate',
  },
  {
    value: 3,
    label: 'Concrete',
  },
  {
    value: 4,
    label: 'Softwood',
  },
  {
    value: 5,
    label: 'Hardwood',
  },
  {
    value: 6,
    label: 'Tile',
  },
  {
    value: 7,
    label: 'Laminate',
  },
  {
    value: 8,
    label: 'Other',
  },
  {
    value: 9,
    label: 'Linoleum / Vinyl',
  },
]

export const ROOMS: CheckboxOption[] = [
  {
    value: 1,
    label: 'Breakfast nook',
  },
  {
    value: 2,
    label: 'Office',
  },
  {
    value: 3,
    label: 'Dining room',
  },
  {
    value: 4,
    label: 'Pantry',
  },
  {
    value: 5,
    label: 'Family room',
  },
  {
    value: 6,
    label: 'Recreation room',
  },
  {
    value: 7,
    label: 'Laundry room',
  },
  {
    value: 8,
    label: 'Workshop',
  },
  {
    value: 9,
    label: 'Library',
  },
  {
    value: 10,
    label: 'Solarium / Atrium',
  },
  {
    value: 11,
    label: 'Master bath',
  },
  {
    value: 12,
    label: 'Sun room',
  },
  {
    value: 13,
    label: 'Mud room',
  },
  {
    value: 14,
    label: 'Walk-in closet',
  },
]

export const INDOOR_FEATURES: CheckboxOption[] = [
  {
    value: 1,
    label: 'Attic',
  },
  {
    value: 2,
    label: 'Mother-in-law apartment',
  },
  {
    value: 3,
    label: 'Cable ready',
  },
  {
    value: 4,
    label: 'Security system',
  },
  {
    value: 5,
    label: 'Ceiling fans',
  },
  {
    value: 6,
    label: 'Skylights',
  },
  {
    value: 7,
    label: 'Double pane/storm windows',
  },
  {
    value: 8,
    label: 'Vaulted ceiling',
  },
  {
    value: 9,
    label: 'Fireplace',
  },
  {
    value: 10,
    label: 'Wet bar',
  },
  {
    value: 11,
    label: 'Intercom system',
  },
  {
    value: 12,
    label: 'Wired',
  },
  {
    value: 13,
    label: 'Jetted tub',
  },
]

export const COOLING_TYPE: CheckboxOption[] = [
  {
    value: 1,
    label: 'Central',
  },
  {
    value: 2,
    label: 'Solar',
  },
  {
    value: 3,
    label: 'Evaporative',
  },
  {
    value: 4,
    label: 'Wall',
  },
  {
    value: 5,
    label: 'Geothermal',
  },
  {
    value: 6,
    label: 'Other',
  },
  {
    value: 7,
    label: 'Refrigeration',
  },
  {
    value: 8,
    label: 'None',
  },
]

export const HEATING_TYPE: CheckboxOption[] = [
  {
    value: 1,
    label: 'Baseboard',
  },
  {
    value: 2,
    label: 'Radiant',
  },
  {
    value: 3,
    label: 'Forced air',
  },
  {
    value: 4,
    label: 'Stove',
  },
  {
    value: 5,
    label: 'Geothermal',
  },
  {
    value: 6,
    label: 'Wall',
  },
  {
    value: 7,
    label: 'Heat pump',
  },
  {
    value: 8,
    label: 'Other',
  },
]

export const HEATING_FUEL: CheckboxOption[] = [
  {
    value: 1,
    label: 'Coal',
  },
  {
    value: 2,
    label: 'Solar',
  },
  {
    value: 3,
    label: 'Electric',
  },
  {
    value: 4,
    label: 'Wood / Pellet',
  },
  {
    value: 5,
    label: 'Gas',
  },
  {
    value: 6,
    label: 'Oil',
  },
  {
    value: 7,
    label: 'Other',
  },
  {
    value: 8,
    label: 'Propane / Butane',
  },
  {
    value: 9,
    label: 'None',
  },
]

export const BUILDING_AMENITIES: CheckboxOption[] = [
  {
    value: 1,
    label: 'Assisted living community',
  },
  {
    value: 2,
    label: 'Gated entry',
  },
  {
    value: 3,
    label: 'Basketball court',
  },
  {
    value: 4,
    label: 'Near transportation',
  },
  {
    value: 5,
    label: 'Controlled access',
  },
  {
    value: 6,
    label: 'Over 55+ active community',
  },
  {
    value: 7,
    label: 'Disabled access',
  },
  {
    value: 8,
    label: 'Sports court',
  },
  {
    value: 9,
    label: 'Doorman',
  },
  {
    value: 10,
    label: 'Storage',
  },
  {
    value: 11,
    label: 'Elevator',
  },
  {
    value: 12,
    label: 'Tennis court',
  },
  {
    value: 13,
    label: 'Fitness center',
  },
]

export const ARCHITECTURAL_STYLE: CheckboxOption[] = [
  {
    value: 1,
    label: 'Bungalow',
  },
  {
    value: 2,
    label: 'Modern',
  },
  {
    value: 3,
    label: 'Cape Cod',
  },
  {
    value: 4,
    label: 'Queen Anne / Victorian',
  },
  {
    value: 5,
    label: 'Colonial',
  },
  {
    value: 6,
    label: 'Ranch / Rambler',
  },
  {
    value: 7,
    label: 'Contemporary',
  },
  {
    value: 8,
    label: 'Santa Fe / Pueblo Style',
  },
  {
    value: 9,
    label: 'Craftsman',
  },
  {
    value: 10,
    label: 'Spanish',
  },
  {
    value: 11,
    label: 'French',
  },
  {
    value: 12,
    label: 'Split-level',
  },
  {
    value: 13,
    label: 'Georgian',
  },
  {
    value: 14,
    label: 'Tudor',
  },
  {
    value: 15,
    label: 'Loft',
  },
  {
    value: 16,
    label: 'Other',
  },
]

export const EXTERIOR: CheckboxOption[] = [
  {
    value: 1,
    label: 'Brick',
  },
  {
    value: 2,
    label: 'Stucco',
  },
  {
    value: 3,
    label: 'Cement / Concrete',
  },
  {
    value: 4,
    label: 'Vinyl',
  },
  {
    value: 5,
    label: 'Composition',
  },
  {
    value: 6,
    label: 'Wood',
  },
  {
    value: 7,
    label: 'Metal',
  },
  {
    value: 8,
    label: 'Wood products',
  },
  {
    value: 9,
    label: 'Shingle',
  },
  {
    value: 10,
    label: 'Stone',
  },
  {
    value: 11,
    label: 'Other',
  },
]

export const OUTDOOR_AMENITIES: CheckboxOption[] = [
  {
    value: 1,
    label: 'Balcony/patio',
  },
  {
    value: 2,
    label: 'Lawn',
  },
  {
    value: 3,
    label: 'Barbecue area',
  },
  {
    value: 4,
    label: 'Pond',
  },
  {
    value: 5,
    label: 'Deck',
  },
  {
    value: 6,
    label: 'Pool',
  },
  {
    value: 7,
    label: 'Dock',
  },
  {
    value: 8,
    label: 'Porch',
  },
  {
    value: 9,
    label: 'Fenced yard',
  },
  {
    value: 10,
    label: 'RV parking',
  },
  {
    value: 11,
    label: 'Garden',
  },
  {
    value: 12,
    label: 'Sauna',
  },
  {
    value: 13,
    label: 'Greenhouse',
  },
  {
    value: 14,
    label: 'Sprinkler system',
  },
  {
    value: 15,
    label: 'Hot tub/spa',
  },
  {
    value: 16,
    label: 'Waterfront',
  },
]

export const PARKING: CheckboxOption[] = [
  {
    value: 1,
    label: 'Carport',
  },
  {
    value: 2,
    label: 'Off-street',
  },
  {
    value: 3,
    label: 'Garage - Attached',
  },
  {
    value: 4,
    label: 'On-street',
  },
  {
    value: 5,
    label: 'Garage - Detached',
  },
  {
    value: 6,
    label: 'None',
  },
]

export const ROOF: CheckboxOption[] = [
  {
    value: 1,
    label: 'Asphalt',
  },
  {
    value: 2,
    label: 'Shake / Shingle',
  },
  {
    value: 3,
    label: 'Built-up',
  },
  {
    value: 4,
    label: 'Slate',
  },
  {
    value: 5,
    label: 'Composition',
  },
  {
    value: 6,
    label: 'Tile',
  },
  {
    value: 7,
    label: 'Metal',
  },
  {
    value: 8,
    label: 'Other',
  },
]

export const VIEW: CheckboxOption[] = [
  {
    value: 1,
    label: 'City',
  },
  {
    value: 2,
    label: 'Territorial',
  },
  {
    value: 3,
    label: 'Mountain',
  },
  {
    value: 4,
    label: 'Water',
  },
  {
    value: 5,
    label: 'Park',
  },
  {
    value: 6,
    label: 'None',
  },
]
