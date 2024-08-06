import React from "react";
import icon_user from "../assets/icon_user.png";
import icon_order from "../assets/icon_order.png";
import icon_sale from "../assets/icon_sale.png";
import icon_pending from "../assets/icon_pending.png";
import { MdOutlineShowChart } from "react-icons/md";
import LineChart from "../components/LineChart";

const Dashboard = () => {
  return (
    <>
      <div class="rounded-lg border-gray-200 p-4 dark:border-gray-700">
        <h1 className="font-bold text-2xl">Dashboard</h1>
        <div class="mb-4 grid grid-cols-4 gap-4 mt-4">
          <div className="">
            <a
              href="#"
              class="block max-w-sm p-4 bg-white  border-gray-200 rounded-lg shadow-md hover:bg-gray-100 "
            >
              <div className="flex items-center justify-between">
                <div>
                  <h5 class="mb-2 text-base  tracking-tight text-gray-400 ">
                    Total users
                  </h5>
                  <p class="font-normal text-3xl">40.123</p>
                </div>
                <div>
                  <img src={icon_user} alt="" />
                </div>
              </div>
              <div className="mt-7 flex items-center ">
                <MdOutlineShowChart className="text-green-400" />
                <p className="text-green-500 ml-1">8.5%</p>{" "}
                <p className="ml-1"> Up from yesterday</p>
              </div>
            </a>
          </div>
          <div className="">
            <a
              href="#"
              class="block max-w-sm p-4 bg-white  border-gray-200 rounded-lg shadow-md hover:bg-gray-100 "
            >
              <div className="flex items-center justify-between">
                <div>
                  <h5 class="mb-2 text-base  tracking-tight text-gray-400 ">
                    Total Order
                  </h5>
                  <p class="font-normal text-3xl">123.456</p>
                </div>
                <div>
                  <img src={icon_order} alt="" />
                </div>
              </div>
              <div className="mt-7 flex items-center ">
                <MdOutlineShowChart className="text-green-400" />
                <p className="text-green-500 ml-1">8.5%</p>{" "}
                <p className="ml-1"> Up from yesterday</p>
              </div>
            </a>
          </div>
          <div className="">
            <a
              href="#"
              class="block max-w-sm p-4 bg-white  border-gray-200 rounded-lg shadow-md hover:bg-gray-100 "
            >
              <div className="flex items-center justify-between">
                <div>
                  <h5 class="mb-2 text-base  tracking-tight text-gray-400 ">
                    Total Sales
                  </h5>
                  <p class="font-normal text-3xl">$123456</p>
                </div>
                <div>
                  <img src={icon_sale} alt="" />
                </div>
              </div>
              <div className="mt-7 flex items-center ">
                <MdOutlineShowChart className="text-green-400" />
                <p className="text-green-500 ml-1">8.5%</p>{" "}
                <p className="ml-1"> Up from yesterday</p>
              </div>
            </a>
          </div>
          <div className="">
            <a
              href="#"
              class="block max-w-sm p-4 bg-white  border-gray-200 rounded-lg shadow-md hover:bg-gray-100 "
            >
              <div className="flex items-center justify-between">
                <div>
                  <h5 class="mb-2 text-base tracking-tight text-gray-400 ">
                    Total Pending
                  </h5>
                  <p class="font-normal text-3xl">1234</p>
                </div>
                <div>
                  <img src={icon_pending} alt="" />
                </div>
              </div>
              <div className="mt-7 flex items-center ">
                <MdOutlineShowChart className="text-green-400" />
                <p className="text-green-500 ml-1">8.5%</p>{" "}
                <p className="ml-1"> Up from yesterday</p>
              </div>
            </a>
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
