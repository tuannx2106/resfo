import { faHeart as faHeartOutlined, faImage } from '@fortawesome/free-regular-svg-icons'
import { faChevronLeft, faChevronRight, faHeart } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Space } from 'antd'
import Button from 'components/Button'
import ButtonShare from 'components/ButtonShare'
import { testProperty } from 'containers/PropertyDetailPage/helpers'
import React, { useRef, useState } from 'react'
import Swiper from 'swiper'
import { SwiperSlide, Swiper as Slider } from 'swiper/react'
import s from './ImageSection.module.scss'

type ImageSectionProps = {
  onClickImage: () => void
}

const ImageSection = ({ onClickImage }: ImageSectionProps) => {
  // const { t } = useTranslation(['propertyDetailPage', 'common'])
  const [thumbnailSwiper, setThumbnailSwiper] = useState<Swiper | null>(null)
  const paginationRef = useRef<HTMLDivElement>(null)
  const btnLeftRef = useRef<HTMLButtonElement>(null)
  const btnRightRef = useRef<HTMLButtonElement>(null)

  const images = testProperty.images || []
  const isSaved = false

  return (
    <div className={s.root}>
      <div className={s.sliderWrapper} role="presentation" onClick={onClickImage}>
        <div className={s.header}>
          <Space className={s.tags} align="start">
            <div className={s.tag}>FOR SALE</div>
            <div className={s.tag}>Open sat, 11-1pm</div>
          </Space>
          <Space className={s.btnActions} size={16}>
            <Button className={s.btnSave} type="link">
              <FontAwesomeIcon icon={isSaved ? faHeart : faHeartOutlined} />
            </Button>
            <ButtonShare buttonProps={{ className: s.btnShare }} />
          </Space>
        </div>

        <Slider
          className={s.mainSlider}
          spaceBetween={10}
          thumbs={{ swiper: thumbnailSwiper }}
          loop
          navigation={{
            nextEl: btnRightRef.current,
            prevEl: btnLeftRef.current,
          }}
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

        <button type="button" className={s.btnLeft} ref={btnLeftRef} onClick={(e) => e.stopPropagation()}>
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
        <button type="button" className={s.btnRight} ref={btnRightRef} onClick={(e) => e.stopPropagation()}>
          <FontAwesomeIcon icon={faChevronRight} />
        </button>

        <div className={s.imgNumber}>
          <FontAwesomeIcon icon={faImage} /> <span ref={paginationRef} />
        </div>
      </div>

      <Slider
        onSwiper={setThumbnailSwiper}
        spaceBetween={8}
        slidesPerView="auto"
        freeMode
        watchSlidesProgress
        className={s.thumbnailSlider}
      >
        {images?.map((image) => (
          <SwiperSlide className={s.thumbnail} key={image.url}>
            <img src={image.url} alt="property" />
          </SwiperSlide>
        ))}
      </Slider>
    </div>
  )
}

export default ImageSection
