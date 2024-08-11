import "./App.css";
import Header from "./components/Header";
import SideBar from "./components/SideBar";
import Dashboard from "./page/Dashboard";
import Home from "./page/Home";
import { Routes, Route, Link } from "react-router-dom";
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

function App() {
  return (
    <>
      <Header />
      <SideBar />
      <div class="p-4 sm:ml-64 mt-[32px]">
        <Routes>
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
