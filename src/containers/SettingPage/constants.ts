import { MediaLinkType } from 'globalTypes/link'

export const AccountSettingLinks: MediaLinkType[] = [
  {
    title: 'profile',
    label: 'profileLabel',
    icon: 'icon-setting-account',
    url: '/settings/profile',
  },
  {
    title: 'subscription',
    label: 'subscriptionLabel',
    icon: 'icon-setting-subscription',
    url: '/settings/subscriptions',
  },
]
