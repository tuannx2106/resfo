/* eslint-disable react/no-array-index-key */
import React, { FormEventHandler, useMemo, useState } from 'react'
import { Form, notification, Progress } from 'antd'
import Input from 'components/Input'
import Button from 'components/Button'
import { useTranslation } from 'react-i18next'
import { SettingItemType } from 'containers/SettingPage/types'
import SettingModal from 'components/SettingModal'
import SettingItem from 'containers/SettingPage/components/SettingItem'
import { DefaultSession } from 'store/slice/authSlice'
import { useAppSelector } from 'store'
import { debounce as _debounce } from 'lodash'
import { checkError } from 'helpers/passwordStrong'
import { CHECK_PASSWORD_TIME_DELAY, VALIDATE_PASSWORD } from 'globalConstants/auth'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import clsx from 'clsx'
import { faCheck, faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import { useChangePasswordMutation } from 'store/appAPIs'
import { useRouter } from 'next/router'
import s from './SettingSecurityInfo.module.scss'

const EditEmail = () => {
  const { t } = useTranslation('settingProfilePage')
  const [isVisibleModal, setIsVisibleModal] = useState<boolean>(false)
  const authSession = useAppSelector(({ authSlice }) => authSlice.session as DefaultSession)
  const submit = (e: FormEventHandler) => {
    console.log(e)
  }

  return (
    <>
      <div className="settingItemAction">
        <p className="settingItemActionValue">{authSession?.email}</p>
        <Button type="link" onClick={() => setIsVisibleModal(true)} className="settingItemActionLink">
          {t('edit')}
        </Button>
      </div>

      <SettingModal visible={isVisibleModal} onCancel={() => setIsVisibleModal(false)} title="Edit email">
        <p>
          {t('security.editEmail.currentEmail')} <b style={{ fontWeight: 700 }}>{authSession?.email}</b>
        </p>

        <Form layout="vertical" onFinish={submit}>
          <Form.Item label={t('security.editEmail.newEmail')} name="newEmail">
            <Input />
          </Form.Item>

          <Form.Item label={t('security.editEmail.confirmEmail')} name="confirmEmail">
            <Input />
          </Form.Item>

          <Form.Item className="setting-modal-buttons">
            <Button type="default" onClick={() => setIsVisibleModal(false)}>
              {t('modal.cancel')}
            </Button>
            <Button type="primary" htmlType="submit">
              {t('modal.apply')}
            </Button>
          </Form.Item>
        </Form>
      </SettingModal>
    </>
  )
}

const EditPassword = () => {
  const { t } = useTranslation(['settingProfilePage', 'common'])
  const [isVisibleModal, setIsVisibleModal] = useState<boolean>(false)
  const [changePassword] = useChangePasswordMutation()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const router = useRouter()

  const [passwordStrong, setPasswordStrong] = useState<Record<string, boolean>>({
    min: false,
    lower: false,
    upper: false,
    number: false,
    special: false,
  })

  const [form] = Form.useForm()

  const onChangePassword = (e: { target: { value: string } }) => setPasswordStrong(checkError(e.target.value))
  const percentPasswordStrong = useMemo(
    () => (Object.values(passwordStrong).filter((item) => item).length * 100) / 5,
    [passwordStrong],
  )

  const submit = async (e: FormEventHandler) => {
    if (Object.values(passwordStrong).includes(false)) return
    setIsLoading(true)

    try {
      await changePassword({ ...e }).unwrap()
      router.replace('/auth/sign-in')
    } catch {
      notification.error({
        message: 'Notification',
        description: 'Have some error, please reload again.',
        duration: 5,
      })
    } finally {
      setIsLoading(false)
      setIsVisibleModal(false)
    }
  }

  return (
    <>
      <div className="settingItemAction">
        <Button size="large" onClick={() => setIsVisibleModal(true)} className="settingItemActionButton">
          {/* @ts-ignore */}
          {t('security.editPassword.changePassword')}
        </Button>
      </div>

      <SettingModal
        visible={isVisibleModal}
        onCancel={() => setIsVisibleModal(false)}
        // @ts-ignore
        title={t('security.editPassword.modalTitle')}
      >
        <Form layout="vertical" onFinish={submit} form={form}>
          {/* <Form.Item
            // @ts-ignore
            label={t('security.editPassword.currentPassword')}
            name="currentPassword"
            // @ts-ignore
            extra={t('security.editPassword.currentPasswordHint')}
          >
            <Input />
          </Form.Item> */}

          {/* Password */}
          <div className={s.passwordInput}>
            {/* @ts-ignore */}
            <Form.Item label={t('security.editPassword.newPassword')} name="password">
              <Input type="password" maxLength={12} onChange={_debounce(onChangePassword, CHECK_PASSWORD_TIME_DELAY)} />
            </Form.Item>
            <div className={s.progressPassword}>
              {/* @ts-ignore */}
              <p>{percentPasswordStrong === 100 ? t('common:form.good') : t('common:form.weak')}</p>
              <Progress
                type="circle"
                percent={percentPasswordStrong}
                status={percentPasswordStrong === 100 ? 'success' : 'exception'}
                width={24}
              />
            </div>
          </div>
          {/* Explain check passW */}
          <div className={s.explainWrapper}>
            {VALIDATE_PASSWORD.map((item, index) => (
              <p className={s.explainText} key={`validate-pass-${index}`}>
                <FontAwesomeIcon
                  className={clsx({
                    [s.checkIcon]: passwordStrong[item.type],
                    [s.wrongIcon]: !passwordStrong[item.type],
                  })}
                  icon={passwordStrong[item.type] ? faCheck : faTimesCircle}
                />
                {/* @ts-ignore */}
                {t(`common:form.${item.label}`)}
              </p>
            ))}
          </div>

          <Form.Item
            // @ts-ignore
            label={t('security.editPassword.confirmPassword')}
            name="rePassword"
            dependencies={['password']}
            hasFeedback
            required={false}
            rules={[
              {
                required: true,
                message: 'Please confirm your password!',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve()
                  }
                  return Promise.reject(new Error('The two passwords that you entered do not match!'))
                },
              }),
            ]}
          >
            <Input type="password" />
          </Form.Item>

          <Form.Item className="setting-modal-buttons">
            <Button type="default" onClick={() => setIsVisibleModal(false)}>
              {/* @ts-ignore */}
              {t('modal.cancel')}
            </Button>

            <Button loading={isLoading} type="primary" htmlType="submit">
              {/* @ts-ignore */}
              {t('modal.apply')}
            </Button>
          </Form.Item>
        </Form>
      </SettingModal>
    </>
  )
}

