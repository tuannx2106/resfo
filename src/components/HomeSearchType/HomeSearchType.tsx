import clsx from 'clsx'
import { SEARCH_PURPOSES, SEARCH_PURPOSES_MAP } from 'globalTypes/property'
import React from 'react'
import s from './HomeSearchType.module.scss'

type HomeSearchTypeProps = {
  type: SEARCH_PURPOSES
}

const HomeSearchType = ({ type }: HomeSearchTypeProps) => (
  <span
    className={clsx({
      [s.searchButton]: true,
      [s.sale]: type === SEARCH_PURPOSES.SALE,
      [s.rent]: type === SEARCH_PURPOSES.RENT,
      [s.sold]: type === SEARCH_PURPOSES.SOLD,
    })}
  >
    <span className={s.circle} /><span>{SEARCH_PURPOSES_MAP[type]}</span>
  </span>
)

export default HomeSearchType
