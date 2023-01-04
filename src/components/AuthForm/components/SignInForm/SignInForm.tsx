/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, FormEventHandler } from 'react'
import { Form, Button, Divider } from 'antd'
import { useTranslation } from 'react-i18next'
import Input from 'components/Input'
import { useAppDispatch, useAppSelector } from 'store'
import { updateIsVisibleAuthModal } from 'globalSlices/authSlice'
import s from '../../AuthForm.module.scss'
import SocialForm from '../SocialForm'
import ForgotPassModal from '../ForgotPassModal'

const SignInForm = () => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const [isOpenForgotPassModal, setIsOpenForgotPassModal] = useState<boolean>(false)
  const authSession = useAppSelector(({ authSlice }) => authSlice.session)

  const submit = (e: FormEventHandler) => {
    console.log(e)
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
          ]}
        >
          <Input />
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
          ]}
        >
          <Input type="password" />
        </Form.Item>

        {/* Btn signIn */}
        <Form.Item
          wrapperCol={{
            offset: 0,
            span: 24,
          }}
        >
          <Button type="primary" htmlType="submit">
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
