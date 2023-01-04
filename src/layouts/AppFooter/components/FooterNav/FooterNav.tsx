/* eslint-disable react/no-array-index-key */
import React from 'react'
import Link from 'next/link'
import { BasicLinkType } from 'globalTypes/link'
import { useTranslation } from 'next-i18next'
import s from './FooterNav.module.scss'

const FOOTER_NAV: BasicLinkType[] = [
  {
    label: 'about',
    url: '/',
  },
  {
    label: 'research',
    url: '/',
  },
  {
    label: 'career',
    url: '/',
  },
  {
    label: 'help',
    url: '/',
  },
  {
    label: 'advertise',
    url: '/',
  },
  {
    label: 'fairHousing',
    url: '/',
  },
  {
    label: 'termsOfUse',
    url: '/',
  },
  {
    label: 'privacyPortal',
    url: '/',
  },
  {
    label: 'cookiePreference',
    url: '/',
  },
  {
    label: 'blog',
    url: '/',
  },
  {
    label: 'ai',
    url: '/',
  },
  {
    label: 'mobileApp',
    url: '/',
  },
]

const FooterNav = () => {
  const { t } = useTranslation()

  return (
    <ul className={s.footerNav}>
      {FOOTER_NAV.map((link, index) => (
        <li key={`link-${index}`}>
          {/* @ts-ignore */}
          <Link href={link.url}>{t(`footer.nav.${link.label}`)}</Link>
        </li>
      ))}
    </ul>
  )
}

export default FooterNav
