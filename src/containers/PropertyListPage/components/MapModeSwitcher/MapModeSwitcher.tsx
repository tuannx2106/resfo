import { faMap } from '@fortawesome/free-regular-svg-icons'
import { faList, faSortAmountUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import s from './MapModeSwitcher.module.scss'

type MapModeSwitcherProps = {
  onClickMap: () => void
  onClickList: () => void
  onClickSort: () => void
  isMapMode: boolean
}

const MapModeSwitcher = ({ onClickList, onClickMap, onClickSort, isMapMode = false }: MapModeSwitcherProps) => (
  <div className={s.root}>
    {!isMapMode && (
      <>
        <button type="button" onClick={onClickMap}>
          <FontAwesomeIcon icon={faMap} /> Map
        </button>
        <button type="button" onClick={onClickSort}>
          <FontAwesomeIcon icon={faSortAmountUp} /> Sort
        </button>
      </>
    )}
    {isMapMode && (
      <button type="button" onClick={onClickList}>
        <FontAwesomeIcon icon={faList} /> List
      </button>
    )}
  </div>
)

export default React.memo(MapModeSwitcher)
