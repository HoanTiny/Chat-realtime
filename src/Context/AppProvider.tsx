import React, { useContext, useMemo, useState } from 'react'
import { AuthContext } from './AuthProvider'
import { WhereFilterOp } from 'firebase/firestore'
import useFireStore from '~/hooks/useFireStore'

interface Room {
  id: string
  name: string
  description: string
  members: string[]
}

interface Member {
  uid: string
  id: string
  displayName: string
  photoURL: string
  email: string
  providerId: string
}

interface AppContextType {
  rooms: Room[]
  isAddRoomVisible: boolean
  isInviteMemberVisible: boolean
  setIsAddRoomVisible: React.Dispatch<React.SetStateAction<boolean>>
  setIsInviteMemberVisible: React.Dispatch<React.SetStateAction<boolean>>
  selectedRoomId: string
  setSelectedRoomId: React.Dispatch<React.SetStateAction<string>>
  selectedRoom: Room | undefined
  members: Member[]
}

interface AuthProviderProps {
  children: React.ReactNode
}

export const AppContext = React.createContext<AppContextType>({
  rooms: [],
  isAddRoomVisible: false,
  isInviteMemberVisible: false,
  setIsAddRoomVisible: () => {},
  setIsInviteMemberVisible: () => {},
  selectedRoomId: '',
  setSelectedRoomId: () => {},
  selectedRoom: undefined,
  members: []
})

const AppProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAddRoomVisible, setIsAddRoomVisible] = useState(false)
  const [isInviteMemberVisible, setIsInviteMemberVisible] = useState(false)
  const [selectedRoomId, setSelectedRoomId] = useState('')

  const { user } = useContext(AuthContext)
  const uid = user?.uid ?? ''

  const roomCondition = useMemo(() => {
    return {
      fieldName: 'members',
      operator: 'array-contains' as WhereFilterOp,
      compareValue: uid.toString()
    }
  }, [uid])

  const rooms = useFireStore<Room>('rooms', roomCondition)

  const selectedRoom = useMemo(() => rooms.find((r) => r.id === selectedRoomId), [rooms, selectedRoomId])

  const userCondition = useMemo(() => {
    if (!selectedRoom?.members) return undefined
    return {
      fieldName: 'uid',
      operator: 'in' as WhereFilterOp,
      compareValue: selectedRoom.members
    }
  }, [selectedRoom?.members])

  const members = useFireStore<Member>('users', userCondition)

  return (
    <AppContext.Provider
      value={{
        rooms,
        isAddRoomVisible,
        setIsAddRoomVisible,
        selectedRoomId,
        setSelectedRoomId,
        selectedRoom,
        members,
        setIsInviteMemberVisible,
        isInviteMemberVisible
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export default AppProvider
