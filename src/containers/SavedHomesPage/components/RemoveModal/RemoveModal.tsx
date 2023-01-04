import React, { FormEventHandler, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import Button from 'components/Button'
import { SAVED_HOME_REMOVE_OPTIONS } from 'containers/SavedHomesPage/contants'
import SettingModal from 'components/SettingModal'
import { Form, Radio } from 'antd'
import { useTranslation } from 'react-i18next'
import s from './RemoveModal.module.scss'

const RemoveModal = () => {
  const [isModalVisible, setIsVisibleModal] = useState<boolean>(false)
  const submit = (e: FormEventHandler) => {
    console.log(e)
  }
  const { t } = useTranslation('savedHomePage')

  return (
    <div>
      <Button type="link" onClick={() => setIsVisibleModal(true)} className={s.btnTrigger}>
        <FontAwesomeIcon icon={faTrashAlt} /> {t('remove')}
      </Button>

      <SettingModal title="Remove Saved Homes" visible={isModalVisible} onCancel={() => setIsVisibleModal(false)}>
        <Form onFinish={submit} className={s.form}>
          <Form.Item initialValue={1} name="">
            <Radio.Group>
              {SAVED_HOME_REMOVE_OPTIONS.map((item) => (
                <Radio value={item.value} key={item.value}>
                  {/* @ts-ignore */}
                  {t(`${item.label}`)}
                </Radio>
              ))}
            </Radio.Group>
          </Form.Item>

          <Form.Item className="setting-modal-buttons">
            <Button type="default" onClick={() => setIsVisibleModal(false)}>
              {t('cancel')}
            </Button>
            <Button type="primary" htmlType="submit">
              {t('apply')}
            </Button>
          </Form.Item>
        </Form>
      </SettingModal>
    </div>
  )
}

export default RemoveModal
