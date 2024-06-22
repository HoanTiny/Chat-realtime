import { UserAddOutlined } from '@ant-design/icons'
import { Alert, Avatar, Button, Form, Input, InputRef, Tooltip } from 'antd'
import { WhereFilterOp } from 'firebase/firestore'
import React, { SetStateAction, useContext, useRef, useState, useEffect, RefObject } from 'react'
import styled from 'styled-components'
import { AppContext } from '~/Context/AppProvider'
import { AuthContext } from '~/Context/AuthProvider'
import { addDocument } from '~/firebase/services'
import useFireStore from '~/hooks/useFireStore'
import { AttachIcon } from '../Icon'
import Message from './Message'
interface MessageData {
  id: string
  text: string
  displayName: string // Optional nếu displayName có thể không tồn tại
  createdAt: { seconds: number } // Optional nếu createdAt có thể không tồn tại
  photoURL: string
  uid: string
}

type Condition = {
  fieldName: string
  operator: WhereFilterOp
  /* eslint-disable @typescript-eslint/no-explicit-any */
  compareValue: any
}

const HeaderStyled = styled.div`
  display: flex;
  justify-content: space-between;
  height: 56px;
  padding: 0 16px;
  align-items: center;
  border-bottom: 1px solid #eee;

  .header {
    &__info {
      display: flex;
      justify-content: center;
      flex-direction: column;
    }

    &__title {
      margin: 0;
      font-weight: bold;
    }

    &__description {
      font-size: 12px;
    }
  }
`

const ButtonGroupStyled = styled.div`
  display: flex;
  align-items: center;
`
const WrapperStyled = styled.div`
  height: 100vh;
`

const ContentStyled = styled.div`
  height: calc(100% - 56px);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`
const FormStyled = styled(Form)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid rgb(230, 230, 230);
  height: 48px;
  padding: 0 18px;
  .ant-form-item {
    flex: 1;
    margin-bottom: 0;
  }
`

const MessageListStyled = styled.div`
  padding: 21px;
  height: calc(100% - 56px -48px);
  overflow-y: auto;
`

function ChatWindow() {
  const { selectedRoom, members, setIsInviteMemberVisible } = useContext(AppContext)
  const { user } = useContext(AuthContext)
  const [inputValue, setInputValue] = useState('')
  const [form] = Form.useForm()
  const inputRef = useRef<InputRef>(null)

  const sharedProps = {
    ref: inputRef
  }
  const messageListRef: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null)

  const handleInputChange = (e: { target: { value: SetStateAction<string> } }) => {
    setInputValue(e.target.value)
  }

  const handleOnSubmit = () => {
    inputRef.current!.focus()
    addDocument('messages', {
      text: inputValue,
      uid: user?.uid,
      photoURL: user?.photoURL,
      roomId: selectedRoom?.id,
      displayName: user?.displayName
    })

    form.resetFields(['message'])

    // focus to input again after submit
    console.log(98765, inputRef.current)

    // focus to input again after submit
    if (inputRef?.current) {
      setTimeout(() => {
        inputRef.current!.focus()
      })
    }
  }

  const condition: Condition = React.useMemo(
    () => ({
      fieldName: 'roomId',
      operator: '==',
      compareValue: selectedRoom?.id
    }),
    [selectedRoom?.id]
  )

  const message = useFireStore<MessageData>('messages', condition)
  useEffect(() => {
    // Scroll to bottom after messages changed
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight + 50
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [message])
  return (
    <WrapperStyled>
      {selectedRoom?.id ? (
        <>
          <HeaderStyled>
            <div className='header__info'>
              <p className='title'>{selectedRoom?.name}</p>
              <span className='header__description'>{selectedRoom?.description}</span>
            </div>

            <div>
              <ButtonGroupStyled>
                <Button icon={<UserAddOutlined />} type='text' onClick={() => setIsInviteMemberVisible(true)}>
                  Mời
                </Button>

                <Avatar.Group size='small' max={{ count: 2 }}>
                  {members.map((member) => (
                    <Tooltip title={member.displayName} key={member.id}>
                      <Avatar src={member.photoURL}>
                        {member.photoURL ? '' : member.displayName?.charAt(0)?.toUpperCase()}
                      </Avatar>
                    </Tooltip>
                  ))}
                </Avatar.Group>
              </ButtonGroupStyled>
            </div>
          </HeaderStyled>

          <ContentStyled>
            <MessageListStyled ref={messageListRef}>
              {message.map((mes) => (
                <Message
                  key={mes.id}
                  text={mes.text}
                  displayName={mes.displayName}
                  createAt={mes.createdAt}
                  photoURL={mes.photoURL}
                  uid={mes.uid}
                />
              ))}
            </MessageListStyled>
            <FormStyled form={form}>
              <Button type='text'>
                <AttachIcon />
              </Button>
              <Form.Item name='message'>
                <Input
                  {...sharedProps}
                  onChange={handleInputChange}
                  onPressEnter={handleOnSubmit}
                  variant='borderless'
                  autoComplete='off'
                  placeholder='Type your message here.. '
                  style={{
                    backgroundColor: '#FAFAFA',
                    margin: '0 12px',
                    height: '36px'
                  }}
                />
              </Form.Item>
              <Button
                type='text'
                style={{
                  color: '#27AE60',
                  fontSize: '16px'
                }}
                onClick={handleOnSubmit}
              >
                Send message
              </Button>
            </FormStyled>
          </ContentStyled>
        </>
      ) : (
        <Alert message='Hãy chọn phòng' type='info' showIcon style={{ margin: 5 }} closable />
      )}
    </WrapperStyled>
  )
}

export default ChatWindow
