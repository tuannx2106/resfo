/* eslint-disable react/no-array-index-key */
import React, { FormEventHandler, ReactElement, useMemo, useState } from 'react'
import DefaultLayout from 'layouts/DefaultLayout'
import { Form, Input, Button, Progress } from 'antd'
import { useTranslation } from 'react-i18next'
import { faCheck, faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { CHECK_PASSWORD_TIME_DELAY, VALIDATE_PASSWORD } from 'globalConstants/auth'
import clsx from 'clsx'
import { checkError } from 'pattern/passwordStrong'
import { debounce as _debounce } from 'lodash'
import s from './UpdatePasswordPage.module.scss'

const UpdatePassword = () => {
  const { t } = useTranslation(['updatePasswordPage', 'common'])
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
    <div className={s.updatePassword}>
      <h2 className={s.title}>{t('updatePasswordPage:emailConfirmed')}</h2>
      <p className={s.subTitle}>{t('updatePasswordPage:updatePasswordDescription')}</p>
      <Form
        name="basic"
        layout="vertical"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 24 }}
        initialValues={{ remember: true }}
        onFinish={submit}
        // onFinishFailed={onFinishFailed}
        autoComplete="off"
        className={s.formWrapper}
      >
        {/* Password */}
        <div className={s.passwordInput}>
          <Form.Item style={{ marginBottom: '0' }} label={t('common:form.password')} name="password">
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
              {t(`common:form.${item.label}`)}
            </p>
          ))}
        </div>

        <Form.Item
          wrapperCol={{
            offset: 0,
            span: 24,
          }}
        >
          <Button type="primary" htmlType="submit">
            {t('common:form.send')}
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

UpdatePassword.getLayout = function getLayout(page: ReactElement) {
  return <DefaultLayout>{page}</DefaultLayout>
}

export default UpdatePassword
