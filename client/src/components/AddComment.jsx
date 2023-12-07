import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_COMMENT } from '../mutations/commentMutations';
import { GET_COMMENTS } from '../queries/commentQueries';

export default function AddComment({ ticket }) {
	const [message, setMessage] = useState('');
	const [ticketID, setTicketID] = useState(ticket.id);
	const [user, setUser] = useState('655876c0d467b3b136a481c4');

	const [addComment] = useMutation(ADD_COMMENT, {
	    variables: { message, ticket: ticketID, user },
	    update(cache, { data: { addComment } }) {
	      
	      // get all data from the database
	      //const { comments } = cache.readQuery({ query: GET_COMMENTS });

	      // And then append the new data and update the UI
	      //cache.writeQuery({
	        //query: GET_COMMENTS,
	        //data: { comments: [...comments, addComment] },
	      //});
	    },
	  });

	const onSubmit = (e) => {
		e.preventDefault();
		
		console.log('submit clicked', message, ticketID, user);	

		// mutation here 
		if (message !== '') {
			addComment(message, ticketID, user);	
		}		

		// clear input field
		setMessage('');
	}

	return (
		<>	
			<form onSubmit={onSubmit}>
				<div className='mb-3'>
	              <label className='form-label'>Comment</label>

	              <div>
	              	<textarea placeholder="Add your message" id="message" name="message" rows="4" cols="50" onChange={(e) => setMessage(e.target.value)} />
	              </div>

	            </div>	
	    		<button type='submit' className='btn btn-primary'>Add Comment</button>
			</form>
		</>
	);

}