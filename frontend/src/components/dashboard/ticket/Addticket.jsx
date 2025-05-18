import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import QRCode from 'qrcode'; //library
import html2canvas from 'html2canvas';

const AddTicket = ({ eventId }) => {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [ticket, setTicket] = useState(null);
  const [qrUrl, setQrUrl] = useState('');
  const ticketRef = useRef(null);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const generateQRData = (ticket) => {
    return `
Name: ${ticket.name}
Stadium: ${ticket.stadiumName}
Event: ${ticket.eventName}
Date: ${formatDate(ticket.eventDate)}
Start Time: ${ticket.startTime}
End Time: ${ticket.endTime}
Seat No: ${ticket.seatNumber}
    `;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    setTicket(null);
    setQrUrl('');

    try {
      const res = await axios.post('http://localhost:5000/api/tickets/book', {
        eventId,
        name,
      });

      const bookedTicket = res.data.ticket;
      setTicket(bookedTicket);
      setMessage(`Ticket booked! Seat: ${bookedTicket.seatNumber}`);
      setName('');

      // ✅ Generate QR code URL from data
      const qrString = generateQRData(bookedTicket);
      const qr = await QRCode.toDataURL(qrString);
      setQrUrl(qr);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || 'Booking failed');
    }
  };

  const downloadTicket = async () => {
    if (ticketRef.current) {
      const canvas = await html2canvas(ticketRef.current);
      const dataURL = canvas.toDataURL('image/png');

      const link = document.createElement('a');
      link.href = dataURL;
      link.download = `ticket-${ticket.seatNumber}.png`;
      link.click();
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

      {ticket && (
        <div className="mt-6 p-4 border rounded bg-gray-50">
          <div ref={ticketRef} className="p-4 bg-white rounded shadow text-sm">
            <h3 className="text-lg font-bold mb-2 text-center">Ticket Details</h3>
            <p><strong>Name:</strong> {ticket.name}</p>
            <p><strong>Stadium:</strong> {ticket.stadiumName}</p>
            <p><strong>Event:</strong> {ticket.eventName}</p>
            <p><strong>Date:</strong> {formatDate(ticket.eventDate)}</p>
            <p><strong>Start Time:</strong> {ticket.startTime}</p>
            <p><strong>End Time:</strong> {ticket.endTime}</p>
            <p><strong>Seat No:</strong> {ticket.seatNumber}</p>

            {qrUrl && (
              <div className="mt-4 text-center">
                <p className="font-semibold mb-2">QR Code:</p>
                <img src={qrUrl} alt="QR Code" className="inline-block p-2 bg-white shadow" />
              </div>
            )}
          </div>

          <div className="mt-4 text-center">
            <button
              onClick={downloadTicket}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Download Ticket
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddTicket;
