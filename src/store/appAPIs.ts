import getConfig from 'next/config'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

type APIResponse = {
  code: number
  data: unknown
  error: string
}

const transformResponse = (response: APIResponse) => {
  const { code, data, error } = response
  if (code === 0) {
    return data
  }
  return Promise.reject(error)
}

export const appAPIs = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: getConfig().publicRuntimeConfig.apiEndpoint }),
  reducerPath: 'appAPI',
  tagTypes: ['Property'],
  endpoints: (build) => ({
    getProperties: build.query({
      query: (params) => ({
        url: '/search/shows',
        params,
      }),
      // transformResponse,
      providesTags: [
        {
          type: 'Property',
          id: 'LIST',
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

export const { useGetPropertiesQuery } = appAPIs
