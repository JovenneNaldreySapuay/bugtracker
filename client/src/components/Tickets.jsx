import React from 'react';
import { useQuery } from '@apollo/client';
import Spinner from './Spinner';

import TicketTable from './TicketTable';
import AddTicketModal from '../components/AddTicketModal';

import { GET_TICKETS } from '../queries/ticketQueries';

export default function Tickets() {
  const { loading, error, data } = useQuery(GET_TICKETS);

  console.log(data);

  if (loading) return <Spinner />;
  if (error) return <p>Something Went Wrong</p>;

  return (
    <>
     {data.tickets.length > 0 ? (
        <div className='container'>
          <div className='row'>
            <div className='col-12 col-lg-12'>
              <table className='ticket-table'>
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Type</th>
                    <th>Status</th>
                    <th>Project</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {data.tickets?.map((ticket) => (
                    <TicketTable key={ticket.id} ticket={ticket} />
                  ))}
                </tbody>
              </table>
            </div>  
          </div>
        </div>
      ) : (
        <p>No tickets to show.</p>
      )}
    </>
  );
}
