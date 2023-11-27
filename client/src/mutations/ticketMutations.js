import { gql } from '@apollo/client';

const ADD_TICKET = gql`
  mutation AddTicket(
    $title: String!
    $description: String!
    $ticketType: String!
	  $status: String!
    $priority: String!
    $assignees: [String!]
    $comments: [String!]
    $attachments: [String!]
    $submitter: ID!
    $project: ID!
  ) {
    addTicket(
      title: $title
      description: $description
      ticketType: $ticketType
      status: $status
      priority: $priority
      assignees: $assignees
      comments: $comments
      attachments: $attachments
      submitter: $submitter
	    project: $projectID
    ) {
      id
      title
      description
      ticketType
      status
      priority
      assignees {
        id 
        name
      }
      comments {
        id 
        message
        ticketID 
      }
  	  attachments {
    		id
    		filename
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

export { ADD_TICKET };