import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
		
const AdminRoute = ({ isAuthenticated, element: Component, ...rest }) => {
	return (
		<Route { ...rest } render={ props => 
			(isAuthenticated) ? <Component { ...props } /> : <Redirect to="/"/> } />
	);	
};

function mapStateToProps(state) {
		
	return {
		isAuthenticated: !!state.auth.token,
		//role: state.auth.role
	}
}

export default connect(mapStateToProps)(AdminRoute);


