import React, { useState } from 'react'
import { SEARCH_PURPOSES } from 'globalTypes/property'
import clsx from 'clsx'
import Button from 'components/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons'
import { SEARCH_PURPOSE_OPTIONS } from '../SearchSectionFormModal/constant'
import s from './SearchPurposeMenu.module.scss'
import { SearchItemProps } from '../SearchSection/types'

const SearchPurposeMenu = ({ value, setSearchFormValue, dropdown = false }: SearchItemProps) => {
  const [isSaleDropdownVisible, setIsSaleDropdownVisible] = useState<boolean>(false)

  return (
    <div
      className={clsx({
        [s.purposeMenus]: true,
        [s.isDropdown]: dropdown,
      })}
    >
      {SEARCH_PURPOSE_OPTIONS.map((option) => {
        const isSale = option.value === SEARCH_PURPOSES.SALE

        return (
          <div className={s.menuWrapper} key={option.value}>
            <div
              role="presentation"
              className={clsx({
                [s.menu]: true,
                [s.selected]: value.purpose === option.value,
              })}
              onClick={() =>
                setSearchFormValue({
                  ...value,
                  purpose: option.value,
                })
              }
            >
              <div className={s.menuHeader}>
                <span className={s.menuRadio} />
                <span
                  className={clsx({
                    [s.menuMarked]: true,
                    [s.sale]: option.value === SEARCH_PURPOSES.SALE,
                    [s.rent]: option.value === SEARCH_PURPOSES.RENT,
                    [s.sold]: option.value === SEARCH_PURPOSES.SOLD,
                  })}
                />
                {option.label}
              </div>

              {isSale && (
                <Button
                  type="link"
                  size="large"
                  className={s.menuToggleBtn}
                  onClick={(e) => {
                    e.stopPropagation()
                    setIsSaleDropdownVisible(!isSaleDropdownVisible)
                  }}
                >
                  {isSaleDropdownVisible ? (
                    <FontAwesomeIcon icon={faAngleDown} size="lg" />
                  ) : (
                    <FontAwesomeIcon icon={faAngleUp} size="lg" />
                  )}
                </Button>
              )}
            </div>

            {isSale && isSaleDropdownVisible && (
              <div>
                <p>das</p>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
export default SearchPurposeMenu
