import React from 'react';
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';

function Dashboard(props) {

  console.log('Dashboard props:', props);

  if (! props.isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      <div>
        <h1>Dashboard</h1>
      </div>      
    </>
  );
}

function mapStateToProps(state) {
  console.log('state app.js', state);  

  return {
    isAuthenticated: state.auth.payload ? !!state.auth.payload.token : false,
    // id: state.auth.payload ? state.auth.payload.userID : null,
    // email: state.auth.payload ? state.auth.payload.email : '',
    // name: state.auth.payload ? state.auth.payload.name : '',
    // role: state.auth.payload ? state.auth.payload.role : '',    
  }
}

export default connect(mapStateToProps, {})(Dashboard);