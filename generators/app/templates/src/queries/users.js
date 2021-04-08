import { gql } from '@apollo/client';
// gen import

const MODEL = 'User';

const parent = null;
const parentId = parent ? parent : 'parentId';

const fieldsArray = [
  // gen fieldsArray
  ['avatar', 'String'],
  ['username', 'String'],
  ['email', 'String'],
  ['password', 'String'],
];
const fieldsArrayInput = [
  // gen fieldsInput
  ['avatar', 'String'],
  ['username', 'String'],
  ['email', 'String'],
  ['password', 'String'],
];


// Standard queries
const FRAGMENT_FIELDS = gql`
fragment userFields on User {
    id ${fieldsArray.map(f => f[0]).join(' ')} createdAt updatedAt __typename
}
`;

export const GETS_WHERE = gql`
query($${parentId}: ID) {
    ${MODEL}Where (${parentId}: $${parentId}) { ...userFields }
}
${FRAGMENT_FIELDS}
`;

export const UPDATE = gql`
mutation update${MODEL}($id: ID, ${fieldsArrayInput.map(f => `$${f[0]}: ${f[1]}`).join(', ')}) {
    update${MODEL}(input:{id: $id, ${fieldsArrayInput.map(f => `${f[0]}: $${f[0]}`).join(', ')}}){ ...userFields }
}
${FRAGMENT_FIELDS}
`;

export const DELETE = gql`
mutation delete${MODEL}($id: ID) {
    delete${MODEL}(input:{id: $id}){ ...userFields }
}
${FRAGMENT_FIELDS}
`;

export const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      avatar
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
      avatar
      email
      username
      createdAt
      token
    }
  }
`;

const QUERY = { FRAGMENT_FIELDS, GETS_WHERE, UPDATE, DELETE, LOGIN_USER, REGISTER_USER, fieldsArray }
export default QUERY;