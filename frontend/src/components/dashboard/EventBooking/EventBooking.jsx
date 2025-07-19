import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const EventBooking = () => {
  const [eventbooking, setEventbooking] = useState([]);
  const [existingEvents, setExistingEvents] = useState([]);
  const [loading, setLoading] = useState(true);

//   useEffect(() => {
//   const fetchEventBooking = async () => {
//     try {
//       const token = localStorage.getItem('token'); 
//       if (!token) {
//         console.error("No token found in localStorage.");
//         return;
//       }

//       const eventsRes = await axios.get('http://localhost:5000/api/events', {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         const existingEventNames = eventsRes.data.events.map(event => event.eventName);

//       const res = await axios.get('http://localhost:5000/api/eventbooking/admin/all', {
//         headers: { Authorization: `Bearer ${token}` }
//       });

//       const filteredBookings = res.data.bookings.filter(
//         booking => !existingEventNames.includes(booking.eventName)
//       );

//       setEventbooking(res.data.bookings);


//       // setEventbooking(res.data.bookings); 
//       setLoading(false);
//     } catch (err) {
//       console.log(err.massage);
//       console.error("Failed to fetch all event bookings:", err);
//     }
//   };

//   fetchEventBooking();
// }, []);

useEffect(() => {
  const fetchEventBooking = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error("No token found in localStorage.");
        return;
      }

      // 1. Fetch all existing events (already approved/added)
      const eventsRes = await axios.get('http://localhost:5000/api/events', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const existingEventNames = eventsRes.data.events.map(event => event.eventName);

      // 2. Fetch all booking requests
      const res = await axios.get('http://localhost:5000/api/eventbooking/admin/all', {
        headers: { Authorization: `Bearer ${token}` }
      });

      // 3. Filter out bookings that match any already existing event
      const filteredBookings = res.data.bookings.filter(
        booking => !existingEventNames.includes(booking.eventName)
      );

      setEventbooking(filteredBookings);
      setLoading(false);
    } catch (err) {
      console.error("Failed to fetch all event bookings:", err);
    }
  };

  fetchEventBooking();
}, []);


const handleDelete = (id) => {
  const confirm = window.confirm("Are you sure you want to delete this booking?");
  if (!confirm) return;

  // Just remove from the frontend state (no API call)
  setEventbooking(prev => prev.filter(event => event._id !== id));
};


  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">All User RequestedBookings</h2>
      {loading ? (
        <p>Loading RequestedBookings...</p>
      ) : eventbooking.length === 0 ? (
        <p>No RequestedBookings found.</p>
      ) : (
        <div className="space-y-4">
          {eventbooking.map(event => (
  <div key={event._id} className="bg-white shadow-md p-4 rounded-md">
    <p className="text-gray-800 font-medium">Event: {event.eventName}</p>
    <p className="text-gray-800">Date: {new Date(event.eventDate).toDateString()}</p>
    <p className="text-gray-800">Stadium: {event.stadium?.Std_name || 'N/A'}</p>
    <p className="text-gray-800">Start: {event.startTime}</p>
    <p className="text-gray-800">End: {event.endTime}</p>
    <p className="text-gray-600 text-sm">User: {event.user?.username || 'Unknown'}</p>
    <p className="text-xs text-gray-400 mt-1">
      Submitted on {new Date(event.createdAt).toLocaleString()}
    </p>
    <div className="flex gap-2">
        <Link
          to="/admin-dashboard/add-eventbooking"
          state={{
                eventName: event.eventName,
                eventDate: event.eventDate,
                stadium: event.stadium?._id,
                startTime: event.startTime,
                endTime: event.endTime
            }}
          className="bg-teal-600 text-white px-4 py-1 rounded hover:bg-teal-700"
        >
          Add New Event
        </Link>
        {/* <button
    onClick={() => handleDelete(event._id)}
    className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700"
  >
    Delete
  </button> */}
        </div>
  </div>
    ))}

        </div>
      )}
    </div>
  );
};


export default EventBooking