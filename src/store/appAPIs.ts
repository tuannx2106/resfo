import getConfig from 'next/config'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { camelizeKeys, decamelizeKeys } from 'humps'
import { AppState } from 'store'
import { RegisterReq, UserRes, User } from './types/users'

type APIResponse<T = any> = {
  success?: boolean
  data?: T
  errors?: string[]
  deviceType?: string
}

const transformResponse = (response: APIResponse) => {
  const { success, ...rest } = response
  if (success) {
    return camelizeKeys(rest)
  }
  return Promise.reject()
}

const baseQuery = fetchBaseQuery({
  baseUrl: getConfig().publicRuntimeConfig.apiEndpoint,
  prepareHeaders: (header, { getState }) => {
    const token = (getState() as AppState).authSlice?.session?.token || ''
    header.set('x-json-qkey', '$$JSON')
    if (token) {
      header.set('Authorization', `Bearer ${token}`)
    }
    return header
  },
})

export const appAPIs = createApi({
  baseQuery,
  reducerPath: 'appAPI',
  tagTypes: ['Property', 'Auth'],
  endpoints: (build) => ({
    getProperties: build.query({
      query: (params) => ({
        url: '/property/search',
        params,
      }),
      transformResponse,
      providesTags: [
        {
          type: 'Property',
          id: 'LIST',
        },
      ],
    }),

    registerAccount: build.mutation<APIResponse<UserRes>, RegisterReq>({
      query: (body) => ({
        url: '/user/register',
        body: decamelizeKeys({
          ...body,
          role: 'user',
        }),
        method: 'POST',
      }),
      transformResponse,
      invalidatesTags: [
        {
          type: 'Auth',
          id: 'REGISTER',
        },
      ],
    }),

    updateAccount: build.mutation<APIResponse<UserRes>, User>({
      query: (body) => ({
        url: '/user/me/update',
        body: decamelizeKeys({
          ...body,
          role: 'user',
        }),
        method: 'PUT',
      }),
      transformResponse,
      invalidatesTags: [
        {
          type: 'Auth',
          id: 'UPDATE',
        },
      ],
    }),

    changePassword: build.mutation<APIResponse<UserRes>, Partial<User>>({
      query: (body) => ({
        url: '/user/me/change-pwd',
        body: decamelizeKeys(body),
        method: 'PUT',
      }),
      transformResponse,
      invalidatesTags: [
        {
          type: 'Auth',
          id: 'UPDATE_PWD',
        },
      ],
    }),
  }),
})

export const {
  endpoints: appAPIEndpoints,
  reducerPath: appAPIReducerPath,
  reducer: appAPIReducer,
  middleware: appAPIMiddleware,
} = appAPIs

export const {
  useGetPropertiesQuery,
  useRegisterAccountMutation,
  useUpdateAccountMutation,
  useChangePasswordMutation,
} = appAPIs
