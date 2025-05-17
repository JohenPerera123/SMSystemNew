import React from 'react'
import { useAuth } from '../../context/authContext.jsx'
import { useNavigate } from 'react-router-dom'

const Nabar=()=> {
    const {user, logout} = useAuth()
    const navigate = useNavigate()

const handleLogout = () => {
    logout()
    navigate('/login')
}

  return (
    <div className='flex items-center text-white justify-between bg-gray-800 p-4'>
      <p>Welcome {user.username}</p>
      <button 
      type='button'
      onClick={handleLogout}
      className='px-4 py-1 bg-teal-700 hover:bg-teal-600' >Logout</button>
    </div>
  )
}

export default Nabar