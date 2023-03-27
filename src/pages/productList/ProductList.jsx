import React from "react";
import "./ProductList.scss";
import { MdDelete } from "react-icons/md";
import { useState, useEffect } from "react";
import { userRequest } from "../../requestMethods";
import { Link } from "react-router-dom";
import "react-confirm-alert/src/react-confirm-alert.css";
const ProductList = () => {
  const [getProd, setGetProd] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await userRequest.get(
          "https://projecte-ecomerce.onrender.com/api/product"
        );

        setData(res.data);
      } catch (err) {}
    };
    getProducts();
  }, [getProd]);

  const handlDelete = async (e) => {
    try {
      const res = await userRequest.delete(
        `https://projecte-ecomerce.onrender.com/api/product/${e._id}`
      );
      console.log(res.data);
    } catch (e) {
      console.log(e);
    }
    setGetProd(!getProd);
  };

  return (
    <div className="productList">
      <table>
        <tr>
          <th>
            <input type="checkbox" disabled />
          </th>
          <th>ID</th>
          <th>TITLE</th>
          <th>IMAGE</th>

          <th>PRICE</th>
          <th>ACTION</th>
        </tr>

        {data.map((prod) => {
          return (
            <tr>
              <td>
                {" "}
                <input type="checkbox" disabled />
              </td>
              <td>{prod.id}</td>
              <td>{prod.title}</td>
              <td>
                <img src={prod.img} alt="" />
              </td>

              <td>{prod.price}</td>
              <td className="action">
                <Link to={`/product/${prod._id}`}>
                  {" "}
                  <button className="edit">EDIT</button>
                </Link>

                <button className="delete" onClick={() => handlDelete(prod)}>
                  <MdDelete />
                </button>
              </td>
            </tr>
          );
        })}
      </table>
    </div>
  );
};

export default ProductList;
