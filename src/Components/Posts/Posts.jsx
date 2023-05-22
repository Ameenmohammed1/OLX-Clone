import React, { useContext, useEffect, useState } from "react";

import Heart from "../../assets/Heart";
import "./Post.css";

import { db } from "../../firebase/config";
import { collection, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { PostContext } from "../../postContext";

function Posts() {
  const [product, setProduct] = useState([]);
  const { setPost } = useContext(PostContext); //post context il data veykan edutu

  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    async function getData() {
      await getDocs(collection(db, "products")).then((querySnapshot) => {//all products edukunathinu
        const newData = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setProduct(newData);
      });
      setIsLoading(false);
    }
    getData();
  }, []); //useEffect repeat working stop cheyan [] nalkuka

  const navigate = useNavigate();

  return (
    <div className="postMain">
      <p className="title">Fresh recommendations</p>
      <h1>{isLoading ? <h1>Loading...</h1>:''}</h1>
    <div className="postParentDiv">

      {
        product.map((pro,i)=>{
          return(
            <div className="card" onClick={()=>{
              setPost(pro)
              navigate('/view')
            }} key={i}>
            <div className="imageParent" key={i}>
              <img
                src={pro.image[0]}
                alt=""
                className="postImage"
              />
            </div>
    
            <h1>{pro.price}</h1>
            <p className="shortDetail">{pro.shortDetail}</p>
            <p className="name">{pro.name}</p>
            <div className="bottomDiv">
              <p className="location">trivandrum</p>
              <p className="date">{pro.createdAt}</p>
            </div>
          </div>
          )
        })
      }
    
  
      
    </div>
    </div>
  );
}

export default Posts;
