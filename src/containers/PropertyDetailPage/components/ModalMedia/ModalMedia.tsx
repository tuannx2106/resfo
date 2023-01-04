import { faHeart as faHeartOutlined } from '@fortawesome/free-regular-svg-icons'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Modal, ModalProps, Space, Tabs } from 'antd'
import Button from 'components/Button'
import ButtonShare from 'components/ButtonShare'
import { useTranslation } from 'next-i18next'
import React from 'react'
import MapTab from './components/MapTab'
import ParksTab from './components/ParksTab'
import PhotoTab from './components/PhotoTab'
import SchoolTab from './components/SchoolTab'
import s from './ModalMedia.module.scss'

type ModalMediaProps = ModalProps & {
  isSaved?: boolean
}

const ModalMedia = ({ isSaved = false, ...rest }: ModalMediaProps) => {
  const { t } = useTranslation('propertyDetailPage')

  return (
    <Modal footer={null} className={s.modalRoot} {...rest}>
      <Tabs
        size="large"
        className={s.tab}
        defaultActiveKey="1"
        tabBarExtraContent={
          <Space className={s.modalBtnAction} align="center" size="large">
            <Button type="link" className={s.btnSave}>
              <FontAwesomeIcon icon={isSaved ? faHeart : faHeartOutlined} />
              <span>{t('save')}</span>
            </Button>

            <ButtonShare buttonProps={{ className: s.btnShare }} />
          </Space>
        }
      >
        <Tabs.TabPane tab={t('tabName.photo')} key="1">
          <PhotoTab />
        </Tabs.TabPane>
        <Tabs.TabPane tab={t('tabName.map')} key="2">
          <MapTab />
        </Tabs.TabPane>
        <Tabs.TabPane tab={t('tabName.school')} key="3">
          <SchoolTab />
        </Tabs.TabPane>
        <Tabs.TabPane tab={t('tabName.parksOutdoors')} key="4">
          <ParksTab />
        </Tabs.TabPane>
      </Tabs>
    </Modal>
  )
}

export default ModalMedia
