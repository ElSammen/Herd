import React from 'react'
import {Form, Button, Container} from 'react-bootstrap'
import AuthApiCalls from '../../Api/AuthApiCalls'
import { useState } from 'react'
import { useNavigate } from "react-router-dom"
import '../LoginPage/Login'

function Register(props) {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const authAPI = new AuthApiCalls();

  const signUpHandler = async (event) => {
    event.preventDefault();

    try {
      const registryData = { username, password }
      console.log(registryData)
      await authAPI.loginOrRegister(registryData, "/auth/register");

      props.setIsLoggedIn(true)
      navigate('/', { replace: true });
    } catch (error) {
      console.log(error)
    }
  };


  return (
    <>
    <Container className="regForm">
    
      <Form onSubmit={signUpHandler}>
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
          <Button variant="primary" type="submit"className='reg_btn'>
            Register
          </Button>
        </div>
      </Form>
      </Container>
    </>
  )
}

export default Register