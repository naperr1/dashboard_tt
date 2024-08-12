import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const EditUser = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("accessToken");

  const [user, setUser] = useState({
    email: "",
    phoneNumber: "",
    firstName: "",
    lastName: "",
    role: "",
    avatarUrl: "",
    isActive: "",
  });

  const token = `Bearer ${accessToken}`;

  useEffect(() => {
    axios
      .get(`http://117.103.207.132:8080/furni-shop/admin/users/${userId}`, {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        if (response.data.code === 1000) {
          setUser(response.data.result);
        } else {
          toast.error("Lỗi khi lấy dữ liệu người dùng");
        }
      })
      .catch((error) => {
        toast.error("Lỗi khi gọi API");
        console.error("Lỗi khi gọi API", error);
      });
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://117.103.207.132:8080/furni-shop/admin/users/${userId}`,
        {
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
          phoneNumber: user.phoneNumber,
          avatarUrl: user.avatarUrl,
          isActive: user.isActive,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      if (response.data.code === 1000) {
        toast.success("User updated successfully");
        navigate(`/user`);
      } else {
        toast.error("Error updating user");
      }
    } catch (error) {
      console.error("Error updating user", error);
      toast.error("Error updating user");
    }
  };

  return (
    <div className="mt-[32px]">
      <div>
        <h1 className="font-bold text-2xl">Edit User</h1>
      </div>
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={user.email}
              onChange={handleChange}
              disabled
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div>
            <label
              htmlFor="phoneNumber"
              className="block text-sm font-medium text-gray-700"
            >
              Phone Number
            </label>
            <input
              type="text"
              name="phoneNumber"
              id="phoneNumber"
              value={user.phoneNumber}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div>
            <label
              htmlFor="firstName"
              className="block text-sm font-medium text-gray-700"
            >
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              id="firstName"
              value={user.firstName}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div>
            <label
              htmlFor="lastName"
              className="block text-sm font-medium text-gray-700"
            >
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              id="lastName"
              value={user.lastName}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div>
            <label
              htmlFor="role"
              className="block text-sm font-medium text-gray-700"
            >
              Role
            </label>
            <input
              type="text"
              name="role"
              id="role"
              value={user.role}
              onChange={handleChange}
              disabled
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100"
            />
          </div>
          <div>
            <label
              htmlFor="avatarUrl"
              className="block text-sm font-medium text-gray-700"
            >
              Avatar URL
            </label>
            <input
              type="text"
              name="avatarUrl"
              id="avatarUrl"
              value={user.avatarUrl}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div>
            <label
              htmlFor="isActive"
              className="block text-sm font-medium text-gray-700"
            >
              Status
            </label>
            <select
              name="isActive"
              id="isActive"
              value={user.isActive}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            >
              <option value="ACTIVE">Active</option>
              <option value="INACTIVE">Inactive</option>
            </select>
          </div>
        </div>
        <button
          type="submit"
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Update User
        </button>
      </form>
    </div>
  );
};

export default EditUser;
