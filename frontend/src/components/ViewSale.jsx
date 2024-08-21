import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaArrowLeftLong } from 'react-icons/fa6';
import { DatePicker, Space } from 'antd';
import axios from 'axios';
import dayjs from 'dayjs';

const { RangePicker } = DatePicker;

const ViewSale = () => {
    const { saleId } = useParams();
    const [sale, setSale] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [productId, setProductId] = useState('');
    const [percent, setPercent] = useState('');
    const [dateRange, setDateRange] = useState([null, null]);

    useEffect(() => {
        if (!saleId) {
            setError('Sale ID is missing');
            setLoading(false);
            return;
        }

        const fetchSale = async () => {
            const accessToken = localStorage.getItem('accessToken');
            const token = `Bearer ${accessToken}`;
            try {
                const response = await axios.get(
                    `http://117.103.207.132:8080/furni-shop/sales/${saleId}`,
                    {
                        headers: {
                            Authorization: token,
                        },
                    }
                );

                if (response.data.code === 1000) {
                    const { result } = response.data;
                    setSale(result);
                    setProductId(result.productId ?? '');
                    setPercent(result.percent ?? '');
                    setDateRange([
                        result.startDate ? dayjs(result.startDate).format('DD-MM-YYYY HH:mm:ss') : null,
                        result.endDate ? dayjs(result.endDate).format('DD-MM-YYYY HH:mm:ss') : null,
                    ]);
                } else {
                    setError('Failed to fetch sale details');
                }

                setLoading(false);
            } catch (error) {
                setError('Error fetching sale details');
                setLoading(false);
            }
        };

        fetchSale();
    }, [saleId]);

    const handleSubmit = (event) => {
        event.preventDefault();
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className='mt-20'>
            <Link to='/sale'
                className='absolute top-[84px] left-64 px-4 py-2 bg-cyan-400 rounded-md text-white'>
                <FaArrowLeftLong />
            </Link>
            <h1 className="font-bold text-2xl text-center mb-2">Thông tin giảm giá</h1>
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
                            value={[
                                dateRange[0] ? dayjs(dateRange[0], 'DD-MM-YYYY HH:mm:ss') : null,
                                dateRange[1] ? dayjs(dateRange[1], 'DD-MM-YYYY HH:mm:ss') : null,
                            ]}
                            onChange={(dates) => setDateRange(dates)}
                            format="DD-MM-YYYY HH:mm:ss"
                        />
                    </Space>
                </div>
            </form>
        </div>
    );
};

export default ViewSale;









// import React, { useState, useEffect } from 'react';
// import { useParams, Link } from 'react-router-dom';
// import { FaArrowLeftLong } from 'react-icons/fa6';
// import { DatePicker, Space } from 'antd';
// import axios from 'axios';
// import moment from 'moment';
// import dayjs from 'dayjs';

// const { RangePicker } = DatePicker;

// const ViewSale = () => {
//     const { saleId } = useParams();
//     const [sale, setSale] = useState({});
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [productId, setProductId] = useState('');
//     const [percent, setPercent] = useState('');
//     const [dateRange, setDateRange] = useState([null, null]);

//     useEffect(() => {
//         const fetchSale = async () => {
//             const accessToken = localStorage.getItem('accessToken');
//             const token = `Bearer ${accessToken}`;
//             try {
//                 const response = await axios.get(
//                     `http://117.103.207.132:8080/furni-shop/sales/${saleId}`,
//                     {
//                         headers: {
//                             Authorization: token,
//                         },
//                     }
//                 );

//                 if (response.data.code === 1000) {
//                     setSale(response.data.result);
//                     // setProductId(response.data.result.productId || '');
//                     // setPercent(response.data.result.percent || '');
//                     // setDateRange([
//                     //     response.data.result.startDate ? moment(response.data.result.startDate, "DD-MM-YYYY HH:mm:ss") : null,
//                     //     response.data.result.endDate ? moment(response.data.result.endDate, "DD-MM-YYYY HH:mm:ss") : null,
//                     // ]);
//                 } else {
//                     setError('Failed to fetch sale details');
//                 }

//                 setLoading(false);
//             } catch (error) {
//                 setError('Error fetching sale details');
//                 setLoading(false);
//             }
//         };

//         fetchSale();
//     }, [saleId]);

//     if (loading) return <div>Loading...</div>;
//     if (error) return <div>{error}</div>;

//     return (
//         <div className='mt-20'>
//             <Link to='/sale'
//                 className='absolute top-[84px] left-64 px-4 py-2 bg-cyan-400 rounded-md text-white'>
//                 <FaArrowLeftLong />
//             </Link>
//             <h1 className="font-bold text-2xl text-center mb-2">Thông tin giảm giá</h1>
//             <form className="px-8 py-3 max-w-[40%] mx-auto flex flex-col gap-4">
//                 <div className="flex flex-col gap-2 border border-gray-400 pt-1 pb-3 px-4 rounded-lg">
//                     <h2 className="text-xl font-semibold cursor-default">Mã sản phẩm</h2>
//                     <input
//                         className='outline-none'
//                         value={sale.productId}
//                         readOnly />
//                 </div>
//                 <div className="flex flex-col gap-2 border border-gray-400 pt-1 pb-3 px-4 rounded-lg">
//                     <h2 className="text-xl font-semibold cursor-default">Phần trăm giảm giá</h2>
//                     <input
//                         className='outline-none'
//                         value={sale.percent}
//                         readOnly
//                     />
//                 </div>
//                 <div className="flex flex-col gap-2 border border-gray-400 pt-2 pb-3 px-4 rounded-lg">
//                     <h2 className="text-xl font-semibold cursor-default">Thời hạn sử dụng</h2>
//                     <Space direction="vertical" size={12} className='mx-auto'>
//                         <RangePicker
//                             showTime={{ format: 'HH:mm:ss' }}
//                             size='large'
//                             value={[
//                                 sale.startDate ? dayjs(sale.startDate, "DD-MM-YYYY HH:mm:ss") : null,
//                                 sale.endDate ? dayjs(sale.endDate, "DD-MM-YYYY HH:mm:ss") : null,
//                             ]}
//                             format="DD-MM-YYYY HH:mm:ss"
//                         />
//                     </Space>
//                 </div>
//             </form>
//         </div>
//     );
// };

// export default ViewSale;









