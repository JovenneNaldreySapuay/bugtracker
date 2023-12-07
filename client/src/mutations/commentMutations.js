import { gql } from '@apollo/client';

const ADD_COMMENT = gql`
  mutation AddComment(
    $message: String!
    $ticket: ID!
    $user: ID!
  ) {
    addComment(
      message: $message
      ticket: $ticket
      user: $user
    ) {
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

export { ADD_COMMENT };