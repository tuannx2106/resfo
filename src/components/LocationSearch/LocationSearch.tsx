/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/no-array-index-key */
import React, { memo, useEffect, useState, useRef } from 'react'
import { notification, Input, Spin } from 'antd'
import clsx from 'clsx'
import { faHome, faMapMarkerAlt, faSearch, faSearchLocation } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { SearchOutlined } from '@ant-design/icons'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { useRouter } from 'next/router'
import { useAppSelector, useAppDispatch } from 'store'
import { updateIsVisibleSearchItems } from 'containers/HomePage/slice'
import s from './LocationSearch.module.scss'
import { LocationSearchItem, LOCATION_TYPES, SIZES } from './types'

type LocationSearchProp = {
  size: SIZES
  isMap?: boolean
}

const LocationSearch = ({ size = SIZES.LARGE, isMap = true }: LocationSearchProp) => {
  const router = useRouter()
  const [isVisibleLocationSearch] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [searchKey, setSearchKey] = useState<string>('')

  const isVisibleSearchItems = useAppSelector(({ homePage }) => homePage.isVisibleSearchItems)
  const dispatch = useAppDispatch()

  const authSession = useAppSelector(({ authSlice }) => authSlice.session)
  const dummyData: LocationSearchItem[] = [
    {
      type: LOCATION_TYPES.CURRENT,
      location: 'Current Location',
    },
    {
      type: LOCATION_TYPES.COMMON,
      location: 'New York',
    },
    {
      type: LOCATION_TYPES.COMMON,
      location: 'HCM',
    },
    {
      type: LOCATION_TYPES.PREVIOUS_KEY,
      location: 'HN',
    },
  ]
  // set saved homes if login
  if (authSession) {
    dummyData.push({
      type: LOCATION_TYPES.SAVED,
      location: 'Your Saved Homes (5 homes)',
    })
  }

  const inputEl = useRef<Input>(null)

  const openNotification = () => {
    const args = {
      message: 'Notification',
      description: 'There is no location support on this device or it is disabled. Please check your settings.',
      duration: 5,
    }
    notification.warning(args)
  }

  // click select search items
  const searchBySelectedItem = ({ type }: LocationSearchItem) => {
    setIsLoading(true)

    switch (type) {
      case LOCATION_TYPES.CURRENT:
        if ('geolocation' in navigator) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              console.log(position)
              setIsLoading(false)
            },
            (errorMessage) => {
              console.log(errorMessage)
              openNotification()
              setIsLoading(false)
            },
          )
        } else {
          setIsLoading(false)
          openNotification()
        }
        break
      case LOCATION_TYPES.SAVED:
        setIsLoading(false)
        // go to saved home page
        router.push('/property/list')
        break
      default:
        setIsLoading(false)
        // go to property/list page
        router.push('/property/list')
        break
    }
  }

  // search by enter input key
  const searchByKey = () => {
    if (!searchKey) return
    console.log(searchKey)
  }

  const dummyDataFiltered = () =>
    dummyData.filter((item) => item.location.toLocaleLowerCase().includes(searchKey.toLocaleLowerCase()))

  const SearchSuffixIcon = <SearchOutlined style={{ fontSize: '24px' }} onClick={searchByKey} />
  const MapSuffixIcon = (
    <FontAwesomeIcon icon={faMapMarkerAlt} size={size === SIZES.LARGE ? '2x' : '1x'} onClick={searchByKey} />
  )
  const SuffixIcon = isMap ? SearchSuffixIcon : MapSuffixIcon

  useEffect(() => {
    if (isVisibleSearchItems && inputEl.current) inputEl.current.focus()
  }, [isVisibleSearchItems])

  return (
    <div
      className={clsx({
        [s.locationSearch]: true,
        [s.large]: size === SIZES.LARGE,
        [s.small]: size === SIZES.SMALL,
        [s.active]: isVisibleLocationSearch,
      })}
    >
      <Spin spinning={isLoading}>
        <div className={s.searchBarInputWrapper}>
          <Input
            ref={inputEl}
            defaultValue={searchKey}
            onChange={(e) => setSearchKey(e.target.value)}
            size="large"
            suffix={SuffixIcon}
            placeholder="Enter an address, neightborhood, city, or Zip code"
            onPressEnter={searchByKey}
            onFocus={() => dispatch(updateIsVisibleSearchItems(true))}
            onBlur={() => dispatch(updateIsVisibleSearchItems(false))}
          />

          <div
            className={clsx({
              [s.searchItems]: true,
              [s.active]: isVisibleSearchItems && dummyDataFiltered().length > 0,
            })}
          >
            {dummyDataFiltered().map((item, index) => {
              let icon: IconProp
              switch (item.type) {
                case LOCATION_TYPES.CURRENT:
                  icon = faMapMarkerAlt
                  break
                case LOCATION_TYPES.COMMON:
                  icon = faSearchLocation
                  break
                case LOCATION_TYPES.SAVED:
                  icon = faHome
                  break
                default:
                  icon = faSearch
                  break
              }

              return (
                <div className={s.searchItem} key={`item-${index}`} onClick={() => searchBySelectedItem(item)}>
                  <FontAwesomeIcon size="lg" icon={icon} />
                  <p className={s.searchItemText}>{item.location}</p>
                </div>
              )
            })}
          </div>
        </div>
      </Spin>
    </div>
  )
}

export default memo(LocationSearch)
