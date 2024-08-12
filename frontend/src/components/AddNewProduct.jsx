import React, { useState, useEffect } from "react";
import axios from "axios";

const AddNewProduct = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");

  const accessToken = localStorage.getItem("accessToken");
  const token = `Bearer ${accessToken}`;

  useEffect(() => {
    // Fetch categories from the API with authorization header
    axios
      .get(
        "http://117.103.207.132:8080/furni-shop/categories/category?page=1&pageSize=100&sortBy=categoryId&direction=asc",
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((response) => {
        if (response.data.code === 1000) {
          const categoriesList = response.data.result.data.flatMap(
            (category) => [
              { categoryId: category.categoryId, name: category.name },
              ...category.subCategoriesInfo.map((subCategory) => ({
                categoryId: subCategory.categoryId,
                name: subCategory.name,
              })),
            ]
          );
          setCategories(categoriesList);
        }
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, [token]);

  const handleAddProduct = () => {
    const requestBody = {
      name: productName,
      description: productDescription,
      categoryId: selectedCategory,
    };

    axios
      .post(
        "http://117.103.207.132:8080/furni-shop/admin/products/addNewProduct",
        requestBody,
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((response) => {
        console.log("Product added successfully:", response.data);
        // Thêm thông báo hoặc xử lý sau khi thêm sản phẩm thành công
      })
      .catch((error) => {
        console.error("Error adding product:", error);
      });
  };

  return (
    <div className="mt-[32px]">
      <div>
        <h1 className="font-bold text-2xl">Add New Product</h1>
      </div>
      <div className="mt-[16px]">
        <label className="block text-sm font-medium">Product Name</label>
        <input
          type="text"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          className="mt-1 block w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <div className="mt-[16px]">
        <label className="block text-sm font-medium">Product Description</label>
        <textarea
          value={productDescription}
          onChange={(e) => setProductDescription(e.target.value)}
          className="mt-1 block w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <div className="mt-[16px]">
        <label className="block text-sm font-medium">Category</label>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="mt-1 block w-full p-2 border border-gray-300 rounded"
        >
          <option value="" disabled>
            Select a category
          </option>
          {categories.map((category) => (
            <option key={category.categoryId} value={category.categoryId}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <div className="mt-[32px]">
        <button
          onClick={handleAddProduct}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Product
        </button>
      </div>
    </div>
  );
};

export default AddNewProduct;
