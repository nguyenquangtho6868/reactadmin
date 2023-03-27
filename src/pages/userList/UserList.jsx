import React from "react";
import "./UserList.scss";
import { MdDelete } from "react-icons/md";
import { useState, useEffect } from "react";
import { userRows } from "../../dummyData";
import { userRequest } from "../../requestMethods";
const UserList = () => {
  const [getUser, setGetUser] = useState(true);
  const [data, setData] = useState([]);
  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await userRequest.get(
          "https://projecte-ecomerce.onrender.com/api/user"
        );

        setData(res.data);
      } catch (err) {}
    };
    getProducts();
  }, [getUser]);
  const handlDelete = async (e) => {
    try {
      const res = await userRequest.delete(
        `https://projecte-ecomerce.onrender.com/api/user/${e._id}`
      );
      console.log(res.data);
    } catch (e) {
      console.log(e);
    }
    setGetUser(!getUser);
  };
  console.log(data);
  return (
    <div className="userList">
      <table style={{ width: "100%" }}>
        <tr>
          <th>
            <input type="checkbox" disabled />
          </th>
          <th>ID</th>
          <th>USERNAME</th>
          <th>AVATAR</th>
          <th>EMAIL</th>
          <th>STATUS</th>
          <th>TRANSACTION</th>
          <th>ACTION</th>
        </tr>

        {data.map((user) => {
          return (
            <tr>
              <td>
                {" "}
                <input type="checkbox" disabled />
              </td>
              <td>{user.id}</td>
              <td>{user.username}</td>
              <td>
                <img src={user.avatar} alt="" />
              </td>
              <td>{user.email}</td>
              <td>{user.status}</td>
              <td>{user.transaction}</td>
              <td className="action">
                <button className="edit">EDIT</button>
                <button className="delete" onClick={() => handlDelete(user)}>
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

export default UserList;
