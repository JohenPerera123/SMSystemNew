import React from 'react'
import { useAuth } from '../context/authContext.jsx'
import UserSidebar from '../components/dashboard/UserSidebar.jsx'
import { Outlet } from 'react-router-dom'
import Nabar from '../components/dashboard/Nabar.jsx'

const UserDashboard=() => {
  const { user } = useAuth()

  return (
    <div className='flex'>
      <UserSidebar />
      <div className='flex-1 ml-64 bg-gray-100 h-screen'>
        <Nabar />
        <Outlet />
      </div>
    </div>
  )
}

export default UserDashboard