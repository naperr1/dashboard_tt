import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { FaArrowLeftLong } from 'react-icons/fa6';
import { DatePicker, Space } from 'antd';
import axios from 'axios';
import moment from 'moment';

const { RangePicker } = DatePicker;

const ViewVoucher = () => {
    const { voucherId } = useParams();
    const [voucher, setVoucher] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchVoucher = async () => {
            const accessToken = localStorage.getItem('accessToken');
            const token = `Bearer ${accessToken}`;
            try {
                const response = await axios.get(
                    `http://117.103.207.132:8080/furni-shop/vouchers/admin/get/${voucherId}`, 
                    {
                        headers: {
                            Authorization: token,
                        },
                    }
                );
                
                if (response.data.code === 1000) {
                    setVoucher(response.data.result);
                } else {
                    setError('Failed to fetch voucher details');
                }
                
                setLoading(false);
            } catch (error) {
                setError('Error fetching voucher details');
                setLoading(false);
            }
        };

        fetchVoucher();
    }, [voucherId]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className='mt-20'>
            <Link to='/voucher'
                className='absolute top-[84px] left-64 px-4 py-2 bg-cyan-400 rounded-md text-white'>
                <FaArrowLeftLong />
            </Link>
            <h1 className="font-bold text-2xl text-center mb-2">Thông tin voucher</h1>
            <form className="px-8 py-3 max-w-[75%] mx-auto">
                <div className='grid grid-cols-2 gap-y-4 gap-x-5'>
                    {/* Mã voucher */}
                    <div className="flex flex-col gap-1 border border-gray-400 pt-1 pb-2 px-4 rounded-lg">
                        <h2 className="text-xl font-semibold cursor-default">Mã voucher</h2>
                        <input
                            className='outline-none'
                            type="text"
                            value={voucher.code || ''}
                            readOnly
                        />
                    </div>

                    {/* Tên voucher */}
                    <div className="flex flex-col gap-1 border border-gray-400 pt-1 pb-2 px-4 rounded-lg">
                        <h2 className="text-xl font-semibold cursor-default">Tên voucher</h2>
                        <input
                            className='outline-none'
                            type="text"
                            value={voucher.title || ''}
                            readOnly
                        />
                    </div>

                    {/* Phần trăm giảm giá */}
                    <div className="flex flex-col gap-1 border border-gray-400 pt-1 pb-2 px-4 rounded-lg">
                        <h2 className="text-xl font-semibold cursor-default">Phần trăm giảm giá</h2>
                        <input
                            className='outline-none'
                            type="number"
                            value={voucher.discountPercent || ''}
                            readOnly
                        />
                    </div>

                    {/* Giá trị tối thiểu */}
                    <div className="flex flex-col gap-1 border border-gray-400 pt-1 pb-2 px-4 rounded-lg">
                        <h2 className="text-xl font-semibold cursor-default">Giá trị tối thiểu</h2>
                        <input
                            className='outline-none'
                            type="number"
                            value={voucher.minValueOrder || ''}
                            readOnly
                        />
                    </div>

                    {/* Giá trị tối đa */}
                    <div className="flex flex-col gap-1 border border-gray-400 pt-1 pb-2 px-4 rounded-lg">
                        <h2 className="text-xl font-semibold cursor-default">Giá trị tối đa</h2>
                        <input
                            className='outline-none'
                            type="number"
                            value={voucher.maxValueDiscount || ''}
                            readOnly
                        />
                    </div>

                    {/* Số lượng */}
                    <div className="flex flex-col gap-1 border border-gray-400 pt-1 pb-2 px-4 rounded-lg">
                        <h2 className="text-xl font-semibold cursor-default">Số lượng</h2>
                        <input
                            className='outline-none'
                            type="number"
                            value={voucher.quantity || ''}
                            readOnly
                        />
                    </div>

                    {/* Mô tả */}
                    <div className="flex flex-col gap-1 border border-gray-400 pt-1 pb-2 px-4 rounded-lg">
                        <h2 className="text-xl font-semibold cursor-default">Mô tả</h2>
                        <textarea
                            className='outline-none'
                            value={voucher.description || ''}
                            readOnly
                        ></textarea>
                    </div>

                    {/* Thời hạn sử dụng */}
                    <div className="flex flex-col gap-2 border border-gray-400 pt-2 pb-3 px-4 rounded-lg">
                        <h2 className="text-xl font-semibold cursor-default">Thời hạn sử dụng</h2>
                        <Space direction="vertical" size={12} className='mx-auto'>
                            <RangePicker
                                showTime
                                size='large'
                                value={[
                                    voucher.startDate ? moment(voucher.startDate, "DD-MM-YYYY HH:mm:ss") : null,
                                    voucher.endDate ? moment(voucher.endDate, "DD-MM-YYYY HH:mm:ss") : null,
                                ]}
                                disabled
                                format="DD-MM-YYYY HH:mm:ss"
                            />
                        </Space>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default ViewVoucher;







// import { useParams, Link } from 'react-router-dom';
// import { useEffect, useState } from 'react';
// import { FaArrowLeftLong } from 'react-icons/fa6';
// import { DatePicker, Space } from 'antd';
// import axios from 'axios';
// import moment from 'moment';

