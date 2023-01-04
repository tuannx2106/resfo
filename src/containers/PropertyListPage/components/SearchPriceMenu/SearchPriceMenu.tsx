import React from 'react'
import { InputNumber, Space } from 'antd'
import clsx from 'clsx'
import s from './SearchPriceMenu.module.scss'
import { SearchItemProps } from '../SearchSection/types'
import SearchFormSection from '../SearchFormSection'

const SearchPriceMenu = ({ value, setSearchFormValue, dropdown = false }: SearchItemProps) => (
  <SearchFormSection>
    <div
      className={clsx({
        [s.priceMenus]: true,
        [s.isDropdown]: dropdown,
      })}
    >
      <p className={s.title}>Price Range</p>
      <Space size="middle" wrap>
        <InputNumber placeholder="from" size="large" />
        <InputNumber placeholder="to" size="large" />
      </Space>
    </div>
  </SearchFormSection>
)

export default SearchPriceMenu
