import { Form, Input, Modal } from 'antd'
// import { useForm } from 'antd/es/form/Form'
import React, { useContext } from 'react'
import { AppContext } from '~/Context/AppProvider'
import { AuthContext } from '~/Context/AuthProvider'
import { addDocument } from '~/firebase/services'

const AddRoomModal: React.FC = () => {
  const { isAddRoomVisible, setIsAddRoomVisible } = useContext(AppContext)
  const [form] = Form.useForm()
  const { user } = useContext(AuthContext)

  const handleOke = () => {
    //hanlde logic
    console.log(`form`, { FormData: form.getFieldsValue() })
    addDocument('rooms', { ...form.getFieldsValue(), members: [user?.uid] })
    setIsAddRoomVisible(false)

    //reset form
    form.resetFields()
  }

  const handleCancel = () => {
    setIsAddRoomVisible(false)
    form.resetFields()
  }
  return (
    <div>
      <Modal title='Add Room' open={isAddRoomVisible} onOk={handleOke} onCancel={handleCancel}>
        <Form form={form} layout='vertical'>
          <Form.Item label='Room Name' name='name'>
            <Input placeholder='Nhập tên phòng' />
          </Form.Item>

          <Form.Item label='Room Description' name='description'>
            <Input placeholder='Nhập mô tả' />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default AddRoomModal
