/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/no-array-index-key */
import React, { memo, useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Dropdown, Menu, Modal } from 'antd'
import { MenuOutlined, CloseOutlined, DownOutlined } from '@ant-design/icons'
import clsx from 'clsx'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { SelectOption } from 'globalTypes/form'
import { useAppDispatch, useAppSelector } from 'store'
import { uniqueId as _uniqueId } from 'lodash'
import { signOut, useSession } from 'next-auth/client'
import { clearSession, DefaultSession, updateIsVisibleAuthModal, updateSession } from 'store/slice/authSlice'
import AuthForm from 'components/AuthForm'
import { PRIVATE_ROUTE } from 'globalConstants/privateRoute'
import s from './AppHeader.module.scss'
import MegaMenu from './MegaMenu'
import { NAV_LEFT, NAV_RIGHT, LOCALES, MENU_PROFILE } from './constants'
import { LOCALE_OPTIONS, Nav } from './types'
import MenuMobile from './MenuMobile'
import { useGoogleOneTap } from './useGoogleOneTap'

type NavMenuProp = {
  navMenu: Nav[]
  isVertical: boolean
}

// Nav Menu
const NavMenu = ({ navMenu, isVertical }: NavMenuProp) => {
  const { t } = useTranslation()

  return (
    <ul
      className={clsx({
        [s.headerList]: true,
        [s.vertical]: isVertical,
      })}
    >
      {navMenu.map((item: Nav) => (
        <li key={item.key}>
          {/* @ts-ignore */}
          <Link href={item.url}>{t(`header.navBar.${item.label}`)}</Link>
          {item.menus && item.menus.length > 0 && (
            <div className={s.megaMenu}>
              <MegaMenu menus={item.menus} isVertical={isVertical} />
            </div>
          )}
        </li>
      ))}
    </ul>
  )
}

