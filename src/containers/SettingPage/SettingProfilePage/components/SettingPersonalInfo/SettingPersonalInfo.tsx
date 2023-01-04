/* eslint-disable react/no-array-index-key */
import React, { FormEventHandler, useState } from 'react'
import { Form, Upload, Slider, notification } from 'antd'
import Input from 'components/Input'
import Button from 'components/Button'
import ImgCrop from 'antd-img-crop'
import { SettingItemType } from 'containers/SettingPage/types'
import Link from 'next/link'
import SettingModal from 'components/SettingModal'
import SettingItem from 'containers/SettingPage/components/SettingItem'
import { UploadFile } from 'antd/lib/upload/interface'
import { useTranslation } from 'react-i18next'
import { useAppDispatch, useAppSelector } from 'store'
import { useUpdateAccountMutation } from 'store/appAPIs'
import { User } from 'store/types/users'
import { DefaultSession, updateSession } from 'store/slice/authSlice'
import { getSession } from 'next-auth/client'

const EditName = () => {
  const { t } = useTranslation(['settingProfilePage', 'common'])
  const [isVisibleModal, setIsVisibleModal] = useState<boolean>(false)
  const [updateAccount] = useUpdateAccountMutation()
  const authSession = useAppSelector(({ authSlice }) => authSlice.session as DefaultSession)
  const dispatch = useAppDispatch()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const submit = async (e: Partial<DefaultSession>) => {
    const dataRequest: User = {
      // avatar: '/img/avatar-default.png', // TODO: avatar
      phoneNumber: authSession.phoneNumber,
      address1: authSession.address1,
      city: authSession.city,
      state: authSession.state,
      zipCode: authSession.zipCode,
      countryCode: authSession.countryCode,
      ...e,
    }

    try {
      setIsLoading(true)
      const { data: dataUpdated } = await updateAccount(dataRequest).unwrap()
      await getSession()

      dispatch(
        updateSession({
          ...authSession,
          ...dataUpdated,
          name: `${e.firstName} ${e.lastName}`,
        } as DefaultSession),
      )

      notification.success({
        message: 'Notification',
        description: 'Change name success',
        duration: 5,
      })
    } catch (error) {
      notification.error({
        message: 'Notification',
        description: 'Have some error, please reload again.',
        duration: 5,
      })
    } finally {
      setIsVisibleModal(false)
      setIsLoading(false)
    }
  }

  return (
    <>
      <div className="settingItemAction">
        <p className="settingItemActionValue">{authSession?.name || 'N/A'}</p>
        <Button type="link" onClick={() => setIsVisibleModal(true)} className="settingItemActionLink">
          {t('settingProfilePage:edit')}
        </Button>
      </div>

      <Slider style={{ display: 'none' }} />

      <SettingModal
        visible={isVisibleModal}
        onCancel={() => setIsVisibleModal(false)}
        title={t('settingProfilePage:personalInfo.editName.modalTitle')}
      >
        <Form layout="vertical" onFinish={submit} className="setting-form-inline">
          <Form.Item
            label={t('settingProfilePage:personalInfo.editName.firstName')}
            name="firstName"
            required={false}
            rules={[
              {
                required: true,
                message: t('common:form.errorRequired', { name: 'first name' }),
              },
              {
                pattern: /^[a-zA-Z]+$/,
                // @ts-ignore
                message: t('common:form.firstNameError'),
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label={t('settingProfilePage:personalInfo.editName.lastName')}
            name="lastName"
            required={false}
            rules={[
              {
                required: true,
                message: t('common:form.errorRequired', { name: 'last name' }),
              },
              {
                pattern: /^[a-zA-Z]+$/,
                // @ts-ignore
                message: t('common:form.lastNameError'),
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item className="setting-modal-buttons">
            <Button type="default" onClick={() => setIsVisibleModal(false)}>
              {t('settingProfilePage:modal.cancel')}
            </Button>
            <Button loading={isLoading} type="primary" htmlType="submit">
              {t('settingProfilePage:modal.apply')}
            </Button>
          </Form.Item>
        </Form>
      </SettingModal>
    </>
  )
}

const EditScreenName = () => {
  const { t } = useTranslation('settingProfilePage')

  const [isVisibleModal, setIsVisibleModal] = useState<boolean>(false)
  const submit = (e: FormEventHandler) => {
    console.log(e)
    setIsVisibleModal(false)
  }

  return (
    <>
      <div className="settingItemAction">
        <p className="settingItemActionValue">abc@xyz.com</p>
        <Button type="link" onClick={() => setIsVisibleModal(true)} className="settingItemActionLink">
          {t('edit')}
        </Button>
      </div>

      <SettingModal
        visible={isVisibleModal}
        onCancel={() => setIsVisibleModal(false)}
        title={t('personalInfo.editScreenName.modalTitle')}
      >
        <Form layout="vertical" onFinish={submit} className="form-single">
          <Form.Item label={t('personalInfo.editScreenName.screenName')} name="screenName">
            <Input />
          </Form.Item>

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

const EditAvatar = () => {
  const authSession = useAppSelector(({ authSlice }) => authSlice.session as DefaultSession)
  // const [updateAccount] = useUpdateAccountMutation()
  // const dispatch = useAppDispatch()
  const { t } = useTranslation('settingProfilePage')
  const [files, setFiles] = useState<UploadFile[]>([
    {
      uid: '-1',
      name: 'image.png',
      status: 'done',
      url: authSession?.picture,
    },
  ])

  const onChange = ({ fileList }: { fileList: UploadFile[] }) => {
    setFiles(fileList)
    if (fileList[0].status === 'done') {
      console.log(fileList[0])
    }
  }

  return (
    <ImgCrop
      modalTitle={t('personalInfo.editPhoto.modalTitle')}
      modalOk={t('modal.apply')}
      modalCancel={t('modal.cancel')}
      rotate
    >
      <Upload
        action=""
        className="setting-upload-avatar"
        listType="picture"
        maxCount={1}
        fileList={files}
        onChange={onChange}
      >
        {t('edit')}
      </Upload>
    </ImgCrop>
  )
}

const ManageReview = () => {
  const { t } = useTranslation('settingProfilePage')

  return (
    <p className="settingItemActionLink">
      <Link href="/">{t('personalInfo.review.manage')}</Link>
    </p>
  )
}

const SettingPersonalInfo = () => {
  const { t } = useTranslation('settingProfilePage')

  const SETTING_PERSONAL_GROUP_ITEM: SettingItemType[] = [
    {
      title: t('personalInfo.editName.title'),
      label: t('personalInfo.editName.desc'),
      action: EditName,
    },
    // TODO: tmp ignore edit screen name
    // {
    //   title: t('personalInfo.editScreenName.title'),
    //   label: t('personalInfo.editScreenName.desc'),
    //   action: EditScreenName,
    // },
    {
      title: t('personalInfo.editPhoto.title'),
      label: t('personalInfo.editPhoto.desc'),
      action: EditAvatar,
    },
    {
      title: t('personalInfo.review.title'),
      label: t('personalInfo.review.desc'),
      action: ManageReview,
    },
  ]

  return (
    <>
      {SETTING_PERSONAL_GROUP_ITEM.map((item, index) => (
        <SettingItem key={`setting-item-${index}`} item={item} />
      ))}
    </>
  )
}

export default SettingPersonalInfo
