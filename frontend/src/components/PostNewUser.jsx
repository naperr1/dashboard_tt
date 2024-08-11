import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom";

const PostNewUser = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
    phoneNumber: "",
    firstName: "",
    lastName: "",
    avatarUrl: "",
  });

  const navigate = useNavigate();

  const token = `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxIiwic2NvcGUiOiJBRE1JTiIsImlzcyI6ImFiYy5jb20iLCJ1YXYiOjk0MDc5MzAxLCJleHAiOjE3MjMzOTY5NzQsImlhdCI6MTcyMzM5MzM3NCwiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20ifQ.sqvLq-vQ6E8VizXmmqSP_1QjznumAdCt-Nmc_ma1pptWyMAYrV04_RRLEe_tydg0eXNoz-5hpVqf9VLonDCmhg`;

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
      const response = await axios.post(
        "http://117.103.207.132:8080/furni-shop/admin",
        user,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      if (response.data.code === 1000) {
        toast.success("Created Successfully");
        navigate("/user");
      } else {
        toast.error("Error creating user");
      }
    } catch (error) {
      console.error("Error creating user", error);
      toast.error("Error creating user", error);
    }
  };

  return (
    <div className="mt-[32px]">
      <div>
        <h1 className="font-bold text-2xl">New User</h1>
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
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={user.password}
              onChange={handleChange}
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
              required
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
              required
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
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
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
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
        </div>
        <button
          type="submit"
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Create User
        </button>
      </form>
    </div>
  );
};

export default PostNewUser;
