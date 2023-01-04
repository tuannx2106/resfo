import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Select, Tabs } from 'antd'
import clsx from 'clsx'
import Gmap from 'components/Gmap'
import { useTranslation } from 'next-i18next'
import React, { useEffect, useState } from 'react'
import s from './SchoolTab.module.scss'

const SchoolTab = () => {
  const { t } = useTranslation('propertyDetailPage')
  const [mapInstance, setMapInstance] = useState<google.maps.Map | null>(null)
  const [isCollapse, setIsCollapse] = useState<boolean>(false)

  useEffect(() => {
    if (!mapInstance) return

    mapInstance.setOptions({
      zoomControlOptions: {
        position: google.maps?.ControlPosition.LEFT_BOTTOM,
      },
    })

    // eslint-disable-next-line no-new
    new google.maps.Marker({
      position: {
        lat: 10.791489757811465,
        lng: 106.65321350097656,
      },
      icon: '/img/icon/icon_house-map-marker.svg',
      map: mapInstance,
    })
  }, [mapInstance])

  return (
    <div
      className={clsx({
        [s.root]: true,
        [s.isCollapse]: isCollapse,
      })}
    >
      <div className={s.mapSection}>
        <Gmap
          mapStyle={{
            width: '100%',
            height: '100%',
            position: 'absolute',
          }}
          mapOptions={{
            zoom: 16,
            center: {
              lat: 10.791489757811465,
              lng: 106.65321350097656,
            },
            fullscreenControl: false,
            streetViewControl: false,
            maxZoom: 20,
            minZoom: 4,
            gestureHandling: 'greedy',
          }}
          onInit={setMapInstance}
        />
      </div>

      <div className={s.sidebarCard}>
        <div className={s.cardHeader}>
          <h3>{t('tabName.school')}</h3>
          <FontAwesomeIcon
            className={s.btnCollapse}
            icon={isCollapse ? faChevronUp : faChevronDown}
            onClick={() => setIsCollapse((prevState) => !prevState)}
          />
        </div>

        <Select className={s.cardSelect} defaultValue="1">
          <Select.Option value="1">Assigned</Select.Option>
          <Select.Option value="2">Public</Select.Option>
          <Select.Option value="3">Private</Select.Option>
          <Select.Option value="4">Charter</Select.Option>
          <Select.Option value="5">All Types</Select.Option>
        </Select>

        <Tabs className={s.cardTab} size="small" defaultActiveKey="1">
          <Tabs.TabPane tab={t('schoolTab.elementary')} key="1" />
          <Tabs.TabPane tab={t('schoolTab.middle')} key="2" />
          <Tabs.TabPane tab={t('schoolTab.high')} key="3" />
          <Tabs.TabPane tab={t('schoolTab.allGrades')} key="4" />
        </Tabs>

        <p className={s.note}>{t('schoolTab.checkApplicableSchool')}</p>

        <div className={s.schoolList}>
          <div className={s.schoolItem}>
            <div className={s.schoolRating}>
              <b>3</b>/5
            </div>
            <div>
              <a href="#susanSchool">
                <div className={s.schoolName}>Susan B Anthony Middle School</div>
              </a>
              <p className={s.schoolInfo}>Grades: PK, 6-8 Distance: 2.4 mi</p>
            </div>
          </div>

          {Array(10)
            .fill(0)
            .map((_, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <div key={index} className={s.schoolItem}>
                <div className={s.schoolRating}>
                  <b>4</b>/5
                </div>
                <div>
                  <a href="#susanSchool">
                    <div className={s.schoolName}>Manhattan High School West/East Campus</div>
                  </a>
                  <p className={s.schoolInfo}>Grades: 9-12 Distance: 1.6 mi</p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}

export default SchoolTab
