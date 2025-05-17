import React from 'react'
import { NavLink } from 'react-router-dom'
import { FaTachometerAlt, FaUsers } from 'react-icons/fa'
import { MdSportsSoccer } from 'react-icons/md'
import { FaBaseballBall } from 'react-icons/fa'

function AdminSidebar() {
  return (
    <div className='bg-gray-800 text-white h-screen fixed left-0 top-0 bottom-0 space-y-2 w-64'>
        <div className='bg-teal-600 h-12 flex items-center justify-center'>
            <h3 className='text-2xl text-center'>Stadium MS</h3>
        </div>
        <div>
            <NavLink to="/admin-dashboard" className={({ isActive }) =>`${isActive ? "bg-teal-500" : ""} flex items-center gap-2 p-2 text-white-700 hover:bg-gray-200 rounded-md`}end>
                <FaTachometerAlt />
                <span>Dashboard</span>
            </NavLink>
            <NavLink to="/admin-dashboard/stadiums" 
            className={({ isActive }) =>`${isActive ? "bg-teal-500" : ""} flex items-center gap-2 p-2 text-white-700 hover:bg-gray-200 rounded-md`}>
                <MdSportsSoccer />
                <span> Stadiums</span>
            </NavLink>
            <NavLink to="/admin-dashboard/events" 
            className={({ isActive }) =>`${isActive ? "bg-teal-500" : ""} flex items-center gap-2 p-2 text-white-700 hover:bg-gray-200 rounded-md`}>
                <FaBaseballBall />
                <span> Events</span>
            </NavLink>
            <NavLink to="/admin-dashboard/crm" className="flex items-center gap-2 p-2 text-white-700 hover:bg-gray-200 rounded-md">
                <FaUsers/>
                <span> CRM Comments</span>
            </NavLink>
        </div>
    </div>
  )
}

export default AdminSidebar