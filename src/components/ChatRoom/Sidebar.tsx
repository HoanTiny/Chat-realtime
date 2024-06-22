import { LogoutOutlined, SearchOutlined } from '@ant-design/icons'
import { Avatar, Button, Col, Input, List, Row, Typography } from 'antd'
import React, { useContext } from 'react'
import { AuthContext } from '~/Context/AuthProvider'
import { auth } from '~/firebase/confg'
import { ChatIcon, FillIcon, MusicIcon, VideoCallIcon } from '../Icon'
import RoomList from './RoomList'

const dataIcon = [
  {
    icon: <FillIcon />,
    id: 1
  },
  {
    icon: <ChatIcon />,
    id: 2
  },
  {
    icon: <VideoCallIcon />,
    id: 3
  },
  {
    icon: <MusicIcon />,
    id: 4
  }
]

const Sidebar: React.FC = () => {
  const data = useContext(AuthContext)
  // console.log(`data`, data)
  return (
    <Row
      style={{
        height: '100%'
      }}
    >
      <Col
        span={3}
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          backgroundColor: '#FAFAFA',
          padding: '10px'
        }}
      >
        <Avatar
          size={{ xs: 10, md: 20, lg: 20, xl: 25, xxl: 40 }}
          src={data.user?.photoURL}
          style={{
            margin: '21px 0'
          }}
        >
          {data.user?.photoURL ? '' : data.user?.displayName?.charAt(0)?.toUpperCase()}
        </Avatar>

        <List
          itemLayout='horizontal'
          dataSource={dataIcon}
          style={{
            flex: 1
          }}
          renderItem={(item) => (
            <List.Item
              style={{
                cursor: 'pointer',

                width: '42px',
                height: '42px',
                marginBottom: '10px',

                border: 'none',
                textAlign: 'center'
              }}
            >
              <List.Item.Meta
                avatar={
                  <Avatar
                    src={item.icon}
                    style={{
                      flex: 'none'
                    }}
                  />
                }
              />
            </List.Item>
          )}
        />

        <Button danger onClick={() => auth.signOut()}>
          <LogoutOutlined />
        </Button>
      </Col>
      <Col
        span={21}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          padding: '10px',
          boxShadow: 'rgba(0, 0, 0, 0.02) 1.95px 1.95px 2.6px'
        }}
      >
        <Typography.Title
          style={{ fontFamily: 'SFProDisplay', marginTop: '22px', width: '100%', textAlign: 'left' }}
          level={2}
        >
          Message
        </Typography.Title>

        <Input
          placeholder='Search'
          prefix={<SearchOutlined />}
          variant='filled'
          style={{ width: '90%', borderRadius: '12px' }}
        />

        <RoomList />
      </Col>
    </Row>
  )
}

export default Sidebar
