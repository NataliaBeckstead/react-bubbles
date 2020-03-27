import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ children, ...rest }) => {
	return (
		<Route {...rest}>
			{localStorage.getItem("token") ? children : <Redirect to="/protected" />}
		</Route>
	);
};

export default PrivateRoute;