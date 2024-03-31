import React from 'react'
import { Navigate } from 'react-router-dom'
// import { useUserAuth } from '../../context/AuthContexts';

const ProtectedRoute = ({children}) => {
  const user = JSON.parse(window.localStorage.getItem('user-info'));
  // console.log(user)
    if (user === null){
        return <Navigate to="/login" / >
    }
  return children;
};

export default ProtectedRoute