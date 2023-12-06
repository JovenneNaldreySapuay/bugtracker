import React from 'react';

export default function TicketCard({ ticket }) {
  //console.log(ticket);
  return (
    <div className='col-md-6'>
      <div className='card mb-3'>
        <div className='card-body'>
          <div>
            ID #: {ticket.id}
          </div>
          <div className='d-flex justify-content-between align-items-center'>
            <h5 className='card-title'><a href={`http://localhost:1234/tickets/${ticket.id}`}>{ticket.title}</a></h5>
          </div>
          <p className='small'>
            Description: <strong>{ticket.description}</strong>
          </p>
        </div>
      </div>
    </div>
  );
}
