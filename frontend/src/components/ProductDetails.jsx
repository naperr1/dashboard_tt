import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { toast } from "react-toastify";

const ProductDetails = () => {
  const { productDetailsId } = useParams();
  const [productDetails, setProductDetails] = useState([]);
  const accessToken = localStorage.getItem("accessToken");
  const token = `Bearer ${accessToken}`;
  localStorage.setItem("productDetails", productDetailsId);

  useEffect(() => {
    fetchProductDetails();
  }, []);

  const fetchProductDetails = async () => {
    try {
      const response = await axios.get(
        `http://117.103.207.132:8080/furni-shop/admin/productDetails/${productDetailsId}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      if (response.data.code === 1000) {
        setProductDetails(response.data.result);
      } else {
        console.error("Failed to fetch product details");
      }
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  };

  const handleDelete = async (productDetailId) => {
    const accessToken = localStorage.getItem("accessToken");
    const token = `Bearer ${accessToken}`;

    try {
      const response = await axios.delete(
        `http://117.103.207.132:8080/furni-shop/admin/productDetails/${productDetailId}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      if (response.data.code === 1000) {
        setProductDetails(
          productDetails.filter(
            (detail) => detail.productDetailId !== productDetailId
          )
        );
        toast.success("Delete product details successfully");
      } else {
        toast.error("Failed to delete product details");
        console.error("Failed to delete product detail");
      }
    } catch (error) {
      toast.error("Failed to delete product details");
      console.error("Error deleting product detail:", error);
    }
  };

  return (
    <div className="mt-[64px] p-8">
      <div className="flex justify-between">
        <div>
          <h1 className="font-bold text-2xl">Product Details</h1>
        </div>
        <div class="flex items-center space-x-4">
          <Link
            to="/product/productDetails/add"
            class="bg-blue-500 text-white py-[5px] rounded-full hover:bg-blue-600 px-3"
          >
            Add New Product Details
          </Link>
        </div>
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-5 border-solid border-[#d5d5d5]">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-white">
            <tr className="border-b">
              <th scope="col" className="px-6 py-3">
                Product Detail ID
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                Quantity
              </th>
              <th scope="col" className="px-6 py-3">
                Size
              </th>
              <th scope="col" className="px-6 py-3">
                Color
              </th>
              <th scope="col" className="px-6 py-3">
                Material
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {productDetails.map((detail) => (
              <tr
                className="bg-white border-b text-black text-sm h-[50px]"
                key={detail.productDetailId}
              >
                <td className="px-6 py-4">{detail.productDetailId}</td>
                <td className="px-6 py-4">
                  {detail.price.toLocaleString("vi-VN")}đ
                </td>
                <td className="px-6 py-4">{detail.quantity}</td>
                <td className="px-6 py-4">{detail.sizeName}</td>
                <td className="px-6 py-4">{detail.colorName}</td>
                <td className="px-6 py-4">{detail.materialName}</td>
                <td className="px-6 py-4 flex">
                  <Link
                    to={`/product/productDetails/edit/${detail.productDetailId}`}
                    className="font-medium pr-[20px] text-lg hover:text-blue-500"
                  >
                    <FaRegEdit />
                  </Link>
                  <button
                    className="font-medium text-lg hover:text-red-500"
                    onClick={() => handleDelete(detail.productDetailId)}
                  >
                    <FaRegTrashAlt />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductDetails;
