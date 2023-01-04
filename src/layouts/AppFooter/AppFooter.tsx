import React from 'react'
import s from './AppFooter.module.scss'
import FooterMedia from './components/FooterMedia'
import FooterNav from './components/FooterNav'
import FooterRegion from './components/FooterRegion'

const AppFooter = () => (
  <div className={s.footer}>
    <div className={s.footerItem}>
      <FooterRegion />
    </div>

    <div className={s.footerItem}>
      <FooterNav />
    </div>

    <div className={s.footerItem}>
      <FooterMedia />
    </div>
  </div>
)

export default AppFooter
