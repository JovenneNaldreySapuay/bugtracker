import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_USER } from '../queries/userQueries';
import UpdateUser from '../components/UpdateUser';
import Spinner from '../components/Spinner';

export default function User() {
  const { id } = useParams();

  const editingMode = window.location.pathname.split("/")[3];

  const { loading, error, data } = useQuery(GET_USER, {
   variables: { id },
  });

  if (loading) return <Spinner />;
  if (error) return <p>Something Went Wrong</p>;

  return (
    <>
      {!loading && !error && (
        <div className='mx-auto w-75 card p-5'>
          <Link to='/users' className='btn btn-light btn-sm w-25 d-inline ms-auto'>
            Back to Users
          </Link>

          {editingMode === 'edit' && ( 
            <UpdateUser user={data.user} />
          )}
        </div>
      )}
    </>
  );
}
