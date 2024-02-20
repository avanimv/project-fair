import React, { useContext, useEffect } from 'react'
import { Button } from 'react-bootstrap'
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { BASE_URL } from '../services/baseurl';
import { editUserProjectAPI } from '../services/allAPI';
import { editProjectResponseContext } from '../context/ContextShare';

function Editproject({project}) {
    const {editProjectResponse,setEditProjectResponse}=useContext(editProjectResponseContext)
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [preview,setPreview]=useState("");
    const [projectDetails,setProjectDetails]=useState({
        id:project._id,
        title:project.title,
        language:project.language,
        github:project.github,
        website:project.website,
        overview:project.overview,
        projectImage:""
      })
      useEffect(()=>{
        if(projectDetails.projectImage){
            setPreview(URL.createObjectURL(projectDetails.projectImage))
        }
      },[projectDetails.projectImage])
     const handleReset=()=>{
        setProjectDetails({
            title:project.title,
            language:project.language,
            github:project.github,
            website:project.website,
            overview:project.overview,
            projectImage:""  
        })
        setPreview("")
     }
     const handleUpdate=async(e)=>{
        e.preventDefault();
       const  {id,title,language,github,website,overview,projectImage}=projectDetails;
       if(!id || !title || !language || !github || !website ||!overview  ){
          alert("please fill the form completely")
       }
       else{
        const reqBody=new FormData();
        reqBody.append("title",title);
        reqBody.append("language",language);
        reqBody.append("github",github);
        reqBody.append("website",website);
        reqBody.append("overview",overview);
        reqBody.append("projectImage",projectImage)
        const token=sessionStorage.getItem("token")
        if(preview){
            const reqHeader={
                "Content-Type":"multipart/form-data",
                "Authorization":`Bearer ${token}`
            }
            const result=await editUserProjectAPI(id,reqBody,reqHeader)
            if(result.status===200){
              setEditProjectResponse(result)
              alert("updated successfully");
              handleClose()
            }
            else{
              console.log(result.response.data);
            }
        }
        else{
            const reqHeader={
                "Content-Type":"application/json",
                "Authorization":`Bearer ${token}` 
        }
        const result=await editUserProjectAPI(id,reqBody,reqHeader);
        if(result.status===200){
          setEditProjectResponse(result)
          alert("updated successfully");
          handleClose()
        }
        else{
          console.log(result.response.data);
        }
       }
     }
    }
  return (
    <>
                        <button className='btn'><i class="fa-solid fa-pen-to-square text-info"onClick={handleShow}></i></button>
                        <Modal show={show} onHide={handleClose} size='lg'>
        <Modal.Header closeButton>
          <Modal.Title>Add New Projects</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='row'>
            <div className='col-lg-6 col-md-6'>
              <label htmlFor="project-image" className='btn'>
                <input id='project-image' type="file" style={{display:"none"}}
                                                onChange={(e)=>setProjectDetails({...projectDetails,projectImage:e.target.files[0]})}
                />
                <img
                height={"200px"}
                width={"200px"}
                src={preview?preview:
                `${BASE_URL}/uploads/${project.projectImage}`}/>
              </label>
            </div>
            <div className='col-lg-6 col-md-6 d-flex justify-content-center align-items-center flex-column'>
              <div className='mb-3 mt-3 w-100'>
                <input type="text" className='form-control' placeholder='project title'
                value={projectDetails.title}
                onChange={(e)=>setProjectDetails({...projectDetails,title:e.target.value})}
                />
              </div>
              <div  className='mb-3 mt-3 w-100'>
                <input type="text"className='form-control'placeholder='technology used'
                value={projectDetails.language}
                                onChange={(e)=>setProjectDetails({...projectDetails,language:e.target.value})}
                />
              </div>
              <div  className='mb-3 mt-3 w-100'>
                <input type="text"className='form-control'placeholder='github link'
                value={projectDetails.github}
                                onChange={(e)=>setProjectDetails({...projectDetails,github:e.target.value})}
                />
              </div>
              <div  className='mb-3 mt-3 w-100'>
                <input type="text" className='form-control'placeholder='website'
                value={projectDetails.website}
                                onChange={(e)=>setProjectDetails({...projectDetails,website:e.target.value})}
                />
              </div>
              <div  className='mb-3 mt-3 w-100'>
                <textarea name=""  className='form-control'
                onChange={(e)=>setProjectDetails({...projectDetails,overview:e.target.value})}
                placeholder='project description'
                value={projectDetails.overview}>
                </textarea>
              </div>
            </div>

          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleReset}>
            Reset
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Update Project
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}


export default Editproject;