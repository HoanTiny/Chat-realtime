import React, { useEffect, useState } from 'react'
import { AntDesignOutlined, LogoutOutlined, SearchOutlined } from '@ant-design/icons'
import { Avatar, Button, Col, Input, List, Row, Typography } from 'antd'
import { ChatIcon, FillIcon, MusicIcon, VideoCallIcon } from '../Icon'
import RoomList from './RoomList'
import { collection, onSnapshot } from 'firebase/firestore' // Import Firestore functions
import { auth, db } from '~/firebase/confg'

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
  const [user, setUser] = useState<object>([])

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'users'), (snapshot) => {
      const roomsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }))
      setUser(roomsData)
    })

    // Clean up the listener when the component unmounts
    return () => unsubscribe()
  }, [])
  console.log(`rooms`, user)
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
          icon={<AntDesignOutlined />}
          style={{
            margin: '21px 0'
          }}
        />
        <Typography.Text className='username'>ABC</Typography.Text>

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
