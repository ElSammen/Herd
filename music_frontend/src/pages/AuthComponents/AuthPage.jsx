import React from 'react'
import Login from '../LoginPage/Login'
import Register from '../RegisterPage/Register'
import {Container} from 'react-bootstrap'
import '../../pages/LoginPage/Login.css'
import './authpage.css'
import {GiDeer} from 'react-icons/gi'


function AuthPage({setIsLoggedIn}) {



  return (
    <>
  <div className="everything">
    <Container  className="pageWrapper">
    <div className="content">
    <h2>Welcome to Herd!</h2>
    <GiDeer className='logo02'></GiDeer>
    {/* <img className="logo02" src="../images/reindeer.svg"></img> */}
    <div className="header">
    <h3>Login or Register</h3>
    </div>
    <div className="formWrapper">
    <Login setIsLoggedIn={setIsLoggedIn} />
    <Register setIsLoggedIn={setIsLoggedIn} />
    </div>
    </div>
    </Container>
    </div>
    </>
  )
}

export default AuthPage