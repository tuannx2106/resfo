/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type DefaultSession = {
  name: string
  firstName?: string
  lastName?: string
  email: string
  picture: string
  id?: string
  phoneNumber?: string
  address1?: string
  address2?: string
  city?: string
  state?: string
  zipCode?: string
  countryCode?: string
  role?: 'user' | 'property_owner'
  status?: 'active' | 'deactivated' // TODO: enum
  verified?: boolean
  iat: number
  exp: number
  token?: string
  accessToken?: string
  sub?: string
  type: 'credentials' | 'oauth'
}

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
