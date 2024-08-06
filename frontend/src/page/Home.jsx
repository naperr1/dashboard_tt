import React from "react";
import { Link } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { AiFillProduct } from "react-icons/ai";
import { FaRegUser } from "react-icons/fa";
import { IoMdReorder } from "react-icons/io";
import { MdCategory } from "react-icons/md";
import { IoTicketOutline } from "react-icons/io5";
import SideBar from "../components/SideBar";
import Dashboard from "./Dashboard";

const Home = () => {
  return (
    <>
      <SideBar />
      <div class="p-4 sm:ml-64 mt-[32px]">
        <Dashboard />
      </div>
    </>
  );
};

export default Home;
