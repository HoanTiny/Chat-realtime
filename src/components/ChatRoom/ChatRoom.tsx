import { Col, Row } from 'antd'
import React from 'react'
import Sidebar from './Sidebar'
import ChatWindow from './ChatWindow'

const ChatRoom: React.FC = () => {
  return (
    <Row
      style={{
        height: '97vh'
      }}
    >
      <Col xs={{ span: 5 }} lg={{ span: 6 }} style={{ height: '100%' }}>
        <Sidebar />
      </Col>
      <Col xs={{ span: 5 }} lg={{ span: 18 }} style={{ height: '100%' }}>
        <ChatWindow />
      </Col>
    </Row>
  )
}

export default ChatRoom
