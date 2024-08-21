import { DatePicker, Space } from 'antd';
import { FaArrowLeftLong } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';
import { useState } from 'react';
import dayjs from 'dayjs';

const { RangePicker } = DatePicker;

const AddSale = () => {

    const accessToken = localStorage.getItem("accessToken");
    const token = `Bearer ${accessToken}`;

    const [productId, setProductId] = useState('');
    const [percent, setPercent] = useState('');
    const [dateRange, setDateRange] = useState([]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (dateRange.length === 0) {
            toast.error('Please select a date range.');
            return;
        }

        const [start, end] = dateRange;
        const formattedStartDate = dayjs(start).format('DD-MM-YYYY HH:mm:ss');
        const formattedEndDate = dayjs(end).format('DD-MM-YYYY HH:mm:ss');

        const newSale = {
            productId: parseInt(productId, 10),
            percent: parseFloat(percent),
            startDate: formattedStartDate,
            endDate: formattedEndDate,
        };

        try {
            await axios.post('http://117.103.207.132:8080/furni-shop/sales', newSale,
                {
                    headers: {
                        Authorization: token,
                    },
                }
            );
            toast.success('Sale added successfully!');
        } catch (error) {
            console.error('Error adding sale:', error);
            toast.error('Failed to add sale.');
        }
    };

    return (
        <div className='mt-20'>
            <Link to='/sale'
                className='absolute top-[84px] left-64 px-4 py-2 bg-cyan-400 rounded-md text-white'>
                <FaArrowLeftLong />
            </Link>
            <h1 className="font-bold text-2xl text-center mb-2">Mời nhập thông tin giảm giá</h1>
            <form onSubmit={handleSubmit} className="px-8 py-3 max-w-[40%] mx-auto flex flex-col gap-4">
                <div className="flex flex-col gap-2 border border-gray-400 pt-1 pb-3 px-4 rounded-lg">
                    <h2 className="text-xl font-semibold cursor-default">Mã sản phẩm</h2>
                    <input
                        className='outline-none'
                        type="number"
                        required
                        value={productId}
                        onChange={(e) => setProductId(e.target.value)}
                    />
                </div>
                <div className="flex flex-col gap-2 border border-gray-400 pt-1 pb-3 px-4 rounded-lg">
                    <h2 className="text-xl font-semibold cursor-default">Phần trăm giảm giá</h2>
                    <input
                        className='outline-none'
                        type="number"
                        required
                        value={percent}
                        onChange={(e) => setPercent(e.target.value)}
                    />
                </div>
                <div className="flex flex-col gap-2 border border-gray-400 pt-2 pb-3 px-4 rounded-lg">
                    <h2 className="text-xl font-semibold cursor-default">Thời hạn sử dụng</h2>
                    <Space direction="vertical" size={12} className='mx-auto'>
                        <RangePicker
                            showTime={{ format: 'HH:mm:ss' }}
                            size='large'
                            onChange={(dates) => setDateRange(dates)}
                        />
                    </Space>
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

export default AddSale;










