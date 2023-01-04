/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { Tabs } from 'antd'
import { useTranslation } from 'react-i18next'
import s from './AuthForm.module.scss'
import SignInForm from './components/SignInForm'
import SignUpForm from './components/SignUpForm'

const AuthForm = () => {
  const { t } = useTranslation()

  return (
    <div className={s.auth}>
      <h2 className={s.authTitle}>{t('authForm.welcomeToZillow')}</h2>
      <Tabs defaultActiveKey="1">
        <Tabs.TabPane tab={t('authForm.signIn')} key="1">
          <SignInForm />
        </Tabs.TabPane>
        <Tabs.TabPane tab={t('authForm.newAccount')} key="2">
          <SignUpForm />
        </Tabs.TabPane>
      </Tabs>
    </div>
  )
}

export default AuthForm
