import React from 'react'
import clsx from 'clsx'
import { InputProps, Input as AntdInput } from 'antd'
import s from './Input.module.scss'

const Input = ({ className, ...rest }: InputProps) => (
  <AntdInput
    className={clsx({
      [s.root]: true,
      [className || '']: true,
    })}
    {...rest}
  />
)

export default Input
