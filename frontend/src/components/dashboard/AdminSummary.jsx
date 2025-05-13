import React from 'react'
import { FaUsers } from 'react-icons/fa'
import SummaryCard from './SummaryCard'
import { MdSportsSoccer } from 'react-icons/md'
import { FaBaseballBall } from 'react-icons/fa'

const AdminSummary = () => {
  return (
    <div className='p-6'>
        <h3 className='text-2xl font-bold'>Dashboard Overview</h3>
        <div className='grid grid-cols-3 gap-4 mt-4'>
            <SummaryCard icon={<FaUsers />} text="Total Users" number={100} color="bg-teal-600"/>
            <SummaryCard icon={<MdSportsSoccer />} text="Total Stadiums" number={5} color="bg-yellow-600"/>
            <SummaryCard icon={<FaBaseballBall />} text="Upcoming Events" number={5} color="bg-red-600"/>
            <SummaryCard icon={<FaUsers />} text="CRM comments" number={10} color="bg-orange-600"/>

        </div>
    </div>
  )
}

export default AdminSummary