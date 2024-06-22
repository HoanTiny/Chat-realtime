// import { Avatar, Form, Modal, Select, Spin } from 'antd'
// import { collection, getDocs, orderBy, query, where } from 'firebase/firestore'
// import { debounce } from 'lodash'
// import React, { useContext, useEffect, useMemo, useState } from 'react'
// import { AppContext } from '~/Context/AppProvider'
// import { db } from '~/firebase/confg'

// interface OptionType {
//   label: string
//   value: string
//   photoURL?: string
// }

// interface DebounceSelectProps {
//   fetchOptions: (search: string, curMembers: string[]) => Promise<OptionType[]>
//   debounceTimeout?: number
//   [key: string]: any // Cho phép các prop khác
// }

// function DebounceSelect({ fetchOptions, debounceTimeout = 300, curMembers, ...props }: DebounceSelectProps) {
//   const [fetching, setFetching] = useState(false)
//   const [options, setOptions] = useState<OptionType[]>([])

//   const debounceFetcher = useMemo(() => {
//     const loadOptions = (value: string) => {
//       setOptions([])
//       setFetching(true)

//       fetchOptions(value, curMembers).then((newOptions) => {
//         setOptions(newOptions)
//         setFetching(false)
//       })
//     }

//     return debounce(loadOptions, debounceTimeout)
//   }, [debounceTimeout, fetchOptions, curMembers])

//   useEffect(() => {
//     return () => {
//       setOptions([])
//     }
//   }, [])

//   return (
//     <Select
//       labelInValue
//       mode='multiple' // Đã thêm mode để hỗ trợ chọn nhiều giá trị
//       filterOption={false}
//       onSearch={debounceFetcher}
//       notFoundContent={fetching ? <Spin size='small' /> : null}
//       {...props}
//     >
//       {options.map((opt) => (
//         <Select.Option key={opt.value} value={opt.value} label={opt.label} title={opt.label}>
//           <Avatar size='small' src={opt.photoURL}>
//             {opt.photoURL ? '' : opt.label?.charAt(0)?.toUpperCase()}
//           </Avatar>
//           {`${opt.label}`}
//         </Select.Option>
//       ))}
//     </Select>
//   )
// }

// const InviteMemberModal: React.FC = () => {
//   const { isInviteMemberVisible, setIsInviteMemberVisible } = useContext(AppContext)
//   const [form] = Form.useForm()
//   const [value, setValue] = useState<string[]>([])

//   const handleOk = () => {
//     setIsInviteMemberVisible(false)
//     form.resetFields()
//   }

//   const handleCancel = () => {
//     setIsInviteMemberVisible(false)
//     form.resetFields()
//   }

//   async function fetchUserList(search: string, curMembers: string[]): Promise<OptionType[]> {
//     console.log('search', search?.toLowerCase())

//     if (!search) return []

//     const q = query(
//       collection(db, 'users'),
//       where('keywords', 'array-contains', search?.toLowerCase()),
//       orderBy('displayName')
//       // limit(20)
//     )
//     const snapshot = await getDocs(q)
//     const users = snapshot.docs
//       .map((doc) => ({
//         label: doc.data().displayName as string,
//         value: doc.data().uid as string,
//         photoURL: doc.data().photoURL as string
//       }))
//       .filter((opt) => !curMembers.includes(opt.value))
//     console.log(`snapshot`, snapshot)
//     return users
//   }

//   console.log('Value', value)

//   return (
//     <div>
//       <Modal title='Invite Members' open={isInviteMemberVisible} onOk={handleOk} onCancel={handleCancel}>
//         <Form form={form} layout='vertical'>
//           <DebounceSelect
//             mode='multiple'
//             label='Tên các thành viên'
//             value={value}
//             placeholder='Nhập tên thành viên'
//             fetchOptions={fetchUserList}
//             onChange={(newValue: string[]) => setValue(newValue)}
//             style={{ width: '100%' }}
//           />
//         </Form>
//       </Modal>
//     </div>
//   )
// }

// export default InviteMemberModal

