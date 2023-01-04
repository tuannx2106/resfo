import { PlaceMapPopupProps } from 'components/PlaceMapPopup/PlaceMapPopup'
import React from 'react'

export type PlaceMarkerProps = {
  key: string
  divRef: (ref: HTMLDivElement | null) => void
  id: string
  onHover: () => void
  onClick: () => void
  onLeave: () => void
}

export type OverlayInnerComponentProps = {
  onSetRef: (ref: HTMLDivElement | null) => void
  onSetPopupRef: (ref: HTMLDivElement | null) => void
  setCurrentActivePlace: (place: google.maps.places.PlaceResult | undefined) => void
}

export type createPlaceMarkersLayerParams = {
  map: google.maps.Map
  places: google.maps.places.PlaceResult[]
  markerComponent: React.ReactElement<PlaceMarkerProps>
  markerPopupComponent?: React.ReactElement<PlaceMapPopupProps>
  extendCoordinates?: google.maps.LatLngLiteral
}
