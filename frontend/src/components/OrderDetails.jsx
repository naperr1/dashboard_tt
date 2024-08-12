import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const OrderDetails = () => {
  const [order, setOrder] = useState(null);
  const accessToken = localStorage.getItem("accessToken");
  const token = `Bearer ${accessToken}`;
  const { orderId } = useParams();

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await axios.get(
          `http://117.103.207.132:8080/furni-shop/admin/orders/allOrders/${orderId}`,
          {
            headers: {
              Authorization: token,
            },
          }
        );
        if (response.data.code === 1000) {
          setOrder(response.data.result);
        } else {
          console.error("Failed to fetch order details");
        }
      } catch (error) {
        console.error("Error fetching order details:", error);
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  if (!order) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mt-[32px]">
      <div>
        <h1 className="font-bold text-2xl mb-4">Order Details</h1>
        <table className="min-w-full bg-white border border-gray-300">
          <tbody>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border-b float-left">Order ID</th>
              <td className="py-2 px-4 border-b">{order.orderId}</td>
            </tr>
            <tr>
              <th className="py-2 px-4 border-b float-left">Address</th>
              <td className="py-2 px-4 border-b">{order.orderAddress}</td>
            </tr>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border-b float-left">Receiver</th>
              <td className="py-2 px-4 border-b">{order.nameReceiver}</td>
            </tr>
            <tr>
              <th className="py-2 px-4 border-b float-left">Phone</th>
              <td className="py-2 px-4 border-b">{order.phoneReceiver}</td>
            </tr>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border-b float-left">Status</th>
              <td className="py-2 px-4 border-b">{order.status}</td>
            </tr>
            <tr>
              <th className="py-2 px-4 border-b float-left">Note</th>
              <td className="py-2 px-4 border-b">{order.note}</td>
            </tr>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border-b float-left">Total Money</th>
              <td className="py-2 px-4 border-b">
                {order.totalMoney.toLocaleString("vi-VN", {
                  style: "currency",
                  currency: "VND",
                })}{" "}
              </td>
            </tr>
            <tr>
              <th className="py-2 px-4 border-b float-left">Payment Method</th>
              <td className="py-2 px-4 border-b">{order.paymentMethod}</td>
            </tr>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 float-left">Payment Status</th>
              <td className="py-2 px-4">{order.isPaid}</td>
            </tr>
          </tbody>
        </table>

        <h2 className="font-bold text-xl mt-[20px] mb-4">Order Items</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {order.orderItems.map((item) => (
            <div
              key={item.orderItemId}
              className="border p-4 rounded-lg shadow-md flex flex-col items-center"
            >
              <img
                src={item.imageUrl}
                alt={item.name}
                className="w-[100px] h-[100px] object-cover mb-4"
              />
              <div>
                <p className="font-semibold">
                  <strong>Name:</strong> {item.name}
                </p>
                <p>
                  <strong>Size:</strong> {item.size}
                </p>
                <p>
                  <strong>Color:</strong> {item.color}
                </p>
                <p>
                  <strong>Material:</strong> {item.material}
                </p>
                <p>
                  <strong>Price:</strong> {item.price} VND
                </p>
                <p>
                  <strong>Quantity:</strong> {item.count}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
