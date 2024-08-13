import React from "react";
import UserTable from "../components/UserTable";
import { CiSearch } from "react-icons/ci";
import { CiFilter } from "react-icons/ci";
import { IoIosArrowDown } from "react-icons/io";
import ProductTable from "../components/ProductTable";
import { Link } from "react-router-dom";

const User = () => {
  return (
    <div className="mt-[64px] p-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="font-bold text-2xl">User Lists</h1>
        </div>
        <div class="flex items-center space-x-4">
          <button class="bg-blue-500 text-white px-[5px] py-[5px] rounded-md hover:bg-blue-600">
            <Link to="/user/newuser" className="px-3">
              Add New User
            </Link>
          </button>
        </div>
      </div>
      <UserTable />
    </div>
  );
};

export default User;
