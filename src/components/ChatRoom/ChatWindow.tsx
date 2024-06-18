import { UserAddOutlined } from '@ant-design/icons'
import { Avatar, Button, Form, Input, Tooltip } from 'antd'
import styled from 'styled-components'

const HeaderStyled = styled.div`
  display: flex;
  justify-content: space-between;
  height: 56px;
  padding: 0 16px;
  align-items: center;
  border-bottom: 1px solid #a1a1a1;
  box-shadow:
    rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
    rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;

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
const ContentStyled = styled.div``
const MessageListStyled = styled.div``

function ChatWindow() {
  return (
    <div>
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
        <MessageListStyled></MessageListStyled>
        <Form>
          <Form.Item>
            <Input />
          </Form.Item>
          <Button>Gửi</Button>
        </Form>
      </ContentStyled>
    </div>
  )
}

export default ChatWindow
