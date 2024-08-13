import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const ProductDetailsEdit = () => {
  const { productDetailsId } = useParams();
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [sizeOptions, setSizeOptions] = useState([]);
  const [colorOptions, setColorOptions] = useState([]);
  const [materialOptions, setMaterialOptions] = useState([]);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedMaterial, setSelectedMaterial] = useState(null);

  const accessToken = localStorage.getItem("accessToken");
  const token = `Bearer ${accessToken}`;
  const productId = localStorage.getItem("productDetails");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const [sizeRes, colorRes, materialRes] = await Promise.all([
          axios.get("http://117.103.207.132:8080/furni-shop/categories/size", {
            headers: {
              Authorization: token,
            },
          }),
          axios.get("http://117.103.207.132:8080/furni-shop/categories/color", {
            headers: {
              Authorization: token,
            },
          }),
          axios.get(
            "http://117.103.207.132:8080/furni-shop/categories/material",
            {
              headers: {
                Authorization: token,
              },
            }
          ),
        ]);
        setSizeOptions(sizeRes.data.result.data);
        setColorOptions(colorRes.data.result.data);
        setMaterialOptions(materialRes.data.result.data);
      } catch (error) {
        console.error("Error fetching options", error);
      }
    };
    fetchOptions();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const requestData = {
      price,
      quantity,
      productId,
      sizeId: selectedSize,
      colorId: selectedColor,
      materialId: selectedMaterial,
    };

    try {
      await axios.put(
        `http://117.103.207.132:8080/furni-shop/admin/productDetails/${productDetailsId}`,
        requestData,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      toast.success("Updated product details successfully");
      navigate(`/product/productDetails/${productId}`);
    } catch (error) {
      toast.error("Error while updating product details");
      console.error("Error updating product details", error);
    }
  };

  return (
    <div className="mt-[64px] p-8">
      <div>
        <h1 className="font-bold text-2xl">Product Details Edit</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Price</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="border rounded p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Quantity</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="border rounded p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Product ID</label>
          <input
            type="number"
            value={productId}
            disabled
            onChange={(e) => setProductId(e.target.value)}
            className="border rounded p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Size</label>
          <select
            value={selectedSize}
            onChange={(e) => setSelectedSize(e.target.value)}
            className="border rounded p-2 w-full"
          >
            <option value="">Select a size</option>
            {sizeOptions.map((option) => (
              <option key={option.sizeId} value={option.sizeId}>
                {option.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Color</label>
          <select
            value={selectedColor}
            onChange={(e) => setSelectedColor(e.target.value)}
            className="border rounded p-2 w-full"
          >
            <option value="">Select a color</option>
            {colorOptions.map((option) => (
              <option key={option.colorId} value={option.colorId}>
                {option.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Material</label>
          <select
            value={selectedMaterial}
            onChange={(e) => setSelectedMaterial(e.target.value)}
            className="border rounded p-2 w-full"
          >
            <option value="">Select a material</option>
            {materialOptions.map((option) => (
              <option key={option.materialId} value={option.materialId}>
                {option.name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default ProductDetailsEdit;
