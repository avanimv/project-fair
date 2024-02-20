import React from 'react'
import { useState } from 'react';
import Collapse from 'react-bootstrap/Collapse';

function Profile() {
  const [open, setOpen] = useState(false);
  return (
    <>
    <div className='shadow p-5 mb-5'>
        <div className='d-flex justify-content-between'>
         <h2>Profile</h2>
         <button className='btn btn-outline-info' onClick={()=>setOpen(!open)}><i class="fa-solid fa-angle-down"></i></button>
        </div>
        <Collapse in={open}>
        <div className='row justify-content-center mt-5'>
          <label htmlFor="profile">
            <input type="file" id='profile' style={{display:"none"}}/>
            <img className='rounded' src="https://media.istockphoto.com/id/1495088043/vector/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg?s=612x612&w=0&k=20&c=dhV2p1JwmloBTOaGAtaA3AW1KSnjsdMt7-U_3EZElZ0=" height="150px"width="150px"alt="" />
          </label>
          <div className='mt-4'>
            <input type="text"placeholder='Github link'className='form-control' />
          </div>
          <div className='mt-4'>
            <input type="text"placeholder='Linkedin link' className='form-control'/>
          </div>
          <div className='mt-3 mb-1'>
            <button className='btn btn-success rounded w-100'>Update</button>
          </div>

         </div>
   
        </Collapse>
        </div>
         
    </>
  )
}

export default Profile