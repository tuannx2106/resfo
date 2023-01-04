import { faBath, faBed, faDollarSign, faRulerCombined } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Modal, Space, SpaceProps } from 'antd'
import Button from 'components/Button'
import { useTranslation } from 'next-i18next'
import React, { useState } from 'react'
import ModalReport from '../ModalReport'
import s from './PropertyInfo.module.scss'
import ModalContactAgent from '../ModalContactAgent'
import FormScheduleTour from '../FormScheduleTour'

const PropertyInfo = () => {
  const { t } = useTranslation('propertyDetailPage')
  const [isModalReportVisible, setIsModalReportVisible] = useState<boolean>(false)
  const [isModalContactAgentVisible, setIsModalContactAgentVisible] = useState<boolean>(false)
  const [isModalScheduleVisible, setIsModalScheduleVisible] = useState<boolean>(false)

  const Amenities = (props: SpaceProps) => (
    <Space className={s.amenities} size={16} {...props}>
      <span>
        <FontAwesomeIcon icon={faBed} />3 Beds
      </span>
      <span>
        <FontAwesomeIcon icon={faBath} />2 Baths
      </span>
      <span>
        <FontAwesomeIcon icon={faRulerCombined} />
        1,632 sqft
      </span>
    </Space>
  )

  return (
    <div className={s.root}>
      <div className={s.addressArea}>
        <p className={s.address}>33-47 91st St APT 4D</p>
        <p className={s.addressExtra}>Jackson Heights, NY 11372</p>
        <Amenities />
      </div>
      <div className={s.priceArea}>
        <div>
          <p className={s.price}>$250,000</p>
          <p className={s.estPayment}>
            <b>{t('requiredInfo.estPayment')}:</b> $2,060/mo
            <Button type="link" className={s.btnGetQualified}>
              <FontAwesomeIcon icon={faDollarSign} />
              Get Pre-Qualified
            </Button>
          </p>
          <Space wrap>
            <Button onClick={() => setIsModalContactAgentVisible(true)}>Contact Agent</Button>
            <Button type="primary" onClick={() => setIsModalScheduleVisible(true)}>
              Take a Tour
            </Button>
          </Space>
          <Button type="link" className={s.btnReport} onClick={() => setIsModalReportVisible(true)}>
            {t('reportThisListing')}
          </Button>
        </div>
        <Amenities size={4} direction="vertical" />
      </div>

      <ModalReport
        visible={isModalReportVisible}
        onSendReport={console.log}
        onCancel={() => setIsModalReportVisible(false)}
      />

      <ModalContactAgent visible={isModalContactAgentVisible} onCancel={() => setIsModalContactAgentVisible(false)} />

      <Modal
        wrapClassName={s.modalTakeTour}
        title={<h2 className={s.modalTitle}>{t('requiredInfo.takeTour')}</h2>}
        footer={null}
        visible={isModalScheduleVisible}
        onCancel={() => setIsModalScheduleVisible(false)}
      >
        <FormScheduleTour onSchedule={console.log} />
      </Modal>
    </div>
  )
}

export default PropertyInfo
