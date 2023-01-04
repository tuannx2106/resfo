import { Property, PropertyImageType, PropertyItemExtraInfo } from 'globalTypes/property'
import { Amenities } from './components/AmenitiesCard/AmenitiesCard'

export const testProperty: Property = {
  id: 1,
  name: 'Test Property',
  description: 'Test Property Description',
  price: '$1,000,000',
  bedNums: 3,
  bathNums: 2,
  area: 1000,
  address: '123 Test St',
  city: 'Test City',
  state: 'Test State',
  zip: '12345',
  country: 'Test Country',
  like: false,
  createdAt: '3 days before',
  images: [
    {
      url: 'https://photos.zillowstatic.com/fp/fed82c3d3c83dda4e4b69f2c196f50c7-cc_ft_960.jpg',
      type: PropertyImageType.MAIN,
    },
    {
      url: 'https://photos.zillowstatic.com/fp/14355c9889fa00d8ab7150a0b8f36523-cc_ft_576.jpg',
      type: PropertyImageType.IMAGE,
    },
    {
      url: 'https://photos.zillowstatic.com/fp/7c68f619be00312f791fff2ae1ead288-cc_ft_576.jpg',
      type: PropertyImageType.IMAGE,
    },
    {
      url: 'https://photos.zillowstatic.com/fp/a79a8c04e9d0b5ce39ff3a211f81c569-cc_ft_576.jpg',
      type: PropertyImageType.IMAGE,
    },
    {
      url: 'https://photos.zillowstatic.com/fp/61187c6545e1e0313f3fca486cf34cce-cc_ft_576.jpg',
      type: PropertyImageType.IMAGE,
    },
    {
      url: 'https://prod-images.localize.city/t:nonce:v=1;resize:height=1280;convert:type=webp/bulletins2/525b82143353f086063642dff226487a.png',
      type: PropertyImageType.FLOOR_PLAN,
    },
  ],
  coordinates: {
    lat: 0,
    lng: 0,
  },
}

export const testProperty2: Property = {
  ...testProperty,
  images: [
    {
      url: 'https://photos.zillowstatic.com/fp/14355c9889fa00d8ab7150a0b8f36523-cc_ft_576.jpg',
      type: PropertyImageType.IMAGE,
    },
    {
      url: 'https://photos.zillowstatic.com/fp/fed82c3d3c83dda4e4b69f2c196f50c7-cc_ft_960.jpg',
      type: PropertyImageType.MAIN,
    },
    {
      url: 'https://prod-images.localize.city/t:nonce:v=1;resize:height=1280;convert:type=webp/bulletins2/525b82143353f086063642dff226487a.png',
      type: PropertyImageType.FLOOR_PLAN,
    },
  ],
}

export const extraInfosTest: PropertyItemExtraInfo[] = [
  {
    name: 'type',
    value: 'Single Family Residence',
  },
  {
    name: 'yearBuilt',
    value: '2021',
  },
  {
    name: 'heating',
    value: 'Natural Gas, Zoned',
  },
  {
    name: 'cooling',
    value: 'Electric, Zoned, Ceiling Floor',
  },
  {
    name: 'parking',
    value: '2 Attached Garage spaces',
  },
  {
    name: 'hoa',
    value: '$40 monthly',
  },
  {
    name: 'lotSize',
    value: '5,000 sqft',
  },
  {
    name: 'price',
    value: '$112',
  },
]

export const amenitiesTest: Amenities[] = [
  {
    name: 'Interior Details',
    list: [
      'Basement: Full',
      'Number of Rooms: 9',
      'Types of Rooms: Master Bedroom, Dining Room, Family Room, Kitchen, Living Room',
    ],
  },
  {
    name: 'Beds & Baths',
    list: ['Number of Bedrooms: 5', 'Number of Bathrooms: 2', 'Number of Bathrooms (full): 2'],
  },
  {
    name: 'Appliances & Utilities',
    list: [
      'Utilities: All Public, Natural Gas Connected',
      'Appliances: Dishwasher, Free-Standing Gas Oven, Free-Standing Refrigerator, Gas Water Heater, Range Hood, See Remarks, Dryer, Washer',
      'Dishwasher',
      'Dryer',
      'Washer',
      'Range Hood',
      'Free-Standing Gas Oven',
      'Free-Standing Refrigerator',
      'Gas Water Heater',
    ],
  },
]

export const testPropertyItems: Property[] = Array(11)
  .fill(0)
  .map((_, index) => ({
    ...testProperty,
    id: index + 1,
  }))

export const testPropertyItems2: Property[] = Array(11)
  .fill(0)
  .map((_, index) => {
    if (index % 2 === 0) {
      return {
        ...testProperty2,
        id: index + 1,
      }
    }

    return {
      ...testProperty,
      id: index + 1,
    }
  })
