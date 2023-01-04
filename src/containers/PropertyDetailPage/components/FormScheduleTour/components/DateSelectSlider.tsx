import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import clsx from 'clsx'
import dayjs, { Dayjs } from 'dayjs'
import React, { useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import s from './DateSelectSlider.module.scss'

type DateSelectSliderProps = {
  value?: Dayjs
  onChange?: (value: Dayjs) => void
}

const DateSelectSlider = ({ value, onChange }: DateSelectSliderProps) => {
  const btnLeft = useRef<HTMLButtonElement>(null)
  const btnRight = useRef<HTMLButtonElement>(null)

  return (
    <div className={s.root}>
      <button ref={btnLeft} className={s.btnLeft} type="button">
        <FontAwesomeIcon icon={faChevronLeft} />
      </button>
      <Swiper
        className={s.slider}
        spaceBetween={16}
        navigation={{
          prevEl: btnLeft.current,
          nextEl: btnRight.current,
        }}
        slidesPerView="auto"
      >
        {Array(7)
          .fill(0)
          .map((_, i) => {
            const dateValue = dayjs().add(i, 'day')

            return (
              // eslint-disable-next-line react/no-array-index-key
              <SwiperSlide className={s.slide} key={i}>
                <div
                  role="presentation"
                  className={clsx({
                    [s.date]: true,
                    [s.isActive]: value?.isSame(dateValue, 'day'),
                  })}
                  onClick={() => onChange?.(dateValue)}
                >
                  <time>{dateValue.format('ddd')}</time>
                  <time>{dateValue.format('MMM DD')}</time>
                </div>
              </SwiperSlide>
            )
          })}
      </Swiper>
      <button ref={btnRight} className={s.btnRight} type="button">
        <FontAwesomeIcon icon={faChevronRight} />
      </button>
    </div>
  )
}

export default DateSelectSlider