const AppHeader = () => {
  const { t } = useTranslation()
  const [isCollapseActive, setIsCollapseActive] = useState<boolean>(false)
  const [navLeft, setNavLeft] = useState<Nav[]>(NAV_LEFT)
  const [navRight, setNavRight] = useState<Nav[]>(NAV_RIGHT)
  const router = useRouter()
  const [locale, setLocale] = useState<SelectOption<LOCALE_OPTIONS>>()
  const authSession = useAppSelector(({ authSlice }) => authSlice.session)
  const dispatch = useAppDispatch()
  const isVisibleAuthModal = useAppSelector(({ authSlice }) => authSlice.isVisibleAuthModal)
  const [session] = useSession()
  useGoogleOneTap()

  // handle lock scroll body when open mobile menu
  useEffect(() => {
    const main = document.querySelector('main') as HTMLElement
    if (main && isCollapseActive) main.style.display = 'none'

    return () => {
      main.style.display = 'block'
    }
  }, [isCollapseActive])

  // handle lock scroll body when resize window
  useEffect(() => {
    const handleResize = () => {
      const windowWidth = window.innerWidth
      if (windowWidth > 1007) setIsCollapseActive(false)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  // TODO: handle get session
  useEffect(() => {
    if (session) {
      dispatch(updateSession(session as DefaultSession))
    }
  }, [session])

  // handle set default locale
  useEffect(() => {
    const indexLocale = LOCALES.findIndex((item) => item.value === router.locale)
    setLocale(LOCALES[indexLocale])
  }, [router.locale])

  const collapseMenu = (key: string) => {
    setNavLeft(
      navLeft.map((item) => ({
        ...item,
        active: item.key === key ? !item.active : false,
      })),
    )

    setNavRight(
      navRight.map((item) => ({
        ...item,
        active: item.key === key ? !item.active : false,
      })),
    )
  }

  const localeMenu = () => {
    const clickLocaleOption = (val: SelectOption<LOCALE_OPTIONS>) => {
      setLocale(val)
      router.push(router.pathname, router.asPath, { locale: val.value })
    }

    return (
      <Menu>
        {LOCALES.map((item) => (
          <Menu.Item key={item.value}>
            <div role="presentation" className={s.locale} onClick={() => clickLocaleOption(item)}>
              <Image width={24} height={24} src={`/img/icon/icon-flag-${item.value}.svg`} />
              {/* @ts-ignore */}
              <p>{t(`common:locale.${item.label}`)}</p>
            </div>
          </Menu.Item>
        ))}
      </Menu>
    )
  }

  const handleSignOut = async () => {
    await signOut({ redirect: false })
    dispatch(updateIsVisibleAuthModal(false))
    dispatch(clearSession())
    if (PRIVATE_ROUTE.includes(router.pathname)) router.replace('/')
  }

  // Menu profile dropdown
  const MenuProfileDropdown = () => (
    <Menu>
      {MENU_PROFILE.map((item, index) => (
        <Menu.Item key={`menuItem-${index}`}>
          {/* @ts-ignore */}
          <Link href={item.url}>{t(`header.menuProfile.${item.label}`)}</Link>
        </Menu.Item>
      ))}
      <Menu.Divider />
      <Menu.Item key={_uniqueId('__menuItem')}>
        <p role="presentation" onClick={handleSignOut} style={{ marginBottom: '0' }}>
          {t('header.menuProfile.signOut')}
        </p>
      </Menu.Item>
    </Menu>
  )

  return (
    <>
      <header
        className={clsx({
          [s.headerRoot]: true,
          [s.headerCommon]: router.pathname !== '/',
          [s.headerProperty]: router.asPath.includes('/property/list'),
        })}
      >
        <div
          className={clsx({
            [s.headerNav]: true,
            [s.active]: isCollapseActive,
          })}
        >
          <NavMenu navMenu={navLeft} isVertical={false} />

          <div role="presentation" onClick={() => setIsCollapseActive(!isCollapseActive)} className={s.collapseButton}>
            {isCollapseActive ? <CloseOutlined style={{ color: 'var(--cl-blue-1)' }} /> : <MenuOutlined />}
          </div>

          <div role="presentation" onClick={() => router.push('/')} className={s.headerLogoPc}>
            <Image width={160} height={64} src="/img/logo.png" alt="logo" />
          </div>
          <div role="presentation" onClick={() => router.push('/')} className={s.headerLogoMb}>
            <Image width={120} height={40} src="/img/logo.png" alt="logo" />
          </div>

          <div
            className={clsx({
              [s.navRight]: true,
              [s.isCollapse]: isCollapseActive,
            })}
          >
            <NavMenu navMenu={navRight} isVertical />

            <Dropdown overlay={localeMenu()} placement="bottomRight">
              <div className={s.locale}>
                <div style={{ height: '24px' }}>
                  <Image width={24} height={24} src={`/img/icon/icon-flag-${locale?.value}.svg`} />
                </div>
                <DownOutlined className={s.icon} />
              </div>
            </Dropdown>

            {authSession ? (
              <Dropdown
                overlay={MenuProfileDropdown()}
                overlayClassName={s.menuProfileDropdown}
                placement="bottomRight"
                trigger={['click']}
                arrow
              >
                <div style={{ cursor: 'pointer' }}>
                  <img
                    className={s.profileImage}
                    width={35}
                    height={35}
                    src={authSession?.picture || undefined}
                    alt={`img ${authSession?.name}`}
                  />
                </div>
              </Dropdown>
            ) : (
              <p role="presentation" onClick={() => dispatch(updateIsVisibleAuthModal(true))} className={s.signInText}>
                {t('header.signIn')}
              </p>
            )}
          </div>
        </div>

        {isCollapseActive && <MenuMobile collapseMenu={collapseMenu} navLeft={navLeft} navRight={navRight} />}
      </header>

      {!authSession && (
        <Modal
          wrapClassName={s.authModal}
          visible={isVisibleAuthModal}
          footer={null}
          centered
          onCancel={() => dispatch(updateIsVisibleAuthModal(false))}
        >
          <AuthForm />
        </Modal>
      )}
    </>
  )
}

export default memo(AppHeader)
