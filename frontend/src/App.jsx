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
import OrderDetails from "./components/OrderDetails";
import ProductDetails from "./components/ProductDetails";
import ProductDetailsEdit from "./components/ProductDetailsEdit";
import AddProductDetails from "./components/AddProductDetails";
import ProductImage from "./components/ProductImage";
import AddNewProduct from "./components/AddNewProduct";
import UserInfo from "./components/UserInfo";

function App() {
  const location = useLocation();
  const noSideBarPaths = ["/login", "/register", "/forgotpass"]; // Các đường dẫn không cần SideBar
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === "/login") {
      localStorage.clear(); // Xóa toàn bộ localStorage
    }
  }, [location.pathname]);

  useEffect(() => {
    navigate("/login");
  }, []);

  return (
    <>
      {!noSideBarPaths.includes(location.pathname) && <SideBar />}
      {!noSideBarPaths.includes(location.pathname) && <Header />}
      <div
        className={`${
          !noSideBarPaths.includes(location.pathname)
            ? "sm:ml-64 mt-[64px]"
            : ""
        }`}
      >
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgotpass" element={<ForgotPW />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="/product" element={<Product />} />
          <Route path="/product/:productId" element={<EditProduct />} />
          <Route
            path="/product/productDetails/:productDetailsId"
            element={<ProductDetails />}
          />
          <Route
            path="/product/productDetails/edit/:productDetailsId"
            element={<ProductDetailsEdit />}
          />
          <Route
            path="/product/productDetails/add"
            element={<AddProductDetails />}
          />
          <Route path="/product/add_new_product" element={<AddNewProduct />} />
          <Route
            path="/product/productImage/:productImageId"
            element={<ProductImage />}
          />
          <Route path="/user" element={<User />} />
          <Route path="/user/info" element={<UserInfo />} />
          <Route path="/user/:userId" element={<EditUser />} />
          <Route path="/user/newuser" element={<PostNewUser />} />
          <Route path="/order" element={<Order />} />
          <Route path="/order/:orderId" element={<OrderDetails />} />
          <Route path="/category" element={<Category />} />
          <Route path="/voucher" element={<Voucher />} />
        </Routes>
      </div>
      <ToastContainer />
    </>
  );
}

export default App;

// import { useEffect } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { Routes, Route } from "react-router-dom";
// import Header from "./components/Header";
// import SideBar from "./components/SideBar";
// import Dashboard from "./page/Dashboard";
// import Home from "./page/Home";
// import Product from "./page/Product";
// import User from "./page/User";
// import Order from "./page/Order";
// import Category from "./page/Category";
// import Voucher from "./page/Voucher";
// import EditProduct from "./components/EditProduct";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import EditUser from "./components/EditUser";
// import PostNewUser from "./components/PostNewUser";
// import Login from "./page/Login";
// import Register from "./page/Register";
// import ForgotPW from "./page/ForgotPW";
// import OrderDetails from "./components/OrderDetails";
// import ProductDetails from "./components/ProductDetails";
// import ProductDetailsEdit from "./components/ProductDetailsEdit";
// import AddProductDetails from "./components/AddProductDetails";
// import ProductImage from "./components/ProductImage";
// import AddNewProduct from "./components/AddNewProduct";

// function App() {
//   const location = useLocation();
//   const noSideBarPaths = ["/login", "/register", "/forgotpass"]; // Các đường dẫn không cần SideBar
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (location.pathname === "/login") {
//       localStorage.clear(); // Xóa toàn bộ localStorage
//     }
//   }, [location.pathname]);

//   useEffect(() => {
//     navigate("/login");
//   }, []);

//   return (
//     <>
//       {/* <Header /> */}
//       {/* Chỉ hiển thị SideBar nếu không nằm trong các đường dẫn được liệt kê */}
//       {!noSideBarPaths.includes(location.pathname) && <SideBar /> && <Header />}
//       <div
//         className={`p ${
//           !noSideBarPaths.includes(location.pathname)
//             ? "sm:ml-64 mt-[32px]"
//             : ""
//         }`}
//       >
//         <Routes>
//           <Route path="/login" element={<Login />} />
//           <Route path="/register" element={<Register />} />
//           <Route path="/forgotpass" element={<ForgotPW />} />
//           <Route path="/" element={<Dashboard />} />
//           <Route path="/product" element={<Product />} />
//           <Route path="/product/:productId" element={<EditProduct />} />
//           <Route
//             path="/product/productDetails/:productDetailsId"
//             element={<ProductDetails />}
//           />
//           <Route
//             path="/product/productDetails/edit/:productDetailsId"
//             element={<ProductDetailsEdit />}
//           />
//           <Route
//             path="/product/productDetails/add"
//             element={<AddProductDetails />}
//           />
//           <Route path="/product/add_new_product" element={<AddNewProduct />} />
//           <Route
//             path="/product/productImage/:productImageId"
//             element={<ProductImage />}
//           />
//           <Route path="/user" element={<User />} />
//           <Route path="/user/:userId" element={<EditUser />} />
//           <Route path="/user/newuser" element={<PostNewUser />} />
//           <Route path="/order" element={<Order />} />
//           <Route path="/order/:orderId" element={<OrderDetails />} />
//           <Route path="/category" element={<Category />} />
//           <Route path="/voucher" element={<Voucher />} />
//         </Routes>
//       </div>
//       <ToastContainer />
//     </>
//   );
// }

// export default App;
