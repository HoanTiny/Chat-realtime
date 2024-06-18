import { AntDesignOutlined, LogoutOutlined, SearchOutlined } from '@ant-design/icons'
import { Avatar, Button, Col, Divider, Input, List, Row, Skeleton, Typography } from 'antd'
// import React, { useState } from 'react'
import { FillIcon, ChatIcon, VideoCallIcon, MusicIcon, SentIcon } from '../Icon'
import { useEffect, useState } from 'react'
import sidebarStyles from './Sidebar.module.scss'

import InfiniteScroll from 'react-infinite-scroll-component'
interface DataType {
  gender?: string
  name: {
    title?: string
    first?: string
    last?: string
  }
  email?: string
  picture: {
    large?: string
    medium?: string
    thumbnail?: string
  }
  nat?: string
  loading: boolean
}

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

  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<DataType[]>([])

  const loadMoreData = () => {
    if (loading) {
      return
    }
    setLoading(true)
    fetch('https://randomuser.me/api/?results=10&inc=name,gender,email,nat,picture&noinfo')
      .then((res) => res.json())
      .then((body) => {
        setData([...data, ...body.results])
        setLoading(false)
      })
      .catch(() => {
        setLoading(false)
      })
  }

  useEffect(() => {
    loadMoreData()
  }, [])
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
          style={{ width: '291px', borderRadius: '12px' }}
        />

        <div
          id='scrollableDiv'
          className={sidebarStyles['item-list_chat']}
          style={{
            height: '85vh',
            overflow: 'auto',
            padding: '0 16px'
            // border: '1px solid rgba(140, 140, 140, 0.35)'
          }}
        >
          <InfiniteScroll
            dataLength={data.length}
            next={loadMoreData}
            hasMore={data.length < 50}
            loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
            endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
            scrollableTarget='scrollableDiv'
          >
            <List
              dataSource={data}
              renderItem={(item) => (
                <List.Item key={item.email} style={{ textAlign: 'left' }}>
                  <List.Item.Meta
                    avatar={<Avatar src={item.picture.large} />}
                    title={<a href='https://ant.design'>{item.name.last}</a>}
                    description='you: See you tomorrow!'
                  />
                  <div>
                    <div>16:45</div>
                    <div>
                      <SentIcon />
                    </div>
                  </div>
                </List.Item>
              )}
            />
          </InfiniteScroll>
        </div>
      </Col>
    </Row>
  )
}

export default Sidebar
