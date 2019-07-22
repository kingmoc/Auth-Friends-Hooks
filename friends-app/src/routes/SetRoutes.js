import React from 'react';

import { Route } from 'react-router-dom'
import PrivateRoute from './PrivateRoute'

import Login from '../components/Login'
import Dashboard from '../components/Dashboard'
// import FriendList from '../containers/FriendList'
// import AddFriendForm from '../components/AddFriendForm'

const SetRoutes = (props) => {	

	return (
		<div>

			<Route 
			path="/login" 
			render={props => (
			<Login 
			{...props}
			/>
			)} />

			<PrivateRoute exact path="/dashboard/:id" component={Dashboard} />	

		</div>
	)
};

export default SetRoutes;