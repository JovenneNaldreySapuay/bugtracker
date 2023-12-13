import React, { useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { logout } from '../actions/auth';

function Header(props) {

  const dispatch = useDispatch();

  console.log('Header props:', props);

  return (
    <>
      <header>
        <ul className="header-links">
          <li><a href="/">Home</a></li>
          <li><a href="/dashboard">Dashboard</a></li>
          <li><a href="/users">Users</a></li>
          <li><a href="/projects">Projects</a></li>  
          <li><a href="/tickets">Tickets</a></li>    
          { ! props.isAuthenticated && (
          <>
          <li><a href="/signup">Sign Up</a></li>
          <li><a href="/login">Login</a></li> 
          </>
          )
          }
          <li>{ props.isAuthenticated ? 
              <><span>Welcome, {props.name}!</span> <button onClick= {() => dispatch(props.logout) }>Logout</button></>
               : '' }</li>   
        </ul>       
      </header>
    </>
  );
}

function mapStateToProps(state) {
  console.log('state Header.jsx', state);  

  return {
    id: state.auth.payload ? state.auth.payload.id : null,
    isAuthenticated: state.auth.payload ? !!state.auth.payload.token : false,
    //email: state.auth.payload ? state.auth.payload.email : '',
    name: state.auth.payload ? state.auth.payload.name : '',
    role: state.auth.payload ? state.auth.payload.role : '',    
  }
}

export default connect(mapStateToProps, { logout })(Header);