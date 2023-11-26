import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
//import Header from './components/Header';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import Home from './pages/Home';
import Project from './pages/Project';

// see this to fix error when caching...
// https://www.apollographql.com/docs/react/caching/cache-configuration/#generating-unique-identifiers
const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        projects: {
          merge(existing, incoming) {
            return incoming;
          },
        },
        //tickets: {
          //merge(existing, incoming) {
            //return incoming;
          //},
        //},
      },
    },
  },
});

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql',
  cache,
});

function App() {
  return (
    <>
      <ApolloProvider client={client}>
        <Router>
          
          <div className='container'>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/projects/:id' element={<Project />} />
            </Routes>
          </div>
        </Router>
      </ApolloProvider>
    </>
  );
}

export default App;
