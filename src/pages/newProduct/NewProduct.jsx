import React from "react";
import "./NewProduct.scss";
import { userRequest } from "../../requestMethods";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  list,
} from "firebase/storage";

import { useState } from "react";
import { storage } from "../../firebase";
import { v4 } from "uuid";
function NewProduct() {
  const [imageUpload, setImageUpload] = useState(null);
  const [imageUrls, setImageUrls] = useState(null);

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [cate, setCate] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [price, setPrice] = useState("");

  const uploadFile = () => {
    if (imageUpload == null) return;
    const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        console.log(url);
        setImageUrls(url);
      });
    });
  };
  console.log(imageUrls);
  const handleSubmit = async () => {
    const cateArray = cate.split(",");
    const sizeArray = size.split(",");
    const colorArray = color.split(",");

    const product = {
      title: title,
      desc: desc,
      img: imageUrls,
      categories: cateArray,
      size: sizeArray,
      color: colorArray,
      price: Number(price),
    };
    console.log(product);
    try {
      const res = await userRequest.post(
        "https://projecte-ecomerce.onrender.com/api/product",
        product
      );
      console.log(res.data);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Product</h1>
      <div className="addProductForm">
        <div className="addProductItem">
          <label>Image</label>
          <input
            type="file"
            id="file"
            onChange={(e) => setImageUpload(e.target.files[0])}
          />
          <button onClick={uploadFile}> Upload Image</button>
        </div>
        <div className="addProductItem">
          <label>Title</label>
          <input
            type="text"
            placeholder="Apple Airpods"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="addProductItem">
          <label>Desc</label>
          <input
            type="text"
            placeholder="123"
            onChange={(e) => setDesc(e.target.value)}
          />
        </div>
        <div className="addProductItem">
          <label>Categories</label>
          <input
            type="text"
            placeholder="Cách nhau bằng dấu , "
            onChange={(e) => setCate(e.target.value)}
          />
        </div>
        <div className="addProductItem">
          <label>Size</label>
          <input
            type="text"
            placeholder="Cách nhau bằng dấu , "
            onChange={(e) => setSize(e.target.value)}
          />
        </div>
        <div className="addProductItem">
          <label>Color</label>
          <input
            type="text"
            placeholder="Cách nhau bằng dấu , "
            onChange={(e) => setColor(e.target.value)}
          />
        </div>
        <div className="addProductItem">
          <label>Price</label>
          <input
            type="number"
            placeholder="price"
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <button className="addProductButton" onClick={handleSubmit}>
          Create
        </button>
      </div>
    </div>
  );
}

export default NewProduct;
