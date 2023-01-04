import React from 'react'
import { Tooltip, TooltipProps } from 'antd'
import clsx from 'clsx'
import s from './Dropdown.module.scss'

const Dropdown = ({ children, placement = 'bottom', className, ...props }: TooltipProps) => (
  <Tooltip
    overlayClassName={clsx({
      [s.dropdown]: true,
      [className || '']: true,
    })}
    placement={placement}
    trigger="click"
    {...props}
  >
    {children}
  </Tooltip>
)

export default Dropdown
