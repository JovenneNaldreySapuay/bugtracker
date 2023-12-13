import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
// import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import logger from 'redux-logger';

import { configureStore } from '@reduxjs/toolkit';

import rootReducer from './reducers'; 
import setAuthHeader from './utils/setAuthHeader';
import { userLoggedIn } from './actions/auth';

import './index.css';
import App from './App';

// Redux store
// const initialState = {};

// const middlewareEnhancer = applyMiddleware(thunk);

// const composeWithDevTools = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// const composedEnhancers = composeWithDevTools(middlewareEnhancer);

// const store = createStore(rootReducer, composedEnhancers);

// const store = createStore(
//   rootReducer, 
//   initialState, 
//   applyMiddleware(logger)
// );

const store = configureStore({
  // Automatically calls `combineReducers`
  reducer: rootReducer
})


if (localStorage.token) {
  const payload = jwtDecode(localStorage.token); 
  
  //console.log('localStorage payload', payload);

  const user = { 
    id: payload.userID,
    name: payload.name, 
    email: payload.email, 
    role: payload.role,
    token: localStorage.token, 
    // confirmed: payload.confirmed, 
  };
  setAuthHeader(localStorage.token);

  console.log('user', payload); // see log on CMD server side

  store.dispatch(userLoggedIn(user));
}


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
);



