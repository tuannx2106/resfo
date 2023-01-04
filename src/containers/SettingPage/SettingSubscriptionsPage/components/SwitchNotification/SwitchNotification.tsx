/* eslint-disable operator-linebreak */
import { Switch, Form } from 'antd'
import Button from 'components/Button'
import React, { useState, FormEventHandler } from 'react'
import { CloseOutlined, CheckOutlined } from '@ant-design/icons'
import SettingItem from 'containers/SettingPage/components/SettingItem'
import SettingModal from 'components/SettingModal'
import { useTranslation } from 'react-i18next'

type SwitchNotificationProps = {
  setIsShowSettingNotifications: (param: boolean) => void
}

const SwitchNotification = ({ setIsShowSettingNotifications }: SwitchNotificationProps) => {
  const { t } = useTranslation('settingSubscriptionsPage')
  const [isCheckedSwitch, setIsCheckedSwitch] = useState<boolean>(true)

  const Action = () => {
    const [isVisibleModal, setIsVisibleModal] = useState<boolean>(false)

    const submit = (e: FormEventHandler) => {
      setIsCheckedSwitch(false)
      setIsVisibleModal(false)
      setIsShowSettingNotifications(true)
    }

    const clickSwitch = () => {
      if (isCheckedSwitch) {
        setIsVisibleModal(true)
      } else {
        setIsCheckedSwitch(true)
        setIsShowSettingNotifications(false)
      }
    }

    return (
      <>
        <div className="settingItemAction">
          <p className="settingItemActionValue">{isCheckedSwitch ? 'On' : 'Off'}</p>
          <Switch
            onClick={clickSwitch}
            checked={isCheckedSwitch}
            checkedChildren={<CheckOutlined />}
            unCheckedChildren={<CloseOutlined />}
            defaultChecked
          />
        </div>

        <SettingModal visible={isVisibleModal} onCancel={() => setIsVisibleModal(false)} title={t('modal.areYouSure')}>
          <p className="setting-modal-description">{t('notificationOff')}</p>

          <Form layout="vertical" onFinish={submit} className="setting-form-inline">
            <Form.Item className="setting-modal-buttons">
              <Button type="default" onClick={() => setIsVisibleModal(false)}>
                {t('modal.cancel')}
              </Button>
              <Button type="primary" htmlType="submit">
                {t('modal.turnOffAllNotifications')}
              </Button>
            </Form.Item>
          </Form>
        </SettingModal>
      </>
    )
  }

  return (
    <SettingItem
      item={{
        title: isCheckedSwitch ? t('notificationOn') : t('notificationOff'),
        label: '',
        action: Action,
      }}
    />
  )
}

export default SwitchNotification
