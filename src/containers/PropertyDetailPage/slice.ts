/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Property } from 'globalTypes/property'

export interface PropertyDetailState {
  parks: google.maps.places.PlaceResult[]
  schools: google.maps.places.PlaceResult[]
  shops: google.maps.places.PlaceResult[]
  propertyDetail: Property | null
}

const initialState: PropertyDetailState = {
  parks: [],
  schools: [],
  shops: [],
  propertyDetail: null,
}

export const propertyDetailSlice = createSlice({
  name: 'propertyDetail',
  initialState,
  reducers: {
    updatePropertyDetail: (state, action: PayloadAction<Property>) => {
      state.propertyDetail = action.payload
    },
    addParks: (state, action: PayloadAction<google.maps.places.PlaceResult[]>) => {
      state.parks = [...state.parks, ...action.payload]
    },
    addSchools: (state, action: PayloadAction<google.maps.places.PlaceResult[]>) => {
      state.schools = [...state.schools, ...action.payload]
    },
    addShops: (state, action: PayloadAction<google.maps.places.PlaceResult[]>) => {
      state.shops = [...state.shops, ...action.payload]
    },
    resetPropertyDetail: (state) => {
      state.propertyDetail = null
    },
    resetParks: (state) => {
      state.parks = []
    },
    resetSchools: (state) => {
      state.schools = []
    },
    resetShops: (state) => {
      state.shops = []
    },
  },
})

export const {
  addParks,
  addSchools,
  addShops,
  resetParks,
  resetSchools,
  resetShops,
  updatePropertyDetail,
  resetPropertyDetail,
} = propertyDetailSlice.actions
