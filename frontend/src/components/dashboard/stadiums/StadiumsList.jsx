import React from 'react'
import { Link } from 'react-router-dom'

const StadiumsList = () => {
  return (
    <div className='p-5'>
        <div className='text-center'>
            <h3 className='text_2x1 font-bold'>Manage Stadiums</h3>
        </div>
        <div className='flex justify-between items-center'>
            <input type="text" placeholder='Search by Stdium name' className='px-4 py-0.5'/>
            <Link to="/admin-dashboard/add-stadiums" className='px-4 py-1 border-y-teal-600 rounded text-white bg-teal-600 hover:bg-teal-700'>Add New Stadium</Link>
        </div>
    </div>
  )
}

export default StadiumsList