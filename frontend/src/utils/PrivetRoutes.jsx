import React from 'react'
import { useAuth } from '../context/authContext'
import { Navigate } from 'react-router-dom'

const PrivetRoutes=({children}) => {
 const {user,lodading} = useAuth()

 if(lodading) {
    return <div>loding...</div>
 }

 return user ? children : <Navigate to="/login" />
}

export default PrivetRoutes