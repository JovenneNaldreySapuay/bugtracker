import React from 'react';

export default function ProjectTable({ project }) {
  //console.log('props', project);
  return (
      <tr>
        <td>{project.id}</td>
        <td><img src={project.image} alt={`${project.title} banner`} style={{ width: '50px', border: '1px solid #ddd' }}/> <a href={`projects/${project.id}`}>{project.title}</a></td>
        <td>{project.clientID.name}</td>
        {project.tickets.length > 0 ? project.tickets.length == 1 ? <td>{`${project.tickets.length} ticket`}</td> :
                  <td>{`${project.tickets.length} tickets`}</td> : <td>No ticket</td>}
        <td>{project.status}</td>
        <td><div className='project-cta'><a href={`projects/${project.id}/edit`}>Edit</a> <a href="">Delete</a></div></td>
      </tr>  
  );
}
