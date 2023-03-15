import React from 'react'
import {Form, Button, Alert } from 'react-bootstrap'
import AuthApiCalls from '../../Api/AuthApiCalls'
import { useState } from 'react'
import { useNavigate } from "react-router-dom"

function Login({setIsLoggedIn}) {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const [errorMessages, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const authAPI = new AuthApiCalls();

  const loginHandler = async (event) => {
    event.preventDefault();

    try {
      const loginData = { username, password };

      await authAPI.loginOrRegister(loginData, "/auth/login");

      setIsLoggedIn(true)
      navigate('/', { replace: true });

    } catch (error) {
      console.log(error)
      // setErrorMessage(error.response.data.message);
    }
  };

  return (
    <>
    {/* <h1>Login</h1>
    {errorMessages && <Alert variant="danger">{errorMessages}</Alert>} */}
    <Form onSubmit={loginHandler}>
      <Form.Group className="mb-3" controlId="username">
        <Form.Label>Username</Form.Label>

        <Form.Control
         type="text"
         placeholder="Enter username"
         onChange={(event) => setUsername(event.target.value)}
         required
          />

        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="password">
        <Form.Label>Password</Form.Label>

        <Form.Control
        type="password"
        placeholder="Password"
        onChange={(event) => setPassword(event.target.value)}
        required />

      </Form.Group>
      <Button variant="primary" type="submit">
        Login
      </Button>
    </Form>
    </>
  )
}

export default Login