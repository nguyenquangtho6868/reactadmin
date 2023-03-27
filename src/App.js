import { Routes, Route } from "react-router-dom";
import SideBar from "./components/sidebar/SideBar";
import TopBar from "./components/topbar/TopBar";
import "./App.css";
import Home from "./pages/home/Home";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import ProductList from "./pages/productList/ProductList";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";
import Login from "./pages/login/Login";
import { useSelector } from "react-redux";

function App() {
  const user = useSelector((state) => state.user);
  const admin = localStorage.getItem("admin")
    ? [JSON.parse(localStorage.getItem("admin"))]
    : [];
  const text = admin.length > 0 || user.curentUser ? true : false;
  return (
    <div className="app">
      {!text && (
        <Routes>
          <Route path="/" element={<Login />} />
        </Routes>
      )}
      {text && (
        <>
          <div className="navbar">
            <TopBar />
            <SideBar />
          </div>
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/users" element={<UserList />} />
              <Route path="/user/:userId" element={<User />} />
              <Route path="/newuser" element={<NewUser />} />
              <Route path="/products" element={<ProductList />} />
              <Route path="/product/:productId" element={<Product />} />
              <Route path="/newproduct" element={<NewProduct />} />
            </Routes>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
