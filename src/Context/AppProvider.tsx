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

interface AppContextType {
  rooms: Room[]
  isAddRoomVisible: boolean
  setIsAddRoomVisible: React.Dispatch<React.SetStateAction<boolean>>
}

interface AuthProviderProps {
  children: React.ReactNode
}

export const AppContext = React.createContext<AppContextType>({
  rooms: [],
  isAddRoomVisible: false,
  setIsAddRoomVisible: () => {}
})

const AppProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAddRoomVisible, setIsAddRoomVisible] = useState(false)
  const { user } = useContext(AuthContext)
  const uid = user?.uid ?? ''
  console.log('uid', uid)

  const roomCondition = useMemo(() => {
    return {
      fieldName: 'members',
      operator: 'array-contains' as WhereFilterOp,
      compareValue: uid.toString()
    }
  }, [uid])

  const rooms = useFireStore<Room>('rooms', roomCondition)

  return <AppContext.Provider value={{ rooms, isAddRoomVisible, setIsAddRoomVisible }}>{children}</AppContext.Provider>
}

export default AppProvider
