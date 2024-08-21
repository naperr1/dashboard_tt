import CategoryTable from "./CategoryTable";
import { useState, useEffect } from "react";
import axios from 'axios';
// import { format } from 'date-fns';
import dayjs from 'dayjs';
import { useNavigate } from "react-router-dom";

const SaleTable = () => {

    const accessToken = localStorage.getItem("accessToken");
    const token = `Bearer ${accessToken}`;

    const [saleData, setSaleData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSaleData = async () => {
            try {
                const response = await axios.get(
                    'http://117.103.207.132:8080/furni-shop/sales?page=1&pageSize=55&sortBy=saleId&direction=asc', {
                    headers: {
                        Authorization: token,
                    },
                });
                const data = response.data.result;
                setSaleData(data.data.map(sale => ({
                    ...sale,
                    key: sale.saleId,
                })));
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        fetchSaleData();
    }, []);

    const handleSaveSale = async (updatedRow) => {
        const { saleId, ...updatedData } = updatedRow; 

        try {
            await axios.put(`http://117.103.207.132:8080/furni-shop/sales/${saleId}`, updatedData, {
                headers: {
                    Authorization: token,
                },
            });

            setSaleData((prevData) =>
                prevData.map((sale) =>
                    sale.saleId === saleId ? { ...sale, ...updatedData } : sale
                )
            );
        } catch (error) {
            console.error('Failed to update sale:', error);
        }
    };

    const handleDeleteSale = async (saleId) => {
        if (!saleId) {
            console.error('Sale ID is undefined');
            return;
        }

        try {
            await axios.delete(`http://117.103.207.132:8080/furni-shop/sales/${saleId}`, {
                headers: {
                    Authorization: token,
                },
            });

            setSaleData((prevSaleData) =>
                prevSaleData.filter((sale) => sale.saleId !== saleId)
            );
        } catch (error) {
            console.error('Failed to delete sale:', error);
        }
    };

    const navigate = useNavigate();

    const handleRowClick = (saleId) => {
        navigate(`/sale/${saleId}`);
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error fetching data!</div>;

    const saleColumns = [
        {
            title: 'ID',
            dataIndex: 'saleId',
            key: 'id',
            width: 90,
            editable: false,
            align: 'center',
            sorter: (a, b) => a.saleId - b.saleId,
            render: (text, record) => (
                <span
                    className="text-black cursor-pointer"
                    onClick={() => handleRowClick(record.saleId)}
                >
                    {text}
                </span>
            ),

        },
        {
            title: 'ID sản phẩm',
            dataIndex: 'productId',
            key: 'product_id',
            width: 90,
            editable: false,
            align: 'center',
            sorter: (a, b) => a.productId - b.productId,
        },
        {
            title: 'Giảm giá',
            dataIndex: 'percent',
            inputType: 'number',
            width: 100,
            editable: true,
            render: (value) => `${value}%`,
            sorter: (a, b) => a.percent - b.percent,
        },
        {
            title: 'Ngày bắt đầu',
            dataIndex: 'startDate',
            inputType: 'date',
            key: 'startDate',
            width: 200,
            editable: true,
            // render: (date) => format(new Date(date), 'dd/MM/yyyy'),
            render: (date) => date ? dayjs(date).format('DD/MM/YYYY HH:mm:ss') : '',
            sorter: (a, b) => dayjs(a.startDate).unix() - dayjs(b.startDate).unix(),
        },
        {
            title: 'Ngày kết thúc',
            dataIndex: 'endDate',
            inputType: 'date',
            key: 'endDate',
            width: 200,
            editable: true,
            // render: (date) => format(new Date(date), 'dd/MM/yyyy'),
            render: (date) => date ? dayjs(date).format('DD/MM/YYYY HH:mm:ss') : '',
            sorter: (a, b) => dayjs(a.endDate).unix() - dayjs(b.endDate).unix(),
        },
    ];

    return (
        <>
            <CategoryTable
                dataSource={saleData}
                columnsConfig={saleColumns}
                dropdownOptions={[]}
                pageSize={10}
                loading={loading}
                onEditSave={handleSaveSale}
                onDelete={handleDeleteSale}
            />
        </>
    );
}

export default SaleTable;
