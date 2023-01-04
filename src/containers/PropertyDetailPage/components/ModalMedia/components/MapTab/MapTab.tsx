import React, { useEffect, useState } from 'react'
import Gmap from 'components/Gmap'

const MapTab = () => {
  const [mapInstance, setMapInstance] = useState<google.maps.Map | undefined>()

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
  )
}

export default MapTab
