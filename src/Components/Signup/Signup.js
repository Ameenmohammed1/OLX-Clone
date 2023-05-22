import React, { useState } from 'react';

import Logo from '../../olx-logo.png';
import './Signup.css';
import {auth,db} from '../../firebase/config'
import {createUserWithEmailAndPassword,updateProfile} from "firebase/auth";
import {addDoc,collection,Timestamp } from 'firebase/firestore'

import {useNavigate} from 'react-router-dom'

export default function Signup() {

  const [username,setUsername]= useState('')
  const [email,setEmail]= useState('')
  const [password,setPassword]= useState('')
  const [mobile,setMobile]= useState('')

  const navigate = useNavigate();

  const handleSubmit =async (e)=>{
    e.preventDefault()
    

   await createUserWithEmailAndPassword(auth,email, password)//authutentication collectionil user ne add cheyum
  .then(async(sign) => {
    
   await updateProfile(auth.currentUser, { //desplay name add cheum
      displayName: username
    })
   console.log(sign);
   console.log(sign.user.displayName);
   
const userID = sign.user.uid; // userinte id edutu veykum
   return userID
  }).then(async(userID)=>{ //.then ittu vilichu povukayanengil ononayi work avum async
    try {
      console.log(userID);
      await addDoc(collection(db, 'users'), {//users db yil data addd cheythu
        userID:userID,
        username: username,
        email: email,
        phoneNo:mobile,
        created: Timestamp.now()
      })
    console.log('creat collection');
    } catch (err) {
      alert(err)
    }
  }).then(()=>{
    navigate('/login') // auth cheythu collection add cheythatinu shesham "/" home lottu povum
  })
  .catch((error) => {
    console.log(error);
    const errorCode = error.code;
    const errorMessage = error.message;
  });
  }

  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleSubmit}> {/**handleSubmit functin vilikunathu submit kodukumbol form */}
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            name="name"
            value={username} //username il ulla data yanu value
            onChange={(e)=>setUsername(e.target.value)} //username enna variablil data veykum 
            defaultValue="John"
          />
          <br />
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
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            id="lname"
            name="phone"
            value={mobile}
            onChange={(e)=>setMobile(e.target.value)}
            defaultValue="Doe"
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
          <button>Signup</button>
        </form>
        <a>Login</a>
      </div>
    </div>
  );
}
