import React, { useEffect, useState } from 'react'
import { fetchStadiums } from '../../../utils/EventHepler'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const AddEventBooking = () => {
    const [stadiums, setStadiums] = useState([])
    const navigate = useNavigate()

    const [eventbookingdata, setEventbooking] = useState({
    eventName: '',
    eventDate: '',
    startTime: '',
    endTime: '',
    stadium: '',
  });

    const [errorMesage, setErrorMesage] = useState('')

    useEffect(() => {
        const getStadiums =async () =>{
        const stadiums = await fetchStadiums()
        setStadiums(stadiums)
        }
        getStadiums()

    }, [])

    const handleChange = (e) => {
        const {name, value} = e.target
        setEventbooking({...eventbookingdata, [name]: value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            setErrorMesage('');
       
            const response = await axios.post('http://localhost:5000/api/eventbooking/add', eventbookingdata, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (response.data.success){
                navigate('/user-dashboard/eventbooking')
            }
        } catch (error) {
            if (error.response && error.response.data && ! error.response.data.success){
                alert(error.response.data.error)
                setErrorMesage(error.response.data.error)
            }else{
                console.log(error)
                alert('Something went wrong')
            }
        }
    }

  return (
    <div>
        <div>
  <div className="max-w-3xl mx-auto mt-10 p-8 rounded-md shadow-md w-96">
    <h3 className="text-2xl font-bold mb-6">Request A Event</h3>
    <form onSubmit={handleSubmit}>
      {/* Event Name */}
      <div>
        <label htmlFor="eventName" className="text-sm font-medium text-gray-700">Event Name</label>
        <input
          type="text"
          name="eventName"
          value={eventbookingdata.eventName}
          placeholder="Enter Event Name"
          onChange={handleChange}
          className="mt-1 w-full p-2 border border-gray-300 rounded-md"
          required
        />
      </div>

      {/* Date */}
      <div className="mt-4">
        <label htmlFor="eventDate" className="text-sm font-medium text-gray-700">Date</label>
        <input
          type="date"
          name="eventDate"
          value={eventbookingdata.eventDate}
          onChange={handleChange}
          className="mt-1 w-full p-2 border border-gray-300 rounded-md"
          required
        />
      </div>

      {/* Stadium */}
      <div className="mt-4">
        <label htmlFor="stadium" className="text-sm font-medium text-gray-700">Stadium</label>
        <select
          name="stadium"
          value={eventbookingdata.stadium}
          placeholder="Select Stadium Name"
          onChange={handleChange}
          className="mt-1 w-full p-2 border border-gray-300 rounded-md"
          required
        >
        <option value="">Select Stadium</option>
        {stadiums.map(std =>(
            <option key={std._id} value={std._id}>{std.Std_name}</option>
        ))}
        </select>
      </div>

      {/* Start Time */}
      <div className="mt-4">
        <label htmlFor="startTime" className="text-sm font-medium text-gray-700">Start Time</label>
        <input
          type="time"
          name="startTime"
          value={eventbookingdata.startTime}
          onChange={handleChange}
          className="mt-1 w-full p-2 border border-gray-300 rounded-md"
          required
        />
      </div>

      {/* End Time */}
      <div className="mt-4">
        <label htmlFor="endTime" className="text-sm font-medium text-gray-700">End Time</label>
        <input
          type="time"
          name="endTime"
          value={eventbookingdata.endTime}
          onChange={handleChange}
          className="mt-1 w-full p-2 border border-gray-300 rounded-md"
          required
        />
      </div>

      {/* Submit Button */}
      <div>
        <button
          type="submit"
          className="w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4"
        >
          Request Event
        </button>
      </div>
    </form>
  </div>
</div>

    </div>
  )
}

export default AddEventBooking