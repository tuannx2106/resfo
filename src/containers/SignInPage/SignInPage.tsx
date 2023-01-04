import React, { ReactElement } from 'react'
import DefaultLayout from 'layouts/DefaultLayout'
import AuthForm from 'components/AuthForm'
import s from './SignInPage.module.scss'

const SignInPage = () => (
  <div className={s.signInPage}>
    <AuthForm />
  </div>
)

SignInPage.getLayout = function getLayout(page: ReactElement) {
  return <DefaultLayout>{page}</DefaultLayout>
}

export default SignInPage
