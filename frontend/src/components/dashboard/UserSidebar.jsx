import React from 'react'
import { NavLink } from 'react-router-dom'
import { FaBoxOpen, FaCheckCircle, FaTachometerAlt, FaUsers } from 'react-icons/fa'
import { FaTicketAlt } from 'react-icons/fa'
import { FaBaseballBall } from 'react-icons/fa'
import { FaEnvelope } from 'react-icons/fa'

const UserSidebar = () => {
  return (
    <div className='bg-gray-800 text-white h-screen fixed left-0 top-0 bottom-0 space-y-2 w-64'>
        <div className='bg-teal-600 h-12 flex items-center justify-center'>
            <h3 className='text-2xl text-center'>Stadium MS</h3>
        </div>
        <div>
            {/* <NavLink to="/user-dashboard" className={({ isActive }) =>`${isActive ? "bg-teal-500" : ""} flex items-center gap-2 p-2 text-white-700 hover:bg-gray-200 rounded-md`}end>
                <FaTachometerAlt />
                <span>Dashboard</span>
            </NavLink> */}
            <NavLink to="/user-dashboard/events" 
            className={({ isActive }) =>`${isActive ? "bg-teal-500" : ""} flex items-center gap-2 p-2 text-white-700 hover:bg-gray-200 rounded-md`}>
                <FaBaseballBall />
                <span>Events</span>
            </NavLink>
            <NavLink to="/user-dashboard/ticket" 
            className={({ isActive }) =>`${isActive ? "bg-teal-500" : ""} flex items-center gap-2 p-2 text-white-700 hover:bg-gray-200 rounded-md`}>
                <FaTicketAlt />
                <span> Ticket Booking </span>
            </NavLink>
            <NavLink to="/user-dashboard/resources" 
            className={({ isActive }) =>`${isActive ? "bg-teal-500" : ""} flex items-center gap-2 p-2 text-white-700 hover:bg-gray-200 rounded-md`}>
                <FaBoxOpen />
                <span> Stadium Resources </span>
            </NavLink>
            <NavLink to="/user-dashboard/crm" 
            className={({ isActive }) =>`${isActive ? "bg-teal-500" : ""} flex items-center gap-2 p-2 text-white-700 hover:bg-gray-200 rounded-md`}>
                <FaUsers/>
                <span> CRM Comment</span>
            </NavLink>
            <NavLink to="/user-dashboard/eventbooking" 
            className={({ isActive }) =>`${isActive ? "bg-teal-500" : ""} flex items-center gap-2 p-2 text-white-700 hover:bg-gray-200 rounded-md`}>
                <FaCheckCircle/>
                <span> Event Booking Request</span>
            </NavLink>
            <NavLink to="/user-dashboard/contact" 
            className={({ isActive }) =>`${isActive ? "bg-teal-500" : ""} flex items-center gap-2 p-2 text-white-700 hover:bg-gray-200 rounded-md`}>
                <FaEnvelope/>
                <span> Contact</span>
            </NavLink>
        </div>
    </div>
  )
}


export default UserSidebar