import { Avatar, Form, Modal, Select, Spin } from 'antd'
import { collection, doc, getDocs, orderBy, query, updateDoc, where } from 'firebase/firestore'
import { debounce } from 'lodash'
import React, { useContext, useEffect, useMemo, useState } from 'react'
import { AppContext } from '~/Context/AppProvider'
import { db } from '~/firebase/confg'

interface OptionType {
  label: string
  value: string
  photoURL?: string
}

interface OptionItem {
  disabled?: boolean
  key: string
  label: string
  title: string
  value: string
}

interface DebounceSelectProps {
  fetchOptions: (search: string, curMembers: string[]) => Promise<OptionType[]>
  debounceTimeout?: number
  curMembers: string[]
  [key: string]: unknown // Cho phép các prop khác
}

function DebounceSelect({ fetchOptions, debounceTimeout = 300, curMembers, ...props }: DebounceSelectProps) {
  const [fetching, setFetching] = useState(false)
  const [options, setOptions] = useState<OptionType[]>([])

  const debounceFetcher = useMemo(() => {
    const loadOptions = (value: string) => {
      setOptions([])
      setFetching(true)

      fetchOptions(value, curMembers).then((newOptions) => {
        setOptions(newOptions)
        setFetching(false)
      })
    }

    return debounce(loadOptions, debounceTimeout)
  }, [debounceTimeout, fetchOptions, curMembers])

  useEffect(() => {
    return () => {
      setOptions([])
    }
  }, [])

  return (
    <Select
      labelInValue
      mode='multiple'
      filterOption={false}
      onSearch={debounceFetcher}
      notFoundContent={fetching ? <Spin size='small' /> : null}
      {...props}
    >
      {options.map((opt) => (
        <Select.Option key={opt.value} value={opt.value} title={opt.label}>
          <Avatar size='small' src={opt.photoURL}>
            {opt.photoURL ? '' : opt.label?.charAt(0)?.toUpperCase()}
          </Avatar>
          {`${opt.label}`}
        </Select.Option>
      ))}
    </Select>
  )
}

const InviteMemberModal: React.FC = () => {
  const { isInviteMemberVisible, setIsInviteMemberVisible, selectedRoomId, selectedRoom } = useContext(AppContext)
  const [form] = Form.useForm()
  const [value, setValue] = useState<OptionItem[]>([])

  if (!selectedRoom) {
    return
  }
  const handleOk = async () => {
    setValue([])
    form.resetFields()

    const roomRef = doc(db, 'rooms', selectedRoomId)

    await updateDoc(roomRef, {
      members: [...selectedRoom.members, ...value.map((val) => val.value)]
    })
    setIsInviteMemberVisible(false)
  }

  const handleCancel = () => {
    setIsInviteMemberVisible(false)
    form.resetFields()
  }

  async function fetchUserList(search: string, curMembers: string[]): Promise<OptionType[]> {
    console.log('search', search?.toLowerCase())

    if (!search) return []
    const searchValue = search.trim()
    const q = query(
      collection(db, 'users'),
      where('keywords', 'array-contains', searchValue),
      orderBy('displayName')
      // Thêm limit(20) nếu muốn giới hạn số lượng kết quả
    )
    const snapshot = await getDocs(q)
    const users: OptionType[] = snapshot.docs
      .map((doc) => ({
        label: doc.data().displayName as string,
        value: doc.data().uid as string,
        photoURL: doc.data().photoURL as string
      }))
      .filter((opt) => !curMembers.includes(opt.value))

    console.log('snapshot', snapshot)

    return users
  }

  console.log('Value', value)

  return (
    <div>
      <Modal
        title='Invite Members'
        open={isInviteMemberVisible} // Đã sửa thành visible thay vì open
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout='vertical'>
          <DebounceSelect
            mode='multiple'
            label='Tên các thành viên'
            value={value}
            placeholder='Nhập tên thành viên'
            fetchOptions={fetchUserList}
            debounceTimeout={800} // Thay đổi debounce timeout nếu cần
            onChange={(newValue: OptionItem[]) => setValue(newValue)}
            style={{ width: '100%' }}
            curMembers={selectedRoom?.members ?? []}
          />
        </Form>
      </Modal>
    </div>
  )
}

export default InviteMemberModal
