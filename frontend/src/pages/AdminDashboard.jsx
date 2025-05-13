import React from 'react'
import { useAuth } from '../context/authContext.jsx'
import AdminSidebar from '../components/dashboard/AdminSidebar.jsx'
import Nabar from '../components/dashboard/Nabar.jsx'
import AdminSummary from '../components/dashboard/AdminSummary.jsx'
import { Outlet } from 'react-router-dom'


const AdminDashboard= () => {
  const {user}= useAuth()

  return(
    <div className='flex'>
      <AdminSidebar/>
      <div className='flex-1 ml-64 bg-gray-100 h-screen'>
        <Nabar/>
        <Outlet/>
      </div>
    </div>
  )
  
  
}

export default AdminDashboard