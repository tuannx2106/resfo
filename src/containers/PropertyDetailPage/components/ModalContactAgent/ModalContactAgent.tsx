/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/no-unescaped-entities */
import { Form, Modal, ModalProps, Input as InputAntd, Checkbox } from 'antd'
import { useTranslation } from 'next-i18next'
import React from 'react'
import Input from 'components/Input'
import Button from 'components/Button'
import s from './ModalContactAgent.module.scss'

type FormValues = {
  name: string
  message: string
  telephone: string
  email: string
  agree: boolean
}

const ModalContactAgent = ({ ...rest }: ModalProps) => {
  const { t } = useTranslation('propertyDetailPage')

  const requiredRule = {
    required: true,
    message: t('contactAgentModal.form.thisFieldRequired'),
  }

  return (
    <Modal
      width={360}
      wrapClassName={s.modal}
      title={t('contactAgentModal.title')}
      footer={null}
      cancelButtonProps={{ style: { display: 'none' } }}
      {...rest}
    >
      <Form<FormValues> layout="vertical">
        <p className={s.modalHead}>Connect with a local buyer’s agent who advertises with Veela.</p>

        <Form.Item required={false} name="name" label={t('contactAgentModal.form.name')} rules={[requiredRule]}>
          <Input />
        </Form.Item>

        <Form.Item
          name="email"
          required={false}
          label={t('contactAgentModal.form.email')}
          rules={[
            requiredRule,
            {
              type: 'email',
              message: t('contactAgentModal.form.notValidEmail'),
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          required={false}
          label={t('contactAgentModal.form.telephone')}
          name="telephone"
          rules={[requiredRule]}
        >
          <Input />
        </Form.Item>

        <Form.Item required={false} label={t('contactAgentModal.form.message')} name="message" rules={[requiredRule]}>
          <InputAntd.TextArea />
        </Form.Item>

        <Form.Item valuePropName="checked" name="agree">
          <Checkbox>{t('contactAgentModal.form.checkbox')}</Checkbox>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className={s.contactButton}>
            {t('contactAgentModal.form.submit')}
          </Button>
        </Form.Item>

        <p className={s.modalExplain}>{t('contactAgentModal.description')}</p>
      </Form>
    </Modal>
  )
}

export default ModalContactAgent
