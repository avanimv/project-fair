import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { Col, Row } from 'react-bootstrap'
import Projectcards from '../components/Projectcards'
import { allProjectAPI } from '../services/allAPI'
import { Link } from 'react-router-dom'

function Project() {
  const [isToken,setIsToken]=useState(false)
  const [searchKey,setSearchKey]=useState((""))
  const [allprojects,setAllProjects]=useState([]);
  const getAllProject=async()=>{
    if(sessionStorage.getItem("token")){
      const token=sessionStorage.getItem("token")
      const reqHeader={
        "Content-Type":"application/json",
        "Authorization":`Bearer ${token}`
      }
      
    
    const result=await allProjectAPI(searchKey,reqHeader);
    console.log(result.data);
    setAllProjects(result.data)
    }
  }
  useEffect(()=>{
   getAllProject();
  },[searchKey])
  useEffect(()=>{
    if(sessionStorage.getItem("token")){
      setIsToken(true)
    }
  },[])
  console.log("search key",searchKey);
  return (
    <>
    <Header/>
<div className='d-flex justify-content-center align-items-center mt-5 flex-coloumn'>
  <h3>All Project</h3>
<div  className='d-flex mt-5 w-25'>
  <input
  onChange={(e)=>setSearchKey(e.target.value)}
  type="text"className='form-control' placeholder='search project using technology'/>
  <i class="fa-solid fa-magnifying-glass fa-rotate-90" style={{marginLeft:"-40px",color:"lightblue"}}></i>
</div>
</div>
<Row className='mt-5 mb-5 ms-5'>
    {
      allprojects?.length>0?
      allprojects.map((item)=>(
        <Col md={6}lg={4}>
        <Projectcards project={item}/>
       </Col>
      )):
      <div>
        {
          isToken?
          <p>no projects uploaded yet</p>:
          <div className='d-flex justify-content-center align-items-center flex-column'>
           <img src="https://t4.ftcdn.net/jpg/04/60/71/01/360_F_460710131_YkD6NsivdyYsHupNvO3Y8MPEwxTAhORh.jpg"height={"400px"} width={"400px"} alt="" />
           <div>
            <p className='text-danger fs-3  mt-4 ms-3'>
              please<Link style={{textDecoration:"none",color:"blue"}}>Login</Link>to view project
            </p>
           </div>
          </div>
        }
      </div>
    }
   
</Row>
    </>
  )
}

export default Project