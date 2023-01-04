import { Form, Modal, ModalProps, Radio, Space, Input as InputAntd } from 'antd'
import { useTranslation } from 'next-i18next'
import React, { useState } from 'react'
import Input from 'components/Input'
import s from './ModalReport.module.scss'

type FormValues = {
  name: string
  reason: string
  description: string
  telephone: string
  other?: string
}

type ModalReportProps = ModalProps & {
  onSendReport: (values: FormValues) => void
}

const ModalReport = ({ onSendReport, ...rest }: ModalReportProps) => {
  const [form] = Form.useForm()
  const { t } = useTranslation('propertyDetailPage')
  const [isShowOtherTextField, setIsShowOtherTextField] = useState<boolean>(false)

  const requiredRule = {
    required: true,
    message: t('reportForm.thisFieldRequired'),
  }

  const onClickSend = () => {
    form
      .validateFields()
      .then((values) => {
        onSendReport(values)
      })
      .then(() => {
        form.resetFields()
      })
  }

  return (
    <Modal
      width={360}
      wrapClassName={s.modal}
      title={t('reportThisListing')}
      okText="Send"
      onOk={onClickSend}
      cancelButtonProps={{ style: { display: 'none' } }}
      {...rest}
    >
      <Form<FormValues>
        form={form}
        onValuesChange={(_, values) => {
          if (values.reason === '5') {
            setIsShowOtherTextField(true)
          } else {
            setIsShowOtherTextField(false)
          }
        }}
      >
        <Form.Item name="name" rules={[requiredRule]}>
          <Input placeholder={t('reportForm.name')} />
        </Form.Item>
        <Form.Item
          name="email"
          rules={[
            requiredRule,
            {
              type: 'email',
              message: t('reportForm.notValidEmail'),
            },
          ]}
        >
          <Input placeholder={t('reportForm.email')} />
        </Form.Item>
        <Form.Item name="telephone" rules={[requiredRule]}>
          <Input placeholder={t('reportForm.telephone')} />
        </Form.Item>
        <Form.Item name="reason" rules={[requiredRule]}>
          <Radio.Group>
            <Space direction="vertical">
              <Radio value="1">This listing is spam</Radio>
              <Radio value="2">This listing is inappropriate</Radio>
              <Radio value="3">This listing is offensive</Radio>
              <Radio value="4">This listing is not available</Radio>
              <Radio value="5">Other</Radio>
            </Space>
          </Radio.Group>
        </Form.Item>
        {isShowOtherTextField && (
          <Form.Item name="other" rules={[requiredRule]}>
            <InputAntd.TextArea placeholder={t('reportForm.tellMore')} />
          </Form.Item>
        )}
      </Form>
    </Modal>
  )
}

export default ModalReport
