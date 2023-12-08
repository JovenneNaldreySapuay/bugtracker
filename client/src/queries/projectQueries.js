import { gql } from '@apollo/client';

const GET_USERS = gql`
  query getUsers {
    users {
      id 
      name 
    }
  }
`; 

const GET_PROJECTS = gql`
  query getProjects {
    projects {
      id
      title 
      description 
      image 
      attachment
      status
      clientID {
        id 
        name
      }
      tickets {
        id
        title
        comments {
          id
          message
          user {
            name
          }
        }
      }
      assignee {
        id 
        name
        role
      }
      createdBy {
        id
        name
      }
    }
  }
`;

const GET_PROJECT = gql`
  query getProject($id: ID!) {
    project(id: $id) {
      id
      title 
      description 
      image 
      attachment
      status
      clientID {
        id 
        name
        website 
      }
      tickets {
        id
        title
        description
        comments {
          id
          message
        }
      }
      assignee {
        id 
        name
        role
      }
      createdBy {
        id
        name
      }
    }
  }
`;

const GET_CLIENTS = gql`
  query getClients {
    getClients {
      id
      name 
      email 
      role 
    }
  }
`;

const GET_TICKETS_PER_PROJECT = gql`
  query getTicketsPerProject($project_id: ID!) {
    ticketsPerProject(project_id: $project_id) {
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
      submitter {
        id 
        name
      }
    }
  }
`;

export { GET_PROJECTS, GET_PROJECT, GET_CLIENTS, GET_USERS, GET_TICKETS_PER_PROJECT };
