import React, { useState } from 'react';
import Select from 'react-select';
import axios from 'axios';
import { FaList } from 'react-icons/fa';
import { useMutation, useQuery } from '@apollo/client';
import { UPDATE_PROJECT } from '../mutations/projectMutations';
import { GET_PROJECT, GET_CLIENTS, GET_USERS } from '../queries/projectQueries';

export default function UpdateProjectModal({ project }) {

  const adminID = '655876c0d467b3b136a481c4'; // TODO: make this dynamic

  const [projectID, setProjectID] = useState(project.id);
  const [title, setTitle] = useState(project.title);
  const [description, setDescription] = useState(project.description);
  const [image, setImage] = useState(project.image);
  const [attachment, setAttachment] = useState(project.attachment);
  const [clientID, setClientID] = useState(project.clientID.id);
  const [tickets, setTickets] = useState(project.tickets.map(item => item.id));
  const [assignees, setAssignees] = useState(project.assignee);  
  const [status, setStatus] = useState(project.status);

  const [createdBy, setCreatedBy] = useState(adminID);

  // State once auth method is built...
  const [loggedIn, setLoggedIn] = useState(true);

  const [updateProject] = useMutation(UPDATE_PROJECT, {
    variables: { id: projectID, title, description, image, attachment, clientID, tickets, assignees, status, createdBy },
    refetchQueries: [{ query: GET_PROJECT, variables: { id: projectID } }],
  });

  const { loading, error, data } = useQuery(GET_PROJECT, {
   variables: { id: projectID },
  });

  //console.log('From project data', data);

  const getClients = useQuery(GET_USERS);

  //console.log('project', project);
  //console.log('tickets state', tickets);

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

  //console.log('from db', project);
  //console.log('assignees', assignees);

  const handleAssignees = (e) => {
    setAssignees(Array.isArray(e) ? e.map(x => x.value) : []);
  }

  const ProjectAssignees = () => (
    <Select 
      className="dropdown"
      placeholder="Assigned Personnels"
      options={assignedUsers} 
      value={assignedUsers?.filter(item1 => assignees.some(item2 => (item2.id === item1.value && item2.name === item1.label)))}
      //defaultValue={{ value: '655876c0d467b3b136a481c4', label: 'Jovenne Sapuay' }}
      onChange={handleAssignees}
      isMulti 
      isClearable 
      isSearchable
      hideSelectedOptions={true}
    />
  );

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
  };

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

  const onSubmit = (e) => {
    e.preventDefault();

    if (title === '' || description === '' || status === '') {
      console.log('Please fill in all fields');

      //return alert('Please fill in all fields');
    }

    console.log({ projectID, title, description, image, attachment, clientID, tickets, assignees, status, createdBy });
    
    // if (title !== '' && 
    //     description !== '' && 
    //     image !== '' && 
    //     attachment !== '' && 
    //     clientID !== '' && 
    //     tickets.length > 0 && 
    //     assignees.length > 0 && 
    //     status !== '' && 
    //     createdBy !== '') {

        // Mutation
        updateProject(projectID, title, description, image, attachment, clientID, tickets, assignees, status, createdBy);
    //}
    
    //setTitle('');
    //setDescription('');
    //setImage('');
    //setAttachment('');
    //setClientID('');
    //setTickets([]);
    //setAssignees([]);
    //setStatus('');
    //setCreatedBy('');
  };

  // if (loading) return null;
  // if (error) return 'Something Went Wrong';

  return (
    <>
        { loggedIn && (

        <div className='asfdsfd' id='asdfsafsadf' style={{ marginTop: '20px' }}>
        <div className='xx3'>
        <div className='xx2'>
        <div className='xx1'>
        <h3>Edit Project</h3>
        
        <form onSubmit={onSubmit}>
        <input
        type='text'
        className='form-control'
        id='id'
        value={project.id}
        readOnly
        />
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
        <input 
          type="file" 
          id="file" 
          name="file" 
          onChange={fileUploadHandler} 
        />
        </div>
        <div style={{ marginTop: '10px' }}>Current image: <img src={image} alt="image" style={{width: '50px'}} /></div>
        </div>
        <div className='mb-3'>
        <label className='form-label'>Attachment</label>
        <div>
        <input 
          type="file" 
          id="attachment" 
          name="attachment"
          onChange={fileAttachHandler} 
        />
        </div>
        <div>Current File: {attachment}</div>
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
        {getClients.data?.users.map((client) => (
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
        className='btn btn-primary'
        >
        Save Changes
        </button>
        </form>
        </div>
        </div>
        </div>
        </div>
    )}
  </>
  );
}
