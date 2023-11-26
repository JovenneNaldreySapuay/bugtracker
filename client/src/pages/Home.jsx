import React from 'react';
//import Clients from '../components/Clients';
import Projects from '../components/Projects';
//import AddClientModal from '../components/AddClientModal';
import AddProjectModal from '../components/AddProjectModal';

export default function Home() {
  return (
    <>
      <div className='d-flexx gap-3x mb-4x'>
        <h1>Bug Tracker</h1>
        <AddProjectModal />
        <hr />
        <Projects />

      </div>
      
    </>
  );
}
