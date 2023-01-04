/* eslint-disable react/no-array-index-key */
import React from 'react'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/router'
import clsx from 'clsx'
import s from './SettingMenu.module.scss'
import { SettingMenuItems } from './constants'

const SettingMenu = () => {
  const { t } = useTranslation()
  const router = useRouter()

  return (
    <div className={s.settingMenuWrapper}>
      <nav>
        <ul className={s.settingMenu}>
          {SettingMenuItems.map((item, index) => (
            <li
              key={`setting-menu-${index}`}
              className={clsx({
                [s.settingMenuItem]: true,
                [s.active]: router.pathname === item.url,
              })}
            >
              {/* @ts-ignore */}
              <Link href={item.url}>{t(`settingMenu:settingMenu.${item.label}`)}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}

export default SettingMenu
