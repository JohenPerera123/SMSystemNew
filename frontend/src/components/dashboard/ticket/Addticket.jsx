import React, { useState } from 'react';
import axios from 'axios';

const AddTicket = ({ eventId }) => {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      const res = await axios.post('http://localhost:5000/api/tickets/book', {
        eventId,
        name
      });

      setMessage(`Ticket booked! Seat: ${res.data.ticket.seatNumber}`);
      setName('');
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || 'Booking failed');
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded">
      <h2 className="text-xl font-bold mb-4 text-center">Book Ticket</h2>
      <form onSubmit={handleSubmit}>
        <label className="block mb-2 font-semibold">Name</label>
        <input
          type="text"
          className="w-full px-4 py-2 border rounded mb-4"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full bg-teal-600 text-white py-2 rounded hover:bg-teal-700"
        >
          Book Ticket
        </button>

        {message && <p className="mt-4 text-green-600 font-semibold">{message}</p>}
        {error && <p className="mt-4 text-red-600 font-semibold">{error}</p>}
      </form>
    </div>
  );
};

export default AddTicket;
