import React, { useEffect, useState } from "react";
import axios from "axios";
import icon_user from "../assets/icon_user.png";
import icon_order from "../assets/icon_order.png";
import icon_sale from "../assets/icon_sale.png";
import icon_pending from "../assets/icon_pending.png";
import { MdOutlineShowChart } from "react-icons/md";
import LineChart from "../components/LineChart";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [stats, setStats] = useState({
    userStatistics: { total: 0, change: 0 },
    orderStatistics: { total: 0, change: 0 },
    totalMoneyStatistics: { total: 0, change: 0 },
    soldCountStatistics: { total: 0, change: 0 },
  });
  const accessToken = localStorage.getItem("accessToken");
  const token = `Bearer ${accessToken}`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://117.103.207.132:8080/furni-shop/admin/stats",
          {
            headers: {
              Authorization: token,
            },
          }
        );
        if (response.data.code === 1000) {
          setStats(response.data.result);
        }
      } catch (error) {
        console.error("Error fetching the stats:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="rounded-lg border-gray-200 p-4 dark:border-gray-700 p-8">
        <h1 className="font-bold text-2xl">Dashboard</h1>
        <div className="mb-4 grid grid-cols-4 gap-4 mt-4">
          <div>
            <Link
              to="/user"
              className="block max-w-sm p-4 bg-white border-gray-200 rounded-lg shadow-md hover:bg-gray-100"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h5 className="mb-2 text-base tracking-tight text-gray-400">
                    Total users
                  </h5>
                  <p className="font-normal text-3xl">
                    {stats.userStatistics.total}
                  </p>
                </div>
                <div>
                  <img src={icon_user} alt="" />
                </div>
              </div>
              <div className="mt-7 flex items-center">
                <MdOutlineShowChart className="text-green-400" />
                <p className="text-green-500 ml-1">
                  {stats.userStatistics.change}%
                </p>
                <p className="ml-1"> Up from yesterday</p>
              </div>
            </Link>
          </div>
          <div>
            <Link
              to={"/order"}
              className="block max-w-sm p-4 bg-white border-gray-200 rounded-lg shadow-md hover:bg-gray-100"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h5 className="mb-2 text-base tracking-tight text-gray-400">
                    Total Order
                  </h5>
                  <p className="font-normal text-3xl">
                    {stats.orderStatistics.total}
                  </p>
                </div>
                <div>
                  <img src={icon_order} alt="" />
                </div>
              </div>
              <div className="mt-7 flex items-center">
                <MdOutlineShowChart className="text-green-400" />
                <p className="text-green-500 ml-1">
                  {stats.orderStatistics.change}%
                </p>
                <p className="ml-1"> Up from yesterday</p>
              </div>
            </Link>
          </div>
          <div>
            <Link
              to="/order"
              className="block max-w-sm p-4 bg-white border-gray-200 rounded-lg shadow-md hover:bg-gray-100"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h5 className="mb-2 text-base tracking-tight text-gray-400">
                    Total Sales
                  </h5>
                  <p className="font-normal text-3xl">
                    {stats.totalMoneyStatistics.total.toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </p>
                </div>
                <div>
                  <img src={icon_sale} alt="" />
                </div>
              </div>
              <div className="mt-7 flex items-center">
                <MdOutlineShowChart className="text-green-400" />
                <p className="text-green-500 ml-1">
                  {stats.totalMoneyStatistics.change}%
                </p>
                <p className="ml-1"> Up from yesterday</p>
              </div>
            </Link>
          </div>
          <div>
            <Link
              to={"/order"}
              className="block max-w-sm p-4 bg-white border-gray-200 rounded-lg shadow-md hover:bg-gray-100"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h5 className="mb-2 text-base tracking-tight text-gray-400">
                    Total sold
                  </h5>
                  <p className="font-normal text-3xl">
                    {stats.soldCountStatistics.total}
                  </p>
                </div>
                <div>
                  <img src={icon_pending} alt="" />
                </div>
              </div>
              <div className="mt-7 flex items-center">
                <MdOutlineShowChart className="text-green-400" />
                <p className="text-green-500 ml-1">
                  {stats.soldCountStatistics.change}%
                </p>
                <p className="ml-1"> Up from yesterday</p>
              </div>
            </Link>
          </div>
        </div>
        <div className="w-full h-full">
          <LineChart />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
