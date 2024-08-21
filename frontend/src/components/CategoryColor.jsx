/* eslint-disable react-hooks/exhaustive-deps */
import { Link } from "react-router-dom";
import CategoryTable from "./CategoryTable";
import { useState, useEffect } from "react";
import axios from 'axios';

const CategoryColor = () => {

    const accessToken = localStorage.getItem("accessToken");
    const token = `Bearer ${accessToken}`;

    const [colorData, setColorData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchColorData = async () => {
            try {
                const response = await axios.get(
                    'http://117.103.207.132:8080/furni-shop/categories/color?page=1&pageSize=55&sortBy=colorId&dierction=asc', {
                    headers: {
                        Authorization: token,
                    },
                });
                const data = response.data.result;
                setColorData(data.data.map(color => ({
                    ...color,
                    key: color.colorId, 
                })));
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        fetchColorData();
    }, []);


    const handleEditSave = async (updatedColor) => {
        const { colorId, colorCode } = updatedColor;
        
        try {
            await axios.put(
                `http://117.103.207.132:8080/furni-shop/categories/color/${colorId}`,
                { colorCode }, 
                {
                    headers: {
                        Authorization: token,
                    },
                }
            );

            setColorData((prevColorData) =>
                prevColorData.map((color) =>
                    color.colorId === colorId ? { ...color, colorCode } : color
                )
            );
        } catch (error) {
            console.error('Failed to edit color:', error);
        }
    };

    const handleDeleteColor = async (colorId) => {
        if (!colorId) {
            console.error('Color ID is undefined');
            return;
        }
    
        try {
            await axios.delete(`http://117.103.207.132:8080/furni-shop/categories/color/${colorId}`, {
                headers: {
                    Authorization: token,
                },
            });
    
            setColorData((prevColorData) =>
                prevColorData.filter((color) => color.colorId !== colorId)
            );
        } catch (error) {
            console.error('Failed to delete color:', error);
        }
    };
    
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error fetching data!</div>;

    const colorColumns = [
        {
            title: 'ID',
            dataIndex: 'colorId',
            key: 'colorId',
            width: '10%',
            editable: false,
            align: 'center',
            sorter: (a, b) => a.colorId - b.colorId,
        },
        {
            title: 'Mã màu',
            dataIndex: 'colorCode',
            width: '60%',
            editable: true,
            inputType: 'color',
            render: (text) => (
                <div className='flex items-center justify-center gap-3'>
                    <div
                        style={{
                            backgroundColor: text,
                            width: '30px',
                            height: '28px',
                            textAlign: 'start',
                            color: text,
                        }}
                    >
                        <span className='text-transparent cursor-default'>{text}</span>
                    </div>
                    <span>{text}</span>
                </div>
            ),
        },
    ];
    return (
        <div className="">
            <div className="flex justify-between mb-4 px-3">
                <div className="text-xl font-bold cursor-default">Màu sắc</div>
                <Link to='/category/add-color' >
                    <button className="bg-blue-600 px-3 py-1 text-white rounded-[6px] ">
                        Thêm màu sắc
                    </button>
                </Link>
            </div>
            <div className="">
                <CategoryTable dataSource={colorData} columnsConfig={colorColumns} loading={loading}
                    dropdownOptions={[]} onEditSave={handleEditSave} onDelete={handleDeleteColor}  />
            </div>
        </div>
    );
};

export default CategoryColor;
