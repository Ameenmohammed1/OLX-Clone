import React, { Fragment, useState, useContext } from "react";
import "./Create.css";
import Header from "../Header/Header";

import { storage, db } from "../../firebase/config";
import { collection, addDoc,doc,updateDoc,arrayUnion } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

import { AuthContext } from "../../context";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const date = new Date();
  const { user } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  let [image, setUplodImage] = useState([]);
  const [discription, setDiscription] = useState("");
  const [shortDetail, setShortDetail] = useState("");
  const [, setPercent] = useState(0);

  let navigate = useNavigate()


  const handilChange = (e)=>{ //user upload heytha file ne oru arrayil vechu
    if (e.target.files) {
      for (let i = 0; i < e.target.files.length; i++) { 
        const newImage = e.target.files[i];
        newImage[i] = Math.random();
        setUplodImage((prevState) => [...prevState, newImage]);
      }
    }
  }
  const handleSubmit =async () => {
    let docID ;
    try {
      let docRef = await addDoc(collection(db, "products"), {
        name: name,
        price: price,
        category: category,
        image: [],
        userID: user.uid,
        discription: discription,
        shortDetail: shortDetail,
        userID: user.uid,
        createdAt: date.toDateString(),
      });
      docID = docRef.id;//collectionte id eduthu vechu
  
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    const promises = [];
    //***********step two************* */
    image.map((file) => {

      const sotrageRef = ref(storage, `images/${file.name}`);

      const uploadTask = uploadBytesResumable(sotrageRef, file);
      promises.push(uploadTask);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const prog = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setPercent(prog);
        },
        (error) => console.log(error),
        async () => {
          await getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURLs) => {
            // setImageUrls((prevState) => [...prevState, downloadURLs]);
          const document =  doc(db, "products", docID);
        await  updateDoc(document, {
            image: arrayUnion(downloadURLs)//array lottu data push cheyan
          })
          }).then(()=>{
            console.log('update succes');
          });
        }
      );
    });

    //*******step three******* */

    Promise.all(promises)//image uploading kaziyumbol ithu work avum
    .then(() => navigate('/'))
    .then(err => err)
   
  };

  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
          <form>
            <label htmlFor="fname">Name</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              name="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              defaultValue="John"
            />
            <br />
            <label htmlFor="fname">Short Details</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              name="shortDetail"
              value={shortDetail}
              onChange={(e) => setShortDetail(e.target.value)}
              defaultValue="John"
            />
            <br />
            <label htmlFor="fname">Category</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              name="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              defaultValue="John"
            />
            <br />
            <label htmlFor="fname">Price</label>
            <br />
            <input
              className="input"
              type="number"
              id="fname"
              name="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <br />

            <label htmlFor="fname">Discription</label>
            <br />
            <textarea
              name="discription"
              value={discription}
              onChange={(e) => setDiscription(e.target.value)}
              id=""
              cols="65"
              rows="5"
            ></textarea>
          </form>
          <br />

          {/**nammal set cheyta image kann URL object upayogikanam */}
          <br />
          <br></br>
          <label htmlFor="" className="fileBtn" for={"file"}>
            Upload Image
          </label>
          <input id="file" onChange={handilChange} multiple type="file" />
          <br />
          <button onClick={() => handleSubmit()} className="uploadBtn">
            upload and Submit
          </button>
        </div>
      </card>
    </Fragment>
  );
};

export default Create;
