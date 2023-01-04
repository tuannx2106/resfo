import React from 'react'
import { useTranslation } from 'react-i18next'
import { Select } from 'antd'
import { PROPERTY_SORT_BY_OPTIONS } from 'containers/PropertyListPage/constants'
import s from './SortSelection.module.scss'

const SortSelection = () => {
  const { t } = useTranslation('propertyListPage')

  return (
    <div className={s.sortSelection}>
      <p className={s.sortLabel}>{t('sort.label')}:</p>
      <Select defaultValue={PROPERTY_SORT_BY_OPTIONS[0].value} dropdownClassName={s.sortOptions}>
        {PROPERTY_SORT_BY_OPTIONS.map((item) => (
          <Select.Option className={s.sortOption} key={item.value} value={item.value}>
            {/* @ts-ignore */}
            {t(item.label)}
          </Select.Option>
        ))}
      </Select>
    </div>
  )
}

export default SortSelection
