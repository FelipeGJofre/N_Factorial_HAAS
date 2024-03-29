import React from 'react';
import { useNavigate } from 'react-router-dom';




const LogOutButton = () =>  {
    const navigate = useNavigate();
    const handleLogOff = () => {
        navigate('/login');
    }
    return (
      <button onClick={handleLogOff}>Log Off</button>
    );
}

export default LogOutButton;