const EnableTwoFA = () => {
  const { t } = useTranslation('settingProfilePage')
  const [isVisibleModal, setIsVisibleModal] = useState<boolean>(false)
  const submit = (e: FormEventHandler) => {
    console.log(e)
  }

  return (
    <>
      <div className="settingItemAction">
        <Button size="large" onClick={() => setIsVisibleModal(true)} className="settingItemActionButton">
          {t('security.fa.enable')}
        </Button>
      </div>

      <SettingModal
        visible={isVisibleModal}
        onCancel={() => setIsVisibleModal(false)}
        title={t('security.fa.modalTitle')}
      >
        <p className="setting-modal-title">
          {t('security.fa.formDesc', {
            tag: '<br />',
            interpolation: {
              useRawValueToEscape: true,
            },
          })}
        </p>

        <Form layout="vertical" onFinish={submit} className="single">
          <Form.Item label={t('security.fa.phoneNumber')} name="phoneNumber">
            <Input />
          </Form.Item>

          <Form.Item className="setting-modal-buttons">
            <Button type="default" onClick={() => setIsVisibleModal(false)}>
              {t('modal.cancel')}
            </Button>
            <Button type="primary" htmlType="submit">
              {t('modal.apply')}
            </Button>
          </Form.Item>
        </Form>
      </SettingModal>
    </>
  )
}

const UnlinkAccount = () => {
  const { t } = useTranslation('settingProfilePage')
  const [isVisibleModal, setIsVisibleModal] = useState<boolean>(false)
  const submit = (e: FormEventHandler) => {
    console.log(e)
  }

  return (
    <>
      <div className="settingItemAction">
        <Button size="large" onClick={() => setIsVisibleModal(true)} className="settingItemActionButton">
          {t('security.ggSignIn.unLink')}
        </Button>
      </div>

      <SettingModal
        visible={isVisibleModal}
        onCancel={() => setIsVisibleModal(false)}
        title={t('security.ggSignIn.modalTitle')}
      >
        <p className="setting-modal-title">{t('security.ggSignIn.formDesc')}</p>

        <Form layout="vertical" onFinish={submit} className="single">
          <Form.Item className="setting-modal-buttons">
            <Button type="default" onClick={() => setIsVisibleModal(false)}>
              {t('modal.cancel')}
            </Button>
            <Button htmlType="submit">{t('security.ggSignIn.unLink')}</Button>
          </Form.Item>
        </Form>
      </SettingModal>
    </>
  )
}

const SettingSecurityInfo = () => {
  const { t } = useTranslation('settingProfilePage')
  const authSession = useAppSelector(({ authSlice }) => authSlice.session as DefaultSession)

  const SETTING_SECURITY_GROUP_ITEM: SettingItemType[] = [
    {
      title: t('security.editEmail.title'),
      label: t('security.editEmail.desc'),
      action: EditEmail,
    },
    {
      title: t('security.editPassword.title'),
      label: t('security.editPassword.desc'),
      action: EditPassword,
    },
    {
      title: t('security.fa.title'),
      label: t('security.fa.desc'),
      action: EnableTwoFA,
    },
  ]

  return (
    <div>
      {SETTING_SECURITY_GROUP_ITEM.map((item, index) => (
        <SettingItem key={`setting-item-${index}`} item={item} />
      ))}
      {authSession?.type === 'oauth' && (
        <>
          <SettingItem
            item={{
              // @ts-ignore
              title: t('security.fbSignIn.title'),
              // @ts-ignore
              label: t('security.fbSignIn.desc'),
              action: UnlinkAccount,
              key: 'fbSignIn',
            }}
          />
          <SettingItem
            item={{
              title: t('security.ggSignIn.title'),
              label: `${t('security.ggSignIn.desc', { email: authSession?.email })}`,
              action: UnlinkAccount,
              key: 'ggSignIn',
            }}
          />
        </>
      )}
    </div>
  )
}

export default SettingSecurityInfo
