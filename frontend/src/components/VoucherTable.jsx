import { useState, useEffect } from "react";
import CategoryTable from "./CategoryTable";
import axios from 'axios';
import moment from "moment";
import { useNavigate } from "react-router-dom";

const VoucherTable = () => {

    const accessToken = localStorage.getItem("accessToken");
    const token = `Bearer ${accessToken}`;

    const [voucherData, setVoucherData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchVoucherData = async () => {
            try {
                const response = await axios.get(
                    'http://117.103.207.132:8080/furni-shop/vouchers/admin/get-all', {
                    params: {
                        page: 1,
                        pageSize: 55,
                        sortBy: 'voucherId',
                        direction: 'asc',
                    },
                    headers: {
                        Authorization: token,
                    },
                });
                const data = response.data.result;
                setVoucherData(data.data.map(voucher => ({
                    ...voucher,
                    key: voucher.voucherId,
                })));

                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        fetchVoucherData();
    }, []);

    const handleSaveVoucher = async (updatedRow) => {
        const { voucherId, ...updatedData } = updatedRow; 

        try {
            await axios.put(`http://117.103.207.132:8080/furni-shop/vouchers/admin/update/${voucherId}`, updatedData, {
                headers: {
                    Authorization: token,
                },
            });

            setVoucherData((prevData) =>
                prevData.map((voucher) =>
                    voucher.voucherId === voucherId ? { ...voucher, ...updatedData } : voucher
                )
            );
        } catch (error) {
            console.error('Failed to update voucher:', error);
        }
    };

    const handleDeleteVoucher = async (voucherId) => {
        if (!voucherId) {
            console.error('Voucher ID is undefined');
            return;
        }

        try {
            await axios.delete(`http://117.103.207.132:8080/furni-shop/vouchers/admin/delete/${voucherId}`, {
                headers: {
                    Authorization: token,
                },
            });

            setVoucherData((prevVoucherData) =>
                prevVoucherData.filter((voucher) => voucher.voucherId !== voucherId)
            );
        } catch (error) {
            console.error('Failed to delete voucher:', error);
        }
    };

    const navigate = useNavigate();

    const handleRowClick = (voucherId) => {
        navigate(`/voucher/${voucherId}`);
    };


    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error fetching data!</div>;

    const voucherColumns = [
        {
            title: 'ID',
            dataIndex: 'voucherId',
            key: 'voucherId',
            width: 60,
            editable: false,
            align: 'center',
            fixed: 'left',
            sorter: (a, b) => a.voucherId - b.voucherId,
            render: (text, record) => (
                <span
                    className="text-black cursor-pointer"
                    onClick={() => handleRowClick(record.voucherId)}
                >
                    {text}
                </span>
            ),
        },
        {
            title: 'Mã',
            dataIndex: 'code',
            key: 'code',
            width: 80,
            editable: true,
            sorter: (a, b) => a.code.localeCompare(b.code),
            render: (text, record) => (
                <span
                    className="text-black cursor-pointer"
                    onClick={() => handleRowClick(record.voucherId)}
                >
                    {text}
                </span>
            ),
        },
        {
            title: 'Tên',
            dataIndex: 'title',
            key: 'title',
            width: 150,
            editable: true,
            sorter: (a, b) => a.title.localeCompare(b.title),
            render: (text, record) => (
                <span
                    className="text-black cursor-pointer"
                    onClick={() => handleRowClick(record.voucherId)}
                >
                    {text}
                </span>
            ),
        },
        {
            title: 'Giảm giá',
            dataIndex: 'discountPercent',
            inputType: 'number',
            key: 'discountPercent',
            width: 100,
            editable: true,
            render: (value) => `${value}%`,
            sorter: (a, b) => a.discountPercent - b.discountPercent,
        },
        {
            title: 'Giá trị tối thiểu',
            dataIndex: 'minValueOrder',
            inputType: 'number',
            key: 'minValueOrder',
            width: 150,
            editable: true,
            sorter: (a, b) => a.minValueOrder - b.minValueOrder,
        },
        {
            title: 'Giá trị tối đa',
            dataIndex: 'maxValueDiscount',
            inputType: 'number',
            key: 'maxValueDiscount',
            width: 120,
            editable: true,
            sorter: (a, b) => a.maxValueDiscount - b.maxValueDiscount,
        },
        {
            title: 'Số lượng',
            dataIndex: 'quantity',
            inputType: 'number',
            key: 'quantity',
            width: 100,
            editable: true,
            sorter: (a, b) => a.quantity - b.quantity,
        },
        {
            title: 'Ngày bắt đầu',
            dataIndex: 'startDate',
            inputType: 'date',
            key: 'startDate',
            width: 180,
            editable: true,
            render: (date) => moment(date, 'DD/MM/YYYY HH:mm:ss').format('DD/MM/YYYY HH:mm:ss'),
            sorter: (a, b) => moment(a.startDate).unix() - moment(b.startDate).unix(),
        },
        {
            title: 'Ngày kết thúc',
            dataIndex: 'endDate',
            inputType: 'date',
            key: 'endDate',
            width: 180,
            editable: true,
            render: (date) => moment(date, 'DD-MM-YYYY HH:mm:ss').format('DD/MM/YYYY HH:mm:ss'),
            sorter: (a, b) => moment(a.endDate).unix() - moment(b.endDate).unix(),
        },
        {
            title: 'Mô tả',
            dataIndex: 'description',
            key: 'description',
            width: 250,
            editable: true,
        },
    ];

    return (
        <>
            <CategoryTable
                dataSource={voucherData}
                columnsConfig={voucherColumns}
                dropdownOptions={[]}
                pageSize={10}
                scroll={{ x: 1800 }}
                loading={loading}
                onEditSave={handleSaveVoucher}
                onDelete={handleDeleteVoucher}
            />
        </>
    );
};

export default VoucherTable;









// import { useState, useEffect } from "react";
// import CategoryTable from "./CategoryTable";
// import axios from 'axios';
// // import { format, parse } from 'date-fns';
// import moment from "moment";

// const VoucherTable = () => {

//     const accessToken = localStorage.getItem("accessToken");
//     const token = `Bearer ${accessToken}`;

//     const [voucherData, setVoucherData] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const fetchVoucherData = async () => {
//             try {
//                 const response = await axios.get(
//                     'http://117.103.207.132:8080/furni-shop/vouchers/admin/get-all', {
//                     params: {
//                         page: 1,
//                         pageSize: 55,
//                         sortBy: 'voucherId',
//                         direction: 'asc',
//                     },
//                     headers: {
//                         Authorization: token,
//                     },
//                 });
//                 const data = response.data.result;
//                 setVoucherData(data.data.map(voucher => ({
//                     ...voucher,
//                     key: voucher.voucherId,
//                 })));

//                 setLoading(false);
//             } catch (error) {
//                 setError(error);
//                 setLoading(false);
//             }
//         };

//         fetchVoucherData();
//     }, []);

//     const handleSaveVoucher = async (updatedRow) => {
//         const { voucherId, ...updatedData } = updatedRow; 

//         try {
//             await axios.put(`http://117.103.207.132:8080/furni-shop/vouchers/admin/update/${voucherId}`, updatedData, {
//                 headers: {
//                     Authorization: token,
//                 },
//             });

//             setVoucherData((prevData) =>
//                 prevData.map((voucher) =>
//                     voucher.voucherId === voucherId ? { ...voucher, ...updatedData } : voucher
//                 )
//             );
//         } catch (error) {
//             console.error('Failed to update voucher:', error);
//         }
//     };

//     const handleDeleteVoucher = async (voucherId) => {
//         if (!voucherId) {
//             console.error('Voucher ID is undefined');
//             return;
//         }

//         try {
//             await axios.delete(`http://117.103.207.132:8080/furni-shop/vouchers/admin/delete/${voucherId}`, {
//                 headers: {
//                     Authorization: token,
//                 },
//             });

//             setVoucherData((prevVoucherData) =>
//                 prevVoucherData.filter((voucher) => voucher.voucherId !== voucherId)
//             );
//         } catch (error) {
//             console.error('Failed to delete voucher:', error);
//         }
//     };

//     if (loading) return <div>Loading...</div>;
//     if (error) return <div>Error fetching data!</div>;

//     const voucherColumns = [
//         {
//             title: 'ID',
//             dataIndex: 'voucherId',
//             key: 'voucherId',
//             width: 60,
//             editable: false,
//             align: 'center',
//             fixed: 'left',
//         },
//         {
//             title: 'Mã',
//             dataIndex: 'code',
//             key: 'code',
//             width: 80,
//             editable: true,
//         },
//         {
//             title: 'Tên',
//             dataIndex: 'title',
//             key: 'title',
//             width: 150,
//             editable: true,
//         },
//         {
//             title: 'Phần trăm giảm giá',
//             dataIndex: 'discountPercent',
//             inputType: 'number',
//             key: 'discountPercent',
//             width: 150,
//             editable: true,
//             render: (value) => `${value}%`,
//         },
//         {
//             title: 'Giá trị tối thiểu',
//             dataIndex: 'minValueOrder',
//             inputType: 'number',
//             key: 'minValueOrder',
//             width: 120,
//             editable: true,
//         },
//         {
//             title: 'Giá trị tối đa',
//             dataIndex: 'maxValueDiscount',
//             inputType: 'number',
//             key: 'maxValueDiscount',
//             width: 120,
//             editable: true,
//         },
//         {
//             title: 'Số lượng',
//             dataIndex: 'quantity',
//             inputType: 'number',
//             key: 'quantity',
//             width: 80,
//             editable: true,
//         },
//         {
//             title: 'Ngày bắt đầu',
//             dataIndex: 'startDate',
//             inputType: 'date',
//             key: 'startDate',
//             width: 160,
//             editable: true,
//             render: (date) => moment(date, 'DD/MM/YYYY HH:mm:ss').format('DD/MM/YYYY HH:mm:ss'),
//             // render: (date) => format(parse(date, 'dd-MM-yyyy HH:mm:ss', new Date()), 'dd/MM/yyyy'),
//         },
//         {
//             title: 'Ngày kết thúc',
//             dataIndex: 'endDate',
//             inputType: 'date',
//             key: 'endDate',
//             width: 160,
//             editable: true,
//             render: (date) => moment(date, 'DD-MM-YYYY HH:mm:ss').format('DD/MM/YYYY HH:mm:ss'),
//         },
//         {
//             title: 'Mô tả',
//             dataIndex: 'description',
//             key: 'description',
//             width: 250,
//             editable: true,
//         },
//     ];

//     return (
//         <>
//             <CategoryTable
//                 dataSource={voucherData}
//                 columnsConfig={voucherColumns}
//                 dropdownOptions={[]}
//                 pageSize={10}
//                 scroll={{ x: 1800 }}
//                 loading={loading}
//                 onEditSave={handleSaveVoucher}
//                 onDelete={handleDeleteVoucher}
//             />
//         </>
//     );
// };

// export default VoucherTable;









// import { useState, useEffect } from "react";
// import CategoryTable from "./CategoryTable";
// import axios from 'axios';
// import { format } from 'date-fns';

// const VoucherTable = () => {

//     const accessToken = localStorage.getItem("accessToken");
//     const token = `Bearer ${accessToken}`;

//     const [voucherData, setVoucherData] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const fetchVoucherData = async () => {
//             try {
//                 const response = await axios.get(
//                     'http://117.103.207.132:8080/furni-shop/vouchers/admin/get-all', {
//                     params: {
//                         page: 1,
//                         pageSize: 55,
//                         sortBy: 'voucherId',
//                         direction: 'desc',
//                     },
//                     headers: {
//                         Authorization: token,
//                     },
//                 });
//                 const data = response.data.result;
//                 setVoucherData(data.data);
//                 setLoading(false);
//             } catch (error) {
//                 setError(error);
//                 setLoading(false);
//             }
//         };

//         fetchVoucherData();
//     }, []);

//     if (loading) return <div>Loading...</div>;
//     if (error) return <div>Error fetching data!</div>;

//     const voucherColumns = [
//         {
//             title: 'ID',
//             dataIndex: 'voucherId',
//             key: 'voucherId',
//             width: 60,
//             editable: false,
//             align: 'center',
//             fixed: 'left',
//         },
//         {
//             title: 'Mã',
//             dataIndex: 'code',
//             key: 'code',
//             width: 100,
//             editable: true,
//         },
//         {
//             title: 'Tên',
//             dataIndex: 'title',
//             key: 'title',
//             width: 150,
//             editable: true,
//         },
//         {
//             title: 'Phần trăm giảm giá',
//             dataIndex: 'discountPercent',
//             inputType: 'number',
//             key: 'discountPercent',
//             width: 150,
//             editable: true,
//             render: (value) => `${value}%`,
//         },
//         {
//             title: 'Giá trị tối thiểu',
//             dataIndex: 'minValueOrder',
//             inputType: 'number',
//             key: 'minValueOrder',
//             width: 120,
//             editable: true,
//         },
//         {
//             title: 'Giá trị tối đa',
//             dataIndex: 'maxValueDiscount',
//             inputType: 'number',
//             key: 'maxValueDiscount',
//             width: 120,
//             editable: true,
//         },
//         {
//             title: 'Số lượng',
//             dataIndex: 'quantity',
//             inputType: 'number',
//             key: 'quantity',
//             width: 80,
//             editable: true,
//         },
//         {
//             title: 'Ngày bắt đầu',
//             dataIndex: 'startDate',
//             inputType: 'date',
//             key: 'startDate',
//             width: 160,
//             editable: true,
//             // render: (date) => format(new Date(date), 'dd/MM/yyyy'),
//         },
//         {
//             title: 'Ngày kết thúc',
//             dataIndex: 'endDate',
//             inputType: 'date',
//             key: 'endDate',
//             width: 160,
//             editable: true,
//             // render: (date) => format(new Date(date), 'dd/MM/yyyy'),
//             // render: (date) => date ? format(new Date(date), 'dd/MM/yyyy') : 'N/A',
//         },
//         {
//             title: 'Mô tả',
//             dataIndex: 'description',
//             key: 'description',
//             width: 250,
//             editable: true,
//         },
//     ]


//     return (
//         <>
//             <CategoryTable dataSource={voucherData} columnsConfig={voucherColumns}
//                 dropdownOptions={[]} pageSize={10} scroll={{ x: 1800 }} loading={loading} />
//         </>
//     );
// };

// export default VoucherTable;