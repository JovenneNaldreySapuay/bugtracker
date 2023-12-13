import { 
	USER_LOGGED_IN,
	USER_LOGGED_OUT
} from '../constants/action-types';

const INITIAL_STATE = {
	users: []
};

export default function(state = INITIAL_STATE, action) {

	switch (action.type) {
	    case USER_LOGGED_IN:
	    	console.log("USER_LOGGED_IN", action );
	    	return action;

	    case USER_LOGGED_OUT:
	    	return {};	

		default:
			return state;
	}
}
