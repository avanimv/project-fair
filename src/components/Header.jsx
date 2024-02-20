import React, { useContext } from 'react'
import { Container, Navbar } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { isAuthTokencontext } from '../context/ContextShare'

function Header({logout}) {
  const {isAuthToken,setIsAuthToken}=useContext(isAuthTokencontext)
  const navigate=useNavigate()
  const handleLogout=()=>{
    // clear session storage
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("existingUser");
    setIsAuthToken(false)
    // navigate home page
    navigate('/')
  }
  return (
    <>
    <Navbar className="bg-success">
      <Container>
      <Link to={'/'} style={{textDecoration:"none"}}>
          <Navbar.Brand href="#home" className='text-light'>
          <i class="fa-brands fa-stack-overflow me-3 ms-5"></i>
          Project Fair 
          </Navbar.Brand>
      </Link> 
      {
        logout&&
      <button className='btn btn-warning rounded'onClick={handleLogout}>logout</button> 
       }  
      </Container>   
      </Navbar>
    </>
  )
}

export default Header