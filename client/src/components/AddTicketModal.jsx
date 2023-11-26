import React, { useState } from 'react';
import Select from 'react-select';
import axios from 'axios';
import { FaList } from 'react-icons/fa';
import { useMutation, useQuery } from '@apollo/client';
import { ADD_PROJECT } from '../mutations/projectMutations';
import { GET_PROJECTS, GET_USERS } from '../queries/projectQueries';

export default function AddTicketModal() {

  const adminID = '655876c0d467b3b136a481c4'; //'6560a67f3557cdc6c6f528c9'; // TODO: make this dynamic

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [ticketType, setTicketType] = useState('');
  const [status, setStatus] = useState('');
  const [priority, setPriority] = useState('');
  const [assignees, setAssignees] = useState([]);  
  const [submitterID, setSubmitterID] = useState('');
  const [projectID, setProjectID] = useState('');

  /*
  const [addTicket] = useMutation(ADD_TICKET, {
    variables: { title, description, ticketType, status, priority, assignees, submitterID, projectID },
    update(cache, { data: { addTicket } }) {
      const { tickets } = cache.readQuery({ query: GET_TICKETS });
      cache.writeQuery({
        query: GET_PROJECTS,
        data: { tickets: [...tickets, addTicket] },
      });
    },
  });
  */

  const getUsers = useQuery(GET_USERS);

  const userLists = getUsers.data?.users; 

  const assignedUsers = userLists?.map(({
  id: value,
  name: label,  
  ...rest
  }) => ({
  value,
  label,
  ...rest
  }));

  const handleAssignees = (e) => {
    setAssignees(Array.isArray(e) ? e.map(x => x.value) : []);
  }

  const ProjectAssignees = () => (
    <Select 
      className="dropdown"
      placeholder="Select Assignees"
      options={{}} 
      value={{}}
      onChange={handleAssignees}
      isMulti 
      isClearable 
    />
  );

  // Get Clients for dropdown select
  //const { loading, error, data } = useQuery(GET_CLIENTS);

  const onSubmit = (e) => {
    e.preventDefault();

    if (title === '' || description === '' || status === '') {
      console.log('Please fill in all fields');

      //return alert('Please fill in all fields');
    }

    console.log({ title, description, image, attachment, clientID, ticket, assignee, status, createdBy });
    
    if (title !== '' && 
        description !== '' && 
        image !== '' && 
        attachment !== '' && 
        clientID !== '' && 
        ticket.length > 0 && 
        assignee.length > 0 && 
        status !== '' && 
        createdBy !== '') {

        // Mutation
        //addTicket(title, description, image, attachment, clientID, ticket, assignee, status, createdBy);
    }
    
    setTitle('');
    setDescription('');
    setTicketType('');
    setStatus('');
    setPriority('');
    setAssignees([]);
    setSubmitterID('');
    setProjectID('');

  };

  //if (loading) return null;
  //if (error) return 'Something Went Wrong';

  return (
    <>
      {true && true && (
        <>
          <button
            type='button'
            className='btn btn-primary'
            data-bs-toggle='modal'
            data-bs-target='#addTicketModal'
          >
            <div className='d-flex align-items-center'>
              <FaList className='icon' />
              <div>Add New Ticket</div>
            </div>
          </button>

          <div
            className='modal fade'
            id='addTicketModal'
            aria-labelledby='addTicketModalLabel'
            aria-hidden='true'
          >
            <div className='modal-dialog'>
              <div className='modal-content'>
                <div className='modal-header'>
                  <h5 className='modal-title' id='addProjectModalLabel'>
                    Add Ticket
                  </h5>
                  <button
                    type='button'
                    className='btn-close'
                    data-bs-dismiss='modal'
                    aria-label='Close'
                  ></button>
                </div>
                <div className='modal-body'>
                  <form onSubmit={onSubmit}>
                    <div className='mb-3'>
                      <label className='form-label'>Title</label>
                      <input
                        type='text'
                        className='form-control'
                        id='title'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                      />
                    </div>
                    <div className='mb-3'>
                      <label className='form-label'>Description</label>
                      <textarea
                        className='form-control'
                        id='description'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      ></textarea>
                    </div>

                    <div className='mb-3'>
                      <label className='form-label'>Ticket Type</label>
                      <div>
                        <select
                        id='ticketType'
                        className='form-select'
                        value={ticketType}
                        onChange={(e) => setTicketType(e.target.value)}
                        >
                        <option value=''>Select Type</option>
                        <option value='bug'>Bug</option>
                        <option value='design'>Design/Layout</option>
                        <option value='network'>Network Issue</option>
                        </select>
                      </div>
                    </div>

                    <div className='mb-3'>
                      <label className='form-label'>Status</label>
                      <div>
                        <select
                        id='status'
                        className='form-select'
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        >
                        <option value=''>Select Status</option>
                        <option value='active'>Active</option>
                        <option value='in_progress'>In Progress</option>
                        <option value='completed'>Completed</option>
                        </select>
                      </div>
                    </div>

                    <div className='mb-3'>
                      <label className='form-label'>Priority</label>
                      <div>
                        <select
                        id='priority'
                        className='form-select'
                        value={priority}
                        onChange={(e) => setPriority(e.target.value)}
                        >
                        <option value=''>Select Priority</option>
                        <option value='high'>High</option>
                        <option value='moderate'>Moderate</option>
                        <option value='low'>Low</option>
                        </select>
                      </div>
                    </div>

                    <div className='mb-3'>
                      <label className='form-label'>Project Assignees</label>
                      <div>
                        <ProjectAssignees />
                      </div>
                    </div>

                    <button
                      type='submit'
                      data-bs-dismiss='modal'
                      className='btn btn-primary'
                    >
                      Save
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
