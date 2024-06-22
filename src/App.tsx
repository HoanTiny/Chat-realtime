import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './components/Login'
import ChatRoom from './components/ChatRoom/ChatRoom'
import AuthProvider from './Context/AuthProvider'
import AppProvider from './Context/AppProvider'
import AddRoomModal from './components/Modals/AddRoomModal'
import InviteMemmberModal from './components/Modals/InviteMemberModal'

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <AppProvider>
            <Routes>
              <Route path='/login' element={<Login />} />
              <Route path='/' element={<ChatRoom />} />
            </Routes>
            <AddRoomModal />
            <InviteMemmberModal />
          </AppProvider>
        </AuthProvider>
      </BrowserRouter>
    </>
  )
}

export default App
