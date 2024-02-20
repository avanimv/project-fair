import React, { createContext, useState } from 'react'
export const addProjectResponseContext=createContext();
export const editProjectResponseContext=createContext();
export const isAuthTokencontext=createContext()

function ContextShare({children}) {
    // children is a predefined props used to share data between all components
    // create a state that need to shared
    const[addProjectResponse,setAddProjectResponse]=useState({})
    const[editProjectResponse,setEditProjectResponse]=useState({})
    const[isAuthToken,setIsAuthToken]=useState(false)
      return (
    <>
    <addProjectResponseContext.Provider value={{addProjectResponse,setAddProjectResponse}}>
      <editProjectResponseContext.Provider value={{editProjectResponse,setEditProjectResponse}}>
        <isAuthTokencontext.Provider value={{isAuthToken,setIsAuthToken}}>
      {children}
      </isAuthTokencontext.Provider>
      </editProjectResponseContext.Provider>       
    </addProjectResponseContext.Provider>
    </>
  )
}

export default ContextShare