import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import Spinner from '../components/Spinner';

import { GET_COMMENTS_PER_TICKET } from '../queries/commentQueries';

export default function Comment() {

	const { id } = useParams();
  	const { loading, error, data } = useQuery(GET_COMMENTS_PER_TICKET, { 
  		variables: { ticket_id: id },
  		pollInterval: 500, 
  	});

  	console.log('GET_COMMENTS_PER_TICKET:', data);

  	if (loading) return <Spinner />;
  	if (error) return <p>Something Went Wrong</p>;

	return (
		<>	
			<h3>Comments Per Project</h3>
			<ol>
				{data.commentsPerTicket?.map((comment) => (
	                <li key={comment.id}>{comment.message}</li>
	            ))}
			</ol>
		</>
	);

}