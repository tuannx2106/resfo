/* eslint-disable indent */
import React from 'react'
import { Checkbox, Space, Select } from 'antd'
import clsx from 'clsx'
import {
  SQUARE_FEET_OPTIONS,
  FACILITY_OPTIONS,
  FURNITURE_OPTIONS,
  initFilterBy,
} from 'containers/PropertyListPage/constants'
import { SearchForm } from 'containers/PropertyListPage/types'
import { PropertyFacilities, PropertyFurnitures } from 'globalTypes/property'
import { getRangeOptions } from 'containers/PropertyListPage/helpers'
import s from './SearchMore.module.scss'
import SearchPurposeMenu from '../SearchPurposeMenu'
import SearchBedABathMenu from '../SearchBedABathMenu'
import SearchHomeType from '../SearchHomeType'
import SearchPriceMenu from '../SearchPriceMenu'

type SearchItemProps = {
  value: SearchForm
  setSearchFormValue: (val: SearchForm) => void
}

type SearchMoreProps = SearchItemProps & {
  type: 'dropdown' | 'modal'
}

/* ------------------------- square feet ---------------------------- */

const SquareFeet = ({ value, setSearchFormValue }: SearchItemProps) => {
  const { fromOptions, toOptions } = getRangeOptions(SQUARE_FEET_OPTIONS, value.area, 9999999999)

  return (
    <section
      className={clsx({
        [s.formSection]: true,
        [s.inline]: true,
      })}
    >
      <h3 className={s.formSectionTitle}>area</h3>

      <div
        className={clsx({
          [s.squareFeetMenus]: true,
          [s.formSectionInlineBody]: true,
        })}
      >
        <Space size="middle" wrap>
          <Select
            value={value.area[0]}
            className={s.squareFeetMenuItem}
            size="large"
            onChange={(val) => {
              setSearchFormValue({
                ...value,
                area: [val, value.area[1]],
              })
            }}
          >
            {fromOptions.map((option) => (
              <Select.Option key={option.value} value={option.value}>
                {option.label}
              </Select.Option>
            ))}
          </Select>

          <Select
            value={value.area[1]}
            className={s.squareFeetMenuItem}
            size="large"
            onChange={(val) => {
              setSearchFormValue({
                ...value,
                area: [value.area[0], val],
              })
            }}
          >
            {toOptions.map((option) => (
              <Select.Option key={option.value} value={option.value}>
                {option.label}
              </Select.Option>
            ))}
          </Select>
        </Space>
      </div>
    </section>
  )
}

/* ------------------------- facility menu ---------------------------- */

const FacilityMenus = ({ value, setSearchFormValue }: SearchItemProps) => {
  const selectedValues = value.facilities.map((item) => item.name)

  const setSelectedValue = (val: PropertyFacilities) => {
    let vals = value.facilities || []
    vals = selectedValues.includes(val) ? vals.filter((item) => item.name !== val) : vals.concat({ name: val })
    setSearchFormValue({
      ...value,
      facilities: vals,
    })
  }

  return (
    <section className={s.formSection}>
      <h3 className={s.formSectionTitle}>facilities</h3>

      <Space direction="vertical" size="middle" wrap className={s.formSectionSpacing}>
        {FACILITY_OPTIONS.map((option) => (
          <Checkbox
            key={option.value}
            checked={selectedValues.includes(option.value)}
            onChange={() => setSelectedValue(option.value)}
          >
            {option.label}
          </Checkbox>
        ))}
      </Space>
    </section>
  )
}

/* ------------------------- furniture menu ---------------------------- */

const FurnitureMenus = ({ value, setSearchFormValue }: SearchItemProps) => {
  const selectedValues = value.furnitures.map((item) => item.type)

  const setSelectedValue = (val: PropertyFurnitures) => {
    let vals = value.furnitures || []
    vals = selectedValues.includes(val) ?
      vals.filter((item) => item.type !== val) :
      vals.concat({
          type: val,
          name: 'stove',
        })
    setSearchFormValue({
      ...value,
      furnitures: vals,
    })
  }

  return (
    <section className={s.formSection}>
      <h3 className={s.formSectionTitle}>furniture</h3>

      <Space direction="vertical" size="middle" wrap className={s.formSectionSpacing}>
        {FURNITURE_OPTIONS.map((option) => (
          <Checkbox
            key={option.value}
            checked={selectedValues.includes(option.value)}
            onChange={() => setSelectedValue(option.value)}
          >
            {option.label}
          </Checkbox>
        ))}
      </Space>
    </section>
  )
}

/* ------------------------- lot size ---------------------------- */

// const LotSize = ({ value }: SearchItemProps) => (
//   <section
//     className={clsx({
//       [s.formSection]: true,
//       [s.inline]: true,
//     })}
//   >
//     <h3 className={s.formSectionTitle}>lot size</h3>

