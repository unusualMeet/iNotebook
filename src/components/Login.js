import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

const Login = (props) => {
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: credentials.email,
                password: credentials.password
            })
        });
        const json = await response.json();
        console.log(json);
        if (json.authToken) {
            localStorage.setItem('token', json.authToken);
            props.showAlert("logged in successfully","success")
            navigate("/");
        } else {
            props.showAlert("Invalid details","danger");
        }
    };
    const onChange = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        });
    };
    return (
        <div className="container mt-3">
            <h2>Login in to continue</h2>

            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">
                        Email address
                    </label>

                    <input
                        type="email"
                        className="form-control"
                        name="email"
                        value={credentials.email}
                        id="exampleInputEmail1"
                        onChange={onChange}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">
                        Password
                    </label>

                    <input
                        type="password"
                        className="form-control"
                        name="password"
                        value={credentials.password}
                        id="exampleInputPassword1"
                        onChange={onChange}
                    />
                </div>

                <button type="submit" className="btn btn-primary">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default Login;