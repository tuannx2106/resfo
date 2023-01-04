import React, { ReactElement } from 'react'
import DefaultLayout from 'layouts/DefaultLayout'
import { useTranslation } from 'react-i18next'
import GoBackLink from 'containers/SettingPage/components/GoBackLink'
import { BasicLinkType } from 'globalTypes/link'
import Headline from 'components/Headline'
import s from './SettingProfilePage.module.scss'
import SettingPersonalInfo from './components/SettingPersonalInfo'
import SettingSecurityInfo from './components/SettingSecurityInfo'
import ManageAccountInfo from './components/ManageAccountInfo'
import SettingContainer from '../components/SettingContainer'

const SettingProfilePage = () => {
  const { t } = useTranslation('settingProfilePage')

  return (
    <SettingContainer>
      <GoBackLink
        backLink={
          {
            url: '/settings',
            label: t('accountSetting'),
          } as BasicLinkType
        }
      />

      <Headline className={s.title}>{t('title')}</Headline>

      <section className={s.settingSection}>
        <div className={s.settingSectionItem}>
          <Headline level={4}>{t('personalInfo.title')}</Headline>
          <SettingPersonalInfo />
        </div>

        <div className={s.settingSectionItem}>
          <Headline level={4}>{t('security.title')}</Headline>
          <SettingSecurityInfo />
        </div>

        <div className={s.settingSectionItem}>
          <Headline level={4}>{t('manageAccount.title')}</Headline>
          <ManageAccountInfo />
        </div>
      </section>
    </SettingContainer>
  )
}

SettingProfilePage.getLayout = function getLayout(page: ReactElement) {
  return <DefaultLayout>{page}</DefaultLayout>
}

export default SettingProfilePage
