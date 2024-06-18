import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '~/firebase/confg'
import { Spin } from 'antd'

interface User {
  displayName: string | null
  email: string | null
  uid: string | null
  photoURL: string | null
}

interface AuthContextType {
  user: User | null
}

interface AuthProviderProps {
  children: React.ReactNode
}

export const AuthContext = React.createContext<AuthContextType>({ user: null })

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const unsubscibed = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { displayName, email, uid, photoURL } = user
        setUser({
          displayName,
          email,
          uid,
          photoURL
        })
        setIsLoading(false)
        navigate('/')
      } else {
        setIsLoading(false)

        navigate('/login')
        // User is signed out
        // ...
      }
    })

    // Clean function
    return () => {
      unsubscibed()
    }
  }, [navigate])

  return <AuthContext.Provider value={{ user }}>{isLoading ? <Spin /> : children}</AuthContext.Provider>
}

export default AuthProvider
