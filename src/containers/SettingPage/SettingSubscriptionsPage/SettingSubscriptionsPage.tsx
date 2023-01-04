/* eslint-disable react/no-array-index-key */
import React, { ReactElement, useState } from 'react'
import DefaultLayout from 'layouts/DefaultLayout'
import { BasicLinkType } from 'globalTypes/link'
import Headline from 'components/Headline'
import clsx from 'clsx'
import { useTranslation } from 'react-i18next'
import SettingContainer from '../components/SettingContainer'
import GoBackLink from '../components/GoBackLink'
import s from './SettingSubscriptionsPage.module.scss'
import SwitchNotification from './components/SwitchNotification'
import SaveSearches from './components/SaveSearches'
import SaveHomes from './components/SaveHomes'
import YourHome from './components/YourHome'
import PropertyRecommendations from './components/PropertyRecommendations'
import HomeLoansRefinancing from './components/HomeLoansRefinancing'
import RentalPropertyManagement from './components/RentalPropertyManagement'
import News from './components/News'
import { SettingSubscription } from './types'

const SETTING_SUBSCRIPTIONS: SettingSubscription[] = [
  {
    headline: 'savedSearches',
    component: <SaveSearches />,
  },
  {
    headline: 'savedHomes',
    component: <SaveHomes />,
  },
  {
    headline: 'yourHome',
    component: <YourHome />,
  },
  {
    headline: 'propertyRecommendations',
    component: <PropertyRecommendations />,
  },
  {
    headline: 'homeLoansRefinancing',
    component: <HomeLoansRefinancing />,
  },
  {
    headline: 'rentalPropertyManagement',
    component: <RentalPropertyManagement />,
  },
  {
    headline: 'zillowNews',
    component: <News />,
  },
]

const SettingSubscriptionsPage = () => {
  const { t } = useTranslation('settingSubscriptionsPage')

  const [isShowSettingNotifications, setIsShowSettingNotifications] = useState<boolean>(false)

  return (
    <SettingContainer>
      <GoBackLink
        backLink={
          {
            url: '/settings',
            label: t('backToAccountSetting'),
          } as BasicLinkType
        }
      />

      <Headline className={s.title}>{t('notifications')}</Headline>

      <section
        className={clsx({
          [s.settingSection]: true,
          [s.active]: isShowSettingNotifications,
        })}
      >
        <div className={s.settingSectionItem}>
          <SwitchNotification setIsShowSettingNotifications={setIsShowSettingNotifications} />
        </div>

        {SETTING_SUBSCRIPTIONS.map((item, index) => (
          <div key={`setting-subscription-${index}`} className={s.settingSectionItem}>
            {/* @ts-ignore */}
            <Headline level={4}>{t(`${item.headline}`)}</Headline>
            {item.component}
          </div>
        ))}
      </section>
    </SettingContainer>
  )
}

SettingSubscriptionsPage.getLayout = function getLayout(page: ReactElement) {
  return <DefaultLayout>{page}</DefaultLayout>
}

export default SettingSubscriptionsPage
