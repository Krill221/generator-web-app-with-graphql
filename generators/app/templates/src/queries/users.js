import { gql } from '@apollo/client';
// gen import

const MODEL = 'User';

export const fieldsArray = [
  // gen fieldsArray
  ['avatar', 'String'],
  ['username', 'String'],
  ['email', 'String'],
  ['password', 'String'],
];
const fieldsPopulate = [
  // gen fieldsPopulate
];
const fieldsArrayParent = [
  // gen fieldsInput
];

const fieldsArrayType = [
  ...fieldsPopulate,
  ...fieldsArray,
];

const fieldsArrayInput = [
  ...fieldsArrayParent,
  ...fieldsArray,
];


// Standard queries
const FRAGMENT_FIELDS = gql`
fragment ${MODEL}Fields on ${MODEL} {
    id ${fieldsArrayType.map( f => f[0]).join(' ')} createdAt updatedAt
}
`;
export const GETS_WHERE = gql`
query($parentId: ID, ${fieldsArrayParent.map( f => `$${f[0]}: ${f[1]}`).join(', ')}) {
    ${MODEL}Where (parentId: $parentId, ${fieldsArrayParent.map( f => `${f[0]}: $${f[0]}`).join(', ')}) { ...${MODEL}Fields }
}
${FRAGMENT_FIELDS}
`;
export const UPDATE = gql`
mutation update${MODEL}($id: ID, ${fieldsArrayInput.map( f => `$${f[0]}: ${f[1]}`).join(', ')}) {
    update${MODEL}(input:{id: $id, ${fieldsArrayInput.map( f => `${f[0]}: $${f[0]}`).join(', ')}}){ ...${MODEL}Fields }
}
${FRAGMENT_FIELDS}
`;
export const DELETE = gql`
mutation delete${MODEL}($id: ID!) {
    delete${MODEL}(input:{id: $id}){ ...${MODEL}Fields }
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