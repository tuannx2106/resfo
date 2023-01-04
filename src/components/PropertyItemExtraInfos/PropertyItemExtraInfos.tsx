import React from 'react'
import Image from 'next/image'
import { PropertyItemExtraInfo as IPropertyItemExtraInfo } from 'globalTypes/property'
import { useTranslation } from 'next-i18next'
import clsx from 'clsx'
import s from './PropertyItemExtraInfo.module.scss'

type PropertyItemExtraInfosProps = {
  infos: IPropertyItemExtraInfo[]
  wrapperClassName?: string
  itemClassName?: string
}

const PropertyItemExtraInfos = ({ infos, wrapperClassName, itemClassName }: PropertyItemExtraInfosProps) => {
  const { t } = useTranslation('propertyItem')

  return (
    <div className={clsx(s.extraInfo, wrapperClassName)}>
      {infos.map((info, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <div className={clsx(s.extraInfoItem, itemClassName)} key={index}>
          <Image src={`/img/icon/property/icon-${info.name}.svg`} width={24} height={24} />
          <div className={s.extraInfoBody}>
            {/* @ts-ignore */}
            <p className={s.extraInfoName}>{t(info.name)}</p>
            <p className={s.extraInfoValue}>{info.value}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default PropertyItemExtraInfos
