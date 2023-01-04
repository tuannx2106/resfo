/* eslint-disable */
import { updateSession } from 'store/slice/authSlice'
import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from 'store'
import getConfig from 'next/config'
import { getSession } from 'next-auth/client'

const { publicRuntimeConfig } = getConfig()

export const useGoogleOneTap = () => {
  const dispatch = useAppDispatch()
  const authSession = useAppSelector(({ authSlice }) => authSlice.session)

  useEffect(() => {
    ;(async () => {
      const response = await getSession()

      // @ts-ignore
      if (!response && !authSession && google && google.accounts && google.accounts.id) {
        const handleCredentialResponse = async ({ credential }: { credential: string }) => {
          try {
            const res = await fetch(`https://oauth2.googleapis.com/tokeninfo?id_token=${credential}`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json;charset=utf-8',
              },
            })
            const { name, email, picture } = await res.json()
            dispatch(
              updateSession({
                user: {
                  name,
                  email,
                  image: picture,
                },
              }),
            )
          } catch (error) {
            console.log(error)
          }
        }

        // @ts-ignore
        google.accounts.id?.initialize({
          client_id: publicRuntimeConfig.GOOGLE_ID,
          callback: handleCredentialResponse,
        })
        // @ts-ignore
        google.accounts.id?.prompt()
      } else {
        // @ts-ignore
        google.accounts.id?.cancel()
      }
    })()
  }, [authSession])
}
