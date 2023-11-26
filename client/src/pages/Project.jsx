import React from 'react';
import { Link, useParams } from 'react-router-dom';
import Spinner from '../components/Spinner';
import AddTicketModal from '../components/AddTicketModal';
//import DeleteProjectButton from '../components/DeleteProjectButton';
//import EditProjectForm from '../components/EditProjectForm';
import { useQuery } from '@apollo/client';
import { GET_PROJECT } from '../queries/projectQueries';

export default function Project() {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_PROJECT, { variables: { id } });

  if (loading) return <Spinner />;
  if (error) return <p>Something Went Wrong</p>;

  return (
    <>
      {!loading && !error && (
        <div className='mx-auto w-75 card p-5'>
          <Link to='/' className='btn btn-light btn-sm w-25 d-inline ms-auto'>
            Back
          </Link>

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

          {/*<ClientInfo client={data.project.clientId.name} />*/}

          {/*<EditProjectForm project={data.project} />*/}

          {/*<DeleteProjectButton projectId={data.project.id} />*/}

          <AddTicketModal />
        </div>
      )}
    </>
  );
}
