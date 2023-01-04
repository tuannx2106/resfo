import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PropertyItem from 'components/PropertyItem'
import { testPropertyItems2 } from 'containers/PropertyDetailPage/helpers'
import React, { useState } from 'react'
import { Swiper as Slider, SwiperSlide } from 'swiper/react'
import Swiper from 'swiper/types/swiper-class'
import s from './NewListingSlider.module.scss'

const NewListingSlider = () => {
  const [sliderInstance, setSliderInstance] = useState<Swiper | null>(null)

  return (
    <div className={s.root}>
      <Slider onSwiper={setSliderInstance} className={s.slider} spaceBetween={16} slidesPerView="auto">
        {testPropertyItems2.map((propertyItem) => (
          <SwiperSlide className={s.swiperSlide} key={propertyItem.id}>
            <PropertyItem item={propertyItem} />
          </SwiperSlide>
        ))}
      </Slider>
      <button type="button" className={s.btnLeft} onClick={() => sliderInstance?.slidePrev()}>
        <FontAwesomeIcon icon={faChevronLeft} />
      </button>
      <button type="button" className={s.btnRight} onClick={() => sliderInstance?.slideNext()}>
        <FontAwesomeIcon icon={faChevronRight} />
      </button>
    </div>
  )
}

export default NewListingSlider
