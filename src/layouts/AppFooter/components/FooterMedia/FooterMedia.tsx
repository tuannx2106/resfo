import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useTranslation } from 'next-i18next'
import s from './FooterMedia.module.scss'

const FooterMedia = () => {
  const { t } = useTranslation()

  return (
    <div className={s.footerMedia}>
      <div className={s.storeIcons}>
        <Link href="/">
          <img className={s.storeIcon} width={96} height={32} src="/img/icon/icon-app-store.svg" alt="app store" />
        </Link>

        <Link href="/">
          <img className={s.storeIcon} width={96} height={32} src="/img/icon/icon-google-play.svg" alt="google play" />
        </Link>
      </div>

      <ul>
        <li>
          <Link href="/">
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a>
              <Image width={160} height={64} src="/img/logo.png" alt="logo" />
            </a>
          </Link>
        </li>
        <li>
          <span>{t('footer.media.followUs')}:</span>
          <Link href="/">
            <img width={32} height={32} src="/img/icon/icon-facebook.svg" alt="facebook icon" />
          </Link>

          <Link href="/">
            <img width={32} height={32} src="/img/icon/icon-instagram.svg" alt="instagram icon" />
          </Link>

          <Link href="/">
            <img width={32} height={32} src="/img/icon/icon-tiktok.svg" alt="tiktok icon" />
          </Link>

          <Link href="/">
            <img width={32} height={32} src="/img/icon/icon-twitter.svg" alt="twitter icon" />
          </Link>
        </li>
        <li>© 2020-2021 Veela</li>
        <li>
          <Link href="/">
            <img width={32} height={32} src="/img/icon/icon-house.svg" alt="house icon" />
          </Link>
        </li>
      </ul>

      <div className={s.footerImage}>
        <Image width={1280} height={170} src="/img/icon/icon-footer.svg" alt="house icon" />
      </div>
    </div>
  )
}

export default FooterMedia
