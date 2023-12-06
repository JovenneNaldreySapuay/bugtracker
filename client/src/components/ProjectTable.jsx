import React from 'react';

export default function ProjectCard({ project }) {
  return (
      <tr><td><img src={project.image} alt={`${project.title} banner`} style={{ width: '50px', border: '1px solid #ddd' }}/> <a href={`projects/${project.id}`}>{project.title}</a></td>
        <td>{project.clientID.name}</td>
        {project.tickets.length > 0 ? project.tickets.length == 1 ? <td>{`${project.tickets.length} ticket`}</td> :
                  <td>{`${project.tickets.length} tickets`}</td> : <td>No issue</td>}
        <td>{project.status} {project.id}</td>

        <td><div className='project-cta'><a href="">Add Ticket</a> <a href="">All Tickets</a> <a href="">Delete</a></div></td>
      </tr>  
  );
}
