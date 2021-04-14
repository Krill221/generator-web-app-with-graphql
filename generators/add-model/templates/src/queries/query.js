import gql from 'graphql-tag';
// gen import

const MODEL = '<%=model%>';

export const fieldsArray = [
    // gen fieldsArray
    <%fields.forEach(function(f) { %>['<%=f[0]%>', '<%=f[1]%>'],
    <% }) %>
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
fragment <%=small_model%>Fields on <%=model%> {
    id ${fieldsArrayWithPopulate.map( f => f[0]).join(' ')} createdAt updatedAt
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

// Standard queries
const FRAGMENT_FIELDS = gql`
fragment ${MODEL}Fields on Orderitem {
    id ${fieldsArrayType.map( f => f[0]).join(' ')} createdAt updatedAt
}
`;
export const GETS_WHERE = gql`
query(${fieldsArrayParent.map( f => `$${f[0]}: ${f[1]}`).join(', ')}) {
    ${MODEL}Where (${fieldsArrayParent.map( f => `${f[0]}: $${f[0]}`).join(', ')}) { ...${MODEL}Fields }
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
const QUERY = { FRAGMENT_FIELDS, GETS_WHERE, UPDATE, DELETE, fieldsArray }
export default QUERY;
