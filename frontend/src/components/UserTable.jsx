import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { toast } from "react-toastify";

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);

  const token = `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxIiwic2NvcGUiOiJBRE1JTiIsImlzcyI6ImFiYy5jb20iLCJ1YXYiOjk0MDc5MzAxLCJleHAiOjE3MjMzOTY5NzQsImlhdCI6MTcyMzM5MzM3NCwiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20ifQ.sqvLq-vQ6E8VizXmmqSP_1QjznumAdCt-Nmc_ma1pptWyMAYrV04_RRLEe_tydg0eXNoz-5hpVqf9VLonDCmhg`;

  useEffect(() => {
    fetchUsers();
  }, [page]);

  const fetchUsers = () => {
    axios
      .get(
        `http://117.103.207.132:8080/furni-shop/admin/users?page=${page}&pageSize=5&sortBy=userId&direction=asc`,
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((response) => {
        if (response.data.code === 1000) {
          setUsers(response.data.result.data);
        } else {
          console.error("Error get api user");
        }
      })
      .catch((error) => {
        console.error("Error get api user", error);
      });
  };

  const handleBanUser = (userId) => {
    axios
      .put(
        `http://117.103.207.132:8080/furni-shop/admin/users/banUser/${userId}`,
        {},
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((response) => {
        if (response.data.code === 1000) {
          toast.success(`${response.data.message}`);
          fetchUsers();
        } else {
          toast.error(`${response.data.message}`);
        }
      })
      .catch((error) => {
        toast.error(`${response.data.message}`, error);
        console.error("Error call api banner user", error);
      });
  };

  const handleDeleteUser = (userId) => {
    axios
      .delete(`http://117.103.207.132:8080/furni-shop/admin/users/${userId}`, {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        if (response.data.code === 1000) {
          toast.success("Deleted user");
          fetchUsers();
        } else {
          toast.error("Error delete user");
        }
      })
      .catch((error) => {
        toast.error(`${response.data.message}`, error);
        console.error("Error call api banner user", error);
      });
  };

  return (
    <div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-5 border-solid border-[#d5d5d5]">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-white">
            <tr className="border-b">
              <th scope="col" className="px-6 py-3">
                ID
              </th>
              <th scope="col" className="px-6 py-3">
                NAME
              </th>
              <th scope="col" className="px-6 py-3">
                EMAIL
              </th>
              <th scope="col" className="px-6 py-3">
                ROLE
              </th>
              <th scope="col" className="px-6 py-3">
                STATUS
              </th>
              <th scope="col" className="px-6 py-3">
                ACTION
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                key={user.userId}
                className="bg-white border-b text-black text-sm"
              >
                <td scope="row" className="px-6 py-4">
                  {user.userId}
                </td>
                <td className="px-6 py-4">{user.firstName}</td>
                <td className="px-6 py-4">{user.email}</td>
                <td className="px-6 py-4">{user.role}</td>
                <td className="px-6 py-4 flex">
                  <button
                    className={`text-white px-5 py-2 rounded ${
                      user.isActive === "ACTIVE" ? "bg-green-500" : "bg-red-500"
                    }`}
                  >
                    {user.isActive}
                  </button>
                  <button
                    className="text-white bg-red-500 px-4 py-2 rounded ml-2"
                    onClick={() => handleBanUser(user.userId)}
                  >
                    Ban user
                  </button>
                </td>
                <td className="px-6 py-4 space-x-2">
                  <div className="flex">
                    <Link
                      to={`/user/${user.userId}`}
                      className="font-medium pr-[20px] text-lg hover:text-blue-500"
                    >
                      <FaRegEdit />
                    </Link>
                    <button
                      onClick={() => handleDeleteUser(user.userId)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <FaRegTrashAlt />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex items-center space-x-2 justify-end mr-[50px] my-[10px]">
          <button
            className="rounded hover:bg-gray-300 focus:outline-none"
            onClick={() => setPage(page > 1 ? page - 1 : 1)}
          >
            <MdKeyboardArrowLeft className="w-4 h-4" />
          </button>

          <span className="px-3 py-1 text-sm font-medium bg-white border rounded shadow">
            {page}
          </span>

          <button
            className="rounded hover:bg-gray-300 focus:outline-none"
            onClick={() => setPage(page + 1)}
          >
            <MdKeyboardArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserTable;
