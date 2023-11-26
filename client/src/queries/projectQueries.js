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
        comments {
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

export { GET_PROJECTS, GET_PROJECT, GET_CLIENTS, GET_USERS };
