import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import clsx from 'clsx'
import React, { Ref } from 'react'
import s from './PlaceMapPopup.module.scss'

export type PlaceMapPopupProps = {
  onClickClose: () => void
  divRef: Ref<HTMLDivElement>
  school: google.maps.places.PlaceResult | undefined
  isGreen?: boolean
}

const PlaceMapPopup = ({ onClickClose, divRef, school, isGreen = false }: Partial<PlaceMapPopupProps>) => (
  <div
    ref={divRef}
    className={clsx({
      [s.root]: true,
      [s.isGreen]: isGreen,
    })}
  >
    {school && (
      <div className={s.popup}>
        <div className={s.rating}>
          {school.rating ? (
            <>
              <b>{school.rating}</b>/5
            </>
          ) : (
            'Unknown'
          )}
        </div>
        <div className={s.info}>
          <p className={s.name}>{school.name}</p>
          <p className={s.address}>{school.vicinity}</p>
        </div>
        <button type="button" className={s.action}>
          <FontAwesomeIcon icon={faTimes} onClick={onClickClose} />
        </button>
      </div>
    )}
  </div>
)

export default PlaceMapPopup
