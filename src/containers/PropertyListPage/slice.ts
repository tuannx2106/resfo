import { Dictionary } from 'lodash'
/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { decamelizeKeys } from 'humps'
import { initFilterBy } from './constants'

export interface PropertyDetailState {
  getPropertyListArgs: { $$JSON: string }
  propertyMarkerRefDictionary: Dictionary<HTMLDivElement>
}

const initialState: PropertyDetailState = {
  getPropertyListArgs: {
    $$JSON: JSON.stringify({
      pagination: {
        skip: 0,
        limit: 20,
      },
      query: { posted_date: [0, 2558755098316] },
      sort: {
        name: 'price',
        order: 'desc',
      },
      filter: decamelizeKeys(initFilterBy),
    }),
  },
  propertyMarkerRefDictionary: {},
}

export const propertyListPageSlice = createSlice({
  name: 'propertyList',
  initialState,
  reducers: {
    updateGetPropertyListArgs: (state, action: PayloadAction<{ $$JSON: string }>) => {
      state.getPropertyListArgs = action.payload
    },
    updatePropertyMarkerRefDictionary: (state, action: PayloadAction<Dictionary<HTMLDivElement>>) => {
      // @ts-ignore
      state.propertyMarkerRefDictionary = action.payload
    },
  },
})

export const { updateGetPropertyListArgs, updatePropertyMarkerRefDictionary } = propertyListPageSlice.actions
