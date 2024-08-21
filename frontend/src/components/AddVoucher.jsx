import { useState } from 'react';
import { FaArrowLeftLong } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import { DatePicker, Space } from 'antd';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
// import moment from 'moment';

const { RangePicker } = DatePicker;

const AddVoucher = () => {
    const accessToken = localStorage.getItem("accessToken");
    const token = `Bearer ${accessToken}`;

    const [code, setCode] = useState('');
    const [title, setTitle] = useState('');
    const [discountPercent, setDiscountPercent] = useState(5);
    const [minValueOrder, setMinValueOrder] = useState(5000);
    const [maxValueDiscount, setMaxValueDiscount] = useState(10000);
    const [quantity, setQuantity] = useState(1);
    const [description, setDescription] = useState('');
    const [dateRange, setDateRange] = useState([]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const [startDate, endDate] = dateRange;
        const formattedStartDate = startDate.format('DD-MM-YYYY HH:mm:ss');
        const formattedEndDate = endDate.format('DD-MM-YYYY HH:mm:ss');

        const newVoucher = {
            code,
            title,
            discountPercent,
            minValueOrder,
            maxValueDiscount,
            quantity,
            description,
            startDate: formattedStartDate,
            endDate: formattedEndDate,
        };

        try {
            await axios.post(
                'http://117.103.207.132:8080/furni-shop/vouchers/admin/create',
                newVoucher,
                {
                    headers: {
                        Authorization: token,
                    },
                }
            );

            toast.success('Voucher added successfully!');
            setCode('');
            setTitle('');
            setDiscountPercent(0);
            setMinValueOrder(0);
            setMaxValueDiscount(0);
            setQuantity(0);
            setDescription('');
            setDateRange([]);
        } catch (error) {
            console.error('Error adding voucher:', error);
            toast.error('Failed to add voucher.');
        }
    };

    return (
        <div className='mt-20'>
            <Link to='/voucher'
                className='absolute top-[84px] left-64 px-4 py-2 bg-cyan-400 rounded-md text-white'>
                <FaArrowLeftLong />
            </Link>
            <h1 className="font-bold text-2xl text-center mb-2">Mời nhập thông tin voucher</h1>
            <form onSubmit={handleSubmit}
                className="px-8 py-3 max-w-[75%] mx-auto">
                <div className='grid grid-cols-2 gap-y-4 gap-x-5'>
                    <div className="flex flex-col gap-1 border border-gray-400 pt-1 pb-2 px-4 rounded-lg">
                        <h2 className="text-xl font-semibold cursor-default">Mã voucher</h2>
                        <input
                            className='outline-none'
                            type="text"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            required
                        />
                    </div>
                    <div className="flex flex-col gap-1 border border-gray-400 pt-1 pb-2 px-4 rounded-lg">
                        <h2 className="text-xl font-semibold cursor-default">Tên voucher</h2>
                        <input
                            className='outline-none'
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>
                    <div className="flex flex-col gap-1 border border-gray-400 pt-1 pb-2 px-4 rounded-lg">
                        <h2 className="text-xl font-semibold cursor-default">Phần trăm giảm giá</h2>
                        <input
                            className='outline-none'
                            type="number"
                            value={discountPercent}
                            onChange={(e) => setDiscountPercent(e.target.value)}
                            required
                        />
                    </div>
                    <div className="flex flex-col gap-1 border border-gray-400 pt-1 pb-2 px-4 rounded-lg">
                        <h2 className="text-xl font-semibold cursor-default">Giá trị tối thiểu</h2>
                        <input
                            className='outline-none'
                            type="number"
                            value={minValueOrder}
                            onChange={(e) => setMinValueOrder(e.target.value)}
                            required
                        />
                    </div>
                    <div className="flex flex-col gap-1 border border-gray-400 pt-1 pb-2 px-4 rounded-lg">
                        <h2 className="text-xl font-semibold cursor-default">Giá trị tối đa</h2>
                        <input
                            className='outline-none'
                            type="number"
                            value={maxValueDiscount}
                            onChange={(e) => setMaxValueDiscount(e.target.value)}
                            required
                        />
                    </div>
                    <div className="flex flex-col gap-1 border border-gray-400 pt-1 pb-2 px-4 rounded-lg">
                        <h2 className="text-xl font-semibold cursor-default">Số lượng</h2>
                        <input
                            className='outline-none'
                            type='number'
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                            required
                        />
                    </div>
                    <div className="flex flex-col gap-1 border border-gray-400 pt-1 pb-2 px-4 rounded-lg">
                        <h2 className="text-xl font-semibold cursor-default">Thông tin</h2>
                        <textarea
                            className='outline-none'
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        ></textarea>
                    </div>
                    <div className="flex flex-col gap-2 border border-gray-400 pt-2 pb-3 px-4 rounded-lg">
                        <h2 className="text-xl font-semibold cursor-default">Thời hạn sử dụng</h2>
                        <Space direction="vertical" size={12} className='mx-auto'>
                            <RangePicker
                                showTime
                                size='large'
                                value={dateRange}
                                onChange={(dates) => setDateRange(dates)}
                                required
                                format="DD-MM-YYYY HH:mm:ss"
                            />
                        </Space>
                    </div>
                </div>
                <div className="flex justify-center mt-6 ">
                    <button type='submit' className="bg-cyan-500 py-2 px-12 text-white rounded-xl">
                        Thêm
                    </button>
                </div>
            </form>
            <ToastContainer />
        </div>
    );
};

