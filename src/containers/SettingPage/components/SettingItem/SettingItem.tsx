import { SettingItemType } from 'containers/SettingPage/types'
import React from 'react'
import s from './SettingItem.module.scss'

type SettingItemProps = {
  item: SettingItemType
}

const SettingItem = ({ item }: SettingItemProps) => (
  <div className={s.settingItem}>
    <div className={s.settingItemText}>
      <p className={s.settingItemTitle}>{item.title}</p>
      <p className={s.settingItemLabel}>{item.label || ''}</p>
    </div>

    <div>{item.action()}</div>
  </div>
)

export default SettingItem
