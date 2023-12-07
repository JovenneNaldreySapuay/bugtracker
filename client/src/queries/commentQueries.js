import { gql } from '@apollo/client';

const GET_COMMENTS = gql`
  query getComments {
    comments {
      id
      message 
      ticket 
      user {
      	id 
      	name
      }
    }
  }
`;

const GET_COMMENTS_PER_TICKET = gql`
  query getCommentsPerTicket($ticket_id: ID!) {
    commentsPerTicket(ticket_id: $ticket_id) {
      id
      message 
      ticket 
      user {
      	id 
      	name
      }
    }
  }
`;

export { GET_COMMENTS, GET_COMMENTS_PER_TICKET };