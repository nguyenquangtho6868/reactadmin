import React from "react";
import { useState, useEffect } from "react";
import { publicRequest, userRequest } from "../../requestMethods";
import { useLocation } from "react-router";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  list,
} from "firebase/storage";

import { storage } from "../../firebase";
import { v4 } from "uuid";
function Product() {
  const [data, setData] = useState([]);
  const [imageUpload, setImageUpload] = useState(null);
  const [imageUrls, setImageUrls] = useState(null);

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [cate, setCate] = useState(null);
  const [size, setSize] = useState(null);
  const [color, setColor] = useState(null);
  const [price, setPrice] = useState("");
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  console.log(id);
  const uploadFile = () => {
    console.log("ok");
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
  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await publicRequest.get(
          `https://projecte-ecomerce.onrender.com/api/product/find/${id}`
        );

        setData(res.data);
      } catch (err) {}
    };
    getProducts();
  }, []);

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
    console.log(title);
    try {
      const res = await userRequest.put(
        `https://projecte-ecomerce.onrender.com/api/product/${id}`,
        product
      );
      console.log(res.data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="newProduct">
      <h1 className="addProductTitle">Edit Product</h1>
      <div className="addProductForm">
        <div className="addProductItem">
          <label>Image</label>
          <input
            type="file"
            id="file"
            defaultValue={data.img}
            onChange={(e) => setImageUpload(e.target.files[0])}
          />
          <button onClick={uploadFile}> Upload Image</button>
        </div>
        <div className="addProductItem">
          <label>Title</label>
          <input
            type="text"
            defaultValue={data.title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="addProductItem">
          <label>Desc</label>
          <input
            type="text"
            defaultValue={data.desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        </div>
        <div className="addProductItem">
          <label>Categories</label>
          <input
            type="text"
            defaultValue={data.categories}
            onChange={(e) => setCate(e.target.value)}
          />
        </div>
        <div className="addProductItem">
          <label>Size</label>
          <input
            type="text"
            defaultValue={data.size}
            onChange={(e) => setSize(e.target.value)}
          />
        </div>
        <div className="addProductItem">
          <label>Color</label>
          <input
            type="text"
            defaultValue={data.color}
            onChange={(e) => setColor(e.target.value)}
          />
        </div>
        <div className="addProductItem">
          <label>Price</label>
          <input
            type="number"
            defaultValue={data.price}
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

export default Product;
