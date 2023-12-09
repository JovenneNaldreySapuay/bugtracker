import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';

import Home from './pages/Home';
import Ticket from './pages/Ticket';
import Project from './pages/Project';
import Dashboard from './pages/Dashboard';
import User from './pages/User';

import Tickets from './components/Tickets';
import SignUp from './components/SignUp';
import Login from './components/Login';
import Projects from './components/Projects';
import Header from './components/Header';
import Users from './components/Users';


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
          <div className='container-fluid'>
            <Header />

            <Routes>
              <Route exact path='/' element={<Home />} />
              <Route exact path='/dashboard' element={<Dashboard />} />
              <Route path='/signup' element={<SignUp />} />
              <Route path='/login' element={<Login />} />
              <Route path='/projects' element={<Projects />} />
              <Route path='/projects/:id' element={<Project />} />
              <Route path='/projects/:id/edit' element={<Project />} />
              <Route path='/tickets' element={<Tickets />} />
              <Route path='/tickets/:id' element={<Ticket />} />
              <Route path='/users' element={<Users />} />
              <Route path='/users/:id/edit' element={<User />} />

            </Routes>
          </div>
        </Router>
      </ApolloProvider>
    </>
  );
}

export default App;
