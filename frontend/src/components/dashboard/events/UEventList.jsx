import React, { useEffect, useState } from 'react'
import { fetchEvents } from '../../../utils/EventHepler'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import './calendar-custom.css' // Optional custom styling

const UEventList = () => {
  const [events, setEvents] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedDate, setSelectedDate] = useState(null)

  useEffect(() => {
    const getEvents = async () => {
      const data = await fetchEvents()
      setEvents(data)
    }
    getEvents()
  }, [])

  // Extract dates with events to highlight in calendar
  const eventDates = events.map(event => new Date(event.eventDate).toDateString())

  // Filter events based on search and selected date
  const filteredEvents = events.filter(event => {
    const matchesName = event.eventName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDate = selectedDate
      ? new Date(event.eventDate).toDateString() === new Date(selectedDate).toDateString()
      : true
    return matchesName && matchesDate
  })

  // Highlight tiles that match event dates
  const tileClassName = ({ date, view }) => {
    if (view === 'month' && eventDates.includes(date.toDateString())) {
      return 'highlight-event' // Add your custom class for highlighting
    }
    return null
  }

  return (
    <div className="p-6">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold">Upcoming Events</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <input
          type="text"
          placeholder="Search by Event name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2 border rounded w-full"
        />

        
      </div>
      <div><center><Calendar
          onChange={setSelectedDate}
          value={selectedDate}
          tileClassName={tileClassName}
          className="w-full"
        /></center>
        </div>

      <h2 className="text-xl font-bold mb-4">Event List</h2>
      {filteredEvents.length === 0 ? (
        <p className="text-gray-500 italic">No events found for the selected criteria.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map(event => (
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
                <strong>Stadium:</strong> {event.stadium?.Std_name || event.stadium}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default UEventList
