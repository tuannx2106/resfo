import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

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
  ],
  callbacks: {
    async signIn(user, account, profile) {
      console.log('---------------sign in----------------------')
      console.log(user)
      console.log('---------------account----------------------')
      console.log(account)
      console.log('---------------profile----------------------')
      console.log(profile)
      return true
    },
    async session(session, user) {
      console.log('---------------session----------------------')
      console.log(session)
      return session
    },
  },

  pages: {
    signIn: '/auth/sign-in',
  },

  // Enable debug messages in the console if you are having problems
  debug: process.env.NODE_ENV === 'development',
})
