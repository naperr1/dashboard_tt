import "./App.css";
import Header from "./components/Header";
import SideBar from "./components/SideBar";
import Dashboard from "./page/Dashboard";
import Home from "./page/Home";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Product from "./page/Product";
import User from "./page/User";
import Order from "./page/Order";
import Category from "./page/Category";
import Voucher from "./page/Voucher";
import EditProduct from "./components/EditProduct";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EditUser from "./components/EditUser";
import PostNewUser from "./components/PostNewUser";
import Login from "./page/Login";
import Register from "./page/Register";
import ForgotPW from "./page/ForgotPW";
import { useEffect } from "react";

function App() {
  const location = useLocation();
  const noSideBarPaths = ["/login", "/register", "/forgotpass"]; // Các đường dẫn không cần SideBar
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/login");
  }, []);

  return (
    <>
      <Header />
      {/* Chỉ hiển thị SideBar nếu không nằm trong các đường dẫn được liệt kê */}
      {!noSideBarPaths.includes(location.pathname) && <SideBar />}
      <div
        className={`p-4 ${
          !noSideBarPaths.includes(location.pathname)
            ? "sm:ml-64 mt-[32px]"
            : ""
        }`}
      >
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgotpass" element={<ForgotPW />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="/product" element={<Product />} />
          <Route path="/product/:id" element={<EditProduct />} />
          <Route path="/user" element={<User />} />
          <Route path="/user/:userId" element={<EditUser />} />
          <Route path="/user/newuser" element={<PostNewUser />} />
          <Route path="/order" element={<Order />} />
          <Route path="/category" element={<Category />} />
          <Route path="/voucher" element={<Voucher />} />
        </Routes>
      </div>
      <ToastContainer />
    </>
  );
}

export default App;
