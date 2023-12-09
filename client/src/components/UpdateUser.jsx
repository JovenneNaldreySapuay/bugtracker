import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { UPDATE_USER } from '../mutations/userMutations';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function UpdateUser({ user }) {

  const [id, setID] = useState(user.id);
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState(user.password);
  const [company, setCompany] = useState(user.company ? user.company : '');
  const [website, setWebsite] = useState(user.website ? user.website : '');
  const [phone, setPhone] = useState(user.phone ? user.phone : '');
  const [role, setRole] = useState(user.role ? user.role : '');
  const [subscription, setSubscription] = useState(user.subscription ? user.subscription : '');

  const notify = () => toast("User Updated!", {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: false,
    progress: undefined,
    theme: "dark",
  });

  const [updateUser] = useMutation(UPDATE_USER, {
    variables: { id, name, email, password, company, website, phone, role, subscription },
    //refetchQueries: [{ query: GET_PROJECT, variables: { id: projectID } }],
  });

  const onSubmit = (e) => {
    e.preventDefault();

    console.log({ id, name, email, password, company, website, phone, role, subscription });
    
    if (name !== '' && 
        email !== '' && 
        password !== '' && 
        role !== '' ) {

        // Mutation
        updateUser(id, name, email, password, company, website, phone, role, subscription);
        notify(); 
    }
    
    // setName('');
    // setEmail('');
    // setPassword('');
    // setCompany('');
    // setWebsite('');
    // setPhone('');
    // setRole('');
    // setSubscription('');    
  };

  return (
    <>
      <div className='editUser' id='editUser' style={{ marginTop: '20px' }}>
        <h3>Edit User</h3>
        
        <form onSubmit={onSubmit}>
        <input
        type='text'
        className='form-control'
        id='id'
        value={user.id}
        readOnly
        />
        <div className='mb-3'>
        <label className='form-label'>Name</label>
        <input
        type='text'
        className='form-control'
        id='name'
        value={name}
        onChange={(e) => setName(e.target.value)}
        />
        </div>
        <div className='mb-3'>
        <label className='form-label'>Email</label>
        <input
        type='text'
        className='form-control'
        id='email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        />
        </div>
        <div className='mb-3'>
        <label className='form-label'>Password</label>
        <input
        type='text'
        className='form-control'
        id='password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        />
        </div>
        <div className='mb-3'>
        <label className='form-label'>Company</label>
        <input
        type='text'
        className='form-control'
        id='company'
        value={company}
        onChange={(e) => setCompany(e.target.value)}
        />
        </div>
        <div className='mb-3'>
        <label className='form-label'>Website</label>
        <input
        type='text'
        className='form-control'
        id='website'
        value={website}
        onChange={(e) => setWebsite(e.target.value)}
        />
        </div>
        <div className='mb-3'>
        <label className='form-label'>Phone</label>
        <input
        type='text'
        className='form-control'
        id='phone'
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        />
        </div>

        <div className='mb-3'>
        <label className='form-label'>Role</label>
        <select
        id='role'
        className='form-select'
        value={role}
        onChange={(e) => setRole(e.target.value)}
        >
        <option value=''>Select Role</option>
        <option value='Admin'>Admin</option>
        <option value='Developer'>Developer</option>
        <option value='Client'>Client</option>
        </select>
        </div>
        
        <div className='mb-3'>
        <label className='form-label'>Subscription</label>
        <select
        id='subscription'
        className='form-select'
        value={subscription}
        onChange={(e) => setSubscription(e.target.value)}
        >
        <option value=''>Select Subscription</option>
        <option value='Free'>Free</option>
        <option value='Paid'>Paid</option>
        </select>
        </div>
        
        <button
        type='submit'
        className='btn btn-primary'
        >
        Save Changes
        </button>
        </form>
        <ToastContainer />

      </div>
  </>
  );
}
