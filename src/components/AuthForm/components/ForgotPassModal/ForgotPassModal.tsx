/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react'
import { Modal, Form, Button } from 'antd'
import { useTranslation } from 'react-i18next'
import { ForgotPasswordFormType } from 'globalTypes/auth'
import Input from 'components/Input'
import { useAppDispatch } from 'store'
import { updateIsVisibleAuthModal } from 'globalSlices/authSlice'
import clsx from 'clsx'
import s from '../../AuthForm.module.scss'

type ForgotPassModalProps = {
  isOpenForgotPassModal: boolean
  setIsOpenForgotPassModal: (val: boolean) => void
}

const ForgotPassModal = ({ setIsOpenForgotPassModal, isOpenForgotPassModal }: ForgotPassModalProps) => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()

  const [isSentEmail, setIsSentEmail] = useState<boolean>(false)
  const [param, setParam] = useState<ForgotPasswordFormType>({
    email: '',
  })

  const submit = (value: ForgotPasswordFormType) => {
    setParam(value)
    setIsSentEmail(true)
  }

  const backToSignInModal = () => {
    setIsOpenForgotPassModal(false)
    setIsSentEmail(false)
    dispatch(updateIsVisibleAuthModal(true))
  }

  const closeModal = () => {
    setIsOpenForgotPassModal(false)
    setIsSentEmail(false)
  }

  return (
    <Modal
      wrapClassName={clsx({
        [s.authModal]: true,
        [s.auth]: true,
      })}
      onCancel={closeModal}
      visible={isOpenForgotPassModal}
      footer={null}
      centered
    >
      <h2 className={s.authTitle}>{isSentEmail ? t('authForm.requestReceived') : t('authForm.forgotYourPassword')}</h2>
      <p className={s.subModalTitle}>
        {isSentEmail ? t('authForm.emailHasBeenSent') : t('authForm.forgotPassWordSubTitle')}
      </p>

      {isSentEmail ? (
        <p className={s.subModalTitle}>
          {t('authForm.emailSentTo')}
          <strong> ${param.email}</strong>
        </p>
      ) : (
        <Form
          name="basic"
          layout="vertical"
          labelCol={{ span: 8 }}
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
                message: t('form.errorType', { name: 'E-mail' }),
              },
              {
                required: true,
                message: t('form.errorRequired', { name: 'E-mail' }),
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 0,
              span: 24,
            }}
          >
            <Button type="primary" htmlType="submit">
              {t('form.send')}
            </Button>
          </Form.Item>
        </Form>
      )}

      <p className={s.subModalTitle}>
        Know your password?{' '}
        <a onClick={backToSignInModal} className={s.backSignInBtn}>
          {t('authForm.signIn')}
        </a>
      </p>
    </Modal>
  )
}

export default ForgotPassModal
