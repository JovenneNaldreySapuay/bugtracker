import React from 'react';
import Spinner from './Spinner';
import { useQuery } from '@apollo/client';
import ProjectTable from './ProjectTable';

import { GET_PROJECTS } from '../queries/projectQueries';

export default function Projects() {
  const { loading, error, data } = useQuery(GET_PROJECTS);

  //console.log(data);

  if (loading) return <Spinner />;
  if (error) return <p>Something Went Wrong</p>;

  return (
    <>
     {data.projects.length > 0 ? (
        <div className='container'>
          <div className='row'>
            <div className='col-12 col-lg-12'>
              <table className='project-table'>
                <thead>
                  <tr>
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
