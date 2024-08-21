// import React from 'react';
// import { Table, Button } from 'antd';

// const CategoryTable = ({ data }) => {
//   const columns = [
//     {
//       title: 'Category ID',
//       dataIndex: 'categoryId',
//       key: 'categoryId',
//     },
//     {
//       title: 'Category Name',
//       dataIndex: 'name',
//       key: 'name',
//     },
//     {
//       title: 'Subcategory Name',
//       dataIndex: 'subCategoriesInfo',
//       key: 'subCategoriesInfo',
//       render: subCategories => (
//         subCategories.length > 0
//           ? subCategories.map(sub => (
//               <div 
//                 key={sub.categoryId} 
//                 style={{
//                   borderBottom: '1px solid #d0d0d0',
//                   padding: '10px 0',
//                   backgroundColor: '#fafafa',
//                   borderRadius: '4px',
//                 }}
//               >
//                 {sub.name}
//               </div>
//             ))
//           : <div>No Subcategories</div>
//       ),
//     },
//     {
//       title: 'Actions',
//       key: 'actions',
//       render: (_, record) => (
//         <div>
//           <Button type="link" onClick={() => console.log('Edit:', record)}>Edit</Button>
//           <Button type="link" danger onClick={() => console.log('Delete:', record)}>Delete</Button>
//         </div>
//       ),
//     },
//   ];

//   return (
//     <Table
//       columns={columns}
//       dataSource={data}
//       rowKey="categoryId"
//       pagination={{ pageSize: 10 }}
//     />
//   );
// };

// // Example data based on your JSON
// const data = [
//   {
//     categoryId: 1,
//     name: 'Phòng ngủ',
//     subCategoriesInfo: [
//       { categoryId: 5, name: 'Đèn ngủ', parentId: 1 },
//       { categoryId: 6, name: 'Giường', parentId: 1 },
//       { categoryId: 7, name: 'Tủ chén', parentId: 1 },
//       { categoryId: 13, name: 'Áo chống nắng', parentId: 1 },
//     ],
//   },
//   {
//     categoryId: 2,
//     name: 'Phòng bếp',
//     subCategoriesInfo: [
//       { categoryId: 8, name: 'Ghế phòng ăn', parentId: 2 },
//     ],
//   },
//   {
//     categoryId: 3,
//     name: 'Phòng tắm',
//     subCategoriesInfo: [
//       { categoryId: 9, name: 'Chậu rửa mặt', parentId: 3 },
//       { categoryId: 10, name: 'Bồn tắm', parentId: 3 },
//     ],
//   },
// ];

// const Test = () => <CategoryTable data={data} />;

// export default Test;








import { useState } from 'react';
import { FaArrowLeftLong } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';

const Test = () => {
  const accessToken = localStorage.getItem("accessToken");
  const token = `Bearer ${accessToken}`;

  const [categoryName, setCategoryName] = useState('');
  const [subcategories, setSubcategories] = useState([{ name: '' }]);

  const handleAddSubcategory = () => {
    setSubcategories([...subcategories, { name: '' }]);
  };

  const handleRemoveSubcategory = (index) => {
    const newSubcategories = subcategories.filter((_, i) => i !== index);
    setSubcategories(newSubcategories);
  };

  const handleSubcategoryChange = (index, value) => {
    const newSubcategories = subcategories.map((subcat, i) => (
      i === index ? { name: value } : subcat
    ));
    setSubcategories(newSubcategories);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newCategory = {
      name: categoryName,
      subCategoriesInfo: subcategories.filter(subcat => subcat.name !== '')
    };

    try {
      await axios.post(
        'http://117.103.207.132:8080/furni-shop/categories/add-new-category',
        newCategory,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      toast.success(`Category and subcategories added successfully!`);
      setCategoryName('');
      setSubcategories([{ name: '' }]);
    } catch (error) {
      console.error('Error adding category and subcategories:', error);
      toast.error('Failed to add category and subcategories.');
    }
  };

  return (
    <div className='mt-20'>
      <Link to='/category'
        className='absolute top-[84px] left-64 px-4 py-2 bg-cyan-400 rounded-md text-white'>
        <FaArrowLeftLong />
      </Link>
      <h1 className="font-bold text-2xl text-center mb-2">Nhập danh mục và danh mục con</h1>
      <form
        onSubmit={handleSubmit}
        className="px-8 py-3 max-w-[40%] mx-auto flex flex-col gap-3">
        <div className="flex flex-col gap-1 border border-gray-400 pt-1 pb-2 px-4 rounded-lg">
          <h2 className="text-xl font-semibold cursor-default">Tên danh mục</h2>
          <input
            className='outline-none'
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            type="text"
            required
          />
        </div>

        <h2 className="text-xl font-semibold mt-3 cursor-default">Danh mục con</h2>
        {subcategories.map((subcategory, index) => (
          <div key={index} className="flex items-center gap-3">
            <input
              className='outline-none flex-1 border border-gray-400 py-1 px-2 rounded-lg'
              value={subcategory.name}
              onChange={(e) => handleSubcategoryChange(index, e.target.value)}
              type="text"
              placeholder="Subcategory Name"
            />
            {subcategories.length > 1 && (
              <button type="button" onClick={() => handleRemoveSubcategory(index)} className="text-red-500">
                Remove
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddSubcategory}
          className="mt-2 text-blue-500">
          Add Another Subcategory
        </button>

        <div className="flex justify-center mt-4">
          <button type='submit'
            className="bg-cyan-400 py-2 px-12 text-white rounded-xl">
            Thêm
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
}

export default Test;


