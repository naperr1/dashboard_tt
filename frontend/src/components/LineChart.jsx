import React, { useState, useEffect } from "react";
import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

const LineChart = () => {
  const [startDate, setStartDate] = useState(new Date("2024-08-01"));
  const [endDate, setEndDate] = useState(new Date("2024-08-10"));
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });
  const accessToken = localStorage.getItem("accessToken");
  const token = `Bearer ${accessToken}`;

  useEffect(() => {
    const formatDate = (date) => {
      const d = new Date(date);
      let month = "" + (d.getMonth() + 1);
      let day = "" + d.getDate();
      const year = d.getFullYear();

      if (month.length < 2) month = "0" + month;
      if (day.length < 2) day = "0" + day;

      return [year, month, day].join("-");
    };

    const fetchData = async () => {
      try {
        const responseOrders = await axios.get(
          `http://117.103.207.132:8080/furni-shop/admin/stats/chart`,
          {
            headers: {
              Authorization: token,
            },
            params: {
              start: formatDate(startDate),
              end: formatDate(endDate),
              type: "order",
            },
          }
        );

        const responseRevenue = await axios.get(
          `http://117.103.207.132:8080/furni-shop/admin/stats/chart`,
          {
            headers: {
              Authorization: token,
            },
            params: {
              start: formatDate(startDate),
              end: formatDate(endDate),
              type: "revenue",
            },
          }
        );

        const dataOrders = responseOrders.data.result;
        const dataRevenue = responseRevenue.data.result;

        setChartData({
          labels: dataOrders.map((item) => item.date),
          datasets: [
            {
              label: "Số lượng",
              backgroundColor: "rgba(255, 180, 0, 1)",
              borderColor: "rgba(255, 180, 0, 1)",
              data: dataOrders.map((item) => item.total),
            },
            {
              label: "Doanh thu",
              backgroundColor: "rgba(0, 255, 119, 1)",
              borderColor: "rgba(0, 255, 119, 1)",
              data: dataRevenue.map((item) => item.total),
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, [startDate, endDate, token]);

  return (
    <div>
      <div className="mb-[20px] float-right flex">
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          className="border mr-2"
        />
        <DatePicker
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
          className="border"
        />
      </div>
      <Line data={chartData} />
    </div>
  );
};

export default LineChart;
