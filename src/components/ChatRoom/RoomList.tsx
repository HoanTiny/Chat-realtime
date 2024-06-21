import { Button, Divider, List, Skeleton } from 'antd'
import React, { ReactNode, useContext } from 'react'
// import React, { useState } from 'react'
import { useEffect, useState } from 'react'
import { SentIcon } from '../Icon'
import sidebarStyles from './Sidebar.module.scss'

import InfiniteScroll from 'react-infinite-scroll-component'
import { AppContext } from '~/Context/AppProvider'

interface DataType {
  [x: string]: ReactNode
  id: string
}
const RoomList: React.FC = () => {
  // const { user } = useContext(AuthContext)
  // const uid = user?.uid ?? ''
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<DataType[]>([] as DataType[])

  /**
   *
   * {
   * name: 'room name',
   *
   * description: 'room description',
   * members: ['uid1', 'uid2', 'uid3'],
   * }
   *
   *
   */

  // const roomCondition = useMemo(() => {
  //   return {
  //     fieldName: 'members',
  //     operator: 'array-contains' as WhereFilterOp,
  //     compareValue: uid.toString()
  //   }
  // }, [uid])

  // const rooms = useFireStore('rooms', roomCondition)
  const { rooms, setIsAddRoomVisible } = useContext(AppContext)

  console.log(`rooms`, rooms)
  const loadMoreData = async () => {
    if (loading) {
      return
    }
    setLoading(true)
    // set rooms to datas
    await setData(rooms.map((room) => ({ ...room, id: room.id.toString() })))
    setLoading(false)
  }

  useEffect(() => {
    loadMoreData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rooms])

  const hanldeAddRoom = () => {
    setIsAddRoomVisible(true)
  }

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
        hasMore={data.length < data.length}
        loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
        endMessage={
          <Divider plain>
            <Button onClick={hanldeAddRoom}>Thêm phòng Room 😂</Button>
          </Divider>
        }
        scrollableTarget='scrollableDiv'
      >
        <List
          dataSource={rooms}
          renderItem={(item) => (
            <List.Item key={item.id} style={{ textAlign: 'left' }}>
              <List.Item.Meta title={<a href='https://ant.design'>{item.name}</a>} />
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
      <div>
        {/* {rooms.map((room) => (
        <div key={room.id}>{room.name}</div>
      ))} */}
      </div>
    </div>
  )
}

export default RoomList
