import React, { useState, useEffect } from 'react'
import './LoginSignUp.css'
import user_icon from './Assets/person.png'
import email_icon from './Assets/email.png'
import password_icon from './Assets/password.png'

const LoginSignUp = () => {
    const [action, setAction] = useState("Sign Up")
    const [login_info, setData] = useState({
        user: "",
        email: "",
        password: ""
    })

    const handleLogin = () => {
        console.log(login_info)
        fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(login_info),
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
        })
        .catch(error => {
            // Handle error
            console.error('There was a problem with your fetch operation:', error);
        })
        setData({
            user: "",
            email: "",
            password: ""
        })
    }
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        console.log(name)
        setData(prevState => ({ 
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
                <input type="text" placeholder="Username" name="user" id="" value={login_info.user} onChange={handleInputChange}/>
            </div>}
            <div className="input">
                <img src={email_icon} alt="" />
                <input type="email" placeholder="Email" name="email" id="" value={login_info.email} onChange={handleInputChange}/>
            </div>
            <div className="input">
                <img src={password_icon} alt="" />
                <input type="password" placeholder="Password" name="password" id="" value={login_info.password} onChange={handleInputChange}/>
            </div>
        </div>
        {action==="Sign Up"? null :<div className="forgot-password">Forgot Password? <span>Click here!</span></div>}
        <div className="submitButton">
            <center>
                <button type="button" onClick={handleLogin}> Log In </button>
            </center>
        </div>
        
        <div className="submit-container">
            <div className={action==="Login"?"submit gray":"submit"} onClick={()=>{setAction("Sign Up")}}>Submit</div>
            <div className={action==="Sign Up"?"submit gray":"submit"} onClick={()=>{setAction("Login")}}>Login</div>
        </div>
    </div>
  )
}

export default LoginSignUp
