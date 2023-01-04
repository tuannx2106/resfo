/* eslint-disable @typescript-eslint/no-var-requires */
const withAntdLess = require('next-plugin-antd-less')
const { i18n } = require('./next-i18next.config')

const variables = {
  development: {
    apiEndpoint: 'https://api.tvmaze.com',
  },
  production: {
    apiEndpoint: 'https://api.tvmaze.com',
  },
}[process.env.NODE_ENV || 'development']

/**
 * @type {import('next').NextConfig}
 * */
module.exports = {
  ...withAntdLess({
    lessVarsFilePath: './src/styles/antdVariables.less',
    lessVarsFilePathAppendToEndOfContent: false,
  }),
  i18n,
  serverRuntimeConfig: {},
  publicRuntimeConfig: {
    ...variables,
    GOOGLE_ID: process.env.GOOGLE_ID,
    GMAP_API_KEY: process.env.GMAP_API_KEY,
  },
}
