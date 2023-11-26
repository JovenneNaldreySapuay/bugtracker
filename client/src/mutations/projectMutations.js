import { gql } from '@apollo/client';

const ADD_PROJECT = gql`
  mutation AddProject(
    $title: String!
    $description: String!
    $image: String!
    $attachment: String!
    $clientID: ID!
	  $tickets: [String!]
    $assignee: [String!]
    $status: String!
    $createdBy: ID!
  ) {
    addProject(
      title: $title
      description: $description
      image: $image
      attachment: $attachment
      clientID: $clientID
	    tickets: $tickets
      assignee: $assignee
      status: $status 
      createdBy: $createdBy
    ) {
      id
      title
      description
      image
      attachment
      clientID {
        id 
        name 
      }
  	  tickets {
    		id
    		title
  	  }
      assignee {
        id 
        name 
		    role
      }
      status
      createdBy {
        id
        name 
		    role
      }
    }
  }
`;

export { ADD_PROJECT };