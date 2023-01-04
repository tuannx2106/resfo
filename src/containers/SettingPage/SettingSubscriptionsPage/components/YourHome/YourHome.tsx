/* eslint-disable react/no-array-index-key */
import React, { useState, FormEventHandler } from 'react'
import SettingItem from 'containers/SettingPage/components/SettingItem'
import { SettingItemType } from 'containers/SettingPage/types'
import SettingModal from 'components/SettingModal'
import Button from 'components/Button'
import { CloseOutlined, CheckOutlined } from '@ant-design/icons'
import { Form, Switch } from 'antd'
import { faEnvelope, faMobileAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useTranslation } from 'react-i18next'

const YourHomeAction = () => {
  const { t } = useTranslation('settingSubscriptionsPage')
  const [isVisibleModal, setIsVisibleModal] = useState<boolean>(false)
  const [isCheckedPushSwitch, setIsCheckedPushSwitch] = useState<boolean>(false)
  const [isCheckedEmailSwitch, setIsCheckedEmailSwitch] = useState<boolean>(false)

  const submit = (e: FormEventHandler) => {
    console.log(e)
    setIsVisibleModal(false)
  }

  return (
    <>
      <div className="settingItemAction">
        <Button type="link" onClick={() => setIsVisibleModal(true)} className="settingItemActionLink">
          {t('modal.edit')}
        </Button>
      </div>

      <SettingModal visible={isVisibleModal} onCancel={() => setIsVisibleModal(false)} title={t('homeReports')}>
        <p className="setting-modal-description">{t('homeReportsDescription')}</p>

        <Form wrapperCol={{ span: 24 }} onFinish={submit} className="setting-form-inline">
          <div className="setting-modal-form-item">
            <div className="setting-modal-form-item-left">
              <FontAwesomeIcon icon={faMobileAlt} size="2x" />
              <p>{t('modal.push')}</p>
            </div>
            <div className="setting-modal-form-item-right">
              <span style={{ marginRight: '8px' }}>
                {isCheckedPushSwitch ? t('switchText.on') : t('switchText.off')}
              </span>
              <Form.Item name="push" valuePropName="checked">
                <Switch
                  onChange={(checked) => setIsCheckedPushSwitch(checked)}
                  checkedChildren={<CheckOutlined />}
                  unCheckedChildren={<CloseOutlined />}
                />
              </Form.Item>
            </div>
          </div>

          <div className="setting-modal-form-item">
            <div className="setting-modal-form-item-left">
              <FontAwesomeIcon icon={faEnvelope} size="2x" />
              <p>{t('modal.email')}</p>
            </div>

            <div className="setting-modal-form-item-right">
              <span style={{ marginRight: '8px' }}>
                {isCheckedEmailSwitch ? t('switchText.on') : t('switchText.off')}
              </span>
              <Form.Item name="email" valuePropName="checked">
                <Switch
                  onChange={(checked) => setIsCheckedEmailSwitch(checked)}
                  checkedChildren={<CheckOutlined />}
                  unCheckedChildren={<CloseOutlined />}
                />
              </Form.Item>
            </div>
          </div>

          <Form.Item className="setting-modal-buttons">
            <Button type="default" onClick={() => setIsVisibleModal(false)}>
              {t('modal.cancel')}
            </Button>
            <Button type="primary" htmlType="submit">
              {t('modal.apply')}
            </Button>
          </Form.Item>
        </Form>
      </SettingModal>
    </>
  )
}

const YourHome = () => {
  const { t } = useTranslation('settingSubscriptionsPage')

  const YOUR_HOME: SettingItemType[] = [
    {
      title: t('homeReports'),
      label: '',
      action: () => <YourHomeAction />,
    },

    {
      title: t('sellerUpdates'),
      label: '',
      action: () => <YourHomeAction />,
    },
  ]

  return (
    <>
      {YOUR_HOME.map((item, index) => (
        <SettingItem key={`your-home-${index}`} item={item} />
      ))}
    </>
  )
}

export default YourHome
