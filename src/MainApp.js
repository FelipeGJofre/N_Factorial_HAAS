import React from 'react';
import Projects from './Projects';
import { useNavigate } from 'react-router-dom';
import './nfactorial.css';



const MainApp = () =>  {
  const navigate = useNavigate();

  const handleLogOff = () => {
      navigate('/login');
  }

  return (
    <div className="projects-container">
      <div className='header'>
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