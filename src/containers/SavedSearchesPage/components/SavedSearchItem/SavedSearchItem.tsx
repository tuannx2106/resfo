/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react'
import { CloseOutlined, CheckOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
import Button from 'components/Button'
import SettingModal from 'components/SettingModal'
import { Form, Select, Switch, Tag } from 'antd'
import Input from 'components/Input'
import { useTranslation } from 'react-i18next'
import s from './SavedSearchItem.module.scss'

const SavedSearchItem = () => {
  const { t } = useTranslation('savedSearchesPage')
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState<boolean>(false)
  const [isEditModalVisible, setIsEditModalVisible] = useState<boolean>(false)
  const [isCheckedSwitch, setIsCheckedSwitch] = useState<boolean>(false)

  const openDeleteModal = () => {
    setIsDeleteModalVisible(true)
    setIsEditModalVisible(false)
  }

  return (
    <div className={s.searchItemWrapper}>
      <div className={s.searchItem}>
        <div className={s.searchItemLeft}>
          <p className={s.searchItemLeftTitle}>
            {/* TODO: max-length 30 */}
            My seach bla bla
            <Tag className={s.searchItemTag} color="var(--cl-red-4)">
              99+
            </Tag>
          </p>
          <p className={s.searchItemLeftSubTitle}>For sale</p>
        </div>

        <div className={s.action}>
          <p className={s.actionText}>
            {/* @ts-ignore */}
            {t('savedSearchesPage:subscriptionsAre')} <span>OFF</span>
          </p>
          <Button onClick={() => setIsEditModalVisible(true)} type="link" icon={<EditOutlined />}>
            {/* @ts-ignore */}
            {t('modalSavedSearch.edit')}
          </Button>

          <Button
            className={s.deleteButton}
            onClick={() => setIsDeleteModalVisible(true)}
            type="link"
            icon={<DeleteOutlined />}
          >
            {/* @ts-ignore */}
            {t('modalSavedSearch.delete')}
          </Button>
        </div>
      </div>

      {/* Confirm delete modal */}
      {isDeleteModalVisible && (
        <SettingModal
          visible={isDeleteModalVisible}
          onCancel={() => setIsDeleteModalVisible(false)}
          // @ts-ignore
          title={t('modalSavedSearch.deleteTitle')}
        >
          {/* @ts-ignore */}
          <p>{t('modalSavedSearch.deleteBodyTitle')}</p>
          {/* @ts-ignore */}
          <p>{t('modalSavedSearch.deleteBodySubTitle')}</p>
          <div className={s.settingDeleteModalButtons}>
            <Button onClick={() => setIsDeleteModalVisible(false)} type="link">
              {/* @ts-ignore */}
              {t('modalSavedSearch.cancel')}
            </Button>
            <Button type="primary" danger>
              {/* @ts-ignore */}
              {t('modalSavedSearch.delete')}
            </Button>
          </div>
        </SettingModal>
      )}

      {/* Edit modal */}
      {isEditModalVisible && (
        <SettingModal
          visible={isEditModalVisible}
          onCancel={() => setIsEditModalVisible(false)}
          title="Edit saved search"
          width={720}
        >
          <div className={s.settingEditModalBody}>
            <img
              src="https://maps.googleapis.com/maps/api/staticmap?center=40.704488,-73.977957&zoom=7&size=200x200&maptype=roadmap&key=AIzaSyDr0OO3ZPaFS6Zba2T7A7zYINO2tDFhhDs&signature=dMgWZ_n2G1sIM_98r8ILiR1W72w="
              alt="map"
            />

            <Form wrapperCol={{ span: 24 }} layout="vertical" style={{ width: '100%' }}>
              <Form.Item name="push" valuePropName="checked">
                {/* @ts-ignore */}
                <Form.Item label={t('modalSavedSearch.form.name')} name="firstName">
                  <Input />
                </Form.Item>
              </Form.Item>
              <p>For Sale</p>
              <div className={s.subscription}>
                <div>
                  {/* @ts-ignore */}
                  <Form.Item name="push" valuePropName="checked" label={t('modalSavedSearch.form.subscription')}>
                    <Switch
                      onChange={(checked) => setIsCheckedSwitch(checked)}
                      checkedChildren={<CheckOutlined />}
                      unCheckedChildren={<CloseOutlined />}
                    />
                  </Form.Item>
                </div>
                {isCheckedSwitch && (
                  <div>
                    <Form.Item name="notification">
                      <Select style={{ width: 120 }}>
                        {/* @ts-ignore */}
                        <Select.Option value={1}>{t('modalSavedSearch.form.instant')}</Select.Option>
                        {/* @ts-ignore */}
                        <Select.Option value={2}>{t('modalSavedSearch.form.daily')}</Select.Option>
                      </Select>
                    </Form.Item>
                  </div>
                )}
              </div>
            </Form>
          </div>
          <div className={s.settingEditModalButtons}>
            <Button type="primary" danger onClick={openDeleteModal}>
              {/* @ts-ignore */}
              {t('modalSavedSearch.delete')}
            </Button>
            <div>
              <Button onClick={() => setIsEditModalVisible(false)} type="link">
                {/* @ts-ignore */}
                {t('modalSavedSearch.cancel')}
              </Button>
              <Button type="primary">
                {/* @ts-ignore */}
                {t('modalSavedSearch.update')}
              </Button>
            </div>
          </div>
        </SettingModal>
      )}
    </div>
  )
}

export default SavedSearchItem
