import React, { useState } from 'react';

export default function Header() {

  return (
    <>
      <header>
        <ul className="header-links">
          <li><a href="/">Home</a></li>
          <li><a href="/dashboard">Dashboard</a></li>
          <li><a href="/users">Users</a></li>
          <li><a href="/projects">Projects</a></li>  
          <li><a href="/tickets">Tickets</a></li>     
          <li><a href="/signup">Sign Up</a></li>
          <li><a href="/login">Login</a></li>
        </ul>  
      </header>
    </>
  );
}
