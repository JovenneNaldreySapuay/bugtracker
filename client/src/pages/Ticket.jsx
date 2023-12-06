import React from 'react';
import { Link, useParams } from 'react-router-dom';
import Spinner from '../components/Spinner';
import AddTicketModal from '../components/AddTicketModal';
//import DeleteProjectButton from '../components/DeleteProjectButton';
//import EditProjectForm from '../components/EditProjectForm';
import { useQuery } from '@apollo/client';
import { GET_TICKET } from '../queries/ticketQueries';

export default function Project() {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_TICKET, { variables: { id } });

  console.log('Get single project:', data);

  if (loading) return <Spinner />;
  if (error) return <p>Something Went Wrong</p>;

  return (
    <>
      {!loading && !error && (
        <div className='mx-auto w-75 card p-5'>
          <Link to='/tickets' className='btn btn-light btn-sm w-25 d-inline ms-auto'>
            Back
          </Link>

          <h1>{data.ticket.title}</h1>

          <p>{data.ticket.description}</p>

          <h5 className='mt-3'>Ticket Type</h5>
          <p className='lead'>{data.ticket.ticketType}</p>          

          <h5 className='mt-3'>Ticket Status</h5>
          <p className='lead'>{data.ticket.status}</p> 

          <h5 className='mt-3'>Ticket Priority</h5>
          <p className='lead'>{data.ticket.priority}</p>   

          <h5 className='mt-3'>Project Name</h5>
          <p className='lead'>{data.ticket.project.title}</p>  

          <h5 className='mt-3'>Submitted By</h5>
          <p className='lead'>{data.ticket.submitter.name}</p> 
          
        </div>
      )}
    </>
  );
}
