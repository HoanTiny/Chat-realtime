import { Avatar, Button, Divider, List, Skeleton } from 'antd'
import React from 'react'
// import React, { useState } from 'react'
import { useEffect, useState } from 'react'
import { SentIcon } from '../Icon'
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
const RoomList: React.FC = () => {
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
    <div
      id='scrollableDiv'
      className={sidebarStyles['item-list_chat']}
      style={{
        height: '82vh',
        width: '100%',
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
        endMessage={
          <Divider plain>
            <Button>Thêm phòng Room 😂</Button>
          </Divider>
        }
        scrollableTarget='scrollableDiv'
      >
        <List
          dataSource={data}
          renderItem={(item) => (
            <List.Item key={item.email} style={{ textAlign: 'left' }}>
              <List.Item.Meta
                avatar={<Avatar src={item.picture.large} />}
                title={<a href='https://ant.design'>{item.name.last}</a>}
                // description='you: See you tomorrow!'
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
  )
}

export default RoomList
