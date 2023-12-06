import React, { useState } from 'react';
import Select from 'react-select';
import axios from 'axios';
import { useHistory, useParams } from 'react-router-dom';
import { FaList } from 'react-icons/fa';
import { useMutation, useQuery } from '@apollo/client';
import { ADD_TICKET } from '../mutations/ticketMutations';
import { GET_USERS, GET_PROJECT } from '../queries/projectQueries';
import { GET_TICKETS } from '../queries/ticketQueries';

export default function AddTicketModal() {

  const adminID = '655876c0d467b3b136a481c4'; //'6560a67f3557cdc6c6f528c9'; // TODO: make this dynamic

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [ticketType, setTicketType] = useState('');
  const [status, setStatus] = useState('');
  const [priority, setPriority] = useState('');
  const [assignees, setAssignees] = useState([]);
  const [comments, setComments] = useState([]);  
  const [attachments, setAttachments] = useState([]);  
  const [submitter, setSubmitter] = useState(adminID);
  const [project, setProject] = useState(window.location.pathname.split("/")[2]);
  const [redirectTo, setRedirectTo] = useState(false);


  const [addTicket] = useMutation(ADD_TICKET, {
    variables: {
       title, 
       description, 
       ticketType, 
       status, 
       priority, 
       assignees, 
       comments, 
       attachments, 
       submitter, 
       project 
    },
    //refetchQueries: [
       //GET_PROJECT,
       //'getProject' 
    //]
  });

  /*
  const [addTicket] = useMutation(ADD_TICKET, {
    variables: { title, description, ticketType, status, priority, assignees, comments, attachments, submitter, project },
    update(cache, { data: { addTicket } }) {
      console.log('cache', cache.readQuery({ query: GET_PROJECTS }));

      const { tickets } = cache.readQuery({ query: GET_TICKETS });
      
      console.log('TICKETS', tickets);

      cache.writeQuery({
        query: GET_PROJECTS,
        data: { 
          tickets: [...tickets, addTicket] 
        },
      });
    },
  });
  */
 
  const getUsers = useQuery(GET_USERS);

  const { id } = useParams();

  //const getProject = useQuery(GET_PROJECT, { variables: { id } });

  //console.log('getProject query', getProject, id);

  const userLists = getUsers.data?.users; 

  const assignedUsers = userLists?.map(({
  id: value,
  name: label,  
  ...rest
  }) => ({
  value,
  label,
  }));

  const handleAssignees = (e) => {
    setAssignees(Array.isArray(e) ? e.map(x => x.value) : []);
  }

  const ProjectAssignees = () => (
    <Select 
      className="dropdown"
      placeholder="Select Assignees"
      options={assignedUsers} 
      value={assignedUsers?.filter(obj => assignees.includes(obj.value))}
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

    console.log({ title, description, ticketType, status, priority, assignees, comments, attachments, submitter, project });
    
    if (title !== '' && 
        description !== '' && 
        ticketType !== '' && 
        status !== '' && 
        priority !== '') {

        // Mutation
        addTicket(title, description, ticketType, status, priority, assignees, comments, attachments, submitter, project);       
    }
    
    setTitle('');
    setDescription('');
    setTicketType('');
    setStatus('');
    setPriority('');
    setAssignees([]);
    setComments([]);
    setAttachments([]);
    setSubmitter('');
    setProject('');
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
            style={{width: '150px'}}
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
                      <label className='form-label'>Ticket Assignees</label>
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
