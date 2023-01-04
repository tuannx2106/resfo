/* eslint-disable react/prop-types */
/* eslint-disable no-param-reassign */
import React, { useState } from 'react'
import { Dictionary } from 'lodash'
import ReactDOM from 'react-dom'
import { PlaceMapPopupProps } from 'components/PlaceMapPopup/PlaceMapPopup'
import { createPlaceMarkersLayerParams, PlaceMarkerProps, OverlayInnerComponentProps } from './types'

export const createPlaceMarkersLayer = ({
  map,
  places,
  markerComponent,
  markerPopupComponent,
  extendCoordinates,
}: createPlaceMarkersLayerParams) => {
  class HTMLMapMarker extends google.maps.OverlayView {
    places: Dictionary<google.maps.places.PlaceResult>

    placeElements: (HTMLDivElement | null)[]

    clickPopupElement: HTMLDivElement | null

    overlayMouseTargetDiv: Element | undefined

    currentActivePlace: google.maps.places.PlaceResult | undefined

    constructor() {
      super()
      this.places = places.reduce(
        (acc, place) => ({
          [place.place_id || '-1']: place,
          ...acc,
        }),
        {},
      ) as Dictionary<google.maps.places.PlaceResult>
      this.placeElements = []
      this.clickPopupElement = null
      this.setMap(map)
    }

    setupPropertiesPosition() {
      const panes = this.getPanes()

      this.overlayMouseTargetDiv = panes?.overlayMouseTarget

      const Component = ({ onSetRef, onSetPopupRef, setCurrentActivePlace }: OverlayInnerComponentProps) => {
        const [currentClickedPlace, setCurrentClickedPlace] = useState<google.maps.places.PlaceResult | undefined>()
        const [isPinPopup, setIsPinPopup] = useState<boolean>(false)

        return (
          <>
            {places.map((place) => {
              if (!place.place_id) return null

              return React.cloneElement<PlaceMarkerProps>(markerComponent, {
                key: place.place_id,
                divRef: (ref: HTMLDivElement | null) => {
                  onSetRef(ref)
                  return ref
                },
                id: place.place_id,
                onHover: () => {
                  setCurrentClickedPlace(place)
                  setCurrentActivePlace(place)
                },
                onLeave: () => {
                  if (isPinPopup) return
                  setCurrentClickedPlace(undefined)
                },
                onClick: () => {
                  setCurrentClickedPlace(place)
                  setCurrentActivePlace(place)
                  setIsPinPopup(true)
                },
              })
            })}
            {markerPopupComponent &&
              React.cloneElement<PlaceMapPopupProps>(markerPopupComponent, {
                divRef: (ref) => {
                  onSetPopupRef(ref)
                  return ref
                },
                onClickClose: () => {
                  setCurrentClickedPlace(undefined)
                  setIsPinPopup(false)
                },
                school: currentClickedPlace,
              })}
          </>
        )
      }
      ReactDOM.render(
        // @ts-ignore
        <Component
          onSetRef={(ref) => {
            this.placeElements.push(ref)
            if (ref) google.maps.OverlayView.preventMapHitsAndGesturesFrom(ref)
          }}
          onSetPopupRef={(ref) => {
            this.clickPopupElement = ref
            if (ref) google.maps.OverlayView.preventMapHitsAndGesturesFrom(ref)
          }}
          setCurrentActivePlace={(place) => {
            this.currentActivePlace = place

            if (place && this.clickPopupElement) {
              const point = this.getProjection().fromLatLngToDivPixel(place.geometry?.location || null)
              this.clickPopupElement.style.left = `${point?.x || 0}px`
              this.clickPopupElement.style.top = `${point?.y || 0}px`
            }
          }}
        />,
        panes?.overlayMouseTarget,
      )
    }

    onAdd() {
      this.setupPropertiesPosition()
    }

    draw() {
      this.placeElements.forEach((placeEl) => {
        if (!placeEl) return

        // redraw property position
        const place = this.places[placeEl.id?.toString() || '-1']
        if (place) {
          const point = this.getProjection().fromLatLngToDivPixel(place.geometry?.location || null)
          placeEl.style.left = `${point?.x || 0}px`
          placeEl.style.top = `${point?.y || 0}px`
        }
      })

      if (this.currentActivePlace && this.clickPopupElement) {
        const point = this.getProjection().fromLatLngToDivPixel(this.currentActivePlace.geometry?.location || null)
        this.clickPopupElement.style.left = `${point?.x || 0}px`
        this.clickPopupElement.style.top = `${point?.y || 0}px`
      }
    }

    onRemove() {
      if (this.overlayMouseTargetDiv) ReactDOM.unmountComponentAtNode(this.overlayMouseTargetDiv)
    }
  }

  const bounds = new google.maps.LatLngBounds()

  if (extendCoordinates) bounds.extend(extendCoordinates)

  places.forEach(({ geometry }) => {
    if (geometry?.location) bounds.extend(geometry.location.toJSON())
  })

  map.fitBounds(bounds)

  return new HTMLMapMarker()
}
