import React from "react";
import { Link } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { AiFillProduct } from "react-icons/ai";
import { FaRegUser } from "react-icons/fa";
import { IoMdReorder } from "react-icons/io";
import { MdCategory } from "react-icons/md";
import { IoTicketOutline } from "react-icons/io5";
import Header from "./Header";

const SideBar = () => {
  return (
    <>
      <Header />
      <aside
        id="logo-sidebar"
        class="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div class="h-full px-3 pb-4 overflow-y-auto bg-white">
          <ul class="space-y-2 font-medium">
            <li>
              <Link
                to="/"
                class="group flex items-center rounded-lg p-2 text-black hover:bg-gray-200"
              >
                <MdDashboard className="h-5 w-5 text-gray-500 transition duration-75 group-hover:text-black" />
                <span class="ms-3">Dashboard</span>
              </Link>
            </li>
            <li>
              <Link
                to="/product"
                class="group flex items-center rounded-lg p-2 text-black hover:bg-gray-200"
              >
                <AiFillProduct className="h-5 w-5 flex-shrink-0 text-gray-500 transition duration-75 group-hover:text-black" />
                <span class="ms-3 flex-1 whitespace-nowrap">Product</span>
              </Link>
            </li>
            <li>
              <Link
                to="user"
                class="group flex items-center rounded-lg p-2 text-black hover:bg-gray-200"
              >
                <FaRegUser className="h-5 w-5 flex-shrink-0 text-gray-500 transition duration-75 group-hover:text-black" />
                <span class="ms-3 flex-1 whitespace-nowrap">User</span>
              </Link>
            </li>
            <li>
              <Link
                to="/order"
                class="group flex items-center rounded-lg p-2 text-black hover:bg-gray-200"
              >
                <IoMdReorder className="h-5 w-5 flex-shrink-0 text-gray-500 transition duration-75 group-hover:text-black" />
                <span class="ms-3 flex-1 whitespace-nowrap">Order</span>
              </Link>
            </li>
            <li>
              <Link
                to="/category"
                class="group flex items-center rounded-lg p-2 text-black hover:bg-gray-200"
              >
                <MdCategory className="h-5 w-5 flex-shrink-0 text-gray-500 transition duration-75 group-hover:text-black" />
                <span class="ms-3 flex-1 whitespace-nowrap">Category</span>
              </Link>
            </li>
            <li>
              <Link
                to="/voucher"
                class="group flex items-center rounded-lg p-2 text-black hover:bg-gray-200"
              >
                <IoTicketOutline className="h-5 w-5 flex-shrink-0 text-gray-500 transition duration-75 group-hover:text-black" />
                <span class="ms-3 flex-1 whitespace-nowrap">Voucher</span>
              </Link>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
};

export default SideBar;
