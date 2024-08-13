import React from "react";
import { CiSearch } from "react-icons/ci";
import { CiFilter } from "react-icons/ci";
import { IoIosArrowDown } from "react-icons/io";
import ProductTable from "../components/ProductTable";
import { Link } from "react-router-dom";

const Product = () => {
  return (
    <div className="mt-[64px] p-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="font-bold text-2xl">Product</h1>
        </div>
        <div class="flex items-center space-x-4 ">
          <Link
            to={"/product/add_new_product"}
            class="bg-blue-500 text-white py-[5px] rounded-md hover:bg-blue-600 px-3"
          >
            Add New Product
          </Link>
        </div>
      </div>
      <ProductTable />
    </div>
  );
};

export default Product;
