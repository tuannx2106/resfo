/* eslint-disable react/no-array-index-key */
import React, { FormEventHandler, useState } from 'react'
import { Form } from 'antd'
import Input from 'components/Input'
import Button from 'components/Button'
import { useTranslation } from 'react-i18next'
import { SettingItemType } from 'containers/SettingPage/types'
import SettingModal from 'components/SettingModal'
import SettingItem from 'containers/SettingPage/components/SettingItem'

const EditEmail = () => {
  const { t } = useTranslation('settingProfilePage')
  const [isVisibleModal, setIsVisibleModal] = useState<boolean>(false)
  const submit = (e: FormEventHandler) => {
    console.log(e)
  }

  return (
    <>
      <div className="settingItemAction">
        <p className="settingItemActionValue">abc@abc.com</p>
        <Button type="link" onClick={() => setIsVisibleModal(true)} className="settingItemActionLink">
          {t('edit')}
        </Button>
      </div>

      <SettingModal visible={isVisibleModal} onCancel={() => setIsVisibleModal(false)} title="Edit email">
        <p>
          {t('security.editEmail.currentEmail', {
            email: '<b>abc@abc.com</b>',
            interpolation: {
              escapeValue: false,
            },
          })}
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
  const { t } = useTranslation('settingProfilePage')
  const [isVisibleModal, setIsVisibleModal] = useState<boolean>(false)
  const submit = (e: FormEventHandler) => {
    console.log(e)
  }

  return (
    <>
      <div className="settingItemAction">
        <Button size="large" onClick={() => setIsVisibleModal(true)} className="settingItemActionButton">
          {t('security.editPassword.changePassword')}
        </Button>
      </div>

      <SettingModal
        visible={isVisibleModal}
        onCancel={() => setIsVisibleModal(false)}
        title={t('security.editPassword.modalTitle')}
      >
        <Form layout="vertical" onFinish={submit}>
          <Form.Item
            label={t('security.editPassword.currentPassword')}
            name="currentPassword"
            extra={t('security.editPassword.currentPasswordHint')}
          >
            <Input />
          </Form.Item>

          <Form.Item label={t('security.editPassword.newPassword')} name="newPassword">
            <Input />

            <div className="validator-text">
              <p className="ant-form-item-extra">{t('security.editPassword.passwordRule1')}</p>
              <p className="ant-form-item-extra">{t('security.editPassword.passwordRule2')}</p>
              <p className="ant-form-item-extra">{t('security.editPassword.passwordRule3')}</p>
              <p className="ant-form-item-extra">{t('security.editPassword.passwordRule4')}</p>
            </div>
          </Form.Item>

          <Form.Item label={t('security.editPassword.confirmPassword')} name="confirmPassword">
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
    {
      title: t('security.ggSignIn.title'),
      label: t('security.ggSignIn.desc'),
      action: UnlinkAccount,
    },
  ]

  return (
    <div>
      {SETTING_SECURITY_GROUP_ITEM.map((item, index) => (
        <SettingItem key={`setting-item-${index}`} item={item} />
      ))}
    </div>
  )
}

export default SettingSecurityInfo
