import React from 'react'
import Login from '../LoginPage/Login'
import Register from '../RegisterPage/Register'
import {Container} from 'react-bootstrap'
import '../../pages/LoginPage/Login.css'


function AuthPage({setIsLoggedIn}) {



  return (
    <>
    <Container  className="pageWrapper">
    <div className="content">
    <h1>Welcome to TempSiteName</h1>
    <div className="header">
    <h3>Login or Register</h3>
    </div>
    <div className="formWrapper">
    <Login setIsLoggedIn={setIsLoggedIn} />
    <Register setIsLoggedIn={setIsLoggedIn} />
    </div>
    </div>
    </Container>
    </>
  )
}

export default AuthPage