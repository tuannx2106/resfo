/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react'
import { faChevronLeft, faChevronRight, faHeart } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Property, PropertyItemExtraInfo as IPropertyItemExtraInfo } from 'globalTypes/property'
import Swiper from 'swiper'
import { Swiper as Slider, SwiperSlide } from 'swiper/react'
import clsx from 'clsx'
import Link from 'next/link'
import Button from 'components/Button'
import PropertyItemExtraInfos from '../PropertyItemExtraInfos'
import s from './PropertyItem.module.scss'

type PropertyItemProps = {
  item: Property
  extraInfo?: boolean
  className?: string
}

const extraInfos: IPropertyItemExtraInfo[] = [
  {
    name: 'type',
    value: 'Single Family Residence',
  },
  {
    name: 'yearBuilt',
    value: '2021',
  },
  {
    name: 'heating',
    value: 'Natural Gas, Zoned',
  },
  {
    name: 'cooling',
    value: 'Electric, Zoned, Ceiling Floor',
  },
  {
    name: 'parking',
    value: '2 Attached Garage spaces',
  },
  {
    name: 'hoa',
    value: '$40 monthly',
  },
  {
    name: 'lotSize',
    value: '5,000 sqft',
  },
  {
    name: 'price',
    value: '$112',
  },
]

const PropertyItem = ({ item, extraInfo = false, className }: PropertyItemProps) => {
  const { images } = item
  const [sliderInstance, setSliderInstance] = useState<Swiper | null>(null)

  return (
    <article
      className={clsx({
        [s.propertyWrapper]: true,
        [s.hasExtraInfo]: extraInfo,
        [className || '']: true,
      })}
    >
      <div className={s.property}>
        <div className={s.propertySlider}>
          <Slider onInit={setSliderInstance} slidesPerView="auto" centeredSlides loop pagination={{ clickable: true }}>
            {images?.map((image, index) => (
              <SwiperSlide className={s.propertySliderItem} key={`${image.url}${index}`}>
                <img src={image.url} alt={`${index}`} />
              </SwiperSlide>
            ))}
          </Slider>
          <div className={s.propertySliderIndicator} />

          <button
            type="button"
            className={s.btnLeft}
            onClick={(e) => {
              e.stopPropagation()
              sliderInstance?.slidePrev()
            }}
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
          <button
            type="button"
            className={s.btnRight}
            onClick={(e) => {
              e.stopPropagation()
              sliderInstance?.slideNext()
            }}
          >
            <FontAwesomeIcon icon={faChevronRight} />
          </button>

          <span className={s.propertyTag}>{item.createdAt}</span>

          <Button
            className={clsx({
              [s.btnLike]: true,
              [s.liked]: item.like,
            })}
            type="link"
          >
            <FontAwesomeIcon icon={faHeart} />
          </Button>
        </div>

        <Link href="/property/can-ho-1" passHref>
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a target="_blank">
            <div className={s.propertyInfo}>
              <h4 className={s.propertyPrice}>$60,000</h4>
              <p className={s.propertyBasicInfo}>1 bd1 ba643 sqft- Condo for sale</p>
              <address>7444 Saint Charles Ave APT 303, New Orleans, LA 70118</address>
              <p className={s.propertyOwner}>Zillow</p>
            </div>
          </a>
        </Link>
      </div>

      {extraInfo && (
        <Link href="/property/can-ho-1" passHref>
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a target="_blank">
            <PropertyItemExtraInfos infos={extraInfos} />
          </a>
        </Link>
      )}
    </article>
  )
}

export default PropertyItem
