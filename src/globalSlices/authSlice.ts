/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { DefaultSession } from 'next-auth'

export interface AuthState {
  session: DefaultSession | undefined
  isVisibleAuthModal: boolean
}

const initialState: AuthState = {
  session: undefined,
  isVisibleAuthModal: false,
}

export const authSlice = createSlice({
  name: 'authPage',
  initialState,
  reducers: {
    updateSession: (state, action: PayloadAction<DefaultSession>) => {
      state.session = action.payload
    },
    clearSession: (state) => {
      state.session = undefined
    },
    updateIsVisibleAuthModal: (state, action: PayloadAction<boolean>) => {
      state.isVisibleAuthModal = action.payload
    },
  },
})

export const { updateSession, clearSession, updateIsVisibleAuthModal } = authSlice.actions
