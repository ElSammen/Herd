import React from 'react'
import {Form, Button, Container} from 'react-bootstrap'
import AuthApiCalls from '../../Api/AuthApiCalls'
import { useState } from 'react'
import { useNavigate} from "react-router-dom"
import './Login.css'

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
    <Container className="regForm">
    
      <Form onSubmit={loginHandler}>
        <div className="formUsername">
          <Form.Group className="mb-3" controlId="username">
            <Form.Control
              type="text"
              placeholder="Enter username"
              onChange={(event) => setUsername(event.target.value)}
              required
            />


          </Form.Group>
        </div> <div className="formPassword">
          <Form.Group className="mb-3" controlId="password">
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={(event) => setPassword(event.target.value)}
              required />

          </Form.Group></div>
        <div className="loginButton">
          <Button variant="primary" type="submit" className='login_btn'>
            login
          </Button>
        </div>
      </Form>
      </Container>
    </>

  )
}

export default Login