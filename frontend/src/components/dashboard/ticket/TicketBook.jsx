import React, { useEffect, useState } from 'react';
import { fetchEvents } from '../../../utils/EventHepler';
import { useNavigate } from 'react-router-dom';

const TicketBook = () => {
  const [events, setEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const getEvents = async () => {
      const data = await fetchEvents();
      setEvents(data);
    };
    getEvents();
  }, []);

  const filteredEvents = events.filter(event =>
    event.eventName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleBookTicket = (eventId) => {
    navigate(`/user-dashboard/book/${eventId}`);
  };

  return (
    <div>
      <div className='p-6'>
        <div className='text-center'>
          <h3 className='text-2xl font-bold'>Ticket Booking</h3>
        </div>
        <div className='flex justify-between items-center mt-4'>
          <input
            type="text"
            placeholder='Search by Event name'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className='px-4 py-2 border rounded w-1/2'
          />
        </div>
      </div>

      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Event List</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => {
            const stadium = event.stadium;
            const capacity = stadium?.Std_capacity || 'N/A';
            const availableTickets = capacity - (event.ticketsBooked || 0);

            return (
              <div
                key={event._id}
                className="bg-white shadow-lg rounded-lg p-4 border border-gray-200"
              >
                <h3 className="text-xl font-semibold">{event.eventName}</h3>
                <p className="text-gray-600 text-sm mt-1">
                  {new Date(event.eventDate).toDateString()}
                </p>
                <p className="text-sm mt-2">
                  <strong>Time:</strong> {event.startTime} - {event.endTime}
                </p>
                <p className="text-sm">
                  <strong>Stadium:</strong> {stadium?.Std_name || 'N/A'}
                </p>
                <p className="text-sm">
                  <strong>Capacity:</strong> {capacity}
                </p>
                <p className="text-sm">
                  <strong>Available Tickets:</strong> {availableTickets}
                </p>
                <div className="mt-4">
                  <button
                    className="px-3 py-1 text-white bg-teal-600 rounded hover:bg-teal-700"
                    onClick={() => handleBookTicket(event._id)}
                  >
                    Ticket Book
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TicketBook;
