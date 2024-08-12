import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Header = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const avatarUrl = localStorage.getItem("avatarUrl");
  const firstName = localStorage.getItem("firstName");
  const lastName = localStorage.getItem("lastName");
  const refreshToken = localStorage.getItem("refreshToken");
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = async () => {
    try {
      await axios.post("http://117.103.207.132:8080/furni-shop/auth/logout", {
        refreshToken,
      });

      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("avatarUrl");
      localStorage.removeItem("firstName");
      localStorage.removeItem("lastName");

      navigate("/login");
    } catch (error) {
      console.error("Error Logout", error);
    }
  };

  return (
    <div>
      <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start rtl:justify-end">
              <div className="flex ms-2 md:me-24">
                <img
                  src="https://flowbite.com/docs/images/logo.svg"
                  className="h-8 me-3"
                  alt="FlowBite Logo"
                />
                <span className="self-center text-xl font-semibold sm:text-2xl text-black">
                  CozyⓇ
                </span>
              </div>
            </div>
            <div className="flex items-center">
              <div className="flex items-center ms-3">
                {avatarUrl && firstName && lastName ? (
                  <div>
                    <button
                      type="button"
                      className="flex text-sm rounded-full focus:ring-4 focus:ring-gray-300 flex items-center"
                      aria-expanded={dropdownOpen}
                      onClick={toggleDropdown}
                    >
                      <img
                        className="w-8 h-8 rounded-full"
                        src={avatarUrl}
                        alt="user photo"
                      />
                      <h1 className="ml-2">
                        {firstName} {lastName}
                      </h1>
                    </button>
                  </div>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition duration-300"
                    >
                      Đăng nhập
                    </Link>
                    <Link
                      to="/register"
                      className="ml-4 bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-700 transition duration-300"
                    >
                      Đăng kí
                    </Link>
                  </>
                )}
                {dropdownOpen && (
                  <div
                    className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-2xl top-[50px] px-3"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="user-menu"
                  >
                    <Link
                      to="/info"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                    >
                      Thông tin tài khoản
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                    >
                      Đăng xuất
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
