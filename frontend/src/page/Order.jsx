import React from "react";
import { CiSearch } from "react-icons/ci";
import { CiFilter } from "react-icons/ci";
import { IoIosArrowDown } from "react-icons/io";
import ProductTable from "../components/ProductTable";
import OrderTable from "../components/OrderTable";

const Order = () => {
  return (
    <div className="mt-[32px]">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="font-bold text-2xl">Order Lists</h1>
        </div>
        {/* <div class="flex items-center space-x-4">
          <div class="relative">
            <input
              type="text"
              placeholder="Search product name"
              class="pl-[35px] pr-2.5 py-[5px] border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <CiSearch className="absolute left-3 top-2 h-5 w-5 text-gray-400" />
          </div>

          <div class="relative">
            <button class="flex items-center space-x-2 p-[5px] border rounded-full bg-white hover:bg-gray-100">
              <CiFilter className="h-5 w-5 text-gray-600" />
              <span>Filter By</span>
              <IoIosArrowDown className="h-4 w-4 text-gray-600" />
            </button>
          </div>

          <button class="bg-blue-500 text-white px-[5px] py-[5px] rounded-full hover:bg-blue-600">
            Add New Product
          </button>
        </div> */}
      </div>
      <OrderTable />
    </div>
  );
};

export default Order;
