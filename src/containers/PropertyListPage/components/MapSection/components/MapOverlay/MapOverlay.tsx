import { faChevronUp, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Dropdown, Radio, RadioChangeEvent, Space } from 'antd'
import clsx from 'clsx'
import { testData } from 'containers/PropertyListPage/components/MapSection/constant'
import { createFreehandDrawingLayer } from 'containers/PropertyListPage/components/MapSection/freehandDrawingLayer'
import { createHTMLMapMarker } from 'containers/PropertyListPage/components/MapSection/propertiesMarkerLayer'
import { Property } from 'globalTypes/property'
import React, { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Button from 'components/Button'
import ReactDOMServer from 'react-dom/server'
import Link from 'next/link'
import s from './MapOverlay.module.scss'

type MapOverlayProps = {
  map: google.maps.Map | undefined
}

const InfoWindowProperty = ({ property }: { property: Property }) => (
  <div className={s.infoWindowWrapper}>
    <p className={s.infoWindowtitle}>Nhà mới kiên cố, hẻm ôtô, Lạc Long Quân, P.8, Tân Bình, 4,7 tỷ</p>
    <div className={s.infoWindowContentArea}>
      <img
        src="https://file4.batdongsan.com.vn/crop/200x200/2021/10/15/20211015133152-4950_wm.jpg"
        className={s.infoWindowImg}
        alt={property.name}
      />
      <div className={s.infoWindowContent}>
        <p>
          <b>Price: </b>$541.1K
        </p>
        <p>
          <b>Area: </b>45 m²
        </p>
        <p>
          <b>Address: </b>Đường Lạc Long Quân, Phường 8, Tân Bình, Hồ Chí Minh
        </p>
      </div>
    </div>
    <Link href="property/can-ho-1">
      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
      <a className={s.infoWindowlink} target="_blank">
        See detail
      </a>
    </Link>
  </div>
)

const MapOverlay = ({ map }: MapOverlayProps) => {
  const { t } = useTranslation('propertyListPage')

  const [isOnDrawMode, setIsOnDrawMode] = useState(false)
  const [properties] = useState<Property[]>(testData)
  const [polygonRegions, setPolygonRegions] = useState<google.maps.Polygon[]>([])
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [markersLayer, setMarkersLayer] = useState<any>(null)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [drawingLayer, setDrawingLayer] = useState<any>(null)

  const [currentInfoWindowVisbile, setCurrentInfoWindowVisible] = useState<google.maps.InfoWindow[]>([])

  const onClickZoomIn = () => {
    if (!map) return
    map.setZoom((map.getZoom() || 0) + 1)
  }

  const onClickZoomOut = () => {
    if (!map) return
    map.setZoom((map.getZoom() || 0) - 1)
  }

  const onChangeMapType = (e: RadioChangeEvent) => {
    if (!map) return
    map.setMapTypeId(e.target.value)
  }

  const removePolygon = () => {
    polygonRegions.forEach((polygon) => polygon.setMap(null))
    setPolygonRegions([])
  }

  const disableMap = useCallback(() => {
    map?.setOptions({
      draggable: false,
      scrollwheel: false,
      disableDoubleClickZoom: true,
    })
  }, [map])

  const enableMap = useCallback(() => {
    map?.setOptions({
      draggable: true,
      scrollwheel: true,
      disableDoubleClickZoom: false,
    })
  }, [map])

  const onClickDraw = () => {
    if (!map) return
    setIsOnDrawMode(true)
    disableMap()
    setDrawingLayer(
      createFreehandDrawingLayer({
        map,
        onDrawDoneCb: (polygon: google.maps.Polygon) => {
          setPolygonRegions((prevState) => [polygon, ...prevState])
        },
      }),
    )
  }
  const onApplyDraw = () => {
    if (!map) return
    setIsOnDrawMode(false)
  }

  const onCLickRemoveBoundary = () => {
    removePolygon()
  }

  const onCancelDraw = () => {
    removePolygon()
    setIsOnDrawMode(false)
  }

  useEffect(() => {
    if (currentInfoWindowVisbile.length < 2) return

    currentInfoWindowVisbile[0].close()
    setCurrentInfoWindowVisible([currentInfoWindowVisbile[1]])
  }, [currentInfoWindowVisbile])

  useEffect(() => {
    if (map && !markersLayer) {
      setMarkersLayer(
        createHTMLMapMarker({
          map,
          properties,
          onClickMarker: (property: Property) => {
            const infoWindow = new google.maps.InfoWindow({
              content: ReactDOMServer.renderToStaticMarkup(<InfoWindowProperty property={property} />),
              position: property.coordinates,
            })

            setCurrentInfoWindowVisible((prevState) => [...prevState, infoWindow])

            infoWindow.open({
              map,
              shouldFocus: false,
            })
          },
        }),
      )
    }

    return () => {
      if (markersLayer) markersLayer.setMap(null)
    }
  }, [map, markersLayer, properties])

  useEffect(() => {
    if (isOnDrawMode) {
      markersLayer.setMap(null)
      disableMap()
    } else {
      enableMap()
      if (markersLayer) markersLayer.setMap(map)
      if (drawingLayer) drawingLayer.setMap(null)
    }
  }, [disableMap, drawingLayer, enableMap, isOnDrawMode, map, markersLayer])

  return (
    <div
      className={clsx({
        [s.root]: true,
        [s.isOnDraw]: isOnDrawMode,
      })}
    >
      <div className={s.drawMode}>
        <p>{t('map.drawAShapeAround')}</p>
        <div className={s.drawBtnGroup}>
          <button type="button" onClick={onCancelDraw}>
            {t('map.cancel')}
          </button>
          <span>{t('map.draw')}</span>
          <button type="button" onClick={onApplyDraw}>
            {t('map.apply')}
          </button>
        </div>
      </div>

      <div className={s.mapOverlay}>
        <div>
          <p className={s.searchResult}>
            {t('map.showingResult', {
              result: 500,
              total: 1000,
            })}
          </p>
        </div>
        <div className={s.mapRightArea}>
          {polygonRegions.length > 0 ? (
            <Button type="primary" onClick={onCLickRemoveBoundary}>
              {t('map.removeBoundary')}
            </Button>
          ) : (
            <Button onClick={onClickDraw}>{t('map.draw')}</Button>
          )}

          <div className={s.mapRightBottom}>
            <Dropdown
              overlayClassName={s.mapTypeDropdown}
              trigger={['click']}
              placement="topRight"
              overlay={
                <div>
                  <Radio.Group defaultValue={google.maps.MapTypeId.ROADMAP} size="large" onChange={onChangeMapType}>
                    <Space direction="vertical" size={20}>
                      <Radio value={google.maps.MapTypeId.SATELLITE}>{t('map.satellite')}</Radio>
                      <Radio value={google.maps.MapTypeId.ROADMAP}>{t('map.street')}</Radio>
                    </Space>
                  </Radio.Group>
                </div>
              }
            >
              <Button className={s.btnMap}>
                {t('map.mapMode')} <FontAwesomeIcon style={{ marginLeft: 8 }} icon={faChevronUp} />
              </Button>
            </Dropdown>

            <div className={s.zoomController}>
              <Button onClick={onClickZoomIn}>
                <FontAwesomeIcon icon={faPlus} />
              </Button>
              <Button onClick={onClickZoomOut}>
                <FontAwesomeIcon icon={faMinus} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MapOverlay
