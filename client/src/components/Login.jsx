import React, { useState } from 'react';

export default function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    
    console.log('login clicked:', email, password); 

    // mutation here 
    if (email !== '' && password !== '') {
      //mutation
    }   

    // clear input field
    setEmail('');
    setPassword('');
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
    </>
  );
}
