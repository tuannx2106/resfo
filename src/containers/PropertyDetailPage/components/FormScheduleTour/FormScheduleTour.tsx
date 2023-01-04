import { Checkbox, Form, FormProps, Radio, Select } from 'antd'
import Button from 'components/Button'
import Input from 'components/Input'
import dayjs from 'dayjs'
import { useTranslation } from 'next-i18next'
import React from 'react'
import DateSelectSlider from './components'
import s from './FormScheduleTour.module.scss'

type FormScheduleTourFormValues = {
  type: string
  date: dayjs.Dayjs
  time: string
  phone: string
  email: string
}

type FormScheduleTourProps = FormProps & {
  onSchedule: (values: FormScheduleTourFormValues) => void
}

const FormScheduleTour = ({ onSchedule }: FormScheduleTourProps) => {
  const { t } = useTranslation('propertyDetailPage')

  return (
    <Form<FormScheduleTourFormValues>
      onFinish={(values) => {
        onSchedule(values)
      }}
      className={s.form}
      initialValues={{
        type: '1',
        date: dayjs(),
        isFinanceInfo: true,
      }}
      layout="vertical"
    >
      <Form.Item name="type">
        <Radio.Group size="large" className={s.tourTypeSwitcher}>
          <Radio.Button value="1">{t('scheduleTourForm.inPerson')}</Radio.Button>
          <Radio.Button value="2">{t('scheduleTourForm.videoChat')}</Radio.Button>
        </Radio.Group>
      </Form.Item>

      <Form.Item label="Select a preferred time" name="date">
        <DateSelectSlider />
      </Form.Item>

      <Form.Item name="time">
        <Select className={s.select} placeholder={t('scheduleTourForm.chooseTime')}>
          <Select.Option value="9">9:00 AM</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item label={t('scheduleTourForm.phone')} name="phone">
        <Input className={s.input} placeholder={t('scheduleTourForm.phone')} />
      </Form.Item>

      <Form.Item label={t('scheduleTourForm.email')} name="email">
        <Input className={s.input} placeholder={t('scheduleTourForm.email')} />
      </Form.Item>

      <Form.Item style={{ marginBottom: 16 }}>
        <Button className={s.btnSubmit} size="large" type="primary" htmlType="submit">
          {t('scheduleTourForm.requestVisit')}
        </Button>
      </Form.Item>

      <Form.Item valuePropName="checked" name="isFinanceInfo" noStyle>
        <Checkbox>{t('scheduleTourForm.wantFinanceInfo')}</Checkbox>
      </Form.Item>

      <p className={s.extraInfo}>{t('scheduleTourForm.extraInfo')}</p>
    </Form>
  )
}
export default FormScheduleTour
