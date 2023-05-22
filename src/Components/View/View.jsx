import React, { useContext, useEffect, useState } from "react";

import { PostContext } from "../../postContext";

import { db } from "../../firebase/config";
import { collection, query, where, getDocs } from "firebase/firestore";

import "./View.css";


//swiper 

// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
function View() {
  const { post } = useContext(PostContext);

  const [user, setUser] = useState(null);

  useEffect(() => {
    async function getDocument(coll, id) {
      const q = query(
        collection(db, "users"),
        where("userID", "==", post.userID) //userid post.userid aya data edukkum
      );

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        const data = doc.data();
        console.log(data);
        setUser(data)
      });

      console.log(post);
    }
    getDocument();
  }, []);

  return (
    <div className="viewParentDiv">
       <div className="swiperParent">
       <Swiper
      // install Swiper modules
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween={50}
      //slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      onSwiper={(swiper) => console.log(swiper)}
      onSlideChange={() => console.log('slide change')}
    >
     {
      post.image.map((img)=>{
        return(
          <SwiperSlide>
          <div className="productImage">
          <img src={img} alt="" />
          </div>
          </SwiperSlide>
        )
      })
     }
    </Swiper>
       </div>
      <div className="rightSection">
        <div className="productDetails">
        <p className="name">{post.name}</p>
          <p className="price">&#x20B9;{post.price} </p>
          <p className="category">Category : {post.category}</p>
          <p className="tite">Discription</p>
          <p className="discrip">
            {post.discription}
          </p>
          <p className="date">{post.createdAt}</p>
        </div>
        <div className="contactDetails">
          <p className="sellerTitle">Seller details</p>
          <p className="SName">Name : {user ? user.username : ''}</p>
          <p className="SPhone">Phone No : {user ? user.phoneNo : ''}</p>
        </div>
      </div>
    </div>
  );
}
export default View;
