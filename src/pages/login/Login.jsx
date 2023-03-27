import React from "react";
import "./Login.scss";
import { useState } from "react";
import { login } from "../../redux/apiCall";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  console.log(user);
  console.log(email, password);
  const navigate = useNavigate();
  if (user.currentUser !== null) {
    navigate("/");
  }
  const handleClick = (e) => {
    // Set the default alert dialog options

    e.preventDefault();
    login(dispatch, { email, password });
  };
  return (
    <div className="login">
      <div className="wrapper">
        <h1>SIGN IN</h1>
        <form>
          <input
            type="text
          "
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleClick}>LOGIN</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
