import { Button, Divider, List, Skeleton } from 'antd'
import React, { ReactNode, useContext } from 'react'
// import React, { useState } from 'react'
import { useEffect, useState } from 'react'
import sidebarStyles from './Sidebar.module.scss'

import { formatDistanceToNow, isToday, isYesterday } from 'date-fns'
import { vi } from 'date-fns/locale'
import { WhereFilterOp } from 'firebase/firestore'
import InfiniteScroll from 'react-infinite-scroll-component'
import { AppContext } from '~/Context/AppProvider'
import useFireStore from '~/hooks/useFireStore'
// import { formatRelative } from 'date-fns'

interface DataType {
  [x: string]: ReactNode
  id: string
}

type Condition = {
  fieldName: string
  operator: WhereFilterOp
  /* eslint-disable @typescript-eslint/no-explicit-any */
  compareValue: any
}

interface MessageData {
  id: string
  text: string
  displayName: string // Optional nếu displayName có thể không tồn tại
  createdAt: { seconds: number } // Optional nếu createdAt có thể không tồn tại
  photoURL: string
  uid: string
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
  const { rooms, setIsAddRoomVisible, setSelectedRoomId, selectedRoom } = useContext(AppContext)

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
    // console.log(`rooms`, rooms)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rooms])

  const hanldeAddRoom = () => {
    setIsAddRoomVisible(true)
  }

  function formatDate(seconds: number) {
    if (!seconds) return ''

    const date = new Date(seconds * 1000)

    // Nếu là ngày hôm nay
    if (isToday(date)) {
      const config = formatDistanceToNow(date, { addSuffix: true, locale: vi })
      if (config == 'dưới 1 phút trước') {
        const secondsDiff = Math.round((new Date().getTime() - date.getTime()) / 1000)
        return `${secondsDiff} giây trước`
      }
      return config // Thay viLocale bằng locale của bạn
    }

    // Nếu là ngày hôm qua
    if (isYesterday(date)) {
      return 'Hôm qua'
    }

    // Nếu là hơn 1 ngày trước
    return formatDistanceToNow(date, { addSuffix: true, locale: vi }) // Thay viLocale bằng locale của bạn
  }

  // const selectedRoom = useMemo(() => rooms.find((r) => r.id === selectedRoomId), [rooms, selectedRoomId])

  // const getMessage = async () => {
  //   const mes = await getDocs(collection(db, 'messages'))
  //   console.log('getMessage', mes)
  //   let arr = []

  //   mes.forEach((doc) => {
  //     arr.push(doc.data())
  //     // doc.data() is never undefined for query doc snapshots
  //     console.log(232332, arr)
  //   })
  // }

  // getMessage()

  const condition: Condition = React.useMemo(
    () => ({
      fieldName: 'roomId',
      operator: '==',
      compareValue: selectedRoom?.id
    }),
    [selectedRoom?.id]
  )

  const message = useFireStore<MessageData>('messages', condition)
  const lastMessage = message[message.length - 1]

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
            <List.Item key={item.id} style={{ textAlign: 'left' }} onClick={() => setSelectedRoomId(item.id)}>
              <List.Item.Meta title={item.name} description={selectedRoom?.id === item.id ? lastMessage?.text : ''} />
              <div>
                <div>{formatDate(selectedRoom?.id === item.id ? lastMessage?.createdAt?.seconds : 0)}</div>
                {/* <div>
                  <SentIcon />
                </div> */}
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
