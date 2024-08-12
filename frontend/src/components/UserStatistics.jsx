import React, { useEffect, useState } from "react";
import axios from "axios";
import Loading from "./Loading";

const UserStatistics = () => {
  const [stats, setStats] = useState(null);
  const accessToken = localStorage.getItem("accessToken");
  const token = `Bearer ${accessToken}`;

  useEffect(() => {
    axios
      .get("http://117.103.207.132:8080/furni-shop/admin/stats-users", {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        if (response.data.code === 1000) {
          setStats(response.data.result);
        } else {
          console.error("Failed to fetch user stats");
        }
      })
      .catch((error) => {
        console.error("Error fetching user stats:", error);
      });
  }, []);

  if (!stats) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-4 gap-4 py-4">
      <div className="bg-white shadow-md rounded-lg p-4">
        <h2 className="text-xl font-semibold">Total Users</h2>
        <p className="text-2xl">{stats.totalUsers}</p>
      </div>
      <div className="bg-white shadow-md rounded-lg p-4">
        <h2 className="text-xl font-semibold">Total Banned Users</h2>
        <p className="text-2xl">{stats.totalBannedUsers}</p>
      </div>
      <div className="bg-white shadow-md rounded-lg p-4">
        <h2 className="text-xl font-semibold">Total Active Users</h2>
        <p className="text-2xl">{stats.totalActiveUsers}</p>
      </div>
      <div className="bg-white shadow-md rounded-lg p-4">
        <h2 className="text-xl font-semibold">Total Pending Users</h2>
        <p className="text-2xl">{stats.totalPendingUsers}</p>
      </div>
    </div>
  );
};

export default UserStatistics;
