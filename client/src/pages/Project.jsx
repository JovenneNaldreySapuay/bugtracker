import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { FaSyncAlt } from 'react-icons/fa';
import Spinner from '../components/Spinner';
import AddTicketModal from '../components/AddTicketModal';
import TicketCard from '../components/TicketCard';

//import DeleteProjectButton from '../components/DeleteProjectButton';
//import EditProjectForm from '../components/EditProjectForm';
import UpdateProjectModal from '../components/UpdateProjectModal';
import { useQuery } from '@apollo/client';
import { GET_PROJECT, GET_TICKETS_PER_PROJECT } from '../queries/projectQueries';

export default function Project() {
  const { id } = useParams();

  const editingMode = window.location.pathname.split("/")[3];

  //console.log('location:', currentPath);

  const { loading, error, data, refetch } = useQuery(GET_PROJECT, {
   variables: { id },
   // pollInterval: 500, 
  });

  const getTicketsPerProject = useQuery(GET_TICKETS_PER_PROJECT, {
    variables: { project_id: id }
  })

  //console.log('getTicketsPerProject:', getTicketsPerProject);

  if (loading) return <Spinner />;
  if (error) return <p>Something Went Wrong</p>;

  return (
    <>
      {!loading && !error && (
        <div className='mx-auto w-75 card p-5'>
          <Link to='/projects' className='btn btn-light btn-sm w-25 d-inline ms-auto'>
            Back to Projects
          </Link>

          {!editingMode && (
          <>
          <h3>View Mode</h3>
          <img src={data.project.image} alt="Info" style={{ width: '150px' }} />

          <h1>{data.project.title}</h1>

          <p>{data.project.description}</p>

          <h5 className='mt-3'>Attachment</h5>
          <p className='lead'><a href={data.project.attachment}>Download</a></p>

          <h5 className='mt-3'>Project Status</h5>
          <p className='lead'>{data.project.status}</p>

          <h5 className='mt-3'>Assigns To</h5>
          {
            data.project.assignee.length > 0 ? (
              <ol>
              {
                data.project.assignee.map((assignee) => (
                  <li key={assignee.id}>{assignee.name} <em>({assignee.role})</em></li>
                ))
              }
              </ol>
            ) : 
            (
              <p>No assignee to show</p>
            )
          }

          <h5 className='mt-3'>Client Info</h5>
          <p className='lead'>{data.project.clientID.name} - {data.project.clientID.website}</p>

          
          <h5 className='mt-3'>Tickets</h5>
          {getTicketsPerProject.data?.ticketsPerProject.map((ticket, id) => (
            <TicketCard key={ticket.id} ticket={ticket} />
          ))}

          <AddTicketModal />
          </>
          )}

          {editingMode === 'edit' && ( 
            <UpdateProjectModal project={data.project} />
          )}
        </div>
      )}
    </>
  );
}