export default AddVoucher;









// import { useState } from 'react';
// import { FaArrowLeftLong } from 'react-icons/fa6';
// import { Link } from 'react-router-dom';
// import { DatePicker, Space } from 'antd';
// import { toast, ToastContainer } from 'react-toastify';
// import axios from 'axios';
// import 'react-toastify/dist/ReactToastify.css';

// const { RangePicker } = DatePicker;

// const AddVoucher = () => {
//     const accessToken = localStorage.getItem("accessToken");
//     const token = `Bearer ${accessToken}`;

//     const [code, setCode] = useState('');
//     const [title, setTitle] = useState('');
//     const [discountPercent, setDiscountPercent] = useState(0);
//     const [minValueOrder, setMinValueOrder] = useState(0);
//     const [maxValueDiscount, setMaxValueDiscount] = useState(0);
//     const [quantity, setQuantity] = useState(0);
//     const [description, setDescription] = useState('');
//     const [dateRange, setDateRange] = useState([]);

//     const handleSubmit = async (event) => {
//         event.preventDefault();

//         const [startDate, endDate] = dateRange;
//         const newVoucher = {
//             code,
//             title,
//             discountPercent,
//             minValueOrder,
//             maxValueDiscount,
//             quantity,
//             description,
//             startDate,
//             endDate,
//         };

//         try {
//             await axios.post(
//                 'http://117.103.207.132:8080/furni-shop/vouchers/admin/create',
//                 newVoucher,
//                 {
//                     headers: {
//                         Authorization: token,
//                     },
//                 }
//             );

//             toast.success('Voucher added successfully!');
//             setCode('');
//             setTitle('');
//             setDiscountPercent(0);
//             setMinValueOrder(0);
//             setMaxValueDiscount(0);
//             setQuantity(0);
//             setDescription('');
//             setDateRange([]);
//         } catch (error) {
//             console.error('Error adding voucher:', error);
//             toast.error('Failed to add voucher.');
//         }
//     };

