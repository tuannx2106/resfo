import React from 'react'
import { Space, Checkbox } from 'antd'
import { CheckboxChangeEvent } from 'antd/lib/checkbox'
import clsx from 'clsx'
import { HOME_TYPES, SearchItemProps } from '../SearchSection/types'
import { HOME_TYPE_OPTIONS } from '../SearchSectionFormModal/constant'
import s from './SearchHomeType.module.scss'
import SearchFormSection from '../SearchFormSection'

const SearchHomeType = ({ value, setSearchFormValue, dropdown = false }: SearchItemProps) => {
  const selectAll = value.homeTypes?.length === HOME_TYPE_OPTIONS.length
  const homeTypes: HOME_TYPES[] = value.homeTypes || []

  const setHomeTypeValue = (typeVal: HOME_TYPES) => {
    setSearchFormValue({
      ...value,
      homeTypes: homeTypes.includes(typeVal) ? homeTypes.filter((type) => type !== typeVal) : homeTypes.concat(typeVal),
    })
  }

  const toggleSelectAll = (e: CheckboxChangeEvent) => {
    const homeTypesSelected = e.target.checked ? HOME_TYPE_OPTIONS.map((type) => type.value) : []
    setSearchFormValue({
      ...value,
      homeTypes: homeTypesSelected,
    })
  }

  return (
    <SearchFormSection>
      <div
        className={clsx({
          [s.menus]: true,
          [s.isDropdown]: dropdown,
        })}
      >
        <h3 className={s.title}>Home Type</h3>
        <div className={s.subTitle}>
          <Checkbox checked={selectAll} onChange={(e) => toggleSelectAll(e)}>
            {selectAll ? 'Deselect All' : 'Select All'}
          </Checkbox>
        </div>

        <Space direction="vertical" size="middle" wrap>
          {HOME_TYPE_OPTIONS.map((option) => (
            <Checkbox
              key={option.value}
              checked={selectAll || homeTypes.includes(option.value)}
              onChange={() => setHomeTypeValue(option.value)}
            >
              {option.label}
            </Checkbox>
          ))}
        </Space>
      </div>
    </SearchFormSection>
  )
}

export default SearchHomeType
