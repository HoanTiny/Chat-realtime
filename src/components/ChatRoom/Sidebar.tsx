import { AntDesignOutlined, LogoutOutlined, SearchOutlined } from '@ant-design/icons'
import { Avatar, Button, Col, Input, List, Row, Typography } from 'antd'
// import React, { useState } from 'react'
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
  //   const [selectedItemId, setSelectedItemId] = useState<number | null>(null)
  //   const handleItemClick = (id: number) => {
  //     setSelectedItemId(id)
  //   }

  return (
    <Row
      style={{
        height: '100%'
      }}
    >
      <Col
        span={4}
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          backgroundColor: '#FAFAFA',
          padding: '10px'
        }}
      >
        <Avatar
          size={40}
          icon={<AntDesignOutlined />}
          style={{
            margin: '21px 0'
          }}
        />

        <List
          itemLayout='horizontal'
          dataSource={dataIcon}
          style={{
            flex: 1
          }}
          renderItem={(item) => (
            <List.Item
              //   onClick={() => handleItemClick(item.id)}
              style={{
                //   backgroundColor: item.id === selectedItemId ? '#27AE60' : '#FAFAFA',
                cursor: 'pointer',
                //   borderRadius: '50%',
                width: '42px',
                height: '42px',
                marginBottom: '10px',
                //   display: 'flex',
                //   justifyContent: 'center',
                //   alignItems: 'center'
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

        <Button danger>
          <LogoutOutlined />
        </Button>
      </Col>
      <Col
        span={20}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          padding: '10px',
          boxShadow: 'rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px'
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
