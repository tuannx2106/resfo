import { faChevronLeft, faChevronRight, faHeart, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Space } from 'antd'
import ButtonShare from 'components/ButtonShare'
import { PropertyImage } from 'globalTypes/property'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import ReactDOM from 'react-dom'
import Swiper from 'swiper'
import { SwiperSlide, Swiper as Slider } from 'swiper/react'
import s from './LightBox.module.scss'

type LightBoxProps = {
  title?: string | React.ReactNode
  visible?: boolean
  onClose: () => void
  images: PropertyImage[]
  activeIndex: number
}

const LightBox = ({ title, visible, onClose, images, activeIndex }: LightBoxProps) => {
  const [sliderInstance, setSliderInstance] = useState<Swiper | null>(null)
  const paginationRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (sliderInstance) {
      sliderInstance.slideToLoop(activeIndex % images.length)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sliderInstance])

  return (
    <>
      {visible ? (
        <div className={s.root}>
          {title && <h3 className={s.title}>{title}</h3>}
          <div className={s.sliderWrapper}>
            <Slider
              onSwiper={setSliderInstance}
              centeredSlides
              loop
              spaceBetween={10}
              className={s.swiper}
              pagination={{
                el: paginationRef.current,
                type: 'fraction',
              }}
            >
              {images?.map((image) => (
                <SwiperSlide key={image.url}>
                  <img src={image.url} alt="property" />
                </SwiperSlide>
              ))}
            </Slider>
            <button type="button" className={s.btnLeft} onClick={() => sliderInstance?.slidePrev()}>
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>
            <button type="button" className={s.btnRight} onClick={() => sliderInstance?.slideNext()}>
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
            <span ref={paginationRef} className={s.sliderNumber} />
          </div>

          <Space className={s.btnActions} size="large">
            <Button type="link" className={s.btnSave}>
              <FontAwesomeIcon icon={faHeart} />
            </Button>
            <ButtonShare
              buttonProps={{
                className: s.btnShare,
                type: 'link',
              }}
            />
            <Button type="link" className={s.btnClose} onClick={onClose}>
              <FontAwesomeIcon icon={faTimes} />
            </Button>
          </Space>
        </div>
      ) : null}
    </>
  )
}

const LightBoxWrapper = (props: LightBoxProps) => {
  const el = useMemo(() => document.createElement('div'), [])

  useEffect(() => {
    const target = document.body
    target.appendChild(el)

    return () => {
      target.removeChild(el)
    }
  }, [el])

  return ReactDOM.createPortal(<LightBox {...props} />, el)
}

export default LightBoxWrapper
