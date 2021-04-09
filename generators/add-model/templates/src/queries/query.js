import gql from 'graphql-tag';
// gen import

const MODEL = '<%=model%>';

const parent = null;
const parentId = parent ? parent : 'parentId';

export const fieldsArray = [
    // gen fieldsArray
    <%fields.forEach(function(f) { %>['<%=f[0]%>', '<%=f[1]%>'],
    <% }) %>
];
const fieldsArrayInput = [
    // gen fieldsInput
    <%fields.forEach(function(f) { %>['<%=f[0]%>', '<%=f[1]%>'],
    <% }) %>
];

// Standard queries
const FRAGMENT_FIELDS = gql`
fragment <%=small_model%>Fields on <%=model%> {
    id ${fieldsArray.map( f => f[0]).join(' ')} createdAt updatedAt
}
`;

export const GETS_WHERE = gql`
query($${parentId}: ID) {
    ${MODEL}Where (${parentId}: $${parentId}) { ...<%=small_model%>Fields }
}
${FRAGMENT_FIELDS}
`;

export const UPDATE = gql`
mutation update${MODEL}($id: ID, ${fieldsArrayInput.map( f => `$${f[0]}: ${f[1]}`).join(', ')}) {
    update${MODEL}(input:{id: $id, ${fieldsArrayInput.map( f => `${f[0]}: $${f[0]}`).join(', ')}}){ ...<%=small_model%>Fields }
}
${FRAGMENT_FIELDS}
`;

export const DELETE = gql`
mutation delete${MODEL}($id: ID!) {
    delete${MODEL}(input:{id: $id}){ ...<%=small_model%>Fields }
}
${FRAGMENT_FIELDS}
`;

const QUERY = { FRAGMENT_FIELDS, GETS_WHERE, UPDATE, DELETE, fieldsArray }
export default QUERY;
