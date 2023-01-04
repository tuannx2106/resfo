import clsx from 'clsx'
import { Property } from 'globalTypes/property'
import React, { memo, Ref, useState } from 'react'
import getConfig from 'next/config'
import { convertToPriceWithUnit } from 'helpers/utilities'
import s from './PropertyMarker.module.scss'

type PropertyMarkerProps = {
  divRef: Ref<HTMLDivElement>
  property: Property
  id: string
  onClickMarker: (property: Property) => void
}

const { publicRuntimeConfig } = getConfig()

const HoverPopup = memo(({ property }: { property: Property }) => (
  <div className={s.popupInfo}>
    <a href={`/property/${property.id}`} target="_blank" className={s.popupWrapper} rel="noreferrer">
      <div className={s.popupContentArea}>
        <figure className={s.popupImg}>
          <img
            src={`${publicRuntimeConfig.STORAGE_URI}/images/${property.galleries?.[0].id}-large${property.galleries?.[0].ext}`}
            alt={property.address}
          />
        </figure>
        <div className={s.popupContent}>
          <strong>${convertToPriceWithUnit(property.prices[0].price)}</strong>
          <p>
            {property.bedrooms.total} bd, {property.bathrooms.total} ba
          </p>
          <p>{property.area} sqft</p>
        </div>
      </div>
      <p className={s.popupTime}>Open: Sun 6 - 9pm</p>
    </a>
  </div>
))

const PropertyMarker = ({ divRef, id, property, onClickMarker }: PropertyMarkerProps) => {
  const [isHover, setIsHover] = useState(false)

  const onHover = () => setIsHover(true)
  const onLeave = () => setIsHover(false)

  return (
    <div
      id={id}
      ref={divRef}
      role="presentation"
      className={clsx({
        [s.marker]: true,
        'is-hover': isHover,
        [s.showExtraInfo]: true,
        [s.isRed]: property.listingType === 'sell',
        [s.isPurple]: property.listingType === 'rent',
      })}
      onMouseOver={onHover}
      onFocus={onHover}
      onMouseLeave={onLeave}
      onBlur={onLeave}
      onClick={() => {
        onClickMarker(property)
      }}
    >
      <HoverPopup property={property} />
      <div className={s.extraInfo}>{convertToPriceWithUnit(property.prices[0].price)}</div>
    </div>
  )
}

export default PropertyMarker
