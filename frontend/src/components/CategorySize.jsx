import { Link } from "react-router-dom";
import CategoryTable from "./CategoryTable";
import { useState, useEffect } from "react";
import axios from 'axios';

export default function CategorySize() {

  const accessToken = localStorage.getItem("accessToken");
  const token = `Bearer ${accessToken}`;

  const [sizeData, setSizeData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSizeData = async () => {
      try {
        const response = await axios.get(
          'http://117.103.207.132:8080/furni-shop/categories/size?page=1&pageSize=55&sortBy=sizeId&dierction=asc', {
          headers: {
            Authorization: token,
          },
        });
        const data = response.data.result;
        setSizeData(data.data.map(size => ({
          ...size,
          key: size.sizeId,
        })));
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchSizeData();
  }, []);

  const handleSaveSize = async (sizeId, updatedData) => {
    try {
      await axios.put(`http://117.103.207.132:8080/furni-shop/categories/size/${sizeId}`, updatedData, {
        headers: {
          Authorization: token,
        },
      });

      setSizeData((prevData) =>
        prevData.map((size) =>
          size.sizeId === sizeId ? { ...size, ...updatedData } : size
        )
      );
    } catch (error) {
      console.error('Failed to update size:', error);
    }
  };

  const handleDeleteSize = async (sizeId) => {
    if (!sizeId) {
      console.error('Size ID is undefined');
      return;
    }

    try {
      await axios.delete(`http://117.103.207.132:8080/furni-shop/categories/size/${sizeId}`, {
        headers: {
          Authorization: token,
        },
      });

      setSizeData((prevSizeData) =>
        prevSizeData.filter((size) => size.sizeId !== sizeId)
      );
    } catch (error) {
      console.error('Failed to delete size:', error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error fetching data!</div>;

  const sizeColumns = [
    {
      title: 'ID',
      dataIndex: 'sizeId',
      key: 'sizeId',
      width: '10%',
      editable: false,
      align: 'center',
      sorter: (a, b) => a.sizeId - b.sizeId,
    },
    {
      title: 'Kích thước',
      dataIndex: 'name',
      key: 'name',
      width: '60%',
      editable: true,
      align: 'center',
    },
  ];

  return (
    <>
      <div className="">
        <div className="flex justify-between mb-4 px-3">
          <div className="text-xl font-bold cursor-default">Kích thước</div>
          <Link to='/category/add-size' >
            <button className="bg-blue-600 px-3 py-1 text-white rounded-[6px] ">
              Thêm kích thước
            </button>
          </Link>
        </div>
        <div className="">
          <CategoryTable
            dataSource={sizeData}
            columnsConfig={sizeColumns}
            dropdownOptions={[]}
            loading={loading}
            onSave={handleSaveSize}
            onDelete={handleDeleteSize}
          />
        </div>
      </div>
    </>
  )
}
