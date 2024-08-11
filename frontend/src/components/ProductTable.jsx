import React, { useState, useEffect } from "react";
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { Link } from "react-router-dom";
import axios from "axios";

const ProductTable = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

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
            sortBy: "name",
            direction: "asc",
          },
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxIiwic2NvcGUiOiJBRE1JTiIsImlzcyI6ImFiYy5jb20iLCJ1YXYiOjk0MDc5MzAxLCJleHAiOjE3MjMzODk3MzMsImlhdCI6MTcyMzM4NjEzMywiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20ifQ.t37ctL0mM9SsCR7iXapkNzoQ8NhbaOQlobx67SbR5gIKIXixFFFhh-2VNC-6j-GGox7-R6b5VI2xKnuSpJb6Dg`,
          },
        }
      );
      const result = response.data.result.data;
      console.log(result);

      const totalPage = response.data.result.pagination.totalPages;
      setProducts(result);
      setTotalPages(totalPage);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        `http://117.103.207.132:8080/furni-shop/categories/category`,
        {
          params: {
            page: 1,
            pageSize: 100, // Đặt kích thước lớn để lấy hết các danh mục
            sortBy: "categoryId",
            direction: "asc",
          },
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxIiwic2NvcGUiOiJBRE1JTiIsImlzcyI6ImFiYy5jb20iLCJ1YXYiOjk0MDc5MzAxLCJleHAiOjE3MjMzODk3MzMsImlhdCI6MTcyMzM4NjEzMywiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20ifQ.t37ctL0mM9SsCR7iXapkNzoQ8NhbaOQlobx67SbR5gIKIXixFFFhh-2VNC-6j-GGox7-R6b5VI2xKnuSpJb6Dg`,
          },
        }
      );
      setCategories(response.data.result.data);
      console.log(categories);
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
    console.log(productId);

    try {
      await axios.delete(
        `http://117.103.207.132:8080/furni-shop/admin/products/${productId}`,
        {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxIiwic2NvcGUiOiJBRE1JTiIsImlzcyI6ImFiYy5jb20iLCJ1YXYiOjk0MDc5MzAxLCJleHAiOjE3MjMzODk3MzMsImlhdCI6MTcyMzM4NjEzMywiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20ifQ.t37ctL0mM9SsCR7iXapkNzoQ8NhbaOQlobx67SbR5gIKIXixFFFhh-2VNC-6j-GGox7-R6b5VI2xKnuSpJb6Dg`,
          },
        }
      );
      // Xóa sản phẩm khỏi state sau khi xóa thành công
      setProducts(
        products.filter((product) => product.productId !== productId)
      );
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-5 border-solid border-[#d5d5d5]">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-white">
          <tr className="border-b">
            <th scope="col" className="px-6 py-3">
              Image
            </th>
            <th scope="col" className="px-6 py-3">
              Product name
            </th>
            <th scope="col" className="px-6 py-3">
              Category
            </th>
            <th scope="col" className="px-6 py-3">
              Price
            </th>
            <th scope="col" className="px-6 py-3">
              Sold Count
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr
              className="bg-white border-b text-black text-sm"
              key={product.productId}
            >
              <td className="px-6 py-4">
                {product.productImages && product.productImages.length > 0 ? (
                  <img
                    src={product.productImages[0]}
                    alt={product.name}
                    className="w-[40px] h-[40px] ml-[20px]"
                  />
                ) : (
                  <div className="w-[40px] h-[40px] ml-[20px] bg-gray-300 flex items-center justify-center">
                    No Image
                  </div>
                )}
              </td>
              <td
                scope="row"
                className="px-6 py-4 font-medium text-black whitespace-nowrap dark:text-black"
              >
                {product.name}
              </td>
              <td className="px-6 py-4">
                {getCategoryName(product.categoryId)}
              </td>
              <td className="px-6 py-4">
                {`${product.minPrice.toLocaleString(
                  "vi-VN"
                )}đ - ${product.maxPrice.toLocaleString("vi-VN")}đ`}
              </td>
              <td className="px-6 py-4">{product.soldCount}</td>
              <td className="px-6 py-4 flex">
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
          ))}
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
