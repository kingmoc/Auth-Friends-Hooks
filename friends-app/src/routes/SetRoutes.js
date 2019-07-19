import React from 'react';

import { Route } from 'react-router-dom'

import Login from '../components/Login'
// import FriendList from '../containers/FriendList'
// import AddFriendForm from '../components/AddFriendForm'
import PrivateRoute from './PrivateRoute'
import Dashboard from '../components/Dashboard'

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

			{/* <PrivateRoute exact path="/add-friend" component={AddFriendForm} />	 */}



		</div>
	)
};

export default SetRoutes;