/* eslint-disable react/no-array-index-key */
import clsx from 'clsx'
import Headline from 'components/Headline'
import FormScheduleTour from 'containers/PropertyDetailPage/components/FormScheduleTour'
import { testProperty } from 'containers/PropertyDetailPage/helpers'
import { PropertyImage } from 'globalTypes/property'
import { useTranslation } from 'next-i18next'
import React, { useState } from 'react'
import LightBox from '../LightBox'
import s from './PhotoTab.module.scss'

type CustomPropertyImage = PropertyImage & { index: number }

const PhotoTab = () => {
  const { t } = useTranslation('propertyDetailPage')
  const [isLightBoxVisible, setIsLightBoxVisible] = useState(false)
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0)

  const images: CustomPropertyImage[] =
    testProperty.images?.map((image, index) => ({
      index,
      ...image,
    })) || []

  // const extraImages = images?.filter((image) => image.type !== PropertyImageType.MAIN) || []
  // const mainImage = images?.find((image) => image.type === PropertyImageType.MAIN)

  return (
    <div className={s.root}>
      <p className={s.propertyInfo}>108 Marietta Dr | $1,095,000 | 3 Beds 2 Baths</p>
      <div className={s.main}>
        <div className={s.imgContainer}>
          <Headline className={s.headline} level={3}>
            {t('photoTab.listingPhoto')} ({images?.length})
          </Headline>
          <div className={s.gallery} role="presentation" onClick={() => setIsLightBoxVisible(true)}>
            {[...images, ...images].map((image, index) => (
              <figure
                className={clsx({
                  [s.galleryImg]: true,
                  [s.isLg]: index % 5 < 2,
                  [s.isSm]: index % 5 >= 2,
                })}
              >
                <img
                  className={s.img}
                  key={index}
                  src={image.url}
                  alt={image.url}
                  role="presentation"
                  onClick={() => setCurrentSlideIndex(image.index)}
                />
              </figure>
            ))}
          </div>
        </div>
        <div className={s.formScheduleContainer}>
          <Headline className={s.headline} level={3}>
            {t('requiredInfo.takeTour')}
          </Headline>
          <FormScheduleTour onSchedule={console.log} />
        </div>
      </div>
      {images && images.length > 0 && (
        <LightBox
          title="108 Marietta Dr | $1,095,000 | 3 Beds 2 Baths"
          images={images}
          visible={isLightBoxVisible}
          onClose={() => setIsLightBoxVisible(false)}
          activeIndex={currentSlideIndex}
        />
      )}
    </div>
  )
}

export default PhotoTab
