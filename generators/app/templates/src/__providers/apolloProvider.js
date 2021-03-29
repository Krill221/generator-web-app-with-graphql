import React from 'react';
import { ApolloLink, ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { onError } from "@apollo/client/link/error";
import { createUploadLink } from 'apollo-upload-client'
import { setContext } from 'apollo-link-context';

const errorLink = onError(({ operation, response, graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message, locations, path }) => {
      console.log('setErrorDialog', message);
      return '';
    })
  }
  if (networkError) {
    console.log('setErrorDialog', 'Sorry, our server is off-line. Please try again later.')
  }
  console.log('error: ', operation, response);

});

const uploadLink = createUploadLink({ uri: process.env.REACT_APP_SERVER_ADDRESS });

const authLink = setContext(() => {
  const token = localStorage.getItem('jwtToken');
  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : ''
    }
  };
});

const client = new ApolloClient({
  link: ApolloLink.from([ authLink, errorLink, uploadLink ]),
  cache: new InMemoryCache(),
});

const Provider = (props) => {
  return <ApolloProvider client={client}>
    {props.children}
  </ApolloProvider>
}

export default Provider;