// const { RangePicker } = DatePicker;

// const ViewVoucher = () => {
//     const { voucherId } = useParams();
//     const [voucher, setVoucher] = useState({});
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const fetchVoucher = async () => {
//             try {
//                 const response = await axios.get(
//                     `http://117.103.207.132:8080/furni-shop/vouchers/admin/get/${voucherId}`, 
//                     {
//                         headers: {
//                             Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
//                         },
//                     }
//                 );
//                 setVoucher(response.data);
//                 setLoading(false);
//             } catch (error) {
//                 setError(error);
//                 setLoading(false);
//             }
//         };

//         fetchVoucher();
//     }, [voucherId]);

//     if (loading) return <div>Loading...</div>;
//     if (error) return <div>Error fetching voucher details!</div>;

//     return (
//         <div className='mt-20'>
//             <Link to='/voucher'
//                 className='absolute top-[84px] left-64 px-4 py-2 bg-cyan-400 rounded-md text-white'>
//                 <FaArrowLeftLong />
//             </Link>
//             <h1 className="font-bold text-2xl text-center mb-2">Thông tin voucher</h1>
//             <form className="px-8 py-3 max-w-[75%] mx-auto">
//                 <div className='grid grid-cols-2 gap-y-4 gap-x-5'>
//                     {/* Mã voucher */}
//                     <div className="flex flex-col gap-1 border border-gray-400 pt-1 pb-2 px-4 rounded-lg">
//                         <h2 className="text-xl font-semibold cursor-default">Mã voucher</h2>
//                         <input
//                             className='outline-none'
//                             type="text"
//                             value={voucher.code || ''}
//                             readOnly
//                         />
//                     </div>

//                     {/* Tên voucher */}
//                     <div className="flex flex-col gap-1 border border-gray-400 pt-1 pb-2 px-4 rounded-lg">
//                         <h2 className="text-xl font-semibold cursor-default">Tên voucher</h2>
//                         <input
//                             className='outline-none'
//                             type="text"
//                             value={voucher.title || ''}
//                             readOnly
//                         />
//                     </div>

//                     {/* Phần trăm giảm giá */}
//                     <div className="flex flex-col gap-1 border border-gray-400 pt-1 pb-2 px-4 rounded-lg">
//                         <h2 className="text-xl font-semibold cursor-default">Phần trăm giảm giá</h2>
//                         <input
//                             className='outline-none'
//                             type="number"
//                             value={voucher.discountPercent || ''}
//                             readOnly
//                         />
//                     </div>

//                     {/* Giá trị tối thiểu */}
//                     <div className="flex flex-col gap-1 border border-gray-400 pt-1 pb-2 px-4 rounded-lg">
//                         <h2 className="text-xl font-semibold cursor-default">Giá trị tối thiểu</h2>
//                         <input
//                             className='outline-none'
//                             type="number"
//                             value={voucher.minValueOrder || ''}
//                             readOnly
//                         />
//                     </div>

//                     {/* Giá trị tối đa */}
//                     <div className="flex flex-col gap-1 border border-gray-400 pt-1 pb-2 px-4 rounded-lg">
//                         <h2 className="text-xl font-semibold cursor-default">Giá trị tối đa</h2>
//                         <input
//                             className='outline-none'
//                             type="number"
//                             value={voucher.maxValueDiscount || ''}
//                             readOnly
//                         />
//                     </div>

//                     {/* Số lượng */}
//                     <div className="flex flex-col gap-1 border border-gray-400 pt-1 pb-2 px-4 rounded-lg">
//                         <h2 className="text-xl font-semibold cursor-default">Số lượng</h2>
//                         <input
//                             className='outline-none'
//                             type="number"
//                             value={voucher.quantity || ''}
//                             readOnly
//                         />
//                     </div>

//                     {/* Mô tả */}
//                     <div className="flex flex-col gap-1 border border-gray-400 pt-1 pb-2 px-4 rounded-lg">
//                         <h2 className="text-xl font-semibold cursor-default">Mô tả</h2>
//                         <textarea
//                             className='outline-none'
//                             value={voucher.description || ''}
//                             readOnly
//                         ></textarea>
//                     </div>

//                     {/* Thời hạn sử dụng */}
//                     <div className="flex flex-col gap-2 border border-gray-400 pt-2 pb-3 px-4 rounded-lg">
//                         <h2 className="text-xl font-semibold cursor-default">Thời hạn sử dụng</h2>
//                         <Space direction="vertical" size={12} className='mx-auto'>
//                             <RangePicker
//                                 showTime
//                                 size='large'
//                                 value={[
//                                     voucher.startDate ? moment(voucher.startDate) : null,
//                                     voucher.endDate ? moment(voucher.endDate) : null,
//                                 ]}
//                                 disabled
//                                 format="DD-MM-YYYY HH:mm:ss"
//                             />
//                         </Space>
//                     </div>
//                 </div>
//             </form>
//         </div>
//     );
// };

// export default ViewVoucher;

