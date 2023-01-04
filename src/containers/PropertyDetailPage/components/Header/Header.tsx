/* eslint-disable jsx-a11y/anchor-is-valid */
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Breadcrumb } from 'antd'
import Button from 'components/Button'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import s from './Header.module.scss'

type HeaderProps = {
  // isSaved: boolean
}

const Header = () => {
  const router = useRouter()
  const { t } = useTranslation(['propertyDetailPage', 'common'])

  return (
    <div className={s.root}>
      <Link href="/property/list">
        <a>
          <Button type="link" className={s.btnBack} onClick={() => router.push('/property/list')}>
            <FontAwesomeIcon icon={faChevronLeft} />
            <span>{t('propertyDetailPage:goBack')}</span>
          </Button>
        </a>
      </Link>
      <Breadcrumb className={s.breadcrumb} separator=">">
        <Breadcrumb.Item>For Sale</Breadcrumb.Item>
        <Breadcrumb.Item href="">CA</Breadcrumb.Item>
        <Breadcrumb.Item href="">San Francisco</Breadcrumb.Item>
        <Breadcrumb.Item href="">94117</Breadcrumb.Item>
        <Breadcrumb.Item>1248 Stanyan S</Breadcrumb.Item>
      </Breadcrumb>
    </div>
  )
}
export default Header
