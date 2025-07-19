import React, { useEffect, useState } from 'react';
import { fetchStadiums } from '../../../utils/EventHepler';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddEventBooking = () => {
  const [user, setUser] = useState(null);
  const [stadiums, setStadiums] = useState([]);
  const [eventbookingdata, setEventbooking] = useState({
    eventName: '',
    eventDate: '',
    startTime: '',
    endTime: '',
    stadium: '',
  });
  const [errorMessage, setErrorMesage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const getStadiums = async () => {
      try {
        const stadiums = await fetchStadiums();
        setStadiums(stadiums);
      } catch (err) {
        console.error('Error fetching stadiums:', err);
      }
    };
    getStadiums();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventbooking(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setErrorMesage('');
      const storedUser = JSON.parse(sessionStorage.getItem('user'));
      if (!storedUser || !storedUser._id) {
        setUser(storedUser);
        alert('User not logged in');
        return;
      }

      // Compose POST data here, adding userId freshly from sessionStorage
      const postData = {
        ...eventbookingdata,
        user: storedUser._id,  // your backend expects `user`, not `userId`
      };

      const response = await axios.post(
        'http://localhost:5000/api/eventbooking/add',
        postData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      if (response.data.success) {
        navigate('/user-dashboard/eventbooking');
      }
    } catch (error) {
      if (error.response && error.response.data && !error.response.data.success) {
        alert(error.response.data.error);
        setErrorMesage(error.response.data.error);
      } else {
        console.error(error);
        alert('Something went wrong');
      }
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-8 rounded-md shadow-md w-96">
      <h3 className="text-2xl font-bold mb-6">Request An Event</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label className="text-sm font-medium text-gray-700">Event Name</label>
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

        <div className="mt-4">
          <label className="text-sm font-medium text-gray-700">Date</label>
          <input
            type="date"
            name="eventDate"
            value={eventbookingdata.eventDate}
            onChange={handleChange}
            className="mt-1 w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="mt-4">
          <label className="text-sm font-medium text-gray-700">Stadium</label>
          <select
            name="stadium"
            value={eventbookingdata.stadium}
            onChange={handleChange}
            className="mt-1 w-full p-2 border border-gray-300 rounded-md"
            required
          >
            <option value="">Select Stadium</option>
            {stadiums.map(std => (
              <option key={std._id} value={std._id}>{std.Std_name}</option>
            ))}
          </select>
        </div>

        <div className="mt-4">
          <label className="text-sm font-medium text-gray-700">Start Time</label>
          <input
            type="time"
            name="startTime"
            value={eventbookingdata.startTime}
            onChange={handleChange}
            className="mt-1 w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="mt-4">
          <label className="text-sm font-medium text-gray-700">End Time</label>
          <input
            type="time"
            name="endTime"
            value={eventbookingdata.endTime}
            onChange={handleChange}
            className="mt-1 w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

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
  );
};

export default AddEventBooking;
