/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { FormEventHandler, useMemo, useState } from 'react'
import { Form, Select, Button, Divider, Checkbox, Space, Progress } from 'antd'
import { faCheck, faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import Input from 'components/Input'
import clsx from 'clsx'
import { CHECK_PASSWORD_TIME_DELAY, VALIDATE_PASSWORD } from 'globalConstants/auth'
import { checkError } from 'pattern/passwordStrong'
import { debounce as _debounce } from 'lodash'
import s from '../../AuthForm.module.scss'
import { ProfessionalCategoryOptions } from '../../constant'
import SocialForm from '../SocialForm'

const SignUpForm = () => {
  const { t } = useTranslation()
  const [isExpandedForm, setIsExpandedForm] = useState<boolean>(false)
  const [passwordStrong, setPasswordStrong] = useState<Record<string, boolean>>({
    min: false,
    lower: false,
    upper: false,
    number: false,
    special: false,
  })

  const percentPasswordStrong = useMemo(
    () => (Object.values(passwordStrong).filter((item) => item).length * 100) / 5,
    [passwordStrong],
  )

  const onChangePassword = (e: { target: { value: string } }) => setPasswordStrong(checkError(e.target.value))

  const submit = (e: FormEventHandler) => {
    if (Object.values(passwordStrong).includes(false)) return

    console.log('submit')
  }

  return (
    <>
      <Form
        name="basic"
        layout="vertical"
        labelCol={{ span: 12 }}
        wrapperCol={{ span: 24 }}
        initialValues={{ remember: true }}
        onFinish={submit}
        // onFinishFailed={onFinishFailed}
        autoComplete="off"
        className={s.formWrapper}
      >
        {/* Email */}
        <Form.Item
          label={t('form.email')}
          name="email"
          required={false}
          rules={[
            {
              type: 'email',
              message: t('form.errorType', { name: 'E-mail' }),
            },
            {
              required: true,
              message: t('form.errorRequired', { name: 'Email' }),
            },
          ]}
        >
          <Input />
        </Form.Item>
        {/* Password */}
        <div className={s.passwordInput}>
          <Form.Item style={{ marginBottom: '0' }} label={t('form.password')} name="password">
            <Input type="password" onChange={_debounce(onChangePassword, CHECK_PASSWORD_TIME_DELAY)} />
          </Form.Item>
          <div className={s.progressPassword}>
            {/* @ts-ignore */}
            <p>{percentPasswordStrong === 100 ? t('common:form.good') : t('common:form.week')}</p>
            <Progress
              type="circle"
              percent={percentPasswordStrong}
              status={percentPasswordStrong === 100 ? 'success' : 'exception'}
              width={24}
            />
          </div>
        </div>
        {/* Explain check passW */}
        <div className={s.explainWrapper}>
          {VALIDATE_PASSWORD.map((item, index) => (
            <p className={s.explainText} key={`validate-pass-${index}`}>
              <FontAwesomeIcon
                className={clsx({
                  [s.checkIcon]: passwordStrong[item.type],
                  [s.wrongIcon]: !passwordStrong[item.type],
                })}
                icon={passwordStrong[item.type] ? faCheck : faTimesCircle}
              />
              {/* @ts-ignore */}
              {t(`form.${item.label}`)}
            </p>
          ))}
        </div>
        {/* toggle expand form */}
        <div style={{ textAlign: 'left' }}>
          <Checkbox onChange={() => setIsExpandedForm(!isExpandedForm)}>{t('authForm.industryProfessional')}</Checkbox>
        </div>
        {/* {isExpandedForm && } */}
        {/* Expand form */}
        {isExpandedForm && (
          <>
            {/* Select category */}
            <Form.Item
              required={false}
              name="professional"
              label={t('authForm.professionalType')}
              rules={[
                {
                  required: true,
                  message: t('form.errorRequired', { name: 'category' }),
                },
              ]}
            >
              <Select size="large" allowClear placeholder={t('authForm.selectYourCategory')}>
                {ProfessionalCategoryOptions.map((item) => (
                  <Select.Option key={item.value} value={item.value}>
                    {/* @ts-ignore */}
                    {t(`authForm.${item.label}`)}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Space size="middle">
              {/* First name */}
              <Form.Item
                wrapperCol={{
                  offset: 0,
                  span: 24,
                }}
                label={t('form.firstName')}
                name="firstName"
              >
                <Input />
              </Form.Item>

              {/* Last name */}
              <Form.Item
                wrapperCol={{
                  offset: 0,
                  span: 24,
                }}
                label={t('form.lastName')}
                name="lastName"
              >
                <Input />
              </Form.Item>
            </Space>

            {/* Zip postal */}
            <Form.Item
              wrapperCol={{
                offset: 0,
                span: 24,
              }}
              label={t('form.zipPostal')}
              name="zip"
              required={false}
              rules={[
                {
                  type: 'number',
                  required: true,
                  message: t('form.errorType', { name: 'zip/postal code' }),
                },
              ]}
            >
              <Input />
            </Form.Item>

            {/* Phone */}
            <Form.Item
              wrapperCol={{
                offset: 0,
                span: 24,
              }}
              label={t('form.cellPhone')}
              name="phone"
              required={false}
              rules={[
                {
                  type: 'number',
                  required: true,
                  message: t('form.errorType', { name: 'phone' }),
                },
              ]}
            >
              <Input />
            </Form.Item>
          </>
        )}
        {/* Submit btn */}
        <Form.Item
          style={{ marginTop: '16px' }}
          wrapperCol={{
            offset: 0,
            span: 24,
          }}
        >
          <Button type="primary" htmlType="submit">
            {isExpandedForm ? t('authForm.continue') : t('form.submit')}
          </Button>
        </Form.Item>
        <p className={s.term}>
          {t('authForm.acceptTerm')} <Link href="/">{t('authForm.termsOfUse')}</Link>.
        </p>
      </Form>

      <Divider className={s.divider} />

      <SocialForm />
    </>
  )
}

export default SignUpForm
