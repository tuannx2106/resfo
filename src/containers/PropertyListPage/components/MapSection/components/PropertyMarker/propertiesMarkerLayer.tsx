/* eslint-disable react/prop-types */
/* eslint-disable no-param-reassign */
import { Property } from 'globalTypes/property'
import React, { useState } from 'react'
import { Dictionary } from 'lodash'
import ReactDOM from 'react-dom'
import PropertyMarker from '.'
import PopupClickMarker from '../PopupClickMarker'

type ComponentProps = {
  onSetRef: (property: Property, ref: HTMLDivElement | null) => void
  onSetPopupRef: (ref: HTMLDivElement | null) => void
  setCurrentActiveProperty: (property: Property | undefined) => void
}

type createHTMLMapMarkerParams = {
  map: google.maps.Map
  properties: Property[]
  onClickMarker: (property: Property) => void
  onInitMarker?: (marker: Dictionary<HTMLDivElement>) => void
}

export const createHTMLMapMarker = ({ map, properties, onClickMarker, onInitMarker }: createHTMLMapMarkerParams) => {
  class HTMLMapMarker extends google.maps.OverlayView {
    properties: Dictionary<Property>

    propertiesElements: (HTMLDivElement | null)[]

    clickPopupElement: HTMLDivElement | null

    overlayMouseTargetDiv: Element | undefined

    currentActiveProperty: Property | undefined

    constructor() {
      super()
      this.properties = properties.reduce(
        (acc, property) => ({
          [String(property.id)]: property,
          ...acc,
        }),
        {},
      )
      this.propertiesElements = []
      this.clickPopupElement = null
      this.setMap(map)
    }

    setupPropertiesPosition() {
      const panes = this.getPanes()
      let refDictionary: { [k: string]: HTMLDivElement } = {}

      this.overlayMouseTargetDiv = panes?.overlayMouseTarget
      const Component = ({ onSetRef, onSetPopupRef, setCurrentActiveProperty }: ComponentProps) => {
        const [currentClickedProperty, setCurrentClickedProperty] = useState<Property | undefined>()
        return (
          <>
            {properties.map((property) => (
              <PropertyMarker
                key={property.id}
                divRef={(ref) => {
                  onSetRef(property, ref)
                  return ref
                }}
                id={String(property.id)}
                property={property}
                onClickMarker={() => {
                  setCurrentActiveProperty(property)
                  setCurrentClickedProperty(property)
                  onClickMarker(property)
                }}
              />
            ))}
            <PopupClickMarker
              popupRef={(ref) => {
                onSetPopupRef(ref)
                return ref
              }}
              isFloatMode
              visible
              property={currentClickedProperty}
              onClickClose={() => {
                setCurrentClickedProperty(undefined)
              }}
            />
          </>
        )
      }

      ReactDOM.render(
        // @ts-ignore
        <Component
          onSetRef={(property, ref) => {
            if (!ref) return
            refDictionary = {
              ...refDictionary,
              [String(property.id)]: ref,
            }
            this.propertiesElements.push(ref)
            google.maps.OverlayView.preventMapHitsAndGesturesFrom(ref)
          }}
          onSetPopupRef={(ref) => {
            this.clickPopupElement = ref
            if (ref) google.maps.OverlayView.preventMapHitsAndGesturesFrom(ref)
          }}
          setCurrentActiveProperty={(property) => {
            this.currentActiveProperty = property

            if (property && this.clickPopupElement) {
              const point = this.getProjection().fromLatLngToDivPixel(
                new google.maps.LatLng({
                  lat: property.location.lat,
                  lng: property.location.lon,
                }),
              )
              this.clickPopupElement.style.left = `${point?.x || 0}px`
              this.clickPopupElement.style.top = `${point?.y || 0}px`
            }
          }}
        />,
        panes?.overlayMouseTarget,
      )

      if (onInitMarker) onInitMarker(refDictionary)
    }

    onAdd() {
      this.setupPropertiesPosition()
    }

    draw() {
      this.propertiesElements.forEach((propertyEl) => {
        if (!propertyEl) return

        // redraw property position
        const property = this.properties[propertyEl.id?.toString() || '-1']
        if (property) {
          const point = this.getProjection().fromLatLngToDivPixel(
            new google.maps.LatLng({
              lat: property.location.lat,
              lng: property.location.lon,
            }),
          )
          propertyEl.style.left = `${point?.x || 0}px`
          propertyEl.style.top = `${point?.y || 0}px`
        }
      })

      if (this.currentActiveProperty && this.clickPopupElement) {
        const point = this.getProjection().fromLatLngToDivPixel(
          new google.maps.LatLng({
            lat: this.currentActiveProperty.location.lat,
            lng: this.currentActiveProperty.location.lon,
          }),
        )
        this.clickPopupElement.style.left = `${point?.x || 0}px`
        this.clickPopupElement.style.top = `${point?.y || 0}px`
      }
    }

    onRemove() {
      if (this.overlayMouseTargetDiv) ReactDOM.unmountComponentAtNode(this.overlayMouseTargetDiv)
    }
  }

  const bounds = new google.maps.LatLngBounds()

  properties.forEach((property) => {
    bounds.extend({
      lat: property.location.lat,
      lng: property.location.lon,
    })
  })

  if (properties.length) map.fitBounds(bounds)

  return new HTMLMapMarker()
}
