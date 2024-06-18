import { Col, Row } from 'antd'
import React from 'react'
import Sidebar from './Sidebar'
import ChatWindow from './ChatWindow'

const ChatRoom: React.FC = () => {
  return (
    <Row
      style={{
        minHeight: '100vh'
      }}
    >
      <Col span={6}>
        <Sidebar />
      </Col>
      <Col span={18}>
        <ChatWindow />
      </Col>
    </Row>
  )
}

export default ChatRoom
