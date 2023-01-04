/* eslint-disable react/no-array-index-key */
import React, { ReactElement } from 'react'
import DefaultLayout from 'layouts/DefaultLayout'
import SettingMenu from 'components/SettingMenu'
import Headline from 'components/Headline'
import { faSearchLocation } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Button from 'components/Button'
import { useTranslation } from 'react-i18next'
import router from 'next/router'
import s from './SavedSearchesPage.module.scss'
import SavedSearchItem from './components/SavedSearchItem'
import SavedSearchEmptyState from './components/SavedSearchEmptyState'

const dummyDataSavedSearch: any = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

const SavedSearchesPage = () => {
  const { t } = useTranslation('savedSearchesPage')

  return (
    <main className={s.main}>
      <div className={s.mainContent}>
        <div className={s.mainContentTitle}>
          {/* @ts-ignore */}
          <Headline className={s.title}>{t('savedSearchesPage:title')}</Headline>
          <Button
            onClick={() => router.push('/property/list')}
            className={s.searchBtn}
            type="link"
            icon={<FontAwesomeIcon size="lg" icon={faSearchLocation} />}
          >
            {/* @ts-ignore */}
            {t('savedSearchesPage:newSearch')}
          </Button>
        </div>

        {dummyDataSavedSearch.length > 0 ? (
          dummyDataSavedSearch.map((item: any, index: any) => <SavedSearchItem key={`savedSearchItem-${index}`} />)
        ) : (
          <SavedSearchEmptyState />
        )}
      </div>
    </main>
  )
}

SavedSearchesPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <DefaultLayout>
      <SettingMenu />
      {page}
    </DefaultLayout>
  )
}

export default SavedSearchesPage
