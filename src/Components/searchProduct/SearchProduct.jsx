import React, { useState, useEffect } from "react";
import "./searchProduct.css";
import { db } from "../../firebase/config";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useLocation } from "react-router-dom";
function SearchProduct() {
  const location = useLocation();
  const productName = location.state;

  const [product, setProduct] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function getData() {
        setIsLoading(true)
      const q = query(
        collection(db, "products"),
        where("name", "==", productName)
      );

      const querySnapshot = await getDocs(q);
      const newData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setProduct(newData);
      setIsLoading(false)
    }
      getData();
  }, []);
  return (
    <div className="postMain">
      <p className="title">Fresh recommendations</p>
      <h1>{isLoading ? <h1>Loading...</h1>:''}</h1>
      <div className="postParentDiv">
        {
      product.map((pro,i)=>{
        return(
          <div className="card"  key={i}>
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

export default SearchProduct;
