import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import './nfactorial.css'
import user_icon from './Assets/person.png'
import id_icon from './Assets/email.png'
import password_icon from './Assets/password.png'

const LoginSignUp = () => {
    const navigate = useNavigate();
    const [action, setAction] = useState("Sign Up")
    const [user_info, userData] = useState({
        username: "",
        userID: "",
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
            if(data['message'] === "User already exists!")
            {
                console.log("Finally works!")
                setAction("Login")
            }
            else {
            // Go to the main app page
                const name = '/app/' + user_info.userID
                navigate(name);
            }
        })
        .catch(error => {
            // Handle error
            console.error('There was a problem with your fetch operation:', error);
        })
        userData({
            username: "",
            userID: "",
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
            if(data['message'] === "Found user data successfully")
            {
                const name = '/app/' + user_info.userID
                navigate(name);
            }
            // Handle response data from Flask if needed
            console.log(data);
            // Go to the main app page
        })
        .catch(error => {
            // Handle error
            console.error('There was a problem with your fetch operation:', error);
        })
        userData({
            username: "",
            userID: "",
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
            {action==="Login" ? null :
                <div className="input">
                    <img src={user_icon} alt="" />
                    <input type="text" placeholder="Username" name="username" id="" value={user_info.username} onChange={handleInputChange}/>
                </div>
            }
            <div className="input">
                <img src={id_icon} alt="" />
                <input type="text" placeholder="User ID" name="userID" id="" value={user_info.userID} onChange={handleInputChange}/>
            </div>
            <div className="input">
                <img src={password_icon} alt="" />
                <input type="password" placeholder="Password" name="password" id="" value={user_info.password} onChange={handleInputChange}/>
            </div>
        </div>
        {action==="Sign Up"? null :<div className="forgot-password">Don't have an account? <span onClick={()=>{setAction("Sign Up")}}>Click here!</span></div>}
        {action==="Login"? null :<div className="forgot-password">Already have an account? <span onClick={()=>{setAction("Login")}}>Click here!</span></div>}
        <div className="submit-container">
            <div className="submit" onClick={action==="Sign Up"? handleSignUp : handleLogin}>Submit</div>
        </div>
    </div>
  )
}

export default LoginSignUp