//     <div
//       className={clsx({
//         [s.squareFeetMenus]: true,
//         [s.formSectionInlineBody]: true,
//       })}
//     >
//       <Space size="middle" wrap>
//         <Select defaultValue={value.area[0]} className={s.squareFeetMenuItem} size="large">
//           {SQUARE_FEET_OPTIONS.map((option) => (
//             <Select.Option key={option.value} value={option.value}>
//               {option.label}
//             </Select.Option>
//           ))}
//         </Select>

//         <Select defaultValue={value.area[1]} className={s.squareFeetMenuItem} size="large">
//           {SQUARE_FEET_OPTIONS.map((option) => (
//             <Select.Option key={option.value} value={option.value}>
//               {option.label}
//             </Select.Option>
//           ))}
//         </Select>
//       </Space>
//     </div>
//   </section>
// )

/* ------------------------- year build ---------------------------- */

// const YearBuilt = ({ value }: SearchItemProps) => (
//   <section
//     className={clsx({
//       [s.formSection]: true,
//       [s.inline]: true,
//     })}
//   >
//     <h3 className={s.formSectionTitle}>year built</h3>

//     <div
//       className={clsx({
//         [s.squareFeetMenus]: true,
//         [s.formSectionInlineBody]: true,
//       })}
//     >
//       <Space size="middle" wrap>
//         <Select defaultValue={value.area[0]} className={s.squareFeetMenuItem} size="large">
//           {SQUARE_FEET_OPTIONS.map((option) => (
//             <Select.Option key={option.value} value={option.value}>
//               {option.label}
//             </Select.Option>
//           ))}
//         </Select>

//         <Select defaultValue={value.area[1]} className={s.squareFeetMenuItem} size="large">
//           {SQUARE_FEET_OPTIONS.map((option) => (
//             <Select.Option key={option.value} value={option.value}>
//               {option.label}
//             </Select.Option>
//           ))}
//         </Select>
//       </Space>
//     </div>
//   </section>
// )

/* ------------------------- basement ---------------------------- */

// const Basement = ({ value, setSearchFormValue }: SearchItemProps) => (
//   <section
//     className={clsx({
//       [s.formSection]: true,
//       [s.inline]: true,
//       [s.disabledChange]: true,
//     })}
//   >
//     <h3 className={s.formSectionTitle}>Basement</h3>

//     <div className={s.formSectionInlineBody}>
//       <Space direction="vertical" size="middle" wrap>
//         <Checkbox
//           checked={value.basement}
//           onChange={(e) =>
//             setSearchFormValue({
//               ...value,
//               basement: e.target.checked,
//             })
//           }
//         >
//           Has Basement
//         </Checkbox>
//       </Space>
//     </div>
//   </section>
// )

/* ------------------------- number of stories ---------------------------- */

// const NumberOfStory = ({ value, setSearchFormValue }: SearchItemProps) => (
//   <section
//     className={clsx({
//       [s.formSection]: true,
//       [s.inline]: true,
//       [s.disabledChange]: true,
//     })}
//   >
//     <h3 className={s.formSectionTitle}>Number of stories</h3>
//     <div className={s.formSectionInlineBody}>
//       <Space direction="vertical" size="middle" wrap>
//         <Checkbox
//           checked={value.numberOfStories}
//           onChange={(e) =>
//             setSearchFormValue({
//               ...value,
//               numberOfStories: e.target.checked,
//             })
//           }
//         >
//           Single-story only
//         </Checkbox>
//       </Space>
//     </div>
//   </section>
// )

/* ------------------------- tours ---------------------------- */

// const Tours = ({ value, setSearchFormValue }: SearchItemProps) => (
//   <section className={s.formSection}>
//     <h3 className={s.formSectionTitle}>tours</h3>

//     <Space direction="vertical" size="middle" wrap className={s.formSectionSpacing}>
//       <Checkbox
//         checked={value.tours}
//         onChange={(e) =>
//           setSearchFormValue({
//             ...value,
//             tours: e.target.checked,
//           })
//         }
//       >
//         Must have 3D Tour
//       </Checkbox>
//     </Space>
//   </section>
// )

/* ------------------------- pets ---------------------------- */

// const PetMenus = ({ value, setSearchFormValue }: SearchItemProps) => {
//   const setSelectedValue = (val: PET_TYPES) => {
//     let otherSelectedValues = value.pets || []
//     otherSelectedValues = otherSelectedValues.includes(val)
//       ? otherSelectedValues.filter((selectedVal) => selectedVal !== val)
//       : otherSelectedValues.concat(val)
//     setSearchFormValue({
//       ...value,
//       pets: otherSelectedValues,
//     })
//   }

//   return (
//     <section className={s.formSection}>
//       <h3 className={s.formSectionTitle}>pets</h3>

