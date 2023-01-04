import { ReactElement } from 'react'

export type SettingItemType = {
  title?: string
  label: string
  action: () => ReactElement
}
