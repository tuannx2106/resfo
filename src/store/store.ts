import { configureStore } from '@reduxjs/toolkit'
import { homePageSlice } from 'containers/HomePage/slice'
import { authSlice } from 'globalSlices/authSlice'
import { appAPIMiddleware, appAPIReducer, appAPIReducerPath } from './appAPIs'

export const store = configureStore({
  reducer: {
    [appAPIReducerPath]: appAPIReducer,
    homePage: homePageSlice.reducer,
    authSlice: authSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(appAPIMiddleware),
})

export type AppState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
