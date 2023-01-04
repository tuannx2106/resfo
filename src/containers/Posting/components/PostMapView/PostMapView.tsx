import { FormInstance } from 'antd'
import Gmap from 'components/Gmap'
import { PropertyLocation } from 'globalTypes/property'
import React, { useEffect, useRef, useState } from 'react'
import s from './PostMapView.module.scss'

type PostMapViewProps = {
  form: FormInstance
  location: PropertyLocation
}

const PostMapView = ({ location, form }: PostMapViewProps) => {
  const [mapInstance, setMapInstance] = useState<google.maps.Map | null>()
  const [latLng, setLatLng] = useState<PropertyLocation>(location)
  const [markers, setMarkers] = useState<google.maps.Marker[]>([])
  const searchInputRef = useRef<HTMLInputElement>(null)

  // init map instance
  useEffect(() => {
    if (!mapInstance || !searchInputRef) return
    let addressDetails: any = {}

    const searchBox = new google.maps.places.SearchBox(searchInputRef.current as HTMLInputElement)
    mapInstance.controls[google.maps.ControlPosition.TOP_LEFT].push(searchInputRef.current)

    // searchBox change
    searchBox.addListener('places_changed', () => {
      const places = searchBox.getPlaces() || []

      if (places.length === 0) {
        return
      }

      // For each place, get the icon, name and location.
      const bounds = new google.maps.LatLngBounds()

      places.forEach((place) => {
        if (!place.geometry || !place.geometry.location) return
        if (place.geometry.viewport) {
          // Only geocodes have viewport.
          bounds.union(place.geometry.viewport)
        } else {
          bounds.extend(place.geometry.location)
        }

        // set address components
        const addressComponents = place.address_components || []
        if (addressComponents.length > 0) {
          addressDetails = {
            street:
              addressComponents.find(
                (item) => item.types?.includes('administrative_area_level_4') || item.types?.includes('route'),
              )?.long_name || '',
            ward:
              addressComponents.find((item) => item.types?.includes('administrative_area_level_3'))?.long_name || '',
            district:
              addressComponents.find((item) => item.types?.includes('administrative_area_level_2'))?.long_name || '',
            province:
              addressComponents.find((item) => item.types?.includes('administrative_area_level_1'))?.long_name || '',
          }

          form.setFieldsValue({
            address: addressDetails,
          })
        }
      })

      mapInstance.fitBounds(bounds)
    })

    // bounds changed
    mapInstance.addListener('bounds_changed', () => {
      searchBox.setBounds(mapInstance.getBounds() as google.maps.LatLngBounds)
    })

    mapInstance.setOptions({
      zoomControlOptions: {
        position: google.maps.ControlPosition.LEFT_BOTTOM,
      },
    })

    mapInstance.addListener('click', (e: any) => {
      const newLocation = {
        lat: e.latLng.lat(),
        lon: e.latLng.lng(),
      }

      form.setFieldsValue({
        location: newLocation,
      })

      setLatLng(newLocation)
    })
  }, [mapInstance])

  // set marker on map
  useEffect(() => {
    if (!mapInstance) return

    markers?.forEach((marker: google.maps.Marker) => {
      marker.setMap(null)
    })

    const marker = new google.maps.Marker({
      position: {
        lat: latLng.lat,
        lng: latLng.lon,
      },
      map: mapInstance,
    })
    marker?.setMap(mapInstance)

    setMarkers([...markers, marker])
  }, [mapInstance, latLng])

  return (
    <div className={s.root} role="presentation">
      <input type="text" placeholder="Search on map" className={s.searchInput} ref={searchInputRef} />

      <Gmap
        mapStyle={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          zIndex: 3,
        }}
        mapOptions={{
          zoom: 16,
          center: {
            lat: latLng.lat,
            lng: latLng.lon,
          },
          fullscreenControl: false,
          streetViewControl: false,
          zoomControl: true,
          maxZoom: 40,
          minZoom: 4,
          gestureHandling: 'greedy',
          styles: [
            {
              featureType: 'poi',
              stylers: [{ visibility: 'off' }],
            },
          ],
        }}
        onInit={setMapInstance}
      />
    </div>
  )
}

export default PostMapView
