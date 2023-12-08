import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Tickets from './components/Tickets';
import SignUp from './components/SignUp';
import Login from './components/Login';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import Home from './pages/Home';
import Ticket from './pages/Ticket';
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
        tickets: {
          merge(existing, incoming) {
            return incoming;
          },
        },
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
              <Route path='/signup' element={<SignUp />} />
              <Route path='/login' element={<Login />} />
              <Route path='/projects/:id' element={<Project />} />
              <Route path='/tickets' element={<Tickets />} />
              <Route path='/tickets/:id' element={<Ticket />} />
            </Routes>
          </div>
        </Router>
      </ApolloProvider>
    </>
  );
}

export default App;
