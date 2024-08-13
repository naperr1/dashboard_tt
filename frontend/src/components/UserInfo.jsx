import React, { useEffect, useState } from "react";
import axios from "axios";

const UserInfo = () => {
  const [userData, setUserData] = useState(null);
  const accessToken = localStorage.getItem("accessToken");
  const token = `Bearer ${accessToken}`;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          "http://117.103.207.132:8080/furni-shop/user/me",
          {
            headers: {
              Authorization: token,
            },
          }
        );
        setUserData(response.data.result);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mt-16 p-8">
      <div className="flex items-center justify-between w-1/2">
        <h1 className="font-bold text-3xl mb-6">User Information</h1>
        <img
          src={userData.avatarUrl}
          alt="Avatar"
          className="w-32 h-32 rounded-full border-2 border-gray-300"
        />
      </div>
      <div className="overflow-x-auto border rounded-md mt-4 w-1/2">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="border-b">
            <tr>
              <th className="py-3 px-6 text-left">Field</th>
              <th className="py-3 px-6 text-left">Details</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-gray-200">
              <td className="py-3 px-6">Name</td>
              <td className="py-3 px-6">
                {userData.firstName} {userData.lastName}
              </td>
            </tr>
            <tr className="border-b border-gray-200 bg-gray-50">
              <td className="py-3 px-6">Email</td>
              <td className="py-3 px-6">{userData.email}</td>
            </tr>
            <tr className="border-b border-gray-200">
              <td className="py-3 px-6">Phone</td>
              <td className="py-3 px-6">{userData.phoneNumber}</td>
            </tr>
            <tr className="border-b border-gray-200 bg-gray-50">
              <td className="py-3 px-6">Role</td>
              <td className="py-3 px-6">{userData.role}</td>
            </tr>
            <tr className="border-b border-gray-200">
              <td className="py-3 px-6">Status</td>
              <td className="py-3 px-6">{userData.isActive}</td>
            </tr>
            <tr className="border-b border-gray-200 bg-gray-50">
              <td className="py-3 px-6">Joined</td>
              <td className="py-3 px-6">{userData.createdAt}</td>
            </tr>
            <tr>
              <td className="py-3 px-6">Last Updated</td>
              <td className="py-3 px-6">{userData.updatedAt}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserInfo;
