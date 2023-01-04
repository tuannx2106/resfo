import React, { ReactNode } from 'react'
import { Modal, ModalProps } from 'antd'
import s from './SettingModal.module.scss'

type SettingModalProps = ModalProps & {
  children: ReactNode
}

const SettingModal = ({ children, width = 360, ...rest }: SettingModalProps) => (
  <Modal centered footer={null} wrapClassName={s.settingModal} width={width} {...rest}>
    {children}
  </Modal>
)

export default SettingModal
