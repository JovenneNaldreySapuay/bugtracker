import { gql } from '@apollo/client';

const GET_TICKETS = gql`
  query getTickets {
    tickets {
    id 
    title
    description 
    status
    ticketType
    priority
    submitter {
      id 
      name 
    }
    assignees {
      id
      name 
    }
    comments {
      id
      message
      user {
        id
        name
      }
    }
    attachments {
      id
      filename
      filesize
      user {
        id
        name
      }
    }
    project {
      id
      title
      description
    }
  }
  }
`;

const GET_TICKET = gql`
  query getTicket($id: ID!) {
    ticket(id: $id) {
      id
      title 
      description 
      ticketType
      status
      priority
      assignees {
        id 
        name
        role
      }
      submitter {
        id
        name
      }
      project {
        id 
        title 
      }
    }
  }
`;

export { GET_TICKETS, GET_TICKET };
