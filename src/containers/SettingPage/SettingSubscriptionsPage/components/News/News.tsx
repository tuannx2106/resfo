/* eslint-disable react/no-array-index-key */
import React, { useState, FormEventHandler } from 'react'
import SettingItem from 'containers/SettingPage/components/SettingItem'
import { SettingItemType } from 'containers/SettingPage/types'
import SettingModal from 'components/SettingModal'
import Button from 'components/Button'
import { CloseOutlined, CheckOutlined } from '@ant-design/icons'
import { Form, Switch } from 'antd'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useTranslation } from 'react-i18next'

const NewsAction = () => {
  const { t } = useTranslation('settingSubscriptionsPage')
  const [isVisibleModal, setIsVisibleModal] = useState<boolean>(false)
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

      <SettingModal visible={isVisibleModal} onCancel={() => setIsVisibleModal(false)} title={t('newSettingTitle')}>
        <p className="setting-modal-description">{t('newSettingDescription')}</p>

        <Form wrapperCol={{ span: 24 }} onFinish={submit} className="setting-form-inline">
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

const News = () => {
  const { t } = useTranslation('settingSubscriptionsPage')

  const NEWS: SettingItemType[] = [
    {
      title: t('newSettingTitle'),
      label: '',
      action: () => <NewsAction />,
    },
  ]

  return (
    <>
      {NEWS.map((item, index) => (
        <SettingItem key={`news-${index}`} item={item} />
      ))}
    </>
  )
}

export default News
