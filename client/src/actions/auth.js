import setAuthHeader from '../utils/setAuthHeader';
import * as actions from '../constants/action-types';
import api from '../api';

export const userLoggedIn = (user) => ({
	type: actions.USER_LOGGED_IN,
	payload: user
});

export const userLoggedOut = () => ({
	type: actions.USER_LOGGED_OUT
});

export const login = (credentials) => async (dispatch) => {
   console.log('credentials from auth.js:', credentials);
   
   const requestBody = {
      query: `
        query {
          user(id: "${credentials.userID}") {
            id
            name
            email 
            role 
            phone
            role
          }
        }
      `
    };
    	
  await api.user.login(requestBody).then(user => {
  	console.log('auth.js user:', user);
  	
    localStorage.token = credentials.token;
    setAuthHeader(credentials.token);
    dispatch(userLoggedIn(user));
  })
};

export const logout = () => async (dispatch) => {
	localStorage.removeItem('token');
	setAuthHeader();
	dispatch(userLoggedOut());
};

// export const confirm = (token) => async (dispatch) => {
// 	await api.user.confirm(token)
// 		.then(user => {
// 			localStorage.bookwormJWT = user.token;
// 			dispatch(userLoggedIn(user));
// 		})
// };

// export const resetPasswordRequest = ({ email }) => async () => {
// 	await api.user.resetPasswordRequest(email);
// };	

// export const validateToken = (token) => async () => {
// 	await api.user.validateToken(token);
// };	

// export const resetPassword = (data) => async () => {
// 	await api.user.resetPassword(data);
// };	