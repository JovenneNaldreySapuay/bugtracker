import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes,  redirect } from 'react-router-dom';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';

import { connect } from 'react-redux';
import * as actions from './constants/action-types';

import AdminRoute from './components/AdminRoute';

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

import AuthContext from './context/auth-context';

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

function App(props) {
  
  const [userID, setUserID] = useState(null);
  const [token, setToken] = useState(null);

  const login = (token, userID, tokenExpiration) => {
    console.log('App.js:', token, userID, tokenExpiration);
    setUserID(userID);
    setToken(token);
  };

  const logout = () => {
    setUserID(null);
    setToken(null);
  };

  //console.log('props', props);

  return (
    <>
      <ApolloProvider client={client}>
          <div className='container-fluid'>
              <Header />

              <Router>
                <Routes>
                  <Route path='/' element={<Home />} />
                  <Route path='/dashboard' element={<Dashboard />} />
                  <Route path='/signup' element={<SignUp />} />
                  <Route path='/login' element={<Login />} />
                  <Route path='/projects' element={<Projects />} />
                  <Route path='/projects/:id' element={<Project />} />
                  <Route path='/projects/:id/edit' element={<Project />} />
                  <Route path='/tickets' element={<Tickets />} />
                  <Route path='/tickets/:id' element={<Ticket />} />
                  <Route path='/users' element={<Users />} />
                  <Route path='/users/:id' element={<User />} />
                  <Route path='/users/:id/edit' element={<User />} />
                </Routes>
              </Router>              
          </div>
      </ApolloProvider>
    </>
  );
}

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.auth.token,
  }
}

export default connect(mapStateToProps, actions)(App);
