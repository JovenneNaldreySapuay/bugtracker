import React from 'react';
import Spinner from './Spinner';
import { useQuery } from '@apollo/client';
import { Navigate } from 'react-router-dom';
import { connect } from 'react-redux';

import UsersTable from './UsersTable';
import { GET_USERS } from '../queries/userQueries';

function Users(props) {
  const { loading, error, data } = useQuery(GET_USERS);

  if (loading) return <Spinner />;
  if (error) return <p>Something Went Wrong</p>;

  if (! props.isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
     {data.users.length > 0 ? (
        <div className='container'>
          <div className='row'>
            <div className='col-12 col-lg-12'>
              <table className='project-table'>
                <thead>
                  <tr>
                    <th>ID No.</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Company</th>
                    <th>Website</th>
                    <th>Role</th>
                    <th>Subscription</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {data.users.map((user) => (
                    <UsersTable key={user.id} user={user} />
                  ))}
                </tbody>
              </table>
            </div>  
          </div>
        </div>
      ) : (
        <p>No users to show.</p>
      )}
    </>
  );
}

function mapStateToProps(state) {
  console.log('state Users.js', state);  

  return {
    isAuthenticated: state.auth.payload ? !!state.auth.payload.token : false,
  }
}

export default connect(mapStateToProps, {})(Users);
