import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const UEventBooking = () => {
  const [eventbookings, setEventBookings] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(sessionStorage.getItem('user'));
    if (storedUser && storedUser._id) {
      setUser(storedUser);
      fetchEventBookings(storedUser._id);
    } else {
      console.error('User not logged in or session expired.');
    }
  }, []);

  const fetchEventBookings = async (userId) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/eventbooking/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setEventBookings(res.data.eventsbooking);
    } catch (err) {
      console.error('Failed to fetch bookings:', err);
    }
  };

  const filteredEvents = Array.isArray(eventbookings)
    ? eventbookings.filter(event =>
        event.eventName.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  return (
    <div>
      <div className='p-6'>
        <div className='text-center'>
          <h2 className="text-2xl font-bold mb-4">Event Booking Request</h2>
        </div>
        <div className='flex justify-between items-center'>
          <input
            type="text"
            placeholder='Search by Event name'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className='px-4 py-1 border rounded'
          />
          <Link
            to="/user-dashboard/add-eventbooking"
            className='px-4 py-1 border-y-teal-600 rounded text-white bg-teal-600 hover:bg-teal-700'
          >
            Book An Event
          </Link>
        </div>
      </div>

      <div className="p-6">
        <h4 className="text-1xl font-bold mb-4">The Events That You Requested</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((eventbooking) => (
            <div
              key={eventbooking._id}
              className="bg-white shadow-lg rounded-lg p-4 border border-gray-200"
            >
              <h3 className="text-xl font-semibold">{eventbooking.eventName}</h3>
              <p className="text-gray-600 text-sm mt-1">
                {new Date(eventbooking.eventDate).toDateString()}
              </p>
              <p className="text-sm mt-2">
                <strong>Time:</strong> {eventbooking.startTime} - {eventbooking.endTime}
              </p>
              <p className="text-sm mb-2">
                <strong>Stadium:</strong> {eventbooking.stadium?.Std_name || eventbooking.stadium}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UEventBooking;