//     return (
//         <div className='mt-20'>
//             <Link to='/voucher'
//                 className='absolute top-[84px] left-64 px-4 py-2 bg-cyan-400 rounded-md text-white'>
//                 <FaArrowLeftLong />
//             </Link>
//             <h1 className="font-bold text-2xl text-center mb-2">Mời nhập thông tin voucher</h1>
//             <form onSubmit={handleSubmit}
//                 className="px-8 py-3 max-w-[75%] mx-auto">
//                 <div className='grid grid-cols-2 gap-y-4 gap-x-5'>
//                     <div className="flex flex-col gap-1 border border-gray-400 pt-1 pb-2 px-4 rounded-lg">
//                         <h2 className="text-xl font-semibold cursor-default">Mã voucher</h2>
//                         <input
//                             className='outline-none'
//                             type="text"
//                             value={code}
//                             onChange={(e) => setCode(e.target.value)}
//                             required
//                         />
//                     </div>
//                     <div className="flex flex-col gap-1 border border-gray-400 pt-1 pb-2 px-4 rounded-lg">
//                         <h2 className="text-xl font-semibold cursor-default">Tên voucher</h2>
//                         <input
//                             className='outline-none'
//                             type="text"
//                             value={title}
//                             onChange={(e) => setTitle(e.target.value)}
//                             required
//                         />
//                     </div>
//                     <div className="flex flex-col gap-1 border border-gray-400 pt-1 pb-2 px-4 rounded-lg">
//                         <h2 className="text-xl font-semibold cursor-default">Phần trăm giảm giá</h2>
//                         <input
//                             className='outline-none'
//                             type="number"
//                             value={discountPercent}
//                             onChange={(e) => setDiscountPercent(e.target.value)}
//                             required
//                         />
//                     </div>
//                     <div className="flex flex-col gap-1 border border-gray-400 pt-1 pb-2 px-4 rounded-lg">
//                         <h2 className="text-xl font-semibold cursor-default">Giá trị tối thiểu</h2>
//                         <input
//                             className='outline-none'
//                             type="number"
//                             value={minValueOrder}
//                             onChange={(e) => setMinValueOrder(e.target.value)}
//                             required
//                         />
//                     </div>
//                     <div className="flex flex-col gap-1 border border-gray-400 pt-1 pb-2 px-4 rounded-lg">
//                         <h2 className="text-xl font-semibold cursor-default">Giá trị tối đa</h2>
//                         <input
//                             className='outline-none'
//                             type="number"
//                             value={maxValueDiscount}
//                             onChange={(e) => setMaxValueDiscount(e.target.value)}
//                             required
//                         />
//                     </div>
//                     <div className="flex flex-col gap-1 border border-gray-400 pt-1 pb-2 px-4 rounded-lg">
//                         <h2 className="text-xl font-semibold cursor-default">Số lượng</h2>
//                         <input
//                             className='outline-none'
//                             type='number'
//                             value={quantity}
//                             onChange={(e) => setQuantity(e.target.value)}
//                             required
//                         />
//                     </div>
//                     <div className="flex flex-col gap-1 border border-gray-400 pt-1 pb-2 px-4 rounded-lg">
//                         <h2 className="text-xl font-semibold cursor-default">Thông tin</h2>
//                         <textarea
//                             className='outline-none'
//                             value={description}
//                             onChange={(e) => setDescription(e.target.value)}
//                             required
//                         ></textarea>
//                     </div>
//                     <div className="flex flex-col gap-2 border border-gray-400 pt-2 pb-3 px-4 rounded-lg">
//                         <h2 className="text-xl font-semibold cursor-default">Thời hạn sử dụng</h2>
//                         <Space direction="vertical" size={12} className='mx-auto'>
//                             <RangePicker
//                                 size='large'
//                                 value={dateRange}
//                                 onChange={(dates) => setDateRange(dates)}
//                                 required
//                             />
//                         </Space>
//                     </div>
//                 </div>
//                 <div className="flex justify-center mt-6 ">
//                     <button type='submit' className="bg-cyan-500 py-2 px-12 text-white rounded-xl">
//                         Thêm
//                     </button>
//                 </div>
//             </form>
//             <ToastContainer />
//         </div>
//     );
// };

