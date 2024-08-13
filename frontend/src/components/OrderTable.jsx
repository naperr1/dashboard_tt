import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaRegEdit } from "react-icons/fa";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { Link } from "react-router-dom";
import OrderStatistics from "./OrderStatistics";
import { toast } from "react-toastify";
import { FaSort } from "react-icons/fa";

const OrderTable = () => {
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortBy, setSortBy] = useState("orderId");
  const [direction, setDirection] = useState("asc");
  const accessToken = localStorage.getItem("accessToken");
  const token = `Bearer ${accessToken}`;

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          `http://117.103.207.132:8080/furni-shop/admin/orders/allOrders?page=${page}&pageSize=5&sortBy=${sortBy}&direction=${direction}`,
          {
            headers: {
              Authorization: token,
            },
          }
        );
        const data = response.data.result;
        setOrders(data.data);
        setTotalPages(data.pagination.totalPages);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, [page, sortBy, direction]);

  const handlePreviousPage = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNextPage = () => {
    if (page < totalPages) setPage(page + 1);
  };

  const handleChangeSort = (field) => {
    if (sortBy === field) {
      setDirection((prevDirection) =>
        prevDirection === "asc" ? "desc" : "asc"
      );
    } else {
      setSortBy(field);
      setDirection("asc");
    }
  };

  const handleChangeStatus = async (orderId, currentStatus) => {
    let newStatus;

    switch (currentStatus) {
      case "PENDING":
        newStatus = "CONFIRMED";
        break;
      case "CONFIRMED":
        newStatus = "DELIVERING";
        break;
      case "DELIVERING":
        newStatus = "COMPLETED";
        break;
      case "COMPLETED":
        newStatus = "PENDING";
        break;
      default:
        newStatus = "PENDING";
    }

    try {
      const res = await axios.put(
        `http://117.103.207.132:8080/furni-shop/admin/orders/change-status/${orderId}`,
        {
          status: newStatus,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      toast.success(res.data.result);

      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.orderId === orderId ? { ...order, status: newStatus } : order
        )
      );
    } catch (error) {
      toast.error("Error changing order status");
      console.error("Error changing order status:", error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "PENDING":
        return "bg-[#CCF0EB] text-[#00B69B]";
      case "CONFIRMED":
        return "bg-[#FDF0D5] text-[#F5A623]";
      case "DELIVERING":
        return "bg-[#F0E5FF] text-[#8A2BE2]";
      case "COMPLETED":
        return "bg-[#E6F7E9] text-[#28A745]";
      default:
        return "bg-[#CCF0EB] text-[#00B69B]";
    }
  };

  return (
    <div>
      <OrderStatistics />
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-5 border-solid border-[#d5d5d5]">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-white">
            <tr className="border-b">
              <th
                scope="col"
                className="px-6 py-3 cursor-pointer"
                onClick={() => handleChangeSort("orderId")}
              >
                <span className="flex item-center">
                  Image
                  <FaSort />
                </span>
              </th>
              <th
                scope="col"
                className="px-6 py-3 cursor-pointer"
                onClick={() => handleChangeSort("productName")}
              >
                <span className="flex items-center">
                  Product Name
                  <FaSort />
                </span>
              </th>
              <th
                scope="col"
                className="px-6 py-3 cursor-pointer"
                onClick={() => handleChangeSort("count")}
              >
                <span className="flex items-center">
                  Quantity
                  <FaSort />
                </span>
              </th>
              <th
                scope="col"
                className="px-6 py-3 cursor-pointer"
                onClick={() => handleChangeSort("totalMoney")}
              >
                <span className="flex items-center">
                  Total Money
                  <FaSort />
                </span>
              </th>
              <th
                scope="col"
                className="px-6 py-3 cursor-pointer"
                onClick={() => handleChangeSort("status")}
              >
                <span className="flex items-center">
                  Status
                  <FaSort />
                </span>
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr
                className="bg-white border-b text-black text-sm"
                key={order.orderId}
              >
                <th className="px-6 py-3">
                  <Link to={`/order/${order.orderId}`}>
                    <img
                      src={order.imageUrl}
                      alt={order.productName}
                      className="w-[40px] h-[40px] ml-[20px] object-contain"
                    />
                  </Link>
                </th>
                <td scope="row" className="px-6 py-4">
                  {order.productName}
                </td>
                <td className="px-6 py-4">{order.count}</td>
                <td className="px-6 py-4">
                  {order.totalMoney.toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}
                </td>
                <td className="px-6 py-4 flex">
                  <span
                    className={`font-medium pr-[20px] flex items-center px-4 py-2 rounded cursor-pointer ${getStatusColor(
                      order.status
                    )}`}
                    onClick={() =>
                      handleChangeStatus(order.orderId, order.status)
                    }
                  >
                    {order.status} <FaRegEdit className="ml-1" />
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex items-center space-x-2 justify-end mr-[50px] my-[10px]">
          <button
            className="rounded hover:bg-gray-300 focus:outline-none"
            onClick={handlePreviousPage}
            disabled={page === 1}
          >
            <MdKeyboardArrowLeft className="w-4 h-4" />
          </button>

          <span className="px-3 py-1 text-sm font-medium bg-white border rounded shadow">
            {page}
          </span>

          <button
            className="rounded hover:bg-gray-300 focus:outline-none"
            onClick={handleNextPage}
            disabled={page === totalPages}
          >
            <MdKeyboardArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderTable;
