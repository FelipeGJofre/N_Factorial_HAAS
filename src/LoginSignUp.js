import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import './LoginSignUp.css'
import user_icon from './Assets/person.png'
import email_icon from './Assets/email.png'
import password_icon from './Assets/password.png'

const LoginSignUp = () => {
    const navigate = useNavigate();
    const [action, setAction] = useState("Sign Up")
    const [user_info, userData] = useState({
        user: "",
        email: "",
        password: ""
    })

    const handleSignUp = () => {
        console.log(user_info)
        fetch('/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user_info),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Handle response data from Flask if needed
            console.log(data);
            // Go to the main app page
            navigate('/app');
        })
        .catch(error => {
            // Handle error
            console.error('There was a problem with your fetch operation:', error);
        })
        userData({
            user: "",
            email: "",
            password: ""
        })
    }

    const handleLogin = () => {
        console.log(user_info)
        fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user_info),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Handle response data from Flask if needed
            console.log(data);
            // Go to the main app page
            navigate('/app');
        })
        .catch(error => {
            // Handle error
            console.error('There was a problem with your fetch operation:', error);
        })
        userData({
            email: "",
            password: ""
        })
    }

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        console.log(name)
        userData(prevState => ({ 
            ...prevState,
            [name]: value }));
    };
    return (
    <div className='container'>
        <div className='header'>
            <div className='text'>{action}</div>
        </div>
        <div className='input-div'>
            {action=== "Login"? null : <div className="input">
                <img src={user_icon} alt="" />
                <input type="text" placeholder="Username" name="user" id="" value={user_info.user} onChange={handleInputChange}/>
            </div>}
            <div className="input">
                <img src={email_icon} alt="" />
                <input type="email" placeholder="Email" name="email" id="" value={user_info.email} onChange={handleInputChange}/>
            </div>
            <div className="input">
                <img src={password_icon} alt="" />
                <input type="password" placeholder="Password" name="password" id="" value={user_info.password} onChange={handleInputChange}/>
            </div>
        </div>
        {action==="Sign Up"? null :<div className="forgot-password">Don't have an account? <span onClick={()=>{setAction("Sign Up")}}>Click here!</span></div>}
        {action==="Sign Up"? null :<div className="forgot-password">Forgot Password? <span>Click here!</span></div>}
        {action==="Login"? null :<div className="forgot-password">Already have an account? <span onClick={()=>{setAction("Login")}}>Click here!</span></div>}
        <div className="submit-container">
            <div className="submit" onClick={action==="Sign Up"? handleSignUp : handleLogin}>Submit</div>
        </div>
    </div>
  )
}

export default LoginSignUp
