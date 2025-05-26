import React from 'react'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { fetchEvents } from '../../../utils/EventHepler'
import axios from 'axios'

const EventList = () => {
    const [events, setEvents] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
 
    useEffect(() => {
  const getEvents = async () => {
    const data = await fetchEvents();
    const now = new Date();

    const validEvents = data.filter(event => {
      const [endHour, endMinute] = event.endTime.split(':');
      const eventEndDateTime = new Date(event.eventDate);
      eventEndDateTime.setHours(parseInt(endHour), parseInt(endMinute), 0, 0);

      return eventEndDateTime > now;
    });

    setEvents(validEvents);
  };

  getEvents();
}, []);

  const handleDelete = async (eventId) => {
    const confirm = window.confirm('Are you sure you want to delete this event?');
    if (!confirm) return;

    try {
      await axios.delete(`http://localhost:5000/api/events/${eventId}`, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setEvents(events.filter((event) => event._id !== eventId));
    } catch (error) {
      console.error('Delete failed:', error);
      alert('Failed to delete the event');
    }
  };
    const filteredEvents = events.filter(event =>
        event.eventName.toLowerCase().includes(searchTerm.toLowerCase())
    )

  return (
    <div>
      <div className='p-6'>
          <div className='text-center'>
              <h3 className='text_2x1 font-bold'>Manage Event</h3>
          </div>
          <div className='flex justify-between items-center'>
              <input
            type="text"
            placeholder='Search by Event name'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className='px-4 py-0.5 border rounded'
             
          />
          <Link
            to="/admin-dashboard/add-events"
            className='px-4 py-1 border-y-teal-600 rounded text-white bg-teal-600 hover:bg-teal-700'
          >
                
                Add New Event</Link>
          </div>
      </div>
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Event List</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents
  .filter(event => event.stadium && (event.stadium.Std_name || typeof event.stadium === 'string'))
  .map((event) => (
    <div
      key={event._id}
      className="bg-white shadow-lg rounded-lg p-4 border border-gray-200"
    >
      <h3 className="text-xl font-semibold">{event.eventName}</h3>
      <p className="text-gray-600 text-sm mt-1">{new Date(event.eventDate).toDateString()}</p>
      <p className="text-sm mt-2">
        <strong>Time:</strong> {event.startTime} - {event.endTime}
      </p>
      <p className="text-sm">
        <strong>Stadium:</strong> {event.stadium?.Std_name || event.stadium}
      </p>
      <div>
        <button
          className="px-3 py-1 text-white bg-red-600 rounded hover:bg-red-700"
          onClick={() => handleDelete(event._id)}
        >
          Delete
        </button>
      </div>
    </div>
))}

        </div>
      </div>
    </div>
  )
}

export default EventList