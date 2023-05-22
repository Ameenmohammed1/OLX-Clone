import "./App.css";
import { useEffect, useContext, useState } from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./Pages/Home";
import View from "./Pages/ViewPost";

import Creat from "./Pages/Create";
import Signup from "./Pages/Signup";
import Account from "./Components/Account/Account";
import EditPrdoct from "./Components/EditProduct/EditProduct";

import Login from "./Pages/Login";

import { AuthContext } from "./context";
import ViewContext from "./postContext";

import { auth } from "./firebase/config";
import SearchProduct from "./Components/searchProduct/SearchProduct";

function App() {
  const { setUser } = useContext(AuthContext); //authcontext app cheytha data eduthu
  const [state, setState] = useState();
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      //arengilum sign cheythitundengil avarude data edukkum
      setUser(user);
    });
  });
  return (
    <div className="App">
      <ViewContext>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/creat" element={<Creat />} />
          <Route path="/view" element={<View />} />
          <Route path="/account" element={<Account />} />
          <Route path="/editPrdoct" element={<EditPrdoct/>} />
          <Route path="/searchProducts" element={<SearchProduct/>} />
        </Routes>
      </ViewContext>
    </div>
  );
}

export default App;
