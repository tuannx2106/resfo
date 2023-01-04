/* eslint-disable react/no-array-index-key */
import { WechatOutlined, CloseOutlined, LineOutlined, DeleteOutlined } from '@ant-design/icons'
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css'
import clsx from 'clsx'
import Button from 'components/Button'
import React, { useRef, useState, ChangeEvent, ClipboardEvent } from 'react'
import { Image, Popconfirm } from 'antd'
import { uniqueId as _uniqueId } from 'lodash'
import { useTranslation } from 'next-i18next'
import {
  Avatar,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  ConversationHeader,
  TypingIndicator,
} from '@chatscope/chat-ui-kit-react'
import { useAppSelector } from 'store'
import s from './ChatBox.module.scss'
import { Message as MessageType } from './types'
import { preSanitizeCommentMessage } from './helper'

const initMessageDummy: MessageType[] = [
  {
    message: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    sender: 'Admin',
    direction: 'incoming',
    position: 'single',
    id: _uniqueId('__message'),
  },

  {
    message: 'Hi',
    direction: 'outgoing',
    sender: 'User',
    position: 'single',
    id: _uniqueId('__message'),
  },
  {
    message: 'Lorem Ipsum is simply dummy text.',
    sender: 'Admin',
    direction: 'incoming',
    position: 'normal',
    id: _uniqueId('__message'),
  },
  {
    message: 'Hello',
    sender: 'Admin',
    direction: 'incoming',
    position: 'single',
    id: _uniqueId('__message'),
  },
]

const Chat = () => {
  const { t } = useTranslation()
  const [isOpenChatBox, setIsOpenChatBox] = useState<boolean>(false)
  const adminAvatar = '/img/chat/ico-avatar-admin-default.png'
  const [messageList, setMessageList] = useState<MessageType[]>(initMessageDummy)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const authSession = useAppSelector(({ authSlice }) => authSlice.session)

  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target

    if (files) {
      const imgList: string[] = []
      Array.from(files).forEach((item) => imgList.push(URL.createObjectURL(item)))

      setMessageList((prev) => [
        ...prev,
        {
          message: '',
          sender: authSession?.user?.name || 'User',
          direction: 'outgoing',
          position: 'single',
          images: imgList,
          id: _uniqueId('__message'),
        },
      ])
    }
  }

  const onSend = (val: string) => {
    if (!preSanitizeCommentMessage(val)) return

    setMessageList((prev) => [
      ...prev,
      {
        message: preSanitizeCommentMessage(val),
        sender: authSession?.user?.name || 'User',
        direction: 'outgoing',
        position: 'single',
        id: _uniqueId('__message'),
      },
    ])
  }

  const confirmRemoveMessage = (val: MessageType) => {
    setMessageList(messageList.filter((item) => item.id !== val.id))
  }

  const preventPasteScript = (e: ClipboardEvent) => {
    e.preventDefault()

    const text = e.clipboardData.getData('text/plain')
    document.execCommand('insertText', false, text)
  }

  return (
    <div className={s.root}>
      <Button
        onClick={() => setIsOpenChatBox(!isOpenChatBox)}
        type="primary"
        size="large"
        shape="circle"
        icon={isOpenChatBox ? <CloseOutlined /> : <WechatOutlined />}
      />

      {isOpenChatBox && (
        <div
          className={clsx({
            [s.chatBoxWrapper]: true,
            [s.active]: isOpenChatBox,
          })}
        >
          <ChatContainer>
            {/* Chat header */}
            <ConversationHeader>
              <Avatar src={adminAvatar} name="Admin" status="available" />
              <ConversationHeader.Content userName="Admin" info={t('chat.activeStatus')} />
              <ConversationHeader.Actions>
                <LineOutlined onClick={() => setIsOpenChatBox(false)} className={s.miniMiseChat} />
              </ConversationHeader.Actions>
            </ConversationHeader>

            {/* Chat body */}
            <MessageList
              typingIndicator={<TypingIndicator content={t('chat.typingIndicatorContent', { person: 'Admin' })} />}
            >
              {messageList &&
                messageList.map((item, index) => (
                  <Message
                    key={`message-chat-${index}`}
                    className={clsx({
                      [s.messageItem]: true,
                      [s.hasImage]: item.images && item.images.length > 0,
                    })}
                    model={{
                      sender: item.sender,
                      direction: item.direction,
                      payload: (
                        <Message.CustomContent>
                          {item.message && <p>{item.message}</p>}

                          {item.direction === 'outgoing' && (
                            <Popconfirm
                              placement="top"
                              title={t('chat.areYouSure')}
                              onConfirm={() => confirmRemoveMessage(item)}
                              okText={t('chat.yes')}
                              cancelText={t('chat.no')}
                            >
                              <DeleteOutlined />
                            </Popconfirm>
                          )}

                          {item.images && item.images.length > 0 && (
                            <div className={s.fileList}>
                              <Image.PreviewGroup>
                                {item.images.map((image, imageIndex) => (
                                  <Image
                                    key={`image-message-${imageIndex}`}
                                    src={image}
                                    width={item.images && item.images.length > 1 ? 95 : 195}
                                  />
                                ))}
                              </Image.PreviewGroup>
                            </div>
                          )}
                        </Message.CustomContent>
                      ),
                    }}
                    avatarSpacer={item.direction === 'incoming' && item.position === 'normal'}
                  >
                    {item.direction === 'incoming' && item.position === 'single' && (
                      <Avatar
                        size="sm"
                        src={item.direction === 'incoming' && adminAvatar}
                        status={item.direction === 'incoming' && 'available'}
                      />
                    )}
                  </Message>
                ))}
            </MessageList>

            {/* Chat footer */}
            <MessageInput
              onAttachClick={() => {
                fileInputRef.current?.click()
              }}
              onPaste={preventPasteScript}
              onSend={onSend}
              placeholder={t('chat.messageInputPlaceholder')}
            />
          </ChatContainer>

          <input
            style={{ display: 'none' }}
            ref={fileInputRef}
            onChange={onFileChange}
            type="file"
            multiple
            accept="image/*"
          />
        </div>
      )}
    </div>
  )
}

export default Chat
