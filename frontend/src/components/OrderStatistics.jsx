import React, { useEffect, useState } from "react";
import axios from "axios";
import Loading from "./Loading";

const OrderStatistics = () => {
  const [stats, setStats] = useState(null);
  const accessToken = localStorage.getItem("accessToken");
  const token = `Bearer ${accessToken}`;

  useEffect(() => {
    axios
      .get("http://117.103.207.132:8080/furni-shop/admin/orders/stats-orders", {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        if (response.data.code === 1000) {
          setStats(response.data.result);
        } else {
          console.error("Failed to fetch order stats");
        }
      })
      .catch((error) => {
        console.error("Error fetching order stats:", error);
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
    <div className="grid grid-cols-5 gap-4 py-4">
      <div className="bg-white shadow-md rounded-lg p-4">
        <h2 className="text-xl font-semibold">Total Orders</h2>
        <p className="text-2xl">{stats.totalOrders}</p>
      </div>
      <div className="bg-white shadow-md rounded-lg p-4">
        <h2 className="text-xl font-semibold">Confirmed Orders</h2>
        <p className="text-2xl">{stats.totalConfirmOrders}</p>
      </div>
      <div className="bg-white shadow-md rounded-lg p-4">
        <h2 className="text-xl font-semibold">Pending Orders</h2>
        <p className="text-2xl">{stats.totalPendingOrders}</p>
      </div>
      <div className="bg-white shadow-md rounded-lg p-4">
        <h2 className="text-xl font-semibold">Completed Orders</h2>
        <p className="text-2xl">{stats.totalCompletedOrders}</p>
      </div>
      <div className="bg-white shadow-md rounded-lg p-4">
        <h2 className="text-xl font-semibold">Delivering Orders</h2>
        <p className="text-2xl">{stats.totalDeliveringOrders}</p>
      </div>
    </div>
  );
};

export default OrderStatistics;
