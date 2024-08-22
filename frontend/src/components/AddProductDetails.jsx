import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AddProductDetails = () => {
  const productDetails = localStorage.getItem("productDetails");
  const [sizes, setSizes] = useState([]);
  const [colors, setColors] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [formValues, setFormValues] = useState({
    price: 0,
    quantity: 0,
    productId: productDetails,
    sizeId: "",
    colorId: "",
    materialId: "",
  });
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("accessToken");
  const token = `Bearer ${accessToken}`;

  useEffect(() => {
    fetchOptions();
  }, []);

  const fetchOptions = async () => {
    try {
      const sizeResponse = await axios.get(
        "http://117.103.207.132:8080/furni-shop/categories/size",
        {
          headers: {
            Authorization: token,
          },
        }
      );
      const colorResponse = await axios.get(
        "http://117.103.207.132:8080/furni-shop/categories/color",
        {
          headers: {
            Authorization: token,
          },
        }
      );
      const materialResponse = await axios.get(
        "http://117.103.207.132:8080/furni-shop/categories/material",
        {
          headers: {
            Authorization: token,
          },
        }
      );

      if (sizeResponse.data.code === 1000) {
        setSizes(sizeResponse.data.result.data);
      }
      if (colorResponse.data.code === 1000) {
        setColors(colorResponse.data.result.data);
      }
      if (materialResponse.data.code === 1000) {
        setMaterials(materialResponse.data.result.data);
      }
    } catch (error) {
      console.error("Error fetching options:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://117.103.207.132:8080/furni-shop/admin/productDetails/addNewProductDetail",
        formValues,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      if (response.data.code === 1000) {
        toast.success("Product detail added successfully!");
        navigate(`/product/productDetails/${productDetails}`);
      } else {
        toast.error("Failed to add product detail.");
      }
    } catch (error) {
      console.error("Error adding product detail:", error);
      toast.error("Error adding product detail.");
    }
  };

  return (
    <div className="mt-[64px] p-8">
      <div>
        <h1 className="font-bold text-2xl">Add New Product Detail</h1>
      </div>
      <form onSubmit={handleSubmit} className="mt-5">
        <div className="mb-4">
          <label className="block text-gray-700">Price</label>
          <input
            type="number"
            name="price"
            value={formValues.price}
            onChange={handleChange}
            className="border border-gray-300 rounded px-3 py-2 w-full"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Quantity</label>
          <input
            type="number"
            name="quantity"
            value={formValues.quantity}
            onChange={handleChange}
            className="border border-gray-300 rounded px-3 py-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Product ID</label>
          <input
            type="number"
            name="productId"
            value={productDetails}
            disabled
            className="border border-gray-300 rounded px-3 py-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Size</label>
          <select
            name="sizeId"
            value={formValues.sizeId}
            onChange={handleChange}
            className="border border-gray-300 rounded px-3 py-2 w-full"
            required
          >
            <option value="">Select Size</option>
            {sizes.map((size) => (
              <option key={size.sizeId} value={size.sizeId}>
                {size.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Color</label>
          <select
            name="colorId"
            value={formValues.colorId}
            onChange={handleChange}
            className="border border-gray-300 rounded px-3 py-2 w-full"
            required
          >
            <option value="">Select Color</option>
            {colors.map((color) => (
              <option key={color.colorId} value={color.colorId}>
                {color.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Material</label>
          <select
            name="materialId"
            value={formValues.materialId}
            onChange={handleChange}
            className="border border-gray-300 rounded px-3 py-2 w-full"
            required
          >
            <option value="">Select Material</option>
            {materials.map((material) => (
              <option key={material.materialId} value={material.materialId}>
                {material.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Add Product Detail
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProductDetails;
