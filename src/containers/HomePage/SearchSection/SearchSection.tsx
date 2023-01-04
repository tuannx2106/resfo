import React, { useState, useEffect } from 'react'
import { Space } from 'antd'
import Image from 'next/image'
import LocationSearch from 'components/LocationSearch'
import { SIZES } from 'components/LocationSearch/types'
import { WINDOW_SIZE } from 'globalConstants'
import clsx from 'clsx'
import s from './SearchSection.module.scss'

const SearchSection = () => {
  const [isVisibleLocationSearch, setIsVisibleLocationSearch] = useState<boolean>(false)

  useEffect(() => {
    const searchEl = document.querySelector('#searchBar')
    // Hard code with 360 and 290 px
    let distanceSearchBarFromTop: number = window.innerWidth > WINDOW_SIZE.pc ? 360 : 290

    const handleResize = () => {
      const windowWidth = window.innerWidth
      distanceSearchBarFromTop = windowWidth > WINDOW_SIZE.pc ? 360 : 290
    }

    const handleScroll = () => {
      if (searchEl) setIsVisibleLocationSearch(window.scrollY > distanceSearchBarFromTop)
    }

    window.addEventListener('scroll', handleScroll)
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <div
      id="searchBar"
      className={clsx({
        [s.searchWrapper]: true,
        [s.active]: isVisibleLocationSearch,
      })}
    >
      <Space direction="vertical" size={32}>
        <h2 className={s.searchTitle}>Change starts here</h2>

        <div className={s.search}>
          <div className={s.logo}>
            <Image layout="fill" src="/img/logo.png" alt="Picture of the author" />
          </div>

          <LocationSearch size={SIZES.LARGE} />
        </div>
      </Space>
    </div>
  )
}

export default SearchSection
