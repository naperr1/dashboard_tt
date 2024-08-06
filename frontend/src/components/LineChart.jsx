import React from "react";
import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";

const labels = ["January", "February", "March", "April", "May", "June"];

const data = {
  labels: labels,
  datasets: [
    {
      label: "Số lượng",
      backgroundColor: "rgba(255, 180, 0, 1)",
      borderColor: "rgba(255, 180, 0, 1)",
      data: [0, 10, 5, 2, 20, 30, 45, 12],
    },
    {
      label: "Doanh thu",
      backgroundColor: "rgba(0, 255, 119, 1)",
      borderColor: "rgba(0, 255, 119, 1)",
      data: [1, 2, 3, 4, 12, 14, 43],
    },
  ],
};

const LineChart = () => {
  return (
    <div>
      <Line data={data} />
    </div>
  );
};

export default LineChart;
