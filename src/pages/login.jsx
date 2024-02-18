

import React, {useState} from "react"
import "./login.css"
import axios from "axios"
import { useNavigate  } from "react-router-dom"

import { useEffect } from "react"
   export const Login = ({ setLoginUser}) => {

    const navigate = useNavigate()

    const [ user, setUser] = useState({
        email:"",
        password:""
    })

    const handleChange = e => {
        const { name, value } = e.target
        setUser({
            ...user,
            [name]: value
        })
    }
   
    function login(){
        
        axios.post("https://fitness-back-5jw0.onrender.com/login", user)
        .then(res => {
          
            alert(res.data.message)
            
            localStorage.setItem('name',res.data.user.name);
            localStorage.setItem('logout','Logout');
            setLoginUser(res.data.user)
            localStorage.setItem('login',true);
            localStorage.setItem('user_data',res.data.user);
            navigate('/adminsuccess')

        })
    }
    useEffect(() => {
      let login = localStorage.getItem('login');
      if(login)
      {
        console.log("hello")
      navigate('/adminsuccess');
    }
    
      
    });
    

    return (
        <section  >
            <div className="register">
                <div>
           
                    <span>login and enjoy the service</span>
        <form id='form' className='flex flex-col'>
            <h1>Login</h1>
            <input type="text" name="email" value={user.email} onChange={handleChange} placeholder="Enter your Email"></input>
            <input type="password" name="password" value={user.password} onChange={handleChange}  placeholder="Enter your Password" ></input>
            <div className="btn" onClick={login}>Login</div>
           
        </form>
        </div>
          
          </div>
      </section>
    )
}

export default Login