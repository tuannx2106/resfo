/* eslint-disable react/no-array-index-key */
import React from 'react'
import { Collapse } from 'antd'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import s from './FooterRegion.module.scss'
import { FOOTER_REGION } from './constants'

const FooterRegion = () => {
  const { t } = useTranslation()

  return (
    <div className={s.footerRegion}>
      {FOOTER_REGION.map((item, index) => (
        <Collapse key={`footer-region-${index}`} ghost>
          {/* @ts-ignore */}
          <Collapse.Panel key={index} header={t(`footer.region.${item.title}`)}>
            {item.menus.map((menu, menuIndex) => (
              <Link key={`footer-region--menus-${menuIndex}`} href={menu.url}>
                {menu.label}
              </Link>
            ))}
          </Collapse.Panel>
        </Collapse>
      ))}
    </div>
  )
}

export default FooterRegion
