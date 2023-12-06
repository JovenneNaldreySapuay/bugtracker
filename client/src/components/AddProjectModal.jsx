import React, { useState } from 'react';
import Select from 'react-select';
import axios from 'axios';
import { FaList } from 'react-icons/fa';
import { useMutation, useQuery } from '@apollo/client';
import { ADD_PROJECT } from '../mutations/projectMutations';
import { GET_PROJECTS, GET_CLIENTS, GET_USERS } from '../queries/projectQueries';

export default function AddProjectModal() {

  const adminID = '655876c0d467b3b136a481c4'; //'6560a67f3557cdc6c6f528c9'; // TODO: make this dynamic

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [attachment, setAttachment] = useState('');
  const [clientID, setClientID] = useState('');
  const [ticket, setTicket] = useState(['655c0d75b6d11aced8d85bc4']);
  const [assignee, setAssignees] = useState([]);  
  const [status, setStatus] = useState('');
  const [createdBy, setcreatedBy] = useState(adminID);

  const [addProject] = useMutation(ADD_PROJECT, {
    variables: { title, description, image, attachment, clientID, ticket, assignee, status, createdBy },
    update(cache, { data: { addProject } }) {
      
      // get all data from the database
      const { projects } = cache.readQuery({ query: GET_PROJECTS });
      
      console.log('ALL PROJECTS:', projects);
      console.log('cache:', cache);

      // And then append the new data and update the UI
      cache.writeQuery({
        query: GET_PROJECTS,
        data: { projects: [...projects, addProject] },
      });
    },
  });

  // console.log('From cache projects', projects);

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
      options={assignedUsers} 
      value={assignedUsers.filter(obj => assignee.includes(obj.value))}
      onChange={handleAssignees}
      isMulti 
      isClearable 
    />
  );

  // Get Clients for dropdown select
  const { loading, error, data } = useQuery(GET_CLIENTS);

  const fileAttachHandler = async (e) => {

    const files = e.target.files;
    const formData = new FormData();
  
    formData.append('attachment', files[0]);

    try {
      const res = await axios.post('http://localhost:5000/uploadFile', formData);
        
      //console.log("axios response 1", res );
        
      setAttachment(res.data);

    } catch(err) {

      console.log( err );

    } 
  };

  const fileUploadHandler = async (e) => {

    const files = e.target.files;
    const formData = new FormData();
    const preset = 'msmbotss';
  
    formData.append('file', files[0]);
    formData.append('upload_preset', preset);

    try {
      const res = await axios.post('https://api.cloudinary.com/v1_1/jovennesapuay/image/upload', formData);

      const imgUrl = res.data.secure_url;

      //console.log("imgUrl:", imgUrl );
      //console.log("axios response 2", res.data );

      setImage(res.data.secure_url);

    } catch(err) {

      console.log( err );

    }  
  }

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
        addProject(title, description, image, attachment, clientID, ticket, assignee, status, createdBy);
    }
    
    setTitle('');
    setDescription('');
    setImage('');
    setAttachment('');
    setClientID('');
    setTicket([]);
    setAssignees([]);
    setStatus('');
    setcreatedBy('');
  };

  if (loading) return null;
  if (error) return 'Something Went Wrong';

  return (
    <>
      {!loading && !error && (
        <>
          <button
            type='button'
            className='btn btn-primary'
            data-bs-toggle='modal'
            data-bs-target='#addProjectModal'
          >
            <div className='d-flex align-items-center'>
              <FaList className='icon' />
              <div>New Project</div>
            </div>
          </button>

          <div
            className='modal fade'
            id='addProjectModal'
            aria-labelledby='addProjectModalLabel'
            aria-hidden='true'
          >
            <div className='modal-dialog'>
              <div className='modal-content'>
                <div className='modal-header'>
                  <h5 className='modal-title' id='addProjectModalLabel'>
                    New Project
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
                      <label className='form-label'>ProjectImage</label>
                      <div>
                        <input type="file" id="file" name="file" onChange={fileUploadHandler} />
                      </div>
                    </div>
                    <div className='mb-3'>
                      <label className='form-label'>Attachment</label>
                      <div>
                        <input type="file" id="attachment" name="attachment" onChange={fileAttachHandler} />
                      </div>
                    </div>
                    <div className='mb-3'>
                      <label className='form-label'>Status</label>
                      <select
                        id='status'
                        className='form-select'
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                      >
                        <option value=''>Select Status</option>
                        <option value='new'>Not Started</option>
                        <option value='in_progress'>In Progress</option>
                        <option value='completed'>Completed</option>
                      </select>
                    </div>

                    <div className='mb-3'>
                      <label className='form-label'>Client</label>
                      <select
                        id='clientId'
                        className='form-select'
                        value={clientID}
                        onChange={(e) => setClientID(e.target.value)}
                      >
                        <option value=''>Select Client</option>
                        {data.getClients.map((client) => (
                          <option key={client.id} value={client.id}>
                            {client.name}
                          </option>
                        ))}
                      </select>
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
