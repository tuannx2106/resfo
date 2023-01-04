import React, { ReactNode } from 'react'
import s from './SettingContainer.module.scss'

type SettingContainerProps = {
  children: ReactNode
}

const SettingContainer = ({ children }: SettingContainerProps) => (
  <div className={s.root}>
    <div className={s.settingContainer}>{children}</div>
  </div>
)

export default SettingContainer
