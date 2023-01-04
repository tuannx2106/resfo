import { faBath, faBed, faRulerCombined } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Space, SpaceProps } from 'antd'
import clsx from 'clsx'
import React from 'react'
import s from './BasicAmenities.module.scss'

type BasicAmenitiesProps = SpaceProps & {
  bed: number
  bedText?: string
  bath: number
  bathText?: string
  sqft: number
  sqftText?: string
  className?: string
}

const BasicAmenities = ({ bed, bath, bedText, bathText, sqftText, sqft, className, ...rest }: BasicAmenitiesProps) => (
  <Space
    className={clsx({
      [s.root]: true,
      [className || '']: true,
    })}
    size={16}
    {...rest}
  >
    <span>
      <FontAwesomeIcon icon={faBed} />
      {bed}{bedText || ' Beds'}
    </span>
    <span>
      <FontAwesomeIcon icon={faBath} />
      {bath}{bathText || ' Baths'}
    </span>
    <span>
      <FontAwesomeIcon icon={faRulerCombined} />
      {sqft}{sqftText || ' Sqft'}
    </span>
  </Space>
)

export default BasicAmenities
