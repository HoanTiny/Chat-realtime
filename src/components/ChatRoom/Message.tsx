import { Avatar, Typography } from 'antd'
import React from 'react'
import styled from 'styled-components'

interface Props {
  text: string
  displayName: string
  createAt: string
  photoURL: string
}

const WrapperStyled = styled.div`
  margin-bottom: 10px;
  display: flex;

  .message__user {
    margin-left: 10px;
    display: flex;
    flex-direction: column;
  }
  .author {
    font-weight: bold;
  }

  .date {
    color: rgba(0, 0, 0, 0.45);
    font-family: 'SFProDisplay';

    font-size: 12px;
    font-style: normal;
    font-weight: 300;
    line-height: 16px; /* 133.333% */
  }

  .content {
    font-family: 'SFProDisplay';
  }
`
const MessageUser = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 5px;
`

const ContentStyled = styled.div`
  display: flex;
  padding: 12px 18px 6px 18px;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
  border-radius: 0px 16px 16px 16px;
  background: #f4f4f7;
`

const Message: React.FC<Props> = ({ text, displayName, createAt, photoURL }) => {
  return (
    <WrapperStyled>
      <Avatar src={photoURL}>A</Avatar>
      <MessageUser className='message__user'>
        <Typography.Text className='author'>{displayName}</Typography.Text>
        <ContentStyled>
          <Typography.Text className='content'>{text}</Typography.Text>

          <Typography.Text className='date'>{createAt}</Typography.Text>
        </ContentStyled>
      </MessageUser>
    </WrapperStyled>
  )
}

export default Message