// export default AddVoucher;









// import { } from 'react'
// import DatePickerVoucher from './DatePickerVoucher'
// import { DatePicker, Space } from 'antd';
// import axios from 'axios';
// import { Link } from 'react-router-dom';
// import { FaArrowLeftLong } from 'react-icons/fa6';

// const { RangePicker } = DatePicker;

// const AddVoucher = () => {


//     return (
//         <div className='mt-20'>
//             <Link to='/category'
//                 className='absolute top-[84px] left-64 px-4 py-2 bg-cyan-400 rounded-md text-white'>
//                 <FaArrowLeftLong />
//             </Link>
//             <h1 className="font-bold text-2xl text-center mb-2">Mời nhập thông tin voucher</h1>
//             <form onSubmit={ }
//                 className="px-8 py-3 max-w-[75%] mx-auto">
//                 <div className='grid grid-cols-2 gap-y-4 gap-x-5'>
//                     <div className="flex flex-col gap-1 border border-gray-400 pt-1 pb-2 px-4 rounded-lg">
//                         <h2 className="text-xl font-semibold cursor-default">Mã voucher</h2>
//                         <input className='outline-none'
//                             type="text"
//                             value={code}
//                         />
//                     </div>
//                     <div className="flex flex-col gap-1 border border-gray-400 pt-1 pb-2 px-4 rounded-lg">
//                         <h2 className="text-xl font-semibold cursor-default">Tên voucher</h2>
//                         <input className='outline-none'
//                             type="text"
//                             value={title} />
//                     </div>
//                     <div className="flex flex-col gap-1 border border-gray-400 pt-1 pb-2 px-4 rounded-lg">
//                         <h2 className="text-xl font-semibold cursor-default">Phần trăm giảm giá</h2>
//                         <input className='outline-none'
//                             type="number"
//                             value={discountPercent} />
//                     </div>
//                     <div className="flex flex-col gap-1 border border-gray-400 pt-1 pb-2 px-4 rounded-lg">
//                         <h2 className="text-xl font-semibold cursor-default">Giá trị tối thiểu</h2>
//                         <input className='outline-none'
//                             type="number"
//                             value={minValueOrder} />
//                     </div>
//                     <div className="flex flex-col gap-1 border border-gray-400 pt-1 pb-2 px-4 rounded-lg">
//                         <h2 className="text-xl font-semibold cursor-default">Giá trị tối đa</h2>
//                         <input className='outline-none'
//                             type="number"
//                             value={maxValueDiscount} />
//                     </div>

//                     <div className="flex flex-col gap-1 border border-gray-400 pt-1 pb-2 px-4 rounded-lg">
//                         <h2 className="text-xl font-semibold cursor-default">Số lượng</h2>
//                         <input className='outline-none'
//                             type='number'
//                             value={quantity} />
//                     </div>
//                     <div className="flex flex-col gap-1 border border-gray-400 pt-1 pb-2 px-4 rounded-lg">
//                         <h2 className="text-xl font-semibold cursor-default">Thông tin</h2>
//                         <textarea className='outline-none'
//                             value={description} >
//                         </textarea>
//                     </div>
//                     <div className="flex flex-col gap-2 border border-gray-400 pt-2 pb-3 px-4 rounded-lg">
//                         <h2 className="text-xl font-semibold cursor-default">Thời hạn sử dụng</h2>
//                         <Space direction="vertical" size={12} className='mx-auto'>
//                             <RangePicker size='large' />
//                         </Space>
//                     </div>
//                 </div>
//                 <div className="flex justify-center mt-6 ">
//                     <button type='submit' className="bg-cyan-500 py-2 px-12 text-white rounded-xl">
//                         Thêm
//                     </button>
//                 </div>
//             </form>
//             <ToastContainer />
//         </div>
//     )
// }

// export default AddVoucher;
