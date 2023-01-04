/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, FormEventHandler } from 'react'
import { Form, Button, Divider } from 'antd'
import { useTranslation } from 'react-i18next'
import Input from 'components/Input'
import { useAppDispatch, useAppSelector } from 'store'
import { updateIsVisibleAuthModal } from 'store/slice/authSlice'
import { signIn } from 'next-auth/client'
import { useRouter } from 'next/router'
import ErrorConstants from 'globalConstants/error'
import s from '../../AuthForm.module.scss'
import SocialForm from '../SocialForm'
import ForgotPassModal from '../ForgotPassModal'

const SignInForm = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const dispatch = useAppDispatch()
  const [isOpenForgotPassModal, setIsOpenForgotPassModal] = useState<boolean>(false)
  const authSession = useAppSelector(({ authSlice }) => authSlice.session)
  const [isCorrectAccount, setIsCorrectAccount] = useState<boolean>(false)
  const [form] = Form.useForm()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const submit = async (e: FormEventHandler) => {
    setIsLoading(true)
    const res = await signIn('credentials', {
      ...e,
      redirect: false,
    })

    if (res?.ok) {
      if (router.pathname === '/auth/sign-in') router.replace('/')
    } else if (res?.error === ErrorConstants.CREDENTIALS_SIGN_IN) {
      setIsCorrectAccount(true)
      form.validateFields()
    }

    setIsLoading(false)
  }

  const openForgotPassModal = () => {
    if (!authSession) setIsOpenForgotPassModal(true)
    dispatch(updateIsVisibleAuthModal(false))
  }

  return (
    <>
      <Form
        name="basic"
        layout="vertical"
        form={form}
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        initialValues={{ remember: true }}
        onFinish={submit}
        // onFinishFailed={onFinishFailed}
        autoComplete="off"
        className={s.formWrapper}
      >
        {/* Email */}
        <Form.Item
          label={t('form.email')}
          name="email"
          required={false}
          rules={[
            {
              type: 'email',
              message: t('form.errorType', { name: 'Email' }),
            },
            {
              required: true,
              message: t('form.errorRequired', { name: 'Email' }),
            },
            {
              validator() {
                return isCorrectAccount ? Promise.reject(new Error(t('form.accountIncorrect'))) : Promise.resolve()
              },
            },
          ]}
        >
          <Input onChange={() => setIsCorrectAccount(false)} />
        </Form.Item>

        {/* Password */}
        <Form.Item
          label={t('form.password')}
          name="password"
          required={false}
          rules={[
            {
              required: true,
              message: t('form.errorRequired', { name: 'Password' }),
            },
            {
              validator() {
                return isCorrectAccount ? Promise.reject(new Error(t('form.accountIncorrect'))) : Promise.resolve()
              },
            },
          ]}
        >
          <Input onChange={() => setIsCorrectAccount(false)} type="password" />
        </Form.Item>

        {/* Btn signIn */}
        <Form.Item
          wrapperCol={{
            offset: 0,
            span: 24,
          }}
        >
          <Button loading={isLoading} type="primary" htmlType="submit">
            {t('authForm.signIn')}
          </Button>
        </Form.Item>
      </Form>

      <a onClick={openForgotPassModal} className={s.forgotPassBtn}>
        {t('authForm.forgotYourPassword')}
      </a>

      <Divider className={s.divider} />

      <SocialForm />
      {!authSession && (
        <ForgotPassModal
          setIsOpenForgotPassModal={setIsOpenForgotPassModal}
          isOpenForgotPassModal={isOpenForgotPassModal}
        />
      )}
    </>
  )
}

export default SignInForm
