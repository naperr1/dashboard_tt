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

function App() {
  return (
    <>
      <Header />
      <SideBar />
      <div class="p-4 sm:ml-64 mt-[32px]">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/product" element={<Product />} />
          <Route path="/user" element={<User />} />
          <Route path="/order" element={<Order />} />
          <Route path="/category" element={<Category />} />
          <Route path="/voucher" element={<Voucher />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
