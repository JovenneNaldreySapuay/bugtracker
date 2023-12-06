import React from 'react';

export default function TicketTable({ ticket }) {
  return (
      <tr>
        <td><a href={`tickets/${ticket.id}`}>{ticket.title}</a></td>
        <td>{ticket.description}</td>
        <td>{ticket.ticketType}</td>
        <td>{ticket.status}</td>
        <td>{ticket.project?.title}</td>
        <td><div className='project-cta'><a href="">Edit</a> <a href="">Delete</a></div></td>
      </tr>  
  );
}
