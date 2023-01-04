import React, { useState } from 'react'
import Gmap from 'components/Gmap'
import { CUSTOM_MAP_STYLES, testData } from './constant'
import s from './MapSection.module.scss'
import MapOverlay from './components/MapOverlay'

type MapProps = {
  // center: google.maps.LatLngLiteral
  zoom: number
}

const MapSection = ({ zoom }: MapProps) => {
  const [map, setMap] = useState<google.maps.Map | undefined>()

  return (
    <div className={s.root}>
      <Gmap
        mapStyle={{
          width: '100%',
          height: '100%',
          position: 'absolute',
        }}
        mapOptions={{
          zoom: zoom || 14,
          center: testData[0].coordinates,
          disableDefaultUI: true,
          clickableIcons: false,
          maxZoom: 20,
          minZoom: 4,
          styles: CUSTOM_MAP_STYLES,
          gestureHandling: 'greedy',
        }}
        onInit={setMap}
      />
      {map && <MapOverlay map={map} />}
    </div>
  )
}

export default MapSection
