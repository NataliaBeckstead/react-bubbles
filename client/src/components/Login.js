import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

const Login = () => {
	const history = useHistory();
	const [credentials, setCredentials] = useState({
		username: "",
		password: ""
	});

	const handleChange = e => {
		setCredentials({
			...credentials,
			[e.target.name]: e.target.value
		});
	};

	const handleSubmit = e => {
		e.preventDefault();
		axios
			.post("http://localhost:5000/api/login", credentials)
			.then(res => {
				localStorage.setItem("token", JSON.stringify(res.data.payload));
				history.push("/protected");
			})
			.catch(err => console.log(err.response));
		setCredentials({
			username: "",
			password: ""
		});
	};

	return (
		<div className="login">
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					name="username"
					value={credentials.username}
					onChange={handleChange}
					placeholder="Username"
				/>
				<input
					type="password"
					name="password"
					value={credentials.password}
					onChange={handleChange}
					placeholder="Password"
				/>
				<button type="submit">Login</button>
			</form>
		</div>
	);
};

export default Login;
