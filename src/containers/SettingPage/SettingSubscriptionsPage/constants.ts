import { SelectOption } from 'globalTypes/form'
import { EMAIL_NOTIFICATION_TYPES } from './types'

export const EmailNotificationOptions: SelectOption<EMAIL_NOTIFICATION_TYPES>[] = [
  {
    label: 'off',
    value: EMAIL_NOTIFICATION_TYPES.OFF,
  },
  {
    label: 'instant',
    value: EMAIL_NOTIFICATION_TYPES.INSTANT,
  },
  {
    label: 'daily',
    value: EMAIL_NOTIFICATION_TYPES.DAILY,
  },
  {
    label: 'weekly',
    value: EMAIL_NOTIFICATION_TYPES.WEEKLY,
  },
]
