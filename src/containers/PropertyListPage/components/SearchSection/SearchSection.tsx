/* eslint-disable no-shadow */
import React, { useState } from 'react'
import { Modal } from 'antd'
import clsx from 'clsx'
import { useRouter } from 'next/dist/client/router'
import Button from 'components/Button'
import HomeSearchType from 'components/HomeSearchType'
import LocationSearch from 'components/LocationSearch'
import { SIZES } from 'components/LocationSearch/types'
import Dropdown from 'components/Dropdown'
import { HOME_TYPES, SearchForm, SEARCH_PURPOSES } from './types'
import s from './SearchSection.module.scss'
import SearchSectionFormModal from '../SearchSectionFormModal'
import SearchPurposeMenus from '../SearchPurposeMenu'
import SearchPriceMenu from '../SearchPriceMenu'
import SearchBedABathMenu from '../SearchBedABathMenu'
import SearchHomeType from '../SearchHomeType'

const SearchSection = () => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false)
  const [hash, setHash] = useState<string>('')
  const [searchFormValue, setSearchFormValue] = useState<SearchForm>({
    purpose: SEARCH_PURPOSES.SALE,
    bed: 0,
    bedExact: false,
    bathRoom: 0,
    homeTypes: [HOME_TYPES.APARTMENTS, HOME_TYPES.HOUSES, HOME_TYPES.TOWN_HOMES],
    squareFeet: {
      from: 0,
      to: 0,
    },
    lotSize: {
      from: 0,
      to: 0,
    },
    yearBuilt: {
      from: 0,
      to: 0,
    },
    basement: false,
    numberOfStories: false,
    tours: false,
    pets: undefined,
    other: undefined,
    view: undefined,
  })

  const router = useRouter()

  const ModalSearchMoreTitle = (
    <>
      <Button size="large" onClick={() => setIsModalVisible(false)}>
        Reset
      </Button>
      <h3 className={s.sectionModalTitle}>344 Results</h3>
      <Button size="large" type="primary" onClick={() => setIsModalVisible(false)}>
        Done
      </Button>
    </>
  )

  const openModalWithExactSection = (_hash: string) => {
    setHash(_hash)
    setIsModalVisible(true)
  }

  return (
    <>
      <div className={s.searchSection}>
        <div className={s.searchSectionLeft}>
          <LocationSearch size={SIZES.SMALL} />

          {/* purpose menus */}
          <Dropdown
            placement="bottomLeft"
            title={<SearchPurposeMenus value={searchFormValue} setSearchFormValue={setSearchFormValue} dropdown />}
          >
            <Button>
              <HomeSearchType type={SEARCH_PURPOSES.SALE} />
            </Button>
          </Dropdown>

          {/* price menu */}
          <Dropdown
            placement="bottomLeft"
            title={<SearchPriceMenu value={searchFormValue} setSearchFormValue={setSearchFormValue} dropdown />}
          >
            <Button>Any price</Button>
          </Dropdown>

          {/* bed and baths */}
          <Dropdown
            placement="bottomLeft"
            title={<SearchBedABathMenu value={searchFormValue} setSearchFormValue={setSearchFormValue} dropdown />}
          >
            <Button>Bed & Baths</Button>
          </Dropdown>

          {/* home type */}
          <Dropdown title={<SearchHomeType value={searchFormValue} setSearchFormValue={setSearchFormValue} dropdown />}>
            <Button>Home type</Button>
          </Dropdown>

          <Button className={s.moreButton} onClick={() => setIsModalVisible(true)}>
            More
          </Button>

          <Button className={s.saveButton} type="primary">
            Save search
          </Button>
        </div>

        <div className={s.searchSectionMiddle}>
          <Button
            className={clsx({
              [s.filterButton]: true,
            })}
            type="primary"
            onClick={() => setIsModalVisible(true)}
          >
            Filters
          </Button>

          <Button type="primary">Save search</Button>
        </div>

        <div className={s.searchSectionRight}>
          <Button type="link" className={s.saveText}>
            5 saved homes
          </Button>
        </div>
      </div>

      <Modal
        visible={isModalVisible}
        closable={false}
        title={ModalSearchMoreTitle}
        wrapClassName={s.searchSectionModal}
        width={540}
        footer={null}
        onOk={() => setIsModalVisible(false)}
        onCancel={() => setIsModalVisible(false)}
      >
        <SearchSectionFormModal
          key={router.route}
          value={searchFormValue}
          setSearchFormValue={setSearchFormValue}
          hash={hash}
        />
      </Modal>
    </>
  )
}

export default SearchSection
