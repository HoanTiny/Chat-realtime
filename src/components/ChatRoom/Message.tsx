import { Avatar, Typography } from 'antd'
import { formatRelative } from 'date-fns'
import React, { useContext } from 'react'
import styled from 'styled-components'
import { AuthContext } from '~/Context/AuthProvider'
interface Props {
  text: string
  displayName: string
  createAt: {
    seconds: number // Assuming seconds is of type number
  }
  photoURL: string
  uid: string
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

function formatDate(seconds: number) {
  let formattedDate = ''

  if (seconds) {
    formattedDate = formatRelative(new Date(seconds * 1000), new Date())

    formattedDate = formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1)
  }

  return formattedDate
}

const Message: React.FC<Props> = ({ text, displayName, createAt, photoURL, uid }) => {
  const { user } = useContext(AuthContext)
  const currentUser = user?.uid
  const flexDirectionStyle = currentUser === uid ? 'row-reverse' : 'initial'
  return (
    <WrapperStyled
      style={{
        flexDirection: flexDirectionStyle
      }}
    >
      <Avatar src={photoURL}>{photoURL ? '' : displayName?.charAt(0)?.toUpperCase()}</Avatar>
      <MessageUser className='message__user'>
        <Typography.Text className='author'>{displayName}</Typography.Text>
        <ContentStyled>
          <Typography.Text className='content'>{text}</Typography.Text>

          <Typography.Text className='date'>{formatDate(createAt?.seconds)}</Typography.Text>
        </ContentStyled>
      </MessageUser>
    </WrapperStyled>
  )
}

export default Message
