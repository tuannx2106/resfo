import { Typography } from 'antd'
import { TitleProps } from 'antd/lib/typography/Title'
import clsx from 'clsx'
import React from 'react'
import s from './Headline.module.scss'

const Headline = ({ children, className, ...rest }: TitleProps) => (
  <Typography.Title
    {...rest}
    className={clsx({
      [s.headline]: true,
      [className || '']: true,
    })}
  >
    {children}
  </Typography.Title>
)

export default Headline
