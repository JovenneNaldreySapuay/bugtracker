import React, { useState } from 'react';
import axios from 'axios';

export default function AddCommentFile() {
	const [file, setFile] = useState('');
	const [filesize, setFilesize] = useState('');

	const onSubmit = (e) => {
		e.preventDefault();
		
		console.log('submit clicked', file, filesize);	

		// mutation here 
		// userID, ticketID, filename, filesize
		if (!file) {
			alert('Please add your file');
		}

		// clear input field
		setFile('');
	}

	const fileUploadHandler = async (e) => {

    const files = e.target.files;
    const formData = new FormData();
    const preset = 'msmbotss';
  
    formData.append('file', files[0]);
    formData.append('upload_preset', preset);

    try {
      const res = await axios.post('https://api.cloudinary.com/v1_1/jovennesapuay/image/upload', formData);

      //console.log(res.data);

      setFile(res.data.secure_url);
      setFilesize(res.data.bytes);

    } catch(err) {

      console.log( err );

    }  
  }

	return (
		<>	
			<h3>Add File</h3>
			<form onSubmit={onSubmit}>
				<div className='mb-3'>
	              <label className='form-label'>File</label>
	              <input type="file" id="file" name="file" onChange={fileUploadHandler} />
	            </div>	
	    		<button type='submit' className='btn btn-primary'>Save</button>
			</form>
		</>
	);

}