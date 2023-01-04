/* eslint-disable no-param-reassign */
import { Property } from 'globalTypes/property'
import Link from 'next/link'
import ReactDOMServer from 'react-dom/server'
import React from 'react'
import { Dictionary } from 'lodash'
import s from './MapSection.module.scss'

type createHTMLMapMarkerParams = {
  map: google.maps.Map
  properties: Property[]
  onClickMarker?: (property: Property) => void
}

export const createHTMLMapMarker = ({ map, properties, onClickMarker }: createHTMLMapMarkerParams) => {
  class HTMLMapMarker extends google.maps.OverlayView {
    properties: Dictionary<Property>

    propertiesElements: HTMLDivElement[]

    constructor() {
      super()
      this.properties = properties.reduce(
        (acc, property) => ({
          [property.id.toString()]: property,
          ...acc,
        }),
        {},
      )
      this.propertiesElements = []
      this.setMap(map)
    }

    onShowPopupInfo(property: Property) {
      const popupInfo = document.createElement('div')
      popupInfo.className = s.popupInfo
      popupInfo.innerHTML = ReactDOMServer.renderToStaticMarkup(
        <Link href="/">
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a className={s.popupWrapper}>
            <div className={s.popupContentArea}>
              <img
                src="https://photos.zillowstatic.com/fp/aa53316f437541247ee322bc059d3331-p_e.jpg"
                className={s.popupImg}
                alt={property.name}
              />
              <div className={s.popupContent}>
                <strong>$541.1K</strong>
                <p>4 bd, 4 ba</p>
                <p>4500 sqft</p>
              </div>
            </div>
            <p className={s.popupTime}>Open: Sun 6 - 9pm</p>
          </a>
        </Link>,
      )

      return (e: Event) => {
        if (!e.target) return
        popupInfo.style.left = (e.target as HTMLElement).style.left
        popupInfo.style.top = (e.target as HTMLElement).style.top

        popupInfo.addEventListener('mouseleave', () => {
          popupInfo.remove()
        })

        const panes = this.getPanes()
        panes?.overlayMouseTarget.appendChild(popupInfo)
      }
    }

    setupPropertiesPosition() {
      const panes = this.getPanes()

      properties.forEach((property) => {
        const point = this.getProjection().fromLatLngToDivPixel(new google.maps.LatLng(property.coordinates))
        const dom = document.createElement('div')

        dom.className = s.marker
        dom.style.left = `${point?.x || 0}px`
        dom.style.top = `${point?.y || 0}px`
        dom.dataset.id = property.id.toString()

        dom.addEventListener('mouseover', this.onShowPopupInfo(property))

        dom.addEventListener('click', () => {
          onClickMarker?.(property)
        })

        dom.addEventListener('mouseleave', (e) => {
          // @ts-ignore
          if (e.relatedTarget && e.relatedTarget.className === s.popupWrapper) return
          const popupInfo = document.querySelector(`.${s.popupInfo}`)
          if (popupInfo) {
            panes?.overlayMouseTarget.removeChild(popupInfo)
          }
        })

        this.propertiesElements.push(dom)
        panes?.overlayMouseTarget.appendChild(dom)
        google.maps.OverlayView.preventMapHitsAndGesturesFrom(dom)
      })
    }

    onAdd() {
      this.setupPropertiesPosition()
    }

    draw() {
      this.propertiesElements.forEach((propertyEl) => {
        const property = this.properties[propertyEl.dataset.id?.toString() || '-1']
        if (!property) return

        const point = this.getProjection().fromLatLngToDivPixel(new google.maps.LatLng(property.coordinates))
        propertyEl.style.left = `${point?.x || 0}px`
        propertyEl.style.top = `${point?.y || 0}px`
      })
    }

    onRemove() {
      this.propertiesElements.forEach((propertyEl) => {
        propertyEl.remove()
      })
    }
  }

  return new HTMLMapMarker()
}
