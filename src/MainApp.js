import React, { useState, useEffect } from 'react';
import Projects from './Projects';
import { useNavigate } from 'react-router-dom';
import './nfactorial.css';



const MainApp = () =>  {
  const navigate = useNavigate();
  const [name, setName] = useState("")

  const handleLogOff = () => {
      navigate('/login');
  }

  const getUsername = () => {
    fetch('/getusername/'+window.location.href.split('/').filter(segment => segment !== '').pop(), {method: 'POST',})
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        // Handle response data from Flask if needed
        console.log(data);
        setName(data['username']);
    })
    .catch(error => {
        // Handle error
        console.error('There was a problem with your fetch operation:', error);
    })
  }
  const funcname = getUsername();

  return (
    <div className="projects-container">
      <div className='header'>
        <span style={{fontSize: '200%'}}>Hello, {name}</span>
        <div className='text'>Projects</div>
      </div>
      <Projects  />
      <div className="submit-container">
          <div className="submit" onClick={handleLogOff}>LogOut</div>
      </div>
    </div>
  );
}

export default MainApp