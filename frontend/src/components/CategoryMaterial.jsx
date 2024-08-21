import { Link } from "react-router-dom";
import CategoryTable from "./CategoryTable";
import { useState, useEffect } from "react";
import axios from 'axios';

export default function CategoryMaterial() {

  const accessToken = localStorage.getItem("accessToken");
  const token = `Bearer ${accessToken}`;

  const [materialData, setMaterialData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMaterialData = async () => {
      try {
        const response = await axios.get(
          'http://117.103.207.132:8080/furni-shop/categories/material?page=1&pageSize=55&sortBy=materialId&dierction=asc', {
          headers: {
            Authorization: token,
          },
        });
        const data = response.data.result;
        setMaterialData(data.data.map(material => ({
          ...material,
          key: material.materialId,
        })));
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchMaterialData();
  }, []);

  const handleSaveMaterial = async (materialId, updatedData) => {
    try {
      await axios.put(`http://117.103.207.132:8080/furni-shop/categories/material/${materialId}`, updatedData, {
        headers: {
          Authorization: token,
        },
      });
      setMaterialData((prevData) => prevData.map((material) =>
        material.materialId === materialId ? { ...material, ...updatedData } : material
      ));
    } catch (error) {
      console.error('Failed to update material:', error);
    }
  };

  const handleDeleteMaterial = async (materialId) => {
    if (!materialId) {
      console.error('Material ID is undefined');
      return;
    }

    try {
      await axios.delete(`http://117.103.207.132:8080/furni-shop/categories/material/${materialId}`, {
        headers: {
          Authorization: token,
        },
      });

      setMaterialData((prevMaterialData) =>
        prevMaterialData.filter((material) => material.materialId !== materialId)
      );
    } catch (error) {
      console.error('Failed to delete material:', error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error fetching data!</div>;

  const materialColumns = [
    {
      title: 'ID',
      dataIndex: 'materialId',
      key: 'materialId',
      width: '10%',
      editable: false,
      align: 'center',
      sorter: (a, b) => a.materialId - b.materialId,
    },
    {
      title: 'Chất liệu',
      dataIndex: 'name',
      key: 'name',
      width: '60%',
      editable: true,
    },
  ];

  return (
    <>
      <div className="">
        <div className="flex justify-between mb-4 px-3">
          <div className="text-xl font-bold cursor-default">Chất liệu</div>
          <Link to='/category/add-material' >
            <button className="bg-blue-600 px-3 py-1 text-white rounded-[6px] ">
              Thêm chất liệu
            </button>
          </Link>
        </div>
        <div className="">
          <CategoryTable
            dataSource={materialData}
            columnsConfig={materialColumns}
            dropdownOptions={[]}
            loading={loading}
            onSave={handleSaveMaterial}
            onDelete={handleDeleteMaterial}
          />
        </div>
      </div>
    </>
  )
}
