/* eslint-disable react/no-array-index-key */
import React, { FormEventHandler } from 'react'
import Button from 'components/Button'
import { useTranslation } from 'react-i18next'
import SettingItem from 'containers/SettingPage/components/SettingItem'
import { SettingItemType } from 'containers/SettingPage/types'

const DeactivateAccount = () => {
  const { t } = useTranslation('settingProfilePage')
  const submit = (e: FormEventHandler) => {
    console.log(e)
  }

  return (
    <div className="settingItemAction">
      <Button type="link" onClick={() => submit} className="settingItemActionLink">
        {t('manageAccount.deactivate.deactivateBtn')}
      </Button>
    </div>
  )
}

const PrivacyAndCookies = () => {
  const { t } = useTranslation('settingProfilePage')
  const submit = (e: FormEventHandler) => {
    console.log(e)
  }

  return (
    <div className="settingItemAction">
      <Button type="link" onClick={() => submit} className="settingItemActionLink">
        {t('manageAccount.privacy.privacyLink')}
      </Button>
    </div>
  )
}

const ManageAccountInfo = () => {
  const { t } = useTranslation('settingProfilePage')

  const SETTING_MANAGE_ACCOUNT_GROUP_ITEM: SettingItemType[] = [
    {
      title: t('manageAccount.deactivate.title'),
      label: t('manageAccount.deactivate.desc'),
      action: DeactivateAccount,
    },
    {
      title: t('manageAccount.privacy.title'),
      label: t('manageAccount.privacy.desc'),
      action: PrivacyAndCookies,
    },
  ]

  return (
    <>
      {SETTING_MANAGE_ACCOUNT_GROUP_ITEM.map((item, index) => (
        <SettingItem key={`setting-item-${index}`} item={item} />
      ))}
    </>
  )
}

export default ManageAccountInfo
