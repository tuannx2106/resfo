import { ButtonProps, Button as AntdButton } from 'antd'
import clsx from 'clsx'
import React from 'react'
import s from './Button.module.scss'

const Button = ({ className, children, ...rest }: ButtonProps) => (
  <AntdButton
    className={clsx({
      [s.root]: true,
      [className || '']: true,
    })}
    {...rest}
  >
    {children}
  </AntdButton>
)

export default Button
