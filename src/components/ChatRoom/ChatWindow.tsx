import { UserAddOutlined } from '@ant-design/icons'
import { Avatar, Button, Form, Input, Tooltip } from 'antd'
import styled from 'styled-components'
import Message from './Message'
import { AttachIcon } from '../Icon'

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
  return (
    <WrapperStyled>
      <HeaderStyled>
        <div className='header__info'>
          <p className='title'>Room 1</p>
          <span className='header__description'>Đây là room1</span>
        </div>

        <div>
          <ButtonGroupStyled>
            <Button icon={<UserAddOutlined />} type='text'>
              Mời
            </Button>

            <Avatar.Group size='small' max={{ count: 2 }}>
              <Tooltip title='A'>
                <Avatar>A</Avatar>
              </Tooltip>
              <Tooltip title='A'>
                <Avatar>B</Avatar>
              </Tooltip>
              <Tooltip title='A'>
                <Avatar>C</Avatar>
              </Tooltip>
              <Tooltip title='A'>
                <Avatar>D</Avatar>
              </Tooltip>
            </Avatar.Group>
          </ButtonGroupStyled>
        </div>
      </HeaderStyled>

      <ContentStyled>
        <MessageListStyled>
          <Message
            text='Hello! Have you seen my backpack anywhere in office?'
            photoURL='null'
            createAt='10-4-2024'
            displayName='Hoax'
          />
          <Message
            text='Hello! Have you seen my backpack anywhere in office?'
            photoURL='null'
            createAt='10-4-2024'
            displayName='Hoax'
          />
          <Message
            text='Hello! Have you seen my backpack anywhere in office?'
            photoURL='null'
            createAt='10-4-2024'
            displayName='Hoax'
          />
          <Message
            text='Hello! Have you seen my backpack anywhere in office?'
            photoURL='null'
            createAt='10-4-2024'
            displayName='Hoax'
          />
          <Message
            text='Hello! Have you seen my backpack anywhere in office?'
            photoURL='null'
            createAt='10-4-2024'
            displayName='Hoax'
          />
          <Message
            text='Hello! Have you seen my backpack anywhere in office?'
            photoURL='null'
            createAt='10-4-2024'
            displayName='Hoax'
          />
          <Message
            text='Hello! Have you seen my backpack anywhere in office?'
            photoURL='null'
            createAt='10-4-2024'
            displayName='Hoax'
          />
          <Message
            text='Hello! Have you seen my backpack anywhere in office?'
            photoURL='null'
            createAt='10-4-2024'
            displayName='Hoax'
          />
        </MessageListStyled>
        <FormStyled>
          <Button type='text'>
            <AttachIcon />
          </Button>
          <Form.Item>
            <Input
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
          >
            Send message
          </Button>
        </FormStyled>
      </ContentStyled>
    </WrapperStyled>
  )
}

export default ChatWindow
