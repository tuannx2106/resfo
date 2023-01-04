/* eslint-disable react/no-array-index-key */
import React, { memo } from 'react'
import Link from 'next/link'
import { DownOutlined, UpOutlined } from '@ant-design/icons'
import clsx from 'clsx'
import { Button } from 'antd'
import { useTranslation } from 'react-i18next'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { LOCALE_OPTIONS, Nav } from '../types'
import s from './MenuMobile.module.scss'

type MenuMobileProp = {
  collapseMenu: (val: string) => void
  navLeft: Nav[]
  navRight: Nav[]
}

type NavMenuProp = {
  navMenu: Nav[]
  collapseMenu: (val: string) => void
}

const NavMenu = ({ navMenu, collapseMenu }: NavMenuProp) => {
  const { t } = useTranslation()

  return (
    <>
      {navMenu.map((item: Nav) => (
        <li
          className={clsx({
            [s.active]: item.active,
          })}
          key={item.key}
        >
          <div className={s.megaMenuItem}>
            {/* @ts-ignore */}
            <Link href={item.url}>{t(`header.navBar.${item.label}`)}</Link>
            {item.menus && (
              <Button type="link" onClick={() => collapseMenu(item.key)}>
                {item.active ? (
                  <UpOutlined style={{ color: 'var(--cl-blue-1)' }} />
                ) : (
                  <DownOutlined style={{ color: 'var(--cl-blue-1)' }} />
                )}
              </Button>
            )}
          </div>
          {item.menus && item.menus.length > 0 && (
            <div className={s.megaMenuItemPanel}>
              <ul>
                {item.menus?.map((menusItem, menusItemIndex) => (
                  <li key={`menusItem-${menusItemIndex}`}>
                    {/* @ts-ignore */}
                    <h6>{t(`header.navBar.menu.${menusItem.title}`)}</h6>
                    <ul>
                      {menusItem.menu?.map((menuItem, menuItemIndex) => (
                        <li key={`menuItem-${menuItemIndex}`}>
                          {/* @ts-ignore */}
                          <Link href={menuItem.url}>{t(`header.navBar.menu.${menuItem.label}`)}</Link>
                        </li>
                      ))}

                      {menusItem.subMenu?.map((subMenuItem, subMenuItemIndex) => (
                        <li key={`subMenuItem-${subMenuItemIndex}`}>
                          {/* @ts-ignore */}
                          <Link href={subMenuItem.url}>{t(`header.navBar.menu.${subMenuItem.label}`)}</Link>
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </li>
      ))}
    </>
  )
}

const MenuMobile = ({ navLeft, navRight, collapseMenu }: MenuMobileProp) => {
  const router = useRouter()

  return (
    <div
      className={clsx({
        [s.megaMenuMb]: true,
        megaMenu: true,
      })}
    >
      <ul>
        <NavMenu navMenu={navLeft} collapseMenu={collapseMenu} />
        <NavMenu navMenu={navRight} collapseMenu={collapseMenu} />
        <li className={s.locale}>
          <p>Locale</p>
          <div className={s.localeIcon}>
            <div
              role="presentation"
              className={clsx({
                [s.icon]: true,
                [s.active]: router.locale === LOCALE_OPTIONS.VI,
              })}
              onClick={() => router.push(router.pathname, router.asPath, { locale: LOCALE_OPTIONS.VI })}
            >
              <Image width={32} height={32} src="/img/icon/icon-flag-vi.svg" />
              <FontAwesomeIcon className={s.iconCheck} icon={faCheckCircle} />
            </div>
            <div
              role="presentation"
              className={clsx({
                [s.icon]: true,
                [s.active]: router.locale === LOCALE_OPTIONS.EN,
              })}
              onClick={() => router.push(router.pathname, router.asPath, { locale: LOCALE_OPTIONS.EN })}
            >
              <Image width={32} height={32} src="/img/icon/icon-flag-en.svg" />
              <FontAwesomeIcon className={s.iconCheck} icon={faCheckCircle} />
            </div>
          </div>
        </li>
      </ul>
    </div>
  )
}

export default memo(MenuMobile)
