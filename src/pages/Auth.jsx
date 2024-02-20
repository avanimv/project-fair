import React, { useContext, useState } from 'react'
import {  Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import authimage from '../assets/img2.jpeg';
import Form  from 'react-bootstrap/Form';
import { loginAPI, registerAPI } from '../services/allAPI';
import { isAuthTokencontext } from '../context/ContextShare';

//  both login page and register page are almost same.
//  so here we use a single page and change the content inside that page  

function Auth({register}) {
  const {isAuthToken,setIsAuthToken}=useContext(isAuthTokencontext)
  const navigate=useNavigate()
  const registerform=register?true:false;
  const [userData,setUserData]=useState({
    username:"",
    email:"",
    password:""
  })
  const handleRegister=async(e)=>{
    e.preventDefault();
    console.log("===userdetails=====");
    console.log(userData);
    const {username,email,password}=userData;
    if(!username || !email || !password){
      alert("please fill the form completely")
    }
    else{
      // call function to insert userdetails
      const result=await registerAPI(userData);
      if(result.status===200){
        alert("user registration successfull");
        setUserData({
          username:"",
          email:"",
          password:""
        })
      }
      else{
        alert(result.response.data)
      }
    }
  }
  const handleLogin=async(e)=>{
    e.preventDefault();
    const {password,email}=userData;
    if(!password || !email){
      alert("please fill the form completely")
    }
    else{
      const loginResult=await loginAPI(userData)
      if(loginResult.status==200){
      sessionStorage.setItem("existingUser",JSON.stringify(loginResult.data.existingUser))
      sessionStorage.setItem("token",loginResult.data.token)
      setIsAuthToken(true)
      navigate('/')
    }
    else{
      alert(loginResult.response.data)
    }
  }
}
  return (
   <>
   <Header/>
    <div className='d-flex justify-content-center align-items-center' style={{width:"100%",height:"100vh"}}>
      <div className='container w-75'>
     <Link to={'/'} style={{textDecoration:"none",color:"blue"}}><i class="fa-solid fa-arrow-left"></i>Back to Home
     </Link>
     <div className='bg-success p-5 rounded'>
        <div className='row align-items-center'>
       <div className='col-lg-6 col-md-6'>
          <img src={authimage}alt="" width={"100%"}/>
       </div>
       <div className='col-lg-6 col-md-6'>
        <div className='d-flex align-items-center flex-column'>
        <h3 className='text-light'><i class="fa-brands fa-stack-overflow me-3"></i>Project Fair</h3>
        <h5 className='text-light mt-3'>{registerform?"signup your account":"sign in your account"} </h5>
       <Form>
        {
         registerform && 
        
       <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Username</Form.Label>
        <Form.Control type="email" placeholder="username"
                onChange={(e)=>setUserData({...userData,username:e.target.value})}
        value={userData.username} />
       
      </Form.Group>
}

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="enter email"
        onChange={(e)=>setUserData({...userData,email:e.target.value})}
        value={userData.email} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="enter password" 
                onChange={(e)=>setUserData({...userData,password:e.target.value})}
        value={userData.password}></Form.Control>
      </Form.Group>
      {
        registerform?
        <div>
          <button className='btn btn-warning mt-3' onClick={handleRegister}>Register</button>
          <p>Already A User?click here to <Link to={'/login'} style={{color:"blue"}}>Login</Link></p>
          
        </div>:
        <div>
         <Link to={'/dashboard'}>
          <button className='btn btn-warning mt-3'onClick={handleLogin}>Login</button>
         </Link>
         <p>New User?Click here to<Link to={'/register'} style={{color:"blue"}}>Register</Link></p>
        </div>
      }
       </Form>
      
        </div>

       </div>
        </div>
     </div>
      </div>

    </div>
   </>
  )
}

export default Auth