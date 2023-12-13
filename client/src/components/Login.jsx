import React, { useState, useContext } from 'react';
import { connect, useDispatch } from 'react-redux';
import { useNavigate, Navigate } from 'react-router-dom';
// import { withRouter } from 'react-router-dom';

import * as actions from '../constants/action-types';
import { LOGIN } from '../queries/userQueries';
import { userLoggedIn, login } from '../actions/auth';
// import AuthContext from '../context/auth-context';

import { useQuery } from '@apollo/client';
import { GET_USER } from '../queries/userQueries';

function Login(props) {

  // console.log('props', props);
   
  if (props.isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [email, setEmail] = useState('jovenne@admin.io');
  const [password, setPassword] = useState('password');

  // const authContextType = useContext(AuthContext);

  // see this - https://www.youtube.com/watch?v=wMg_b1zZcag

  const onSubmit = (e) => {
    e.preventDefault();

    //console.log('login states:', email, password); 

    const requestBody = {
      query: `
        query {
          login(email: "${email}", password: "${password}") {
            userID
            token
            name
            email
            role
            tokenExpiration
          }
        }
      `
    };

    console.log('login requestBody:', {requestBody}); 

    fetch('http://localhost:5000/graphql', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => {
      console.log('res status', res);

      if (res.status !== 200 && res.status !== 201) {
        throw new Error('Failed!');
      }

      return res.json();

    })
    .then(resData => {  

      console.log('resData', resData);

      const { userID, name, email, role, tokenExpiration, token } = resData.data.login;

      //props.login(resData.data.login).then(res => console.log('what?', res)).then(resData => console.log('what2?', resData));

      dispatch({
          type: actions.USER_LOGGED_IN,
          payload: {
              userID,
              name,
              email,
              role,
              tokenExpiration,
              token,
          }
      });   

      //dispatch(userLoggedIn(resData.data.login));

      // store token into our localStorage
      localStorage.setItem('token', token);

      navigate("/dashboard");
    })
    .catch(err => {

      console.log(err);

    });
}

  return (
    <>
      <h3>Login now!</h3>
      <form onSubmit={onSubmit}>
        <div className='mb-3'>
            <label className='form-label'>Email</label>
            <div>
              <input
                type='text'
                className='form-control'
                placeholder='Email'
                id='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
        </div> 
        <div className='mb-3'>
            <label className='form-label'>Password</label>
            <div>
              <input
                type='password'
                className='form-control'
                placeholder='Password'
                id='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
        </div>  
        <button type='submit' className='btn btn-primary'>Log in</button>
      </form>
      <p className='mt-3'>No account yet? <a href="/signup">Signup</a></p>
    </>
  );
}

function mapStateToProps(state) {
  console.log('Login page state:', state);  
  return {
    isAuthenticated: state.auth.payload ? !!state.auth.payload.token : false,
    email: state.auth.payload ? state.auth.payload.email : '',
    name: state.auth.payload ? state.auth.payload.name : '',
    role: state.auth.payload ? state.auth.payload.role : '',    
  }
}

export default connect(mapStateToProps, { login })(Login);