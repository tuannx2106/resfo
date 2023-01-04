import React, { ReactElement } from 'react'
import DefaultLayout from 'layouts/DefaultLayout'
import SettingMenu from 'components/SettingMenu'
import Headline from 'components/Headline'
import AppPagination from 'components/Pagination/Pagination'
import { testProperty } from 'containers/PropertyDetailPage/helpers'
import { Property } from 'globalTypes/property'
import PropertyItem from 'components/PropertyItem'
import { useTranslation } from 'next-i18next'
import RemoveModal from './components/RemoveModal'
import SortSection from './components/SortSection'
import s from './SavedHomesPage.module.scss'

const propertyItems: Property[] = []
for (let i = 0; i < 10; i++) {
  propertyItems.push({
    ...testProperty,
    id: i + 1,
  })
}

const SavedHomesPage = () => {
  const { t } = useTranslation('savedHomePage')

  return (
    <main className={s.main}>
      <div className={s.mainContent}>
        <div className={s.headline}>
          <Headline level={1} className={s.title}>
            {t('mainTitle')}
          </Headline>
          <RemoveModal />
        </div>

        <SortSection />

        <div className={s.propertyItems}>
          {propertyItems.map((item, index) => (
            <PropertyItem className={s.propertyItem} item={item} extraInfo />
          ))}
        </div>

        <AppPagination total={70} className={s.pagination} />
      </div>
    </main>
  )
}

SavedHomesPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <DefaultLayout>
      <SettingMenu />
      {page}
    </DefaultLayout>
  )
}

export default SavedHomesPage
