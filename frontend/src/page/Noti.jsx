import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';

const Noti = () => {
  const accessToken = localStorage.getItem("accessToken");
  const token = `Bearer ${accessToken}`;

  const [orderId, setOrderId] = useState('');
  const [userId, setUserId] = useState('');
  const [notificationType, setNotificationType] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newNotification = {
     orderId,
      userId,
      notificationType
    };

    try {
      await axios.post(
        'http://117.103.207.132:8080/furni-shop/admin/notifications/create',
        newNotification,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      toast.success('Notification added successfully!');
      setOrderId('');
      setUserId('');
      setNotificationType('');
    } catch (error) {
      console.error('Error adding notification:', error);
      toast.error('Failed to add notification.');
    }
  };

  return (
    <div className="pr-5 py-5 mt-16">
      <h1 className="font-bold text-2xl text-center mb-2">Nhập thông báo</h1>
      <form onSubmit={handleSubmit} className="px-8 py-3 max-w-[40%] mx-auto flex flex-col gap-4">
        <div className="flex flex-col gap-1 border border-gray-400 pt-1 pb-2 px-4 rounded-lg">
          <h2 className="text-xl font-semibold cursor-default">Id người dùng</h2>
          <input
            className='outline-none'
            type="number"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col gap-2 border border-gray-400 pt-1 pb-3 px-4 rounded-lg">
          <h2 className="text-xl font-semibold cursor-default">Id đơn hàng</h2>
          <input
            className='outline-none'
            type="number"
            required
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2 border border-gray-400 pt-1 pb-3 px-4 rounded-lg">
          <h2 className="text-xl font-semibold cursor-default">Loại thông báo</h2>
          <input
            className='outline-none'
            type="number"
            required
            value={notificationType}
            onChange={(e) => setNotificationType(e.target.value)}
          />
        </div>
        <div className="flex justify-center">
          <button type="submit" className="bg-cyan-500 py-2 px-12 text-white rounded-xl">
            Thêm
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Noti;
