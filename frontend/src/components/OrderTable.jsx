import React from "react";
import { FaRegEdit } from "react-icons/fa";
import { FaRegTrashAlt } from "react-icons/fa";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";
import { Link } from "react-router-dom";

const OrderTable = () => {
  return (
    <div>
      <div class="relative overflow-x-auto shadow-md sm:rounded-lg mt-5 border-solid border-[#d5d5d5]">
        {/* <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-white">
            <tr className="border-b">
              <th scope="col" class="px-6 py-3">
                Image
              </th>
              <th scope="col" class="px-6 py-3">
                Product name
              </th>
              <th scope="col" class="px-6 py-3">
                Quantity
              </th>
              <th scope="col" class="px-6 py-3">
                Total Money
              </th>
              <th scope="col" class="px-6 py-3">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            <tr class="bg-white border-b text-black text-sm">
              <th>
                <img
                  src="https://th.bing.com/th/id/OIP.SIooUjgum48oZUgKAHTZpwHaHD?rs=1&pid=ImgDetMain"
                  alt=""
                  className="w-[40px] h-[40px] ml-[20px]"
                />
              </th>
              <th scope="row" class="px-6 py-4">
                Apple MacBook Pro 17
              </th>
              <td class="px-6 py-4">1</td>
              <td class="px-6 py-4">$2999</td>
              <td class="px-6 py-4 flex">
                <Link
                  to={"/order/detail"}
                  className={`font-medium pr-[20px flex items-center bg-[#CCF0EB] text-[#00B69B] px-4 py-2 rounded`}
                >
                  Pending <FaRegEdit className="ml-1" />
                </Link>
              </td>
            </tr>
          </tbody>
        </table> */}

        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-white">
            <tr className="border-b">
              <th scope="col" class="px-6 py-3">
                Image
              </th>
              <th scope="col" class="px-6 py-3">
                Product name
              </th>
              <th scope="col" class="px-6 py-3">
                Quantity
              </th>
              <th scope="col" class="px-6 py-3">
                Total Money
              </th>
              <th scope="col" class="px-6 py-3">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            <Link to={"/order/detail"} style={{ display: "contents" }}>
              <tr class="bg-white border-b text-black text-sm">
                <th class="px-6 py-3">
                  <img
                    src="https://th.bing.com/th/id/OIP.SIooUjgum48oZUgKAHTZpwHaHD?rs=1&pid=ImgDetMain"
                    alt=""
                    className="w-[40px] h-[40px] ml-[20px]"
                  />
                </th>
                <th scope="row" class="px-6 py-4">
                  Apple MacBook Pro 17
                </th>
                <td class="px-6 py-4">1</td>
                <td class="px-6 py-4">$2999</td>
                <td class="px-6 py-4 flex">
                  <Link to={"/order/edit"}>
                    <span
                      className={`font-medium pr-[20px] flex items-center bg-[#CCF0EB] text-[#00B69B] px-4 py-2 rounded`}
                    >
                      Pending <FaRegEdit className="ml-1" />
                    </span>
                  </Link>
                </td>
              </tr>
            </Link>
          </tbody>
        </table>

        <div class="flex items-center space-x-2 justify-end mr-[50px] my-[10px]">
          <button class=" rounded hover:bg-gray-300 focus:outline-none">
            <MdKeyboardArrowLeft className="w-4 h-4" />
          </button>

          <span class="px-3 py-1 text-sm font-medium bg-white border rounded shadow">
            1
          </span>

          <button class=" rounded hover:bg-gray-300 focus:outline-none">
            <MdKeyboardArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderTable;
