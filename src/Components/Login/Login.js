import React, { useState } from 'react';
import {auth} from '../../firebase/config'
import Logo from '../../olx-logo.png';
import './Login.css';

import {signInWithEmailAndPassword} from 'firebase/auth'
import {useNavigate} from 'react-router-dom'

function Login() {
const navigate = useNavigate()
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')

  const handleSubmit =async (e)=>{
    e.preventDefault()
      console.log(email);
      console.log(password);

        try {
          await signInWithEmailAndPassword(auth,email, password).then((user)=>{//database il poyi ee email and password il ulla user undo ennu check cheyum undengil / lottu redirect cheyum
           // console.log(user);
          }).then(()=>{
            navigate('/')
          })
        } catch (err) {
          alert(err.message);
        }
      
  }
  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="fname"
            name="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            defaultValue="John"
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="lname"
            name="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            defaultValue="Doe"
          />
          <br />
          <br />
          <button>Login</button>
        </form>
        <button onClick={()=>navigate('/signup')}>Signup</button>
      </div>
    </div>
  );
}

export default Login;
