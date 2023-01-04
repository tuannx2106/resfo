/* eslint-disable react/no-array-index-key */
import React, { ReactElement, useState } from 'react'
import MapLayout from 'layouts/MapLayout'
import { Tabs } from 'antd'
import { Property } from 'globalTypes/property'
import { testProperty } from 'containers/PropertyDetailPage/helpers'
import PropertyItem from 'components/PropertyItem'
import AppPagination from 'components/Pagination/Pagination'
import Headline from 'components/Headline'
import clsx from 'clsx'
import { useGetPropertiesQuery } from 'store/appAPIs'
import SearchSection from './components/SearchSection'
import SortSelection from './components/SortSelection'
import MapModeSwitcher from './components/MapModeSwitcher'
import s from './PropertyListPage.module.scss'
import MapSection from './components/MapSection'

const propertyItems: Property[] = []
for (let i = 0; i < 20; i++) {
  propertyItems.push({
    ...testProperty,
    id: i + 1,
  })
}

const PropertyListPage = () => {
  const { data, isFetching, error } = useGetPropertiesQuery({
    $$JSON: JSON.stringify({
      pagination: {
        skip: 0,
        limit: 100,
      },
      query: { posted_date: [0, 2558755098316] },
      sort: {
        name: 'price',
        order: 'desc',
      },
      filter: {},
    }),
  })
  console.log(isFetching, data, error)
  const [isOnMapMode, setIsOnMapMode] = useState<boolean>(false)

  return (
    <div
      className={clsx({
        [s.main]: true,
        [s.isMapMode]: isOnMapMode,
      })}
    >
      <SearchSection />

      <div className={s.mainBody}>
        <section className={s.mapSection}>
          <MapSection zoom={14} />
        </section>

        <section className={s.propertySection}>
          <Headline level={3} className={s.title}>
            Houston TX Real Estate & Homes For Sale
          </Headline>
          <Tabs
            tabBarExtraContent={{
              right: <SortSelection />,
            }}
            className={s.tabs}
          >
            <Tabs.TabPane
              tab={
                <p className={s.tabLabel}>
                  <span>1,475</span> Agent listings
                </p>
              }
              key="1"
            >
              <div className={s.propertyItems}>
                {propertyItems.map((item, index) => (
                  <PropertyItem key={index} className={s.propertyItem} item={item} />
                ))}
              </div>
            </Tabs.TabPane>

            <Tabs.TabPane
              tab={
                <p className={s.tabLabel}>
                  <span>1,275</span> Other listings
                </p>
              }
              key="2"
            >
              <div className={s.propertyItems}>
                {propertyItems.map((item, index) => (
                  <PropertyItem key={index} className={s.propertyItem} item={item} />
                ))}
              </div>
            </Tabs.TabPane>
          </Tabs>

          <AppPagination total={70} className={s.pagination} />
        </section>
      </div>

      <MapModeSwitcher
        isMapMode={isOnMapMode}
        onClickList={() => setIsOnMapMode(false)}
        onClickMap={() => setIsOnMapMode(true)}
        onClickSort={() => ({})}
      />
    </div>
  )
}

PropertyListPage.getLayout = function getLayout(page: ReactElement) {
  return <MapLayout>{page}</MapLayout>
}

export default PropertyListPage
