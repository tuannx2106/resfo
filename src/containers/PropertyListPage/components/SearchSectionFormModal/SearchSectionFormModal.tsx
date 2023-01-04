/* eslint-disable react/no-unused-prop-types */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable operator-linebreak */
import React, { useState, useEffect } from 'react'
import { Checkbox, Space, Select } from 'antd'
import clsx from 'clsx'
import { cloneDeep as _cloneDeep } from 'lodash'
import s from './SearchSectionFormModal.module.scss'
import { SearchForm, VIEW_TYPES, OTHER_AMENITIES, PET_TYPES } from '../SearchSection/types'
import { SQUARE_FEET_OPTIONS, VIEW_OPTIONS, OTHER_AMENITY_OPTIONS, PET_OPTIONS } from './constant'
import SearchPurposeMenu from '../SearchPurposeMenu'
import SearchBedABathMenu from '../SearchBedABathMenu'
import SearchHomeType from '../SearchHomeType'
import SearchPriceMenu from '../SearchPriceMenu'

type SearchItemProps = {
  value: SearchForm
  setSearchFormValue: (val: SearchForm) => void
}

type SearchFormProps = SearchItemProps & {
  hash: string
}

/* ------------------------- square feet ---------------------------- */

const SquareFeet = ({ value }: SearchItemProps) => (
  <section
    className={clsx({
      [s.formSection]: true,
      [s.inline]: true,
    })}
  >
    <h3 className={s.formSectionTitle}>square feet</h3>

    <div
      className={clsx({
        [s.squareFeetMenus]: true,
        [s.formSectionInlineBody]: true,
      })}
    >
      <Space size="middle" wrap>
        <Select defaultValue={value.squareFeet.from} className={s.squareFeetMenuItem} size="large">
          {SQUARE_FEET_OPTIONS.map((option) => (
            <Select.Option key={option.value} value={option.value}>
              {option.label}
            </Select.Option>
          ))}
        </Select>

        <Select defaultValue={value.squareFeet.to} className={s.squareFeetMenuItem} size="large">
          {SQUARE_FEET_OPTIONS.map((option) => (
            <Select.Option key={option.value} value={option.value}>
              {option.label}
            </Select.Option>
          ))}
        </Select>
      </Space>
    </div>
  </section>
)

/* ------------------------- lot size ---------------------------- */

const LotSize = ({ value }: SearchItemProps) => (
  <section
    className={clsx({
      [s.formSection]: true,
      [s.inline]: true,
    })}
  >
    <h3 className={s.formSectionTitle}>lot size</h3>

    <div
      className={clsx({
        [s.squareFeetMenus]: true,
        [s.formSectionInlineBody]: true,
      })}
    >
      <Space size="middle" wrap>
        <Select defaultValue={value.squareFeet.from} className={s.squareFeetMenuItem} size="large">
          {SQUARE_FEET_OPTIONS.map((option) => (
            <Select.Option key={option.value} value={option.value}>
              {option.label}
            </Select.Option>
          ))}
        </Select>

        <Select defaultValue={value.squareFeet.to} className={s.squareFeetMenuItem} size="large">
          {SQUARE_FEET_OPTIONS.map((option) => (
            <Select.Option key={option.value} value={option.value}>
              {option.label}
            </Select.Option>
          ))}
        </Select>
      </Space>
    </div>
  </section>
)

/* ------------------------- year build ---------------------------- */

const YearBuilt = ({ value }: SearchItemProps) => (
  <section
    className={clsx({
      [s.formSection]: true,
      [s.inline]: true,
    })}
  >
    <h3 className={s.formSectionTitle}>year built</h3>

    <div
      className={clsx({
        [s.squareFeetMenus]: true,
        [s.formSectionInlineBody]: true,
      })}
    >
      <Space size="middle" wrap>
        <Select defaultValue={value.squareFeet.from} className={s.squareFeetMenuItem} size="large">
          {SQUARE_FEET_OPTIONS.map((option) => (
            <Select.Option key={option.value} value={option.value}>
              {option.label}
            </Select.Option>
          ))}
        </Select>

        <Select defaultValue={value.squareFeet.to} className={s.squareFeetMenuItem} size="large">
          {SQUARE_FEET_OPTIONS.map((option) => (
            <Select.Option key={option.value} value={option.value}>
              {option.label}
            </Select.Option>
          ))}
        </Select>
      </Space>
    </div>
  </section>
)

/* ------------------------- basement ---------------------------- */

const Basement = ({ value, setSearchFormValue }: SearchItemProps) => (
  <section
    className={clsx({
      [s.formSection]: true,
      [s.inline]: true,
      [s.disabledChange]: true,
    })}
  >
    <h3 className={s.formSectionTitle}>Basement</h3>

    <div className={s.formSectionInlineBody}>
      <Space direction="vertical" size="middle" wrap>
        <Checkbox
          checked={value.basement}
          onChange={(e) =>
            setSearchFormValue({
              ...value,
              basement: e.target.checked,
            })
          }
        >
          Has Basement
        </Checkbox>
      </Space>
    </div>
  </section>
)

/* ------------------------- number of stories ---------------------------- */

const NumberOfStory = ({ value, setSearchFormValue }: SearchItemProps) => (
  <section
    className={clsx({
      [s.formSection]: true,
      [s.inline]: true,
      [s.disabledChange]: true,
    })}
  >
    <h3 className={s.formSectionTitle}>Number of stories</h3>
    <div className={s.formSectionInlineBody}>
      <Space direction="vertical" size="middle" wrap>
        <Checkbox
          checked={value.numberOfStories}
          onChange={(e) =>
            setSearchFormValue({
              ...value,
              numberOfStories: e.target.checked,
            })
          }
        >
          Single-story only
        </Checkbox>
      </Space>
    </div>
  </section>
)

