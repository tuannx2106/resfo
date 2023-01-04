/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react'
import { LeftOutlined } from '@ant-design/icons'
import { BasicLinkType } from 'globalTypes/link'
import { useRouter } from 'next/router'
import s from './GoBackLink.module.scss'

type GoBackLinkProps = {
  backLink: BasicLinkType
}

const GoBackLink = ({ backLink }: GoBackLinkProps) => {
  const router = useRouter()
  const { url, label } = backLink

  return (
    <div onClick={() => router.push(url)} className={s.root}>
      <LeftOutlined />
      <p>{label}</p>
    </div>
  )
}

export default GoBackLink
