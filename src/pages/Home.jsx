import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import Projectcards from '../components/Projectcards'
import { Link } from 'react-router-dom'
import homepageimage from '../assets/img1.jpeg'
import { homeProjectAPI } from '../services/allAPI'

function Home() {
    // we need to change get started button to manage projects,id user logged in
    const [isLogin,seIsLogin]=useState(false)
    const [homeProject,setHomeProject]=useState()
    useEffect(()=>{
        if(sessionStorage.getItem("token")){
            seIsLogin(true)
        }
    },[])
    const getHomeProject=async()=>{
        const result=await homeProjectAPI()
        console.log("home project");
        console.log(result);
        setHomeProject(result.data)
    }
    useEffect(()=>{
        getHomeProject()
    },[])
    return (
        <>
            <div className='mb-5 bg-success' style={{ width: "100%", height: "80vh" }}>
                <div className='container-fluid rounded'>
                    <Row className='align-items-center p-5'>

                        <Col sm={12} md={6} lg={6}>
                            <h1 className='text-light mb-3' style={{ fontSize: "50px", fontWeight: "600" }}>Project Fair</h1>
                            <p>one stop destination for all software development projects</p>
                            {isLogin==true?
                            <Link to={'/dashboard'}>
                                <button className='btn btn-warning rounded'>manage projects<i class="fa-solid fa-arrow-right ms-2"></i>
                                </button></Link>:
                                <Link to={'/login'}>
                                <button className='btn btn-warning rounded'>get started<i class="fa-solid fa-arrow-right ms-2"></i>
                                </button></Link>
}
                        </Col>
                        <Col sm={12} md={6} lg={6}>
                            <img src={homepageimage} alt="" height={"300px"}
                                style={{ marginTop: "50px" }} />
                        </Col>
                    </Row>

                </div>

            </div>
            <div className='mt-5 allProject'>
                <div className='text-center'>
                    <h1>Explore our Project</h1>
                    <marquee scrollAmount={20}>
                        <div className='d-flex'>{
                            homeProject?.length>0?
                            homeProject.map((item)=>(
                                <div className='ms-5'style={{width:"400px"}}>
                                    <Projectcards project={item}/>

                                </div>
                            )

                            ):
                            <p>no projects found</p>

                        }

                            {/* <div className='ms-5' style={{ width: "400px" }}>
                                <Projectcards />
                            </div>
                            <div className='ms-5' style={{ width: "400px" }}>
                                <Projectcards />
                            </div>
                            <div className='ms-5' style={{ width: "400px" }}>
                                <Projectcards />
                            </div> */}
                        </div>
                    </marquee>

                
                <div className='text-center mt-5' style={{ fontWeight: "600", color: "red", cursor: "pointer" }}><Link to={'/project'}>
                    See More Project</Link>
                </div>
                </div>

            </div>

       
            </>
            )
}

export default Home