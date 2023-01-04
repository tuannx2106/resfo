import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Tabs } from 'antd'
import clsx from 'clsx'
import Gmap from 'components/Gmap'
import { createPlaceMarkersLayer } from 'components/Gmap/customPlaceMarkerLayer'
import PlaceMapPopup from 'components/PlaceMapPopup'
import { addShops, resetShops } from 'containers/PropertyDetailPage/slice'
import { useTranslation } from 'next-i18next'
import React, { useEffect, useMemo, useState } from 'react'
import { useAppDispatch, useAppSelector } from 'store'
import RestaurantMarker from './components/RestaurantMarket'
import ShopMarker from './components/ShopMarker'
import s from './ShopTab.module.scss'

type FilterBy = 'store' | 'restaurant'

const ShopTab = () => {
  const { t } = useTranslation('propertyDetailPage')
  const [mapInstance, setMapInstance] = useState<google.maps.Map | null>(null)
  const [isCollapse, setIsCollapse] = useState<boolean>(false)
  const [filterBy, setFilterBy] = useState<FilterBy>('store')
  const dispatch = useAppDispatch()

  const restaurants = useAppSelector((state) => state.propertyDetailPage.shops)
  const propertyLocation = useAppSelector((state) => state.propertyDetailPage.propertyDetail?.location)

  const coordinates: google.maps.LatLngLiteral = useMemo(
    () => ({
      lat: propertyLocation?.lat || 0,
      lng: propertyLocation?.lon || 0,
    }),
    [propertyLocation],
  )

  useEffect(() => {
    if (!mapInstance) return

    dispatch(resetShops())
    const service = new google.maps.places.PlacesService(mapInstance)

    service.nearbySearch(
      {
        location: coordinates,
        radius: 500,
        keyword: 'store',
      },
      (result, status, pagination) => {
        if (!result || status !== google.maps.places.PlacesServiceStatus.OK) return
        dispatch(addShops(result))
        if (pagination?.hasNextPage) pagination.nextPage()
      },
    )

    mapInstance.setOptions({
      zoomControlOptions: {
        position: google.maps?.ControlPosition.LEFT_BOTTOM,
      },
    })

    // eslint-disable-next-line no-new
    new google.maps.Marker({
      position: coordinates,
      icon: '/img/icon/icon_house-map-marker.svg',
      map: mapInstance,
    })
  }, [mapInstance, filterBy, dispatch, coordinates])

  useEffect(() => {
    if (!mapInstance || !restaurants.length) return undefined

    const overviewLayer = createPlaceMarkersLayer({
      map: mapInstance,
      places: restaurants,
      markerComponent: filterBy === 'restaurant' ? <RestaurantMarker /> : <ShopMarker />,
      markerPopupComponent: <PlaceMapPopup />,
    })

    return () => {
      overviewLayer.setMap(null)
    }
  }, [filterBy, mapInstance, restaurants])

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
            center: coordinates,
            fullscreenControl: false,
            streetViewControl: false,
            maxZoom: 20,
            minZoom: 4,
            gestureHandling: 'greedy',
            styles: [
              {
                featureType: 'poi',
                stylers: [{ visibility: 'off' }],
              },
              {
                featureType: 'poi.park',
                elementType: 'geometry',
                stylers: [{ visibility: 'on' }],
              },
              {
                featureType: 'poi.school',
                elementType: 'all',
                stylers: [{ visibility: 'on' }],
              },
            ],
          }}
          onInit={setMapInstance}
        />
      </div>

      <div className={s.sidebarCard}>
        <div className={s.cardHeader}>
          <h3>Shop & Eat</h3>
          <FontAwesomeIcon
            className={s.btnCollapse}
            icon={isCollapse ? faChevronUp : faChevronDown}
            onClick={() => setIsCollapse((prevState) => !prevState)}
          />
        </div>

        <Tabs
          className={s.cardTab}
          size="small"
          defaultActiveKey="1"
          onChange={(key) => {
            setFilterBy(key as FilterBy)
          }}
        >
          <Tabs.TabPane tab="Shop" key="store" />
          <Tabs.TabPane tab="Restaurant" key="restaurant" />
        </Tabs>

        {/* <p className={s.note}>{t('schoolTab.checkApplicableSchool')}</p> */}

        <div className={s.schoolList}>
          {restaurants.map((shop) => {
            const distanceInMeters = google.maps.geometry.spherical.computeDistanceBetween(
              new google.maps.LatLng(coordinates),
              // @ts-ignore
              shop.geometry.location,
            )
            const distanceInKm = (distanceInMeters / 1000).toFixed(2)

            return (
              <div key={shop.place_id} className={s.schoolItem}>
                <div className={s.schoolRating}>
                  {shop.rating ? (
                    <>
                      <b>{shop.rating}</b>/5
                    </>
                  ) : (
                    <b>NaN</b>
                  )}
                </div>
                <div>
                  <a href="#susanSchool">
                    <div className={s.schoolName}>{shop.name}</div>
                  </a>
                  <p className={s.schoolInfo}>Distance: {distanceInKm}km</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default ShopTab
