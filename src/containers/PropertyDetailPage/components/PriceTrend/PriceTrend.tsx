import React from 'react'
import s from './PriceTrend.module.scss'

const PriceTrend = () => (
  <div className={s.items}>
    <div className={s.item}>
      <span className={s.itemIcon}>
        <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" width="32px" height="32px">
          <path
            d="M9.75 9.766h17.985v9.03H9.749v-9.03zm-2.673-2.68v19.95h-2.66V4.427h23.318v2.66H7.077z"
            fill="#869099"
            fillRule="evenodd"
          />
        </svg>
      </span>

      <div className={s.itemText}>
        <p className={s.itemPrice}>$522,268</p>
        <p>Typical home value</p>
        <p>
          This home: $349,900 <b className={s.itemPrice}>49% below</b>
        </p>
      </div>
    </div>

    <div className={s.item}>
      <span className={s.itemIcon}>
        <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" width="32px" height="32px">
          <path
            d="M13.748 21.276l-3.093-3.097v3.097h3.093zm12.852 5.32H10.655v.004h-5.32v-.004H5.32v-5.32h.015V5.32L26.6 26.596z"
            fill="#869099"
          />
        </svg>
      </span>

      <div className={s.itemText}>
        <p className={s.itemPrice}>$1,039</p>
        <p>Typical Home Value by sqft</p>
        <p>
          This home: $263 <b className={s.itemPrice}>294% below</b>
        </p>
      </div>
    </div>
  </div>
)

export default PriceTrend
