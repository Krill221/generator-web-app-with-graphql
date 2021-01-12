import gql from 'graphql-tag';

export const GET_<%=large_models%> = gql`
{
    <%=small_models%> {
        id
        <% fields.forEach(function(field){ %><%= field[0] %>
        <% }) %>
        createdAt
        updatedAt
    }
}
`;

export const GET_<%=large_models%>_WHERE = gql`
query($ids: [ID]) {
    <%=small_models%>_where (ids: $ids) {
        id
        <% fields.forEach(function(field){ %><%= field[0] %>
        <% }) %>
        createdAt
        updatedAt
    }
}
`;

export const UPDATE_<%=large_model%> = gql`
mutation update<%=model%>($id: ID, <%= fields.map(f => `$${f[0]}: ${f[1]}` ).join(', ') %>) {
    update<%=model%>( id: $id, <%= fields.map(f => `${f[0]}: $${f[0]}` ).join(', ') %>){
        id
        <% fields.forEach(function(field){ %><%= field[0] %>
        <% }) %>
        createdAt
        updatedAt        
    }
}
`;

export const  DELETE_<%=large_model%> = gql`
mutation delete<%=model%>($id: ID!) {
    delete<%=model%>(id: $id)
}
`;
