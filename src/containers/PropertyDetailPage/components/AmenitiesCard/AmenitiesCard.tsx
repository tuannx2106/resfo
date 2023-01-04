import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import s from './AmenitiesCard.module.scss'

type AmenitiesCardProps = {
  icon: IconProp
  title: string
  amenitiesGroup?: Amenities[]
}

export type Amenities = {
  name: string
  list: string[]
}

const AmenitiesCard = ({ icon, title, amenitiesGroup = [] }: AmenitiesCardProps) => (
  <div className={s.root}>
    <h4 className={s.title}>
      <FontAwesomeIcon icon={icon} /> {title}
    </h4>
    {amenitiesGroup.map((amenities) => (
      <div key={amenities.name} className={s.amenitiesWrapper}>
        <h5 className={s.amenitiesTitle}>{amenities.name}</h5>
        <ul className={s.amenities}>
          {amenities.list.map((amenity) => (
            <li key={amenity} className={s.amenity}>
              {amenity}
            </li>
          ))}
        </ul>
      </div>
    ))}
  </div>
)

export default AmenitiesCard
