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
const QUERY = { FRAGMENT_FIELDS, GETS_WHERE, UPDATE, DELETE, fieldsArray }
export default QUERY;
