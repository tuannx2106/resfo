/* eslint-disable react/no-array-index-key */
import React, { memo } from 'react'
import Link from 'next/link'
import clsx from 'clsx'
import { useTranslation } from 'next-i18next'
import { BasicLinkType } from 'globalTypes/link'
import s from './MegaMenu.module.scss'
import { Menu } from '../types'

type MenusProps = {
  menus: Menu[]
  isVertical: boolean
}

const MegaMenu = ({ menus, isVertical = false }: MenusProps) => {
  const { t } = useTranslation()

  return (
    <div
      className={clsx({
        [s.megaMenuWrapper]: true,
        [s.vertical]: isVertical,
      })}
    >
      <div className={s.megaMenu}>
        <ul className={s.megaMenuList}>
          {menus?.map((item: Menu, index) => (
            <li key={`megaMenu-${index}`}>
              {/* @ts-ignore */}
              <h6 className={s.megaMenuListTitle}>{t(`header.navBar.menu.${item.title}`)}</h6>

              <div className={s.megaMenuListItem}>
                <ul>
                  {item.menu?.map((menuItem: BasicLinkType, menuItemIndex) => (
                    <li key={`menuItem-${menuItemIndex}`}>
                      {/* @ts-ignore */}
                      <Link href={menuItem.url}>{t(`header.navBar.menu.${menuItem.label}`)}</Link>
                    </li>
                  ))}
                </ul>

                <ul>
                  {item.subMenu?.map((subMenuItem: BasicLinkType, subMenuItemIndex) => (
                    <li key={`subMenuItem-${subMenuItemIndex}`}>
                      {/* @ts-ignore */}
                      <Link href={subMenuItem.url}>{t(`header.navBar.menu.${subMenuItem.label}`)}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default memo(MegaMenu)
