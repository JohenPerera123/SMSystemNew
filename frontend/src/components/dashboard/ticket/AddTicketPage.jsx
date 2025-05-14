import React from 'react';
import { useParams } from 'react-router-dom';
import AddTicket from './Addticket';

const AddTicketPage = () => {
  const { eventId } = useParams();
  return <AddTicket eventId={eventId} />;
};

export default AddTicketPage;
