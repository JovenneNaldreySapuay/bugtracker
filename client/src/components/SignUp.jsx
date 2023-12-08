import React, { useState } from 'react';

export default function SignUp() {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    
    console.log('signup clicked:', name, email, password); 

    // mutation here 
    if (name !== '' && email !== '' && password !== '') {
      //mutation
    }   

    // clear input field
    setName('');
    setEmail('');
    setPassword('');
  }

  return (
    <>
      <h3>Sign Up now!</h3>
      <form onSubmit={onSubmit}>
        <div className='mb-3'>
            <label className='form-label'>Name</label>
            <div>
              <input
                type='text'
                className='form-control'
                placeholder='Name'
                id='name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
        </div> 
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
        <button type='submit' className='btn btn-primary'>Sign Up</button>
      </form>
    </>
  );
}
