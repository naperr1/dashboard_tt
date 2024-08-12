import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const ProductImage = () => {
  const [productImages, setProductImages] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const { productImageId } = useParams();
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("accessToken");
  const token = `Bearer ${accessToken}`;

  useEffect(() => {
    const fetchProductImages = async () => {
      try {
        const response = await axios.get(
          `http://117.103.207.132:8080/furni-shop/admin/products/productImages/${productImageId}`,
          {
            headers: {
              Authorization: token,
            },
          }
        );

        if (response.data.code === 1000) {
          setProductImages(response.data.result.images);
        } else {
          console.error("Failed to fetch product images");
        }
      } catch (error) {
        console.error("Error fetching product images:", error);
      }
    };

    fetchProductImages();
  }, [productImageId, token]);

  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);
    setSelectedImages([...selectedImages, ...files]);
  };

  const handleImageUpload = async () => {
    if (selectedImages.length === 0) return;

    const formData = new FormData();
    selectedImages.forEach((file) => formData.append("images", file));

    try {
      await axios.post(
        `http://117.103.207.132:8080/furni-shop/admin/products/upload-image?productId=${productImageId}`,
        formData,
        {
          headers: {
            Authorization: token,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const response = await axios.get(
        `http://117.103.207.132:8080/furni-shop/admin/products/productImages/${productImageId}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      toast.success("Uploaded product images");
      navigate("/product");
      setProductImages(response.data.result);
      setSelectedImages([]);
    } catch (error) {
      toast.error("Error uploading images");
      console.error("Error uploading images:", error);
    }
  };

  const handleRemoveSelectedImage = (index) => {
    setSelectedImages(selectedImages.filter((_, i) => i !== index));
  };

  return (
    <div className="mt-[32px]">
      <div>
        <h1 className="font-bold text-2xl">Product Image</h1>
      </div>
      <div className="grid grid-cols-4 gap-4 mt-5">
        {productImages.length > 0 ? (
          productImages.map((image, index) => (
            <div key={index} className="relative">
              <img
                src={image}
                alt={`Product Image ${index + 1}`}
                className="object-cover h-32 w-full"
              />
            </div>
          ))
        ) : (
          <div className="col-span-4 text-center text-gray-500">No Image</div>
        )}
      </div>
      <div className="mt-5">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50"
          multiple
        />
      </div>
      {selectedImages.length > 0 && (
        <div className="mt-5">
          <h2 className="font-bold text-xl mb-3">Selected Images</h2>
          <div className="grid grid-cols-4 gap-4">
            {selectedImages.map((file, index) => (
              <div key={index} className="relative">
                <img
                  src={URL.createObjectURL(file)}
                  alt={`Selected Image ${index + 1}`}
                  className="object-cover h-32 w-full"
                />
                <button
                  onClick={() => handleRemoveSelectedImage(index)}
                  className="absolute top-0 right-0 bg-red-500 text-white px-2 py-1 text-xs rounded"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
      {selectedImages.length > 0 && (
        <button
          onClick={handleImageUpload}
          className="mt-5 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Save
        </button>
      )}
    </div>
  );
};

export default ProductImage;
