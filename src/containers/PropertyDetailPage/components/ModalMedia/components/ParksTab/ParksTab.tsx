import { faChevronDown, faChevronUp, faTree } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Tabs } from 'antd'
import clsx from 'clsx'
import Gmap from 'components/Gmap'
import { useTranslation } from 'next-i18next'
import React, { useEffect, useState } from 'react'
import s from './ParksTab.module.scss'

const ParksTab = () => {
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
          <h3>{t('tabName.parksOutdoors')}</h3>
          <FontAwesomeIcon
            className={s.btnCollapse}
            icon={isCollapse ? faChevronUp : faChevronDown}
            onClick={() => setIsCollapse((prevState) => !prevState)}
          />
        </div>

        <Tabs className={s.cardTab} size="small" defaultActiveKey="1">
          <Tabs.TabPane tab={t('parkTab.parks')} key="1" />
          <Tabs.TabPane tab={t('parkTab.dogParks')} key="2" />
        </Tabs>

        <p className={s.note}>{t('parkTab.placeToStay')}</p>

        <div className={s.parkList}>
          <div className={s.parkItem}>
            <div className={s.parkIcon}>
              <FontAwesomeIcon icon={faTree} />
            </div>
            <div>
              <a href="#susanpark">
                <div className={s.parkName}>Susan B Anthony Middle park</div>
              </a>
              <p className={s.parkInfo}>Distance: 2.4 mi</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ParksTab
