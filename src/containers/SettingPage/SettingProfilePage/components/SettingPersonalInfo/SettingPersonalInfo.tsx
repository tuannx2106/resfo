/* eslint-disable react/no-array-index-key */
import React, { FormEventHandler, useState } from 'react'
import { Form, Upload, Slider } from 'antd'
import Input from 'components/Input'
import Button from 'components/Button'
import ImgCrop from 'antd-img-crop'
import { SettingItemType } from 'containers/SettingPage/types'
import Link from 'next/link'
import SettingModal from 'components/SettingModal'
import SettingItem from 'containers/SettingPage/components/SettingItem'
import { UploadFile } from 'antd/lib/upload/interface'
import { useTranslation } from 'react-i18next'

const EditName = () => {
  const { t } = useTranslation('settingProfilePage')
  const [isVisibleModal, setIsVisibleModal] = useState<boolean>(false)

  const submit = (e: FormEventHandler) => {
    console.log(e)
    setIsVisibleModal(false)
  }

  return (
    <>
      <div className="settingItemAction">
        <p className="settingItemActionValue">N/A</p>
        <Button type="link" onClick={() => setIsVisibleModal(true)} className="settingItemActionLink">
          {t('edit')}
        </Button>
      </div>

      <Slider style={{ display: 'none' }} />

      <SettingModal
        visible={isVisibleModal}
        onCancel={() => setIsVisibleModal(false)}
        title={t('personalInfo.editName.modalTitle')}
      >
        <Form layout="vertical" onFinish={submit} className="setting-form-inline">
          <Form.Item label={t('personalInfo.editName.firstName')} name="firstName">
            <Input />
          </Form.Item>

          <Form.Item label={t('personalInfo.editName.lastName')} name="lastName">
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
  const { t } = useTranslation('settingProfilePage')
  const [files, setFiles] = useState<UploadFile[]>([
    {
      uid: '-1',
      name: 'image.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
  ])

  const onChange = ({ fileList }: { fileList: UploadFile[] }) => {
    setFiles(fileList)
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
    {
      title: t('personalInfo.editScreenName.title'),
      label: t('personalInfo.editScreenName.desc'),
      action: EditScreenName,
    },
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
