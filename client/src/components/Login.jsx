import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { LOGIN } from '../queries/userQueries';

export default function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // const { loading, error, data } = useQuery(LOGIN, {
  //   variables: { email, password },
  // });

  const onSubmit = (e) => {
    e.preventDefault();

    console.log('login states:', email, password); 

    let requestBody = {
      query: `
        query {
          login(email: "${email}", password: "${password}") {
            userID
            token
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
      if (res.status !== 200 && res.status !== 201) {
      throw new Error('Failed!');
      }
      return res.json();
    })
    .then(resData => {
      console.log(resData);
    })
    .catch(err => {
      console.log(err);
    });

    // clear input field
    //setEmail('');
    //setPassword('');
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
                type='text'
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
