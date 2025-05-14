import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import DataTable from 'react-data-table-component'
import { columns, StadiumButtons } from '../../../utils/StadiumHelpers'
import axios from 'axios'

const StadiumsList = () => {
  const [stadiums, setStadiums] = useState([]);
  const [stdLoading, setStdLoading] = useState(false)
  const [filteredStadiums, setFilterStadiums] = useState('')
  const onStadiumDelete =async(id) => { 
    const data =await stadiums.filter(std => std._id !== id)
    setStadiums(data)
  }
  useEffect(() => {
    const fetchStadiums = async () => {
      setStdLoading(true)
      try {
        const response = await axios.get('http://localhost:5000/api/stadiums', {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`
          }
        });
        if(response.data.success) {
          let sno =1
          const data= await response.data.stadiums.map((std) => (
            {_id: std._id, 
              sno: sno++,
              Std_location: std.Std_location,
              std_name: std.Std_name,
              action: (<StadiumButtons _id={std._id} onStadiumDelete={onStadiumDelete}/>)
            }
          ))
          setStadiums(data);
        }
      } catch (error) {
        if(error.response && !error.response.data.success){
          alert(error.response.data.error);
        }
      }finally{
        setStdLoading(false)
      }
    };

    fetchStadiums();
  }, [])

  const filterStadiums = (e) => {
    const records = stadiums.filter((std) => 
      std.std_name.toLowerCase().includes(e.target.value.toLowerCase())) 
  setFilterStadiums(records)
  }

  return (
    <div className='p-5'>
        <div className='text-center'>
            <h3 className='text_2x1 font-bold'>Manage Stadiums</h3>
        </div>
        <div className='flex justify-between items-center'>
            <input
          type="text"
          placeholder='Search by Stadium name'
          className='px-4 py-0.5 border rounded'
          onChange={filterStadiums} 
        />
        <Link
          to="/admin-dashboard/add-stadiums"
          className='px-4 py-1 border-y-teal-600 rounded text-white bg-teal-600 hover:bg-teal-700'
        >
              
              Add New Stadium</Link>
        </div>
        <div>
            <DataTable
              columns={columns} data={filteredStadiums || stadiums}
              pagination
            />
        </div>
    </div>
  )
}

export default StadiumsList