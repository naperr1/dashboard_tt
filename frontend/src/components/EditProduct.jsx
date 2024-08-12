import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditProduct = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: "",
    description: "",
    categoryId: "",
  });
  const [categories, setCategories] = useState([]);
  const accessToken = localStorage.getItem("accessToken");
  const token = `Bearer ${accessToken}`;

  useEffect(() => {
    // Fetch thông tin sản phẩm
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://117.103.207.132:8080/furni-shop/admin/products/${productId}`,
          {
            headers: {
              Authorization: token,
            },
          }
        );
        setProduct({
          name: response.data.result.name,
          description: response.data.result.description,
          categoryId: response.data.result.categoryId,
        });
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    // Fetch danh sách categories
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

    fetchProduct();
    fetchCategories();
  }, [productId, token]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://117.103.207.132:8080/furni-shop/admin/products/${productId}`,
        product,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      navigate(`/product`);
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return (
    <div className="mt-[32px]">
      <div>
        <h1 className="font-bold text-2xl">Edit Product</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Product Name</label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Description</label>
          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
            rows="4"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Category</label>
          <select
            name="categoryId"
            value={product.categoryId}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
            required
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category.categoryId} value={category.categoryId}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Update Product
        </button>
      </form>
    </div>
  );
};

export default EditProduct;
