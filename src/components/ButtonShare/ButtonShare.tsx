import { faFacebook, faFacebookMessenger, faPinterest, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { faCopy, faEnvelope, faShareSquare } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ButtonProps, Dropdown, Menu } from 'antd'
import clsx from 'clsx'
import Button from 'components/Button'
import { copyToClipboard } from 'helpers/utilities'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import React from 'react'
import { EmailShareButton, FacebookShareButton, PinterestShareButton, TwitterShareButton } from 'react-share'
import s from './ButtonShare.module.scss'

type ButtonShareProps = {
  buttonProps?: ButtonProps
  dropdownClassName?: string
}

const ButtonShare = ({ buttonProps, dropdownClassName }: ButtonShareProps) => {
  const router = useRouter()
  const { t } = useTranslation('common')

  const currentHref = typeof window !== 'undefined' ? `${window.location.origin}${router.asPath}` : ''

  return (
    <Dropdown
      placement="bottomRight"
      overlayClassName={clsx(s.dropdown, dropdownClassName)}
      overlay={
        <div role="presentation" onClick={(e) => e.stopPropagation()}>
          <Menu>
            <Menu.Item key="email" icon={<FontAwesomeIcon icon={faEnvelope} />}>
              <EmailShareButton url={currentHref} body="Hey check this out" subject="Hey check this out">
                Email
              </EmailShareButton>
            </Menu.Item>
            <Menu.Item key="copy" icon={<FontAwesomeIcon icon={faCopy} />} onClick={() => copyToClipboard(currentHref)}>
              {t('copyUrl')}
            </Menu.Item>
            <Menu.Item key="twitter" icon={<FontAwesomeIcon icon={faTwitter} />}>
              <TwitterShareButton url={currentHref}>Twitter</TwitterShareButton>
            </Menu.Item>
            <Menu.Item key="messenger" icon={<FontAwesomeIcon icon={faFacebookMessenger} />}>
              {/* TODO: create appID */}
              Facebook Messenger
            </Menu.Item>
            <Menu.Item key="facebook" icon={<FontAwesomeIcon icon={faFacebook} />}>
              <FacebookShareButton url={currentHref}>Facebook</FacebookShareButton>
            </Menu.Item>
            <Menu.Item key="pinterest" icon={<FontAwesomeIcon icon={faPinterest} />}>
              <PinterestShareButton
                media="https://photos.zillowstatic.com/fp/46dc84e6f3d44fa771a77ae86ee457ca-cc_ft_768.webp"
                url={currentHref}
              >
                Pinterest
              </PinterestShareButton>
            </Menu.Item>
          </Menu>
        </div>
      }
      trigger={['click']}
    >
      <Button onClick={(e) => e.stopPropagation()} type="link" {...buttonProps}>
        <FontAwesomeIcon icon={faShareSquare} />
        <span>{t('share')}</span>
      </Button>
    </Dropdown>
  )
}

export default ButtonShare
