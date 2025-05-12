import React from 'react'
import { useAuth } from '../../context/authContext.jsx'

const Nabar=()=> {
    const {user} = useAuth()
  return (
    <div className='flex items-center text-white justify-between bg-gray-800 p-4'>
      <p>Welcome {user.username}</p>
      <button className='px-4 py-1 bg-teal-700 hover:bg-teal-600' >Logout</button>
    </div>
  )
}

export default Nabar