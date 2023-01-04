import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import clsx from 'clsx'
import BasicAmenities from 'components/BasicAmenities'
import Button from 'components/Button'
import { Property } from 'globalTypes/property'
import { convertToPriceWithUnit } from 'helpers/utilities'
import React, { Ref, useEffect, useMemo, useState } from 'react'
import ReactDOM from 'react-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import getConfig from 'next/config'
import s from './PopupClickMarker.module.scss'

type PopupClickMarkerProps = {
  visible: boolean
  property?: Property
  isFloatMode?: boolean
  popupRef?: Ref<HTMLDivElement>
  onClickClose?: () => void
}

const POPUP_CLICK_MARKER_COMMON_CLASSNAME = '.js-float-marker-popup'
const { publicRuntimeConfig } = getConfig()

const PopupClickMarker = ({
  property,
  onClickClose,
  popupRef,
  isFloatMode = false,
  visible = false,
}: PopupClickMarkerProps) => {
  const [btnRightRef, setBtnRightRef] = useState<HTMLButtonElement | null>(null)
  const [btnLeftRef, setBtnLeftRef] = useState<HTMLButtonElement | null>(null)

  return (
    <>
      {visible ? (
        <div
          ref={popupRef}
          className={clsx({
            [s.clickPopup]: true,
            [s.isFloatMode]: isFloatMode,
            [POPUP_CLICK_MARKER_COMMON_CLASSNAME]: isFloatMode,
          })}
        >
          {property && (
            <>
              <a href={`/property/${property.id}`} target="_blank" className={s.imgContainer} rel="noreferrer">
                <Swiper
                  className={s.swiper}
                  slidesPerView="auto"
                  loop
                  navigation={{
                    nextEl: btnRightRef,
                    prevEl: btnLeftRef,
                  }}
                  pagination={{ dynamicBullets: true }}
                >
                  {property.galleries?.map((image, index) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <SwiperSlide className={s.propertySliderItem} key={image.id}>
                      <img
                        src={`${publicRuntimeConfig.STORAGE_URI}/images/${image.id}-large${image.ext}`}
                        alt={`${index}`}
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
                <button type="button" className={s.btnLeft} ref={setBtnLeftRef}>
                  <FontAwesomeIcon icon={faChevronLeft} />
                </button>
                <button type="button" className={s.btnRight} ref={setBtnRightRef}>
                  <FontAwesomeIcon icon={faChevronRight} />
                </button>
              </a>
              <div className={s.clickPopupBody}>
                <b>${convertToPriceWithUnit(property.prices[0].price)}</b>
                <BasicAmenities
                  className={s.amenities}
                  bed={property.bedrooms.total}
                  bedText="bd"
                  bath={property.bathrooms.total}
                  bathText="ba"
                  sqft={property.area}
                  size={6}
                />
                <p>{property.title}</p>
                <div className={s.authorArea}>
                  <p>Veela</p>
                  {onClickClose && (
                    <Button type="link" onClick={onClickClose}>
                      Close
                    </Button>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      ) : null}
    </>
  )
}

PopupClickMarker.POPUP_CLICK_MARKER_COMMON_CLASSNAME = POPUP_CLICK_MARKER_COMMON_CLASSNAME

export const PopupClickMarkerPortal = (props: PopupClickMarkerProps) => {
  const el = useMemo(() => document.createElement('div'), [])

  useEffect(() => {
    const target = document.body
    target.appendChild(el)

    return () => {
      target.removeChild(el)
    }
  }, [el])

  return ReactDOM.createPortal(<PopupClickMarker {...props} />, el)
}

export default PopupClickMarker
