import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_COMMENT } from '../mutations/commentMutations';
import { GET_COMMENTS, GET_COMMENTS_PER_TICKET } from '../queries/commentQueries';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AddComment({ ticket }) {
	const [message, setMessage] = useState('');
	const [ticketID, setTicketID] = useState(ticket.id);
	const [user, setUser] = useState('6579297a384af3d71e04c12e');

	const notify = () => toast("Comment added!", {
		position: "top-right",
		autoClose: 2000,
		hideProgressBar: true,
		closeOnClick: true,
		pauseOnHover: false,
		draggable: false,
		progress: undefined,
		theme: "dark",
	});

	const [addComment] = useMutation(ADD_COMMENT, {
	    variables: { message, ticket: ticketID, user },
	    refetchQueries: [{ query: GET_COMMENTS_PER_TICKET, variables: { ticket_id: ticket.id } }],
	  });

	const onSubmit = (e) => {
		e.preventDefault();
		
		console.log('submit clicked', message, ticketID, user);	

		// mutation here 
		if (message !== '') {
			addComment(message, ticketID, user);
			notify();	
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
	              	<textarea placeholder="Add your message" id="message" name="message" rows={4} cols={50} value={message} onChange={(e) => setMessage(e.target.value)} />
	              </div>

	            </div>	
	    		<button type='submit' className='btn btn-primary'>Add Comment</button>
			</form>

			<ToastContainer />
		</>
	);

}