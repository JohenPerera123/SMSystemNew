import React, { useEffect, useState } from 'react'
import { fetchStadiums } from '../../../utils/EventHepler'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios'

const AdminAddEventBooking = () => {
    const [stadiums, setStadiums] = useState([])
    const navigate = useNavigate()

    const [eventData, setEventData] = useState({
    eventName: '',
    eventDate: '',
    startTime: '',
    endTime: '',
    stadium: '',
  });

    const [errorMesage, setErrorMesage] = useState('')

    const location = useLocation();

    useEffect(() => {
        const loadStadiums = async () => {
    try {
      const data = await fetchStadiums();
      setStadiums(data);
    } catch (err) {
      console.error("Failed to fetch stadiums", err);
    }
  };
  loadStadiums();
  
  // Pre-fill data if available from state
  if (location.state) {
    setEventData(prev => ({
      ...prev,
      ...location.state,
    }));
  }
}, [location.state]);

    const handleChange = (e) => {
        const {name, value} = e.target
        setEventData({...eventData, [name]: value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            setErrorMesage('');
            const response = await axios.post('http://localhost:5000/api/events/add', eventData, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (response.data.success){
                navigate('/admin-dashboard/events')
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
    <h3 className="text-2xl font-bold mb-6">Add Event</h3>
    <form onSubmit={handleSubmit}>
      {/* Event Name */}
      <div>
        <label htmlFor="eventName" className="text-sm font-medium text-gray-700">Event Name</label>
        <input
          type="text"
          name="eventName"
          value={eventData.eventName}
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
          value={eventData.eventDate ? new Date(eventData.eventDate).toISOString().split('T')[0] : ''}
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
          value={eventData.stadium}
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
          value={eventData.startTime}
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
          value={eventData.endTime}
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
          Add Event
        </button>
      </div>
    </form>
  </div>
</div>

    </div>
  )
}


export default AdminAddEventBooking