import { Property } from 'globalTypes/property'

export const CUSTOM_MAP_STYLES: google.maps.MapTypeStyle[] = [
  {
    featureType: 'poi',
    stylers: [{ visibility: 'off' }],
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [{ visibility: 'on' }],
  },
  {
    featureType: 'poi.school',
    elementType: 'geometry',
    stylers: [{ visibility: 'on' }],
  },
]

export const DRAW_POLYGON_STYLES = {
  // TODO: make variables for this
  STROKE: {
    strokeColor: '#006aff',
    strokeOpacity: 0.8,
    strokeWeight: 2,
  },
  FILL: {
    fillColor: '#006aff',
    fillOpacity: 0.25,
  },
}

export const testData: Property[] = [
  {
    id: 1,
    like: false,
    createdAt: '3 days ago',
    name: 'Home 1',
    coordinates: {
      lat: 10.806864952355339,
      lng: 106.66330517066706,
    },
  },
  {
    id: 2,
    like: false,
    createdAt: '3 days ago',
    name: 'Home 2',
    coordinates: {
      lat: 21.014243221886904,
      lng: 105.82816119302466,
    },
  },
  {
    id: 3,
    like: false,
    createdAt: '3 days ago',
    name: 'Home 3',
    coordinates: {
      lat: 10.791489757811465,
      lng: 106.65321350097656,
    },
  },
  {
    id: 4,
    like: false,
    createdAt: '3 days ago',
    name: 'Home 4',
    coordinates: {
      lat: 10.808254860566365,
      lng: 106.62377994022755,
    },
  },
  {
    id: 5,
    like: false,
    createdAt: '3 days ago',
    name: 'Home 5',
    coordinates: {
      lat: 10.772265829894847,
      lng: 106.69818878173828,
    },
  },
]
