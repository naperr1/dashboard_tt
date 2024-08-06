import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { AiFillProduct } from "react-icons/ai";
import { FaRegUser } from "react-icons/fa";
import { IoMdReorder } from "react-icons/io";
import { MdCategory } from "react-icons/md";
import { IoTicketOutline } from "react-icons/io5";

const SideBar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
  return (
    <>
      <nav class="fixed top-0 z-50 w-full bg-white border-b border-gray-200">
        <div class="px-3 py-3 lg:px-5 lg:pl-3">
          <div class="flex items-center justify-between">
            <div class="flex items-center justify-start rtl:justify-end">
              <a href="/" class="flex ms-2 md:me-24">
                <img
                  src="https://flowbite.com/docs/images/logo.svg"
                  class="h-8 me-3"
                  alt="FlowBite Logo"
                />
                <span class="self-center text-xl font-semibold sm:text-2xl text-black">
                  CozyⓇ
                </span>
              </a>
            </div>
            <div className="flex items-center">
              <div className="flex items-center ms-3">
                <div>
                  <button
                    type="button"
                    className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300"
                    aria-expanded={dropdownOpen}
                    onClick={toggleDropdown}
                  >
                    <img
                      className="w-8 h-8 rounded-full"
                      src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                      alt="user photo"
                    />
                  </button>
                </div>
                {dropdownOpen && (
                  <div
                    className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-2xl top-[50px] px-3"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="user-menu"
                  >
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                    >
                      Thông tin tài khoản
                    </a>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                    >
                      Đăng xuất
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

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
