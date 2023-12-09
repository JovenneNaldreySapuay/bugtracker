import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ToastContainer, toast } from 'react-toastify';

import { ADD_USER } from '../mutations/userMutations';
import 'react-toastify/dist/ReactToastify.css';

export default function SignUp() {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const notify = () => toast("Sign up saved!", {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: false,
    progress: undefined,
    theme: "dark",
  });

  const [addUser] = useMutation(ADD_USER, {
    variables: { name, email, password },
  });

  const onSubmit = (e) => {
    e.preventDefault();
    
    console.log('signup clicked:', name, email, password); 

    // mutation here 
    if (name !== '' && email !== '' && password !== '') {
      //mutation
      addUser(name, email, password);
      notify(); 
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
      <p className='mt-3'>Already have an account? <a href="/login">Login</a></p>
      <ToastContainer />

    </>
  );
}
