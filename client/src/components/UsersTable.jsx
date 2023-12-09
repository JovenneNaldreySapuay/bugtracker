import React from 'react';

export default function UsersTable({ user }) {
  return (
      <tr>
        <td>{user.id}</td>
        <td>{user.name}</td>
        <td>{user.email}</td>
        <td>{user.company}</td> 
        <td>{user.website}</td>
        <td>{user.role}</td>
        <td>{user.subscription}</td>
        <td><div className='user-cta'><a href={`users/${user.id}`}>View</a> <a href={`users/${user.id}/edit`}>Edit</a> <a href="">Delete</a></div></td>
      </tr>  
  );
}
