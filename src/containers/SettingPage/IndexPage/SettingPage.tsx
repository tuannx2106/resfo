/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/no-array-index-key */
import React, { ReactElement } from 'react'
import DefaultLayout from 'layouts/DefaultLayout'
import SettingMenu from 'components/SettingMenu'
import { useTranslation } from 'react-i18next'
import { RightOutlined } from '@ant-design/icons'
import Image from 'next/image'
import { useRouter } from 'next/router'
import Headline from 'components/Headline'
import s from './SettingPage.module.scss'
import { AccountSettingLinks } from '../constants'

const SettingPage = () => {
  const { t } = useTranslation()
  const router = useRouter()

  return (
    <main className={s.main}>
      <div className={s.mainContent}>
        {/* @ts-ignore */}
        <Headline className={s.title}>{t('settingPage:title')}</Headline>
        {AccountSettingLinks.map((item, index) => (
          <div key={`setting-link-${index}`} className={s.settingLink} onClick={() => router.push(item.url)}>
            <div className={s.settingLinkBody}>
              <div className={s.settingLinkMedia}>
                <Image width={44} height={44} src={`/img/icon/${item.icon}.svg`} />
              </div>

              <div className={s.settingLinkText}>
                {/* @ts-ignore */}
                <h3 className={s.settingLinkTitle}>{t(`settingPage:menu.${item.title}`)}</h3>
                {/* @ts-ignore */}
                <p className={s.settingLinkLabel}>{t(`settingPage:menu.${item.label}`)}</p>
              </div>
            </div>

            <RightOutlined />
          </div>
        ))}
      </div>
    </main>
  )
}

SettingPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <DefaultLayout>
      <SettingMenu />
      {page}
    </DefaultLayout>
  )
}

export default SettingPage
