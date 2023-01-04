/* eslint-disable react/no-array-index-key */
import React, { useState, FormEventHandler } from 'react'
import SettingItem from 'containers/SettingPage/components/SettingItem'
import { SettingItemType } from 'containers/SettingPage/types'
import SettingModal from 'components/SettingModal'
import Button from 'components/Button'
import { CloseOutlined, CheckOutlined } from '@ant-design/icons'
import { Form, Switch, Select } from 'antd'
import { faEnvelope, faMobileAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useTranslation } from 'react-i18next'
import { EmailNotificationOptions } from '../../constants'

const SaveSearchesAction = () => {
  const { t } = useTranslation('settingSubscriptionsPage')
  const [isVisibleModal, setIsVisibleModal] = useState<boolean>(false)
  const [isCheckedPushSwitch, setIsCheckedPushSwitch] = useState<boolean>(false)

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

      <SettingModal visible={isVisibleModal} onCancel={() => setIsVisibleModal(false)} title={t('savedSearches')}>
        <p className="setting-modal-description">{t('savedSearchesDescription')}</p>

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
            <Form.Item name="email">
              <Select defaultActiveFirstOption style={{ width: 120 }}>
                {EmailNotificationOptions.map((item, index) => (
                  <Select.Option key={`save-search-email-notification-${index}`} value={item.value}>
                    {item.label}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
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

const SaveSearches = () => {
  const SAVE_SEARCHES: SettingItemType[] = [
    {
      title: 'Atlanta GA and vicinity, For Sale',
      label: '',
      action: () => <SaveSearchesAction />,
    },

    {
      title: 'New york, For Sale',
      label: '',
      action: () => <SaveSearchesAction />,
    },
  ]

  return (
    <>
      {SAVE_SEARCHES.map((item, index) => (
        <SettingItem key={`save-searches-${index}`} item={item} />
      ))}
    </>
  )
}

export default SaveSearches
