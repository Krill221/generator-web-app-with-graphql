import gql from 'graphql-tag';

export const GETS = gql`
  {
    Users {
      id
      createdAt
      updatedAt
      email
      username
    }
  }
`;

export const UPDATE = gql`
   mutation updateUser( $id: ID, $username: String, $email: String, $password: String) {
    updateUser( id: $id, username: $username, email: $email, password : $password){
      id
      createdAt
      updatedAt
      email
      username
    }
  }
`;

export const DELETE = gql`
  mutation deleteUser($id: ID!) {
    deleteUser(id: $id)
  }
`;

export const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      email
      username
      createdAt
      token
    }
  }
`;

export const REGISTER_USER = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      email
      username
      createdAt
      token
    }
  }
`;