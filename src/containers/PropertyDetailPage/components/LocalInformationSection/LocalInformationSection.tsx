import { Space } from 'antd'
import Button from 'components/Button'
import Gmap from 'components/Gmap'
import { convertToDMS } from 'helpers/utilities'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

import s from './LocalInformationSection.module.scss'

type LocalInformationSectionProps = {
  onClickButton: () => void
  onClickMap: () => void
}

const LocalInformationSection = ({ onClickButton, onClickMap }: LocalInformationSectionProps) => {
  const { t } = useTranslation('propertyDetailPage')

  const [mapInstance, setMapInstance] = useState<google.maps.Map | undefined>()

  useEffect(() => {
    if (!mapInstance) return

    const latlngTest = new google.maps.LatLng({
      lat: 10.791489757811465,
      lng: 106.65321350097656,
    })

    // eslint-disable-next-line no-new
    new google.maps.Marker({
      position: latlngTest.toJSON(),
      icon: '/img/icon/icon_house-map-marker.svg',
      map: mapInstance,
    })
  }, [mapInstance])

  return (
    <div className={s.root}>
      <Space style={{ marginBottom: 16 }}>
        <Button onClick={onClickButton}>{t('tabName.school')}</Button>
        <Button onClick={onClickButton}>{t('tabName.parksOutdoors')}</Button>
      </Space>
      <div className={s.map} onClick={onClickMap} role="presentation">
        <div className={s.viewOnGmap} onClick={(e) => e.stopPropagation()} role="presentation">
          <p>{convertToDMS(10.791489757811465, 106.65321350097656)}</p>
          <Link href="https://www.google.com/maps/search/?api=1&query=10.791489757811465,106.65321350097656">
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a target="_blank">{t('viewOnLargerMap')}</a>
          </Link>
        </div>
        <Gmap
          mapStyle={{
            width: '100%',
            height: 200,
            borderRadius: 8,
          }}
          mapOptions={{
            zoom: 16,
            center: {
              lat: 10.791489757811465,
              lng: 106.65321350097656,
            },
            disableDefaultUI: true,
            clickableIcons: false,
            maxZoom: 20,
            minZoom: 4,
            gestureHandling: 'none',
          }}
          onInit={setMapInstance}
        />
      </div>
    </div>
  )
}
export default LocalInformationSection
