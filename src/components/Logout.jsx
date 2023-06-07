import React from 'react'
import { useNavigate } from 'react-router-dom'

const Logout = () => {
    const navigate = useNavigate();
    const logout=()=>{
        navigate('/');
    }
  return (
    <div>
        <button type='button' className='btn btn-danger' onClick={logout}>Logout</button>
    </div>
  )
}

export default Logout