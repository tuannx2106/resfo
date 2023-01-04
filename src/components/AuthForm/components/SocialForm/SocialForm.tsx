/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { Button } from 'antd'
import { useTranslation } from 'react-i18next'
import { signIn } from 'next-auth/client'
import s from '../../AuthForm.module.scss'

const SocialForm = () => {
  const { t } = useTranslation()

  return (
    <div className={s.socialForm}>
      <p>{t('authForm.orConnectWith')}:</p>

      <Button
        onClick={() => signIn('facebook')}
        className={s.fbBtn}
        type="primary"
        icon={
          <svg
            width="15"
            height="15"
            viewBox="0 0 200 200"
            aria-hidden="true"
            fill="currentColor"
            preserveAspectRatio="xMinYMin meet"
            xmlns="http://www.w3.org/2000/svg"
            focusable="false"
          >
            <title>Facebook</title>
            <path
              d="M200 100a100 100 0 1 0-115.6 98.8v-69.9H59V100h25.4V78c0-25 14.9-39 37.7-39 11 0 22.4 2 22.4 2v24.6H132c-12.4 0-16.3 7.7-16.3 15.6V100h27.8l-4.5 29h-23.3v69.8A100 100 0 0 0 200 100"
              stroke="none"
            />
          </svg>
        }
      >
        {t('authForm.continueWithFacebook')}
      </Button>

      <Button
        onClick={() => signIn('google')}
        className={s.ggBtn}
        icon={
          <svg
            width="15"
            height="15"
            className="Bz112c Bz112c-E3DyYd"
            xmlns="https://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
          >
            <path
              fill="#4285F4"
              d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z"
            />
            <path
              fill="#34A853"
              d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z"
            />
            <path
              fill="#FBBC05"
              d="M11.69 28.18C11.25 26.86 11 25.45 11 24s.25-2.86.69-4.18v-5.7H4.34C2.85 17.09 2 20.45 2 24c0 3.55.85 6.91 2.34 9.88l7.35-5.7z"
            />
            <path
              fill="#EA4335"
              d="M24 10.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 4.18 29.93 2 24 2 15.4 2 7.96 6.93 4.34 14.12l7.35 5.7c1.73-5.2 6.58-9.07 12.31-9.07z"
            />
            <path fill="none" d="M2 2h44v44H2z" />
          </svg>
        }
      >
        {t('authForm.continueWithGoogle')}
      </Button>
    </div>
  )
}

export default SocialForm