//       <Space direction="vertical" size="middle" wrap className={s.formSectionSpacing}>
//         {PET_OPTIONS.map((option) => (
//           <Checkbox
//             key={option.value}
//             checked={value.pets?.includes(option.value)}
//             onChange={() => setSelectedValue(option.value)}
//           >
//             {option.label}
//           </Checkbox>
//         ))}
//       </Space>
//     </section>
//   )
// }

/* ------------------------- other amenity menu ---------------------------- */

// const OtherAmenityMenus = ({ value, setSearchFormValue }: SearchItemProps) => {
//   const setSelectedValue = (val: OTHER_AMENITIES) => {
//     let otherSelectedValues = value.other || []
//     otherSelectedValues = otherSelectedValues.includes(val)
//       ? otherSelectedValues.filter((selectedVal) => selectedVal !== val)
//       : otherSelectedValues.concat(val)
//     setSearchFormValue({
//       ...value,
//       other: otherSelectedValues,
//     })
//   }

//   return (
//     <section className={s.formSection}>
//       <h3 className={s.formSectionTitle}>other amenities</h3>

//       <Space direction="vertical" size="middle" wrap className={s.formSectionSpacing}>
//         {OTHER_AMENITY_OPTIONS.map((option) => (
//           <Checkbox
//             key={option.value}
//             checked={value.other?.includes(option.value)}
//             onChange={() => setSelectedValue(option.value)}
//           >
//             {option.label}
//           </Checkbox>
//         ))}
//       </Space>
//     </section>
//   )
// }

/* ------------------------- view menu ---------------------------- */

// const ViewMenus = ({ value, setSearchFormValue }: SearchItemProps) => {
//   const setSelectedValue = (val: VIEW_TYPES) => {
//     let viewSelectedValues = value.view || []
//     viewSelectedValues = viewSelectedValues.includes(val)
//       ? viewSelectedValues.filter((selectedVal) => selectedVal !== val)
//       : viewSelectedValues.concat(val)
//     setSearchFormValue({
//       ...value,
//       view: viewSelectedValues,
//     })
//   }

//   return (
//     <section className={s.formSection}>
//       <h3 className={s.formSectionTitle}>View</h3>

//       <Space direction="vertical" size="middle" wrap className={s.formSectionSpacing}>
//         {VIEW_OPTIONS.map((option) => (
//           <Checkbox
//             key={option.value}
//             checked={value.view?.includes(option.value)}
//             onChange={() => setSelectedValue(option.value)}
//           >
//             {option.label}
//           </Checkbox>
//         ))}
//       </Space>
//     </section>
//   )
// }

const SearchMore = ({ value, setSearchFormValue, type }: SearchMoreProps) => (
  // const [localValue, setSearchFormLocalValue] = useState<SearchForm>(_cloneDeep(value))
  <>
    <div
      className={clsx({
        [s.root]: true,
        [s.isModal]: type === 'modal',
        [s.isDropdown]: type === 'dropdown',
      })}
    >
      {type === 'modal' && (
        <>
          <SearchPurposeMenu value={value} setSearchFormValue={setSearchFormValue} />
          <SearchBedABathMenu value={value} setSearchFormValue={setSearchFormValue} />
          <SearchPriceMenu value={value} setSearchFormValue={setSearchFormValue} />
          <SearchHomeType value={value} setSearchFormValue={setSearchFormValue} />
        </>
      )}
      <SquareFeet value={value} setSearchFormValue={setSearchFormValue} />
      <FacilityMenus value={value} setSearchFormValue={setSearchFormValue} />
      <FurnitureMenus value={value} setSearchFormValue={setSearchFormValue} />

      {/* <LotSize value={localValue} setSearchFormValue={setSearchFormLocalValue} /> */}
      {/* <YearBuilt value={localValue} setSearchFormValue={setSearchFormLocalValue} /> */}
      {/* <Basement value={localValue} setSearchFormValue={setSearchFormLocalValue} /> */}
      {/* <NumberOfStory value={localValue} setSearchFormValue={setSearchFormLocalValue} /> */}
      {/* <Tours value={localValue} setSearchFormValue={setSearchFormLocalValue} /> */}
      {/* <PetMenus value={localValue} setSearchFormValue={setSearchFormLocalValue} /> */}
      {/* <OtherAmenityMenus value={localValue} setSearchFormValue={setSearchFormLocalValue} /> */}
      {/* <ViewMenus value={localValue} setSearchFormValue={setSearchFormLocalValue} /> */}
    </div>

    {type === 'dropdown' && (
      <div className={s.filterButtonWrapper}>
        <div className={s.filterButton} role="presentation" onClick={() => setSearchFormValue(initFilterBy)}>
          Reset all filters
        </div>
      </div>
    )}
  </>
)

export default SearchMore
