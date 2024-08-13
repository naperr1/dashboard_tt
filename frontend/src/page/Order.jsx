import React from "react";
import { CiSearch } from "react-icons/ci";
import { CiFilter } from "react-icons/ci";
import { IoIosArrowDown } from "react-icons/io";
import ProductTable from "../components/ProductTable";
import OrderTable from "../components/OrderTable";

const Order = () => {
  return (
    <div className="mt-[64px] p-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="font-bold text-2xl">Order Lists</h1>
        </div>
      </div>
      <OrderTable />
    </div>
  );
};

export default Order;
