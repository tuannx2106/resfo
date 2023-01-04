/* eslint-disable react/no-array-index-key */
import React from 'react'
import LocationSearch from 'components/LocationSearch'
import { SIZES } from 'components/LocationSearch/types'
import Link from 'next/link'
import Image from 'next/image'
import { useTranslation } from 'react-i18next'
import s from './SavedSearchEmptyState.module.scss'

const SavedSearchEmptyState = () => {
  const { t } = useTranslation('savedSearchesPage')

  return (
    <div className={s.savedSearchEmpty}>
      <div className={s.savedSearchEmptyImage}>
        <Image width={419} height={162} src="/img/icon/icon-saved-search.svg" />
      </div>

      {/* @ts-ignore */}
      <p className={s.savedSearchEmptyTitle}>{t('empty.title')}</p>
      {/* @ts-ignore */}
      <p>{t('empty.subTitle')}</p>

      <div className={s.locationSearch}>
        <LocationSearch size={SIZES.LARGE} />
      </div>

      <div className={s.savedSearchApp}>
        <div className={s.savedSearchAppIcon}>
          <Image width={44} height={44} src="/img/icon/icon-get-app.svg" />
        </div>

        <p>
          {/* @ts-ignore */}
          <b>{t('empty.takeVeelaWithYou')}</b> {t('empty.getAppSubscription')} {/* @ts-ignore */}
          <Link href="/">{t('empty.getTheVeelaApp')}</Link>
        </p>
      </div>
    </div>
  )
}

export default SavedSearchEmptyState
