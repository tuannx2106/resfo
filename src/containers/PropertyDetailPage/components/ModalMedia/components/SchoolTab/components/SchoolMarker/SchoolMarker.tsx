import { faSchool } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { PlaceMarkerProps } from 'components/Gmap/types'
import React from 'react'
import s from './SchoolMarker.module.scss'

const SchoolMarker = ({ id, divRef, onClick, onHover, onLeave }: Partial<PlaceMarkerProps>) => {
  if (!id) return null
  return (
    <div
      role="presentation"
      id={id}
      ref={divRef}
      className={s.schoolMarker}
      onClick={onClick}
      onMouseOver={onHover}
      onFocus={onHover}
      onMouseLeave={onLeave}
      onBlur={onLeave}
    >
      <FontAwesomeIcon icon={faSchool} />
    </div>
  )
}

export default SchoolMarker
