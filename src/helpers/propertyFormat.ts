import { PropertyListingType } from 'globalTypes/property'

export const toPropertyListingText = (purpose: PropertyListingType) => {
  if (purpose === 'sell') return 'For sale'
  return 'For rent'
}
