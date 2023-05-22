import React, { useContext,useState } from 'react';

import './Header.css';
import OlxLogo from '../../assets/OlxLogo';
import Search from '../../assets/Search';
import Arrow from '../../assets/Arrow';
import SellButton from '../../assets/SellButton';
import SellButtonPlus from '../../assets/SellButtonPlus';

import {auth} from '../../firebase/config'
import {signOut} from "firebase/auth";

import {AuthContext} from '../../context'
import { useNavigate } from 'react-router-dom';
function Header() {
const [search,setSearch] = useState('')
 const {user} = useContext(AuthContext) //auth contextil vecha data edukkan
 let navigate = useNavigate();
 const logOut = ()=>{ //auth il login cheythirikunna alline log out cheyunathinu
  signOut(auth).then(() => {
   navigate('/login')
  }).catch((error) => {
   
    // An error happened.
  });
 }

 const handleClick = async() => {
 const userID =await user.uid;
 await navigate('/account' , {state :userID}) //userid account routeril pass cheythu
};

 const login = ()=>{
  if(user){
     return <p onClick={()=>{handleClick()}} style={{cursor:'pointer'}}>Hello {user.displayName}</p>
  }else{
    return <span style={{cursor:'pointer'}} onClick={()=>navigate('login')}>Login</span>
  }
 }

async function handleSearch(){
    await navigate('/searchProducts' , {state :search}) 
 }
 
  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName">
          <OlxLogo></OlxLogo>
        </div>
        <div className="placeSearch">
          <Search></Search>
          <input type="text" />
          <Arrow></Arrow>
        </div>
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              value={search}
              onChange={(e)=>setSearch(e.target.value)}
              placeholder="Find car,mobile phone and more..."
            />
          </div>
          <div className="searchAction">
          <button onClick={()=>{handleSearch()}} style={{width:'71px',background:'rgb(11 40 14)',color:'#fff'}}>search</button>
          </div>
        </div>
        <div className="language">
          <span> ENGLISH </span>
          <Arrow></Arrow>
        </div>
        <div className="loginPage">
          {login()} {/**ee funtionte akathulla code run avum */}
          <hr />
        </div>
        <div className="loginPage">
        
          <span onClick={()=>logOut()} style={{marginLeft:'20px',cursor:'pointer'}}>{'LogOut'}</span>
          <hr />
        </div>

        <div onClick={()=>{navigate('/creat')}} className="sellMenu">
          <SellButton></SellButton>
          <div className="sellMenuContent">
            <SellButtonPlus></SellButtonPlus>
            <span>SELL</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
