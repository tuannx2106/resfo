/* eslint-disable no-shadow */
import { ReactElement } from 'react'

export enum EMAIL_NOTIFICATION_TYPES {
  OFF = 1,
  DAILY,
  WEEKLY,
  INSTANT,
}

export type SettingSubscription = {
  headline: string
  component: ReactElement
}
