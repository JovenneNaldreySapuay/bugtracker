import { gql } from '@apollo/client';

const ADD_USER = gql`
  mutation AddUser(
    $name: String!
    $email: String!
    $password: String!
  ) {
    addUser(
      name: $name
      email: $email
      password: $password
    ) {
      id
      name
      email
      password
    }
  }
`;

const UPDATE_USER = gql`
  mutation UpdateUser(
    $id: ID!
    $name: String!
    $email: String!
    $password: String!
    $company: String!
    $website: String!
    $phone: String!
    $role: String!
    $subscription: String!
  ) {
    updateUser(
      id: $id
      name: $name
      email: $email
      password: $password
      company: $company
      website: $website
      phone: $phone
      role: $role
      subscription: $subscription
    ) {
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

export { ADD_USER, UPDATE_USER };