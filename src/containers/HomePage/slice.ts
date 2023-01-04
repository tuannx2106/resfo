/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface HomePageState {
  isVisibleSearchItems: boolean
}

const initialState: HomePageState = {
  isVisibleSearchItems: false,
}

export const homePageSlice = createSlice({
  name: 'HomePage',
  initialState,
  reducers: {
    updateIsVisibleSearchItems: (state, action: PayloadAction<boolean>) => {
      state.isVisibleSearchItems = action.payload
    },
  },
})

export const { updateIsVisibleSearchItems } = homePageSlice.actions