/* ------------------------- tours ---------------------------- */

const Tours = ({ value, setSearchFormValue }: SearchItemProps) => (
  <section className={s.formSection}>
    <h3 className={s.formSectionTitle}>tours</h3>

    <Space direction="vertical" size="middle" wrap className={s.formSectionSpacing}>
      <Checkbox
        checked={value.tours}
        onChange={(e) =>
          setSearchFormValue({
            ...value,
            tours: e.target.checked,
          })
        }
      >
        Must have 3D Tour
      </Checkbox>
    </Space>
  </section>
)

/* ------------------------- pets ---------------------------- */

const PetMenus = ({ value, setSearchFormValue }: SearchItemProps) => {
  const setSelectedValue = (val: PET_TYPES) => {
    let otherSelectedValues = value.pets || []
    otherSelectedValues = otherSelectedValues.includes(val)
      ? otherSelectedValues.filter((selectedVal) => selectedVal !== val)
      : otherSelectedValues.concat(val)
    setSearchFormValue({
      ...value,
      pets: otherSelectedValues,
    })
  }

  return (
    <section className={s.formSection}>
      <h3 className={s.formSectionTitle}>pets</h3>

      <Space direction="vertical" size="middle" wrap className={s.formSectionSpacing}>
        {PET_OPTIONS.map((option) => (
          <Checkbox
            key={option.value}
            checked={value.pets?.includes(option.value)}
            onChange={() => setSelectedValue(option.value)}
          >
            {option.label}
          </Checkbox>
        ))}
      </Space>
    </section>
  )
}

/* ------------------------- other amenity menu ---------------------------- */

const OtherAmenityMenus = ({ value, setSearchFormValue }: SearchItemProps) => {
  const setSelectedValue = (val: OTHER_AMENITIES) => {
    let otherSelectedValues = value.other || []
    otherSelectedValues = otherSelectedValues.includes(val)
      ? otherSelectedValues.filter((selectedVal) => selectedVal !== val)
      : otherSelectedValues.concat(val)
    setSearchFormValue({
      ...value,
      other: otherSelectedValues,
    })
  }

  return (
    <section className={s.formSection}>
      <h3 className={s.formSectionTitle}>other amenities</h3>

      <Space direction="vertical" size="middle" wrap className={s.formSectionSpacing}>
        {OTHER_AMENITY_OPTIONS.map((option) => (
          <Checkbox
            key={option.value}
            checked={value.other?.includes(option.value)}
            onChange={() => setSelectedValue(option.value)}
          >
            {option.label}
          </Checkbox>
        ))}
      </Space>
    </section>
  )
}

/* ------------------------- view menu ---------------------------- */

const ViewMenus = ({ value, setSearchFormValue }: SearchItemProps) => {
  const setSelectedValue = (val: VIEW_TYPES) => {
    let viewSelectedValues = value.view || []
    viewSelectedValues = viewSelectedValues.includes(val)
      ? viewSelectedValues.filter((selectedVal) => selectedVal !== val)
      : viewSelectedValues.concat(val)
    setSearchFormValue({
      ...value,
      view: viewSelectedValues,
    })
  }

  return (
    <section className={s.formSection}>
      <h3 className={s.formSectionTitle}>View</h3>

      <Space direction="vertical" size="middle" wrap className={s.formSectionSpacing}>
        {VIEW_OPTIONS.map((option) => (
          <Checkbox
            key={option.value}
            checked={value.view?.includes(option.value)}
            onChange={() => setSelectedValue(option.value)}
          >
            {option.label}
          </Checkbox>
        ))}
      </Space>
    </section>
  )
}

const SearchSectionFormModal = ({ value, hash }: SearchFormProps) => {
  const [localValue, setSearchFormLocalValue] = useState<SearchForm>(_cloneDeep(value))

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let scrollTimeout: any
    const el = document.getElementById(hash)
    if (el) {
      scrollTimeout = setTimeout(() => {
        el.scrollIntoView({
          block: 'start',
          behavior: 'smooth',
        })
      }, 500)
    }

    return () => {
      if (scrollTimeout) window.clearTimeout(scrollTimeout)
    }
  }, [hash])

  return (
    <>
      <SearchPurposeMenu value={localValue} setSearchFormValue={setSearchFormLocalValue} />
      <SearchBedABathMenu value={localValue} setSearchFormValue={setSearchFormLocalValue} />
      <SearchPriceMenu value={localValue} setSearchFormValue={setSearchFormLocalValue} />
      <SearchHomeType value={localValue} setSearchFormValue={setSearchFormLocalValue} />
      <SquareFeet value={localValue} setSearchFormValue={setSearchFormLocalValue} />
      <LotSize value={localValue} setSearchFormValue={setSearchFormLocalValue} />
      <YearBuilt value={localValue} setSearchFormValue={setSearchFormLocalValue} />
      <Basement value={localValue} setSearchFormValue={setSearchFormLocalValue} />
      <NumberOfStory value={localValue} setSearchFormValue={setSearchFormLocalValue} />
      <Tours value={localValue} setSearchFormValue={setSearchFormLocalValue} />
      <PetMenus value={localValue} setSearchFormValue={setSearchFormLocalValue} />
      <OtherAmenityMenus value={localValue} setSearchFormValue={setSearchFormLocalValue} />
      <ViewMenus value={localValue} setSearchFormValue={setSearchFormLocalValue} />
    </>
  )
}

export default SearchSectionFormModal
