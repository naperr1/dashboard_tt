import React, { useState, useEffect } from "react";
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { FaSort } from "react-icons/fa";
import Loading from "./Loading";

const ProductTable = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortBy, setSortBy] = useState("name");
  const [direction, setDirection] = useState("asc");

  const accessToken = localStorage.getItem("accessToken");
  const token = `Bearer ${accessToken}`;

  useEffect(() => {
    fetchProducts(page);
    fetchCategories();
  }, [page]);

  const fetchProducts = async (page) => {
    try {
      const response = await axios.get(
        `http://117.103.207.132:8080/furni-shop/admin/products`,
        {
          params: {
            page: page,
            pageSize: 5,
            sortBy: sortBy,
            direction: direction,
          },
          headers: {
            Authorization: token,
          },
        }
      );
      const result = response.data.result.data;
      const totalPage = response.data.result.pagination.totalPages;
      setProducts(result);
      setTotalPages(totalPage);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleSort = (column) => {
    const newDirection =
      sortBy === column && direction === "asc" ? "desc" : "asc";
    setSortBy(column);
    setDirection(newDirection);
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        `http://117.103.207.132:8080/furni-shop/categories/category`,
        {
          params: {
            page: 1,
            pageSize: 100,
            sortBy: "categoryId",
            direction: "asc",
          },
          headers: {
            Authorization: token,
          },
        }
      );
      setCategories(response.data.result.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const getCategoryName = (categoryId) => {
    const category = categories.find((cat) => cat.categoryId === categoryId);
    return category ? category.name : "Unknown";
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleDelete = async (productId) => {
    try {
      await axios.delete(
        `http://117.103.207.132:8080/furni-shop/admin/products/${productId}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setProducts(
        products.filter((product) => product.productId !== productId)
      );
      toast.success("Delete product successfully");
    } catch (error) {
      toast.error("Delete product details before deleting the product");
      console.error(
        "Delete product details before deleting the product: ",
        error
      );
    }
  };

  const toggleProductStatus = async (productId, enableStatus) => {
    try {
      const res = await axios.put(
        `http://117.103.207.132:8080/furni-shop/admin/products/disable/${productId}`,
        {},
        {
          headers: {
            Authorization: token,
          },
        }
      );
      toast.success(res.data.message);
      setProducts(
        products.map((product) =>
          product.productId === productId
            ? { ...product, enable: enableStatus === 1 ? 0 : 1 }
            : product
        )
      );
    } catch (error) {
      console.error("Error toggling product status:", error);
    }
  };

  useEffect(() => {
    fetchProducts(page);
  }, [page, sortBy, direction]);

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-5 border-solid border-[#d5d5d5]">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-white">
          <tr className="border-b">
            <th scope="col" className="px-6 py-3">
              Image
            </th>
            <th
              scope="col"
              className="px-6 py-3 cursor-pointer"
              onClick={() => handleSort("name")}
            >
              <span className="flex items-center">
                Product name
                <FaSort />
              </span>
            </th>
            <th scope="col" className="px-6 py-3">
              Category
            </th>
            <th
              scope="col"
              className="px-6 py-3 cursor-pointer"
              onClick={() => handleSort("minPrice")}
            >
              <span className="flex items-center">
                Price
                <FaSort />
              </span>
            </th>
            <th
              scope="col"
              className="px-6 py-3 cursor-pointer"
              onClick={() => handleSort("soldCount")}
            >
              <span className="flex items-center">
                Sold Count
                <FaSort />
              </span>
            </th>
            <th scope="col" className="px-6 py-3">
              Status
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>

        <tbody>
          {products.length === 0 ? (
            <Loading />
          ) : (
            products.map((product) => (
              <tr
                className="bg-white border-b text-black text-sm h-[50px]"
                key={product.productId}
              >
                <td className="px-6 py-4">
                  <Link to={`/product/productImage/${product.productId}`}>
                    {product.productImages &&
                    product.productImages.length > 0 ? (
                      <img
                        src={product.productImages[0]}
                        alt={product.name}
                        className="w-[50px] h-[50px] rounded"
                      />
                    ) : (
                      <div className="w-[50px] h-[50px] bg-gray-300 flex items-center justify-center text-center rounded">
                        No Image
                      </div>
                    )}
                  </Link>
                </td>
                <td
                  scope="row"
                  className="px-6 py-4 text-black whitespace-nowrap dark:text-black"
                >
                  <Link to={`/product/productDetails/${product.productId}`}>
                    {product.name}
                  </Link>
                </td>
                <td className="px-6 py-4">
                  {getCategoryName(product.categoryId)}
                </td>
                <td className="px-6 py-4">
                  {`${(product.minPrice ?? 0).toLocaleString("vi-VN")}đ - ${(
                    product.maxPrice ?? 0
                  ).toLocaleString("vi-VN")}đ`}
                </td>
                <td className="px-6 py-4">{product.soldCount}</td>
                <td
                  className={`px-6 py-4 cursor-pointer`}
                  onClick={() =>
                    toggleProductStatus(product.productId, product.enable)
                  }
                >
                  <div
                    className={`text-sm text-center p-[5px] rounded-[3px] ${
                      product.enable === 1 ? "bg-green-500" : "bg-red-500"
                    } text-white`}
                  >
                    {product.enable === 1 ? "Enable" : "Disable"}
                  </div>
                </td>
                <td className="px-6 py-4 flex my-[20px]">
                  <Link
                    to={`/product/${product.productId}`}
                    className="font-medium pr-[20px] text-lg hover:text-blue-500"
                  >
                    <FaRegEdit />
                  </Link>
                  <button
                    onClick={() => handleDelete(product.productId)}
                    className="font-medium text-lg hover:text-red-500"
                  >
                    <FaRegTrashAlt />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <div className="flex items-center space-x-2 justify-end mr-[50px] my-[10px]">
        <button
          onClick={handlePreviousPage}
          className="rounded hover:bg-gray-300 focus:outline-none"
          disabled={page === 1}
        >
          <MdKeyboardArrowLeft className="w-4 h-4" />
        </button>

        <span className="px-3 py-1 text-sm font-medium bg-white border rounded shadow">
          {page}
        </span>

        <button
          onClick={handleNextPage}
          className="rounded hover:bg-gray-300 focus:outline-none"
          disabled={page === totalPages}
        >
          <MdKeyboardArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default ProductTable;
