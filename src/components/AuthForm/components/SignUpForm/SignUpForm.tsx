/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useMemo, useState } from 'react'
import { Form, Button, Divider, Checkbox, Space, Progress } from 'antd'
import { faCheck, faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import Input from 'components/Input'
import clsx from 'clsx'
import { CHECK_PASSWORD_TIME_DELAY, VALIDATE_PASSWORD } from 'globalConstants/auth'
import { checkError } from 'helpers/passwordStrong'
import { debounce as _debounce } from 'lodash'
import { useRegisterAccountMutation } from 'store/appAPIs'
import { signIn } from 'next-auth/client'
import { RegisterReq } from 'store/types/users'
import ErrorConstants from 'globalConstants/error'
import s from '../../AuthForm.module.scss'
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
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const percentPasswordStrong = useMemo(
    () => (Object.values(passwordStrong).filter((item) => item).length * 100) / 5,
    [passwordStrong],
  )
  const [duplicatedEmail, setDuplicatedEmail] = useState<string | undefined>('')
  const [registerAccount] = useRegisterAccountMutation()
  const [form] = Form.useForm()

  const onChangePassword = (e: { target: { value: string } }) => setPasswordStrong(checkError(e.target.value))

  const submit = async (e: RegisterReq) => {
    if (Object.values(passwordStrong).includes(false)) return
    setIsLoading(true)

    try {
      const { data: dataRegister } = await registerAccount(e).unwrap()

      await signIn('credentials', {
        email: dataRegister?.email,
        password: e.password,
        redirect: false,
      })
    } catch (error: any) {
      const errors = error?.data?.errors || []

      if (errors.includes(ErrorConstants.EMAIL_ALREADY_IN_USE)) setDuplicatedEmail(e?.email)
      form.validateFields()
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Form
        name="basic"
        form={form}
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
            {
              validator(_, val) {
                const validate =
                  duplicatedEmail !== val ? Promise.resolve() : Promise.reject(new Error(t('form.emailDuplicated')))

                return validate
              },
            },
          ]}
        >
          <Input />
        </Form.Item>

        {/* Password */}
        <div className={s.passwordInput}>
          <Form.Item style={{ marginBottom: '0' }} label={t('form.password')} name="password">
            <Input type="password" maxLength={12} onChange={_debounce(onChangePassword, CHECK_PASSWORD_TIME_DELAY)} />
          </Form.Item>
          <div className={s.progressPassword}>
            {/* @ts-ignore */}
            <p>{percentPasswordStrong === 100 ? t('common:form.good') : t('common:form.weak')}</p>
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

        <Space size="middle" align="start">
          {/* First name */}
          <Form.Item
            wrapperCol={{
              offset: 0,
              span: 24,
            }}
            required={false}
            label={t('form.firstName')}
            name="firstName"
            rules={[
              {
                required: true,
                message: t('form.errorRequired', { name: 'first name' }),
              },
              {
                pattern: /^[a-zA-Z]+$/,
                message: t('common:form.firstNameError'),
              },
            ]}
          >
            <Input />
          </Form.Item>

          {/* Last name */}
          <Form.Item
            required={false}
            wrapperCol={{
              offset: 0,
              span: 24,
            }}
            label={t('form.lastName')}
            name="lastName"
            rules={[
              {
                required: true,
                message: t('form.errorRequired', { name: 'last name' }),
              },
              {
                pattern: /^[a-zA-Z]+$/,
                message: t('common:form.lastNameError'),
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Space>

        {/* toggle expand form */}
        <div style={{ textAlign: 'left' }}>
          <Checkbox onChange={() => setIsExpandedForm(!isExpandedForm)}>{t('authForm.industryProfessional')}</Checkbox>
        </div>

        {/* Expand form */}
        {isExpandedForm && (
          <>
            {/* Select category */}
            {/* <Form.Item
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
                    {t(`authForm.${item.label}`)}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item> */}

            {/* Zip postal */}
            <Form.Item
              wrapperCol={{
                offset: 0,
                span: 24,
              }}
              label={t('form.zipPostal')}
              name="zipCode"
              required={false}
              rules={[
                {
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
              name="phoneNumber"
              required={false}
              rules={[
                {
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
          <Button loading={isLoading} type="primary" htmlType="submit">
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
