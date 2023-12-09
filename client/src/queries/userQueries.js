import { gql } from '@apollo/client';

const LOGIN = gql`
  query login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      userID
      token
    }
  }
`;

const GET_USER = gql`
  query getUser($id: ID!) {
    user(id: $id) {
      id
      name 
      email 
      password 
      company
      website
      phone
      role 
      subscription
    }
  }
`;

const GET_USERS = gql`
  query getUsers {
    users {
      id
      name 
      email
      password 
      company
      website
      phone
      role
      subscription
    }
  }
`;

export { GET_USER, GET_USERS, LOGIN };