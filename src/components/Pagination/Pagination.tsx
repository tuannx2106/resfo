import React from 'react'
import { Pagination, PaginationProps } from 'antd'
import clsx from 'clsx'
import s from './Pagination.module.scss'

const AppPagination = ({ className, ...rest }: PaginationProps) => (
  <div className={s.pagination}>
    <Pagination
      showSizeChanger={false}
      className={clsx({
        [className || '']: true,
      })}
      {...rest}
    />
  </div>
)

export default AppPagination
