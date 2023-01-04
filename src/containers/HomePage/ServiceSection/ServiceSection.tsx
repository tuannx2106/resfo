/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/no-array-index-key */
import React from 'react'
import Image from 'next/image'
import { Button } from 'antd'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/router'
import { useAppDispatch } from 'store'
import s from './ServiceSection.module.scss'
import { ServiceItem as ServiceItemType } from './types'
import { updateIsVisibleSearchItems } from '../slice'

type ServiceItemProps = {
  item: ServiceItemType
}

const ServiceItem = ({ item }: ServiceItemProps) => {
  const { image, title, subTitle, textBtn, action } = item
  const { t } = useTranslation('homepage')

  return (
    <div className={s.serviceItem} onClick={action}>
      <div className={s.serviceItemImage}>
        <Image width={336} height={180} src={image} alt={`image ${title}`} />
      </div>

      <div className={s.serviceItemContent}>
        {/* @ts-ignore */}
        <p className={s.serviceItemTitle}>{t(`serviceSection.${title}`)}</p>
        {/* @ts-ignore */}
        <p className={s.serviceItemSubTitle}>{t(`serviceSection.${subTitle}`)}</p>

        <div className={s.serviceButton}>
          {/* @ts-ignore */}
          <Button size="large">{t(`serviceSection.${textBtn}`)}</Button>
        </div>
      </div>
    </div>
  )
}

const ServiceSection = () => {
  const { t } = useTranslation('homepage')
  const router = useRouter()
  const dispatch = useAppDispatch()

  const openLocationSearch = () => {
    dispatch(updateIsVisibleSearchItems(true))
  }

  const goToSellPage = () => {
    router.push('/property/list')
  }

  const SERVICE_LIST: ServiceItemType[] = [
    {
      image: '/img/homepage/img-service-buy.webp',
      title: 'buyHome',
      subTitle: 'buyHomeSubtitle',
      textBtn: 'buyHomeBtn',
      action: openLocationSearch,
    },
    {
      image: '/img/homepage/img-service-sell.webp',
      title: 'sellHome',
      subTitle: 'sellHomeSubTitle',
      textBtn: 'sellHomeBtn',
      action: goToSellPage,
    },
    {
      image: '/img/homepage/img-service-rent.webp',
      title: 'rentHome',
      subTitle: 'rentHomeSubTitle',
      textBtn: 'rentHomeBtn',
      action: openLocationSearch,
    },
  ]
  return (
    <div className={s.serviceContainer}>
      <div className={s.serviceSection}>
        {/* @ts-ignore */}
        <h2 className={s.serviceSectionTitle}>{t('serviceSection.title')}</h2>

        <div className={s.serviceWrapper}>
          {SERVICE_LIST.map((item, index) => (
            <ServiceItem key={`serviceSection-${index}`} item={item} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default ServiceSection
