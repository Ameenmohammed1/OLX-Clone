import React, { Fragment, useState, useEffect } from "react";
import { db } from "../../firebase/config";
import { getDoc, doc, updateDoc } from "firebase/firestore";
import "./editPrdoct.css";
import { useLocation,useNavigate } from "react-router-dom";

function EditProduct() {
  const location = useLocation();
  const productID = location.state; //useNavigate vazzi pass cheytha data edukkan
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [discription, setDiscription] = useState("");
  const [shortDetail, setShortDetail] = useState("");
  const [product, setProduct] = useState();
  const navigate = useNavigate()
  useEffect(() => {
    async function getProduct() {
      const product = doc(db, "products", productID);
      const classSnap = await getDoc(product);
      setProduct(classSnap.data());
    }
    getProduct();
  }, []);

  async function updateData() {
    console.log('stasr');
    let Uname = name ? name : product.name;
    let Uprice = price ? price : product.price;
    let Ucategory = category ? category : product.category;
    let Udiscription = discription ? discription : product.discription;
    let UshortDetails = shortDetail ? shortDetail : product.shortDetail;

    const productCollection = doc(db, "products", productID);

    await updateDoc(productCollection, {
      name: Uname,
      price: Uprice,
      category: Ucategory,
      discription: Udiscription,
      shortDetail: UshortDetails,
    }).then(()=>{
        navigate('/')
    });
  }
  return (
    <div>
      <Fragment>
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
                
                onChange={(e) => setName(e.target.value)}
                defaultValue={product ? product.name : ""}
              />
              <br />
              <label htmlFor="fname">Short Details</label>
              <br />
              <input
                className="input"
                type="text"
                id="fname"
                name="shortDetail"
                onChange={(e) => setShortDetail(e.target.value)}
                defaultValue={product ? product.shortDetail : ""}
              />
              <br />
              <label htmlFor="fname">Category</label>
              <br />
              <input
                className="input"
                type="text"
                id="fname"
                name="category"
                onChange={(e) => setCategory(e.target.value)}
                defaultValue={product ? product.category : ""}
              />
              <br />
              <label htmlFor="fname">Price</label>
              <br />
              <input
                className="input"
                type="number"
                id="fname"
                name="Price"
                onChange={(e) => setPrice(e.target.value)}
                defaultValue={product ? product.price : ""}
              />
              <br />

              <label htmlFor="fname">Discription</label>
              <br />
              <textarea
                name="discription"
                onChange={(e) => setDiscription(e.target.value)}
                id=""
                cols="65"
                rows="5"
                defaultValue={product ? product.discription : ""}
              ></textarea>
            </form>
            <br />

            {/**nammal set cheyta image kann URL object upayogikanam */}
            <br />
            <br></br>
            <label htmlFor="" className="fileBtn" for={"file"}>
              Upload Image
            </label>
            <input id="file" onChange={() => {}} multiple type="file" />
            <br />
            <button onClick={() => {updateData()}} className="uploadBtn">
              upload and Submit
            </button>
          </div>
        </card>
      </Fragment>
    </div>
  );
}

export default EditProduct;
