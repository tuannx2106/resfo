import { Status, Wrapper } from '@googlemaps/react-wrapper'
import React, { CSSProperties, useEffect, useRef } from 'react'
import getConfig from 'next/config'

type GmapProps = {
  mapStyle: CSSProperties
  mapOptions: google.maps.MapOptions
  onInit?: (map: google.maps.Map) => void
}

const MapComponent = ({ mapStyle, onInit, mapOptions }: GmapProps) => {
  const renderMapElement = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!renderMapElement.current) return

    const { zoom, center, ...restOptions } = mapOptions
    const map = new window.google.maps.Map(renderMapElement.current, {
      zoom,
      center,
    })
    map.setOptions(restOptions)
    if (onInit) onInit(map)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <div ref={renderMapElement} style={mapStyle} />
}

const Gmap = (props: GmapProps) => (
  <Wrapper
    apiKey={getConfig().publicRuntimeConfig.GMAP_API_KEY}
    render={(status) => {
      if (status === Status.LOADING) return <h3>{status} ..</h3>
      if (status === Status.FAILURE) return <h3>{status} ...</h3>
      return <></>
    }}
  >
    <MapComponent {...props} />
  </Wrapper>
)

export default Gmap
