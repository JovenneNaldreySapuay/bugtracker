import React from 'react';
import Spinner from './Spinner';
import { useQuery } from '@apollo/client';
import { Navigate } from 'react-router-dom';
import { connect } from 'react-redux';

import ProjectTable from './ProjectTable';
import { GET_PROJECTS } from '../queries/projectQueries';
import AddProjectModal from './AddProjectModal';

function Projects({ isAuthenticated }) {
  const { loading, error, data } = useQuery(GET_PROJECTS);

  if (loading) return <Spinner />;
  if (error) return <p>Something Went Wrong</p>;

  if (! isAuthenticated) {
    //return <Navigate to="/login" replace />;
  }

  return (
    <>
     
     <AddProjectModal /> 

     {data.projects.length > 0 ? (
        <div className='container'>
          <div className='row'>
            <div className='col-12 col-lg-12'>
              <table className='project-table'>
                <thead>
                  <tr>
                    <th>ID No.</th>
                    <th>Project</th>
                    <th>Client Name</th>
                    <th>Tickets</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {data.projects.map((project) => (
                    <ProjectTable key={project.id} project={project} />
                  ))}
                </tbody>
              </table>
            </div>  
          </div>
        </div>
      ) : (
        <p>No Projects to show.</p>
      )}
    </>
  );
}

function mapStateToProps(state) {
  console.log('state Projects.js', state);  

  return {
    isAuthenticated: state.auth.payload ? !!state.auth.payload.token : false,
  }
}

export default connect(mapStateToProps, {})(Projects);