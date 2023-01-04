/* eslint-disable camelcase */
/* eslint-disable no-param-reassign */
import { camelizeKeys } from 'humps'
import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import getConfig from 'next/config'

export default NextAuth({
  providers: [
    Providers.Facebook({
      clientId: process.env.FACEBOOK_ID,
      clientSecret: process.env.FACEBOOK_SECRET,
    }),
    Providers.Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    Providers.Credentials({
      name: 'Credentials',
      authorize: async (credentials) => {
        const res = await fetch(`${getConfig().publicRuntimeConfig.apiEndpoint}/user/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(credentials),
        })

        const token = await res.json()

        if (token.data) {
          return token.data
        }
        return null
      },
    }),
  ],
  callbacks: {
    async jwt(token, user, account) {
      // Add access_token to the token right after signin
      if (account?.accessToken) {
        token.accessToken = account.accessToken
        token.type = account.type
      }

      if (user && token && account?.type === 'credentials') {
        token = {
          ...token,
          token: user,
          type: account.type,
        }
      }

      return token
    },
    async signIn() {
      return true
    },
    async session(session, user) {
      if (user.token) {
        const profileRes = await fetch(`${getConfig().publicRuntimeConfig.apiEndpoint}/user/me`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user.token}`,
          },
        })

        const { data: profileUser } = await profileRes.json()
        const { avatar, ...rest } = profileUser

        user = {
          ...user,
          name: `${profileUser.first_name} ${profileUser.last_name}`,
          picture: '/img/avatar-default.png',
          type: user.type,
          ...camelizeKeys(rest),
        }
      }
      console.log('---------------user----------------------')
      console.log(user)

      return Promise.resolve(user)
    },
  },

  pages: {
    signIn: '/auth/sign-in',
  },

  // Enable debug messages in the console if you are having problems
  debug: process.env.NODE_ENV === 'development',
})
