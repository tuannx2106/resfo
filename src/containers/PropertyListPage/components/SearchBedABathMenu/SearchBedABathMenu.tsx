import React from 'react'
import { Checkbox, Radio } from 'antd'
import clsx from 'clsx'
import s from './SearchBedABathMenu.module.scss'
import { BATH_ROOM_OPTIONS, BED_OPTIONS } from '../SearchSectionFormModal/constant'
import { SearchItemProps } from '../SearchSection/types'
import SearchFormSection from '../SearchFormSection'

const SearchBedABathMenu = ({ value, setSearchFormValue, dropdown = false }: SearchItemProps) => {
  const { bedExact } = value

  return (
    <section
      className={clsx({
        [s.menus]: true,
        [s.isDropdown]: dropdown,
      })}
    >
      <SearchFormSection>
        <h3 className={s.title}>Beds</h3>
        <div className={s.bedMenus}>
          <Radio.Group
            size="large"
            defaultValue={value.bed}
            className={s.groupButton}
            onChange={(e) => {
              setSearchFormValue({
                ...value,
                bed: e.target.value,
              })
            }}
          >
            {BED_OPTIONS.map((option) => (
              <Radio.Button key={option.value} value={option.value} className={s.groupButtonItem}>
                {bedExact ? option.label : option.rangeLabel}
              </Radio.Button>
            ))}
          </Radio.Group>

          <div className={s.bedExactCheckbox}>
            <Checkbox
              checked={bedExact}
              onChange={() =>
                setSearchFormValue({
                  ...value,
                  bedExact: !bedExact,
                })
              }
            >
              Use exact match
            </Checkbox>
          </div>
        </div>
      </SearchFormSection>

      <SearchFormSection>
        <h3 className={s.title}>bathrooms</h3>
        <Radio.Group
          size="large"
          defaultValue={value.bed}
          className={s.groupButton}
          onChange={(e) => {
            setSearchFormValue({
              ...value,
              bathRoom: e.target.value,
            })
          }}
        >
          {BATH_ROOM_OPTIONS.map((option) => (
            <Radio.Button key={option.value} value={option.value} className={s.groupButtonItem}>
              {option.label}
            </Radio.Button>
          ))}
        </Radio.Group>
      </SearchFormSection>
    </section>
  )
}

export default SearchBedABathMenu
