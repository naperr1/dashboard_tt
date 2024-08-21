/* eslint-disable react/prop-types */
// import { useState } from 'react';
// import { FaArrowLeftLong, FaPlus, FaTrash } from 'react-icons/fa6';
// import { Link } from 'react-router-dom';
// import { toast, ToastContainer } from 'react-toastify';
// import axios from 'axios';

// const AddCategory = () => {
//   const [categoryName, setCategoryName] = useState('');
//   const [subCategories, setSubCategories] = useState([{ name: '' }]);
//   const [parentId, setParentId] = useState('');

//   const handleAddSubCategory = () => {
//     setSubCategories([...subCategories, { name: '' }]);
//   };

//   const handleRemoveSubCategory = (index) => {
//     const updatedSubCategories = [...subCategories];
//     updatedSubCategories.splice(index, 1);
//     setSubCategories(updatedSubCategories);
//   };

//   const handleSubCategoryChange = (index, value) => {
//     const updatedSubCategories = [...subCategories];
//     updatedSubCategories[index].name = value;
//     setSubCategories(updatedSubCategories);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const accessToken = localStorage.getItem("accessToken");
//       const token = `Bearer ${accessToken}`;

//       await axios.post(
//         'http://117.103.207.132:8080/furni-shop/categories/add-new-category',
//         {
//           name: categoryName,
//           subCategories,
//         },
//         {
//           headers: {
//             Authorization: token,
//           },
//         }
//       );

//       toast.success('Category added successfully!');
//       setCategoryName('');
//       setSubCategories([{ name: '' }]); 
//     } catch (error) {
//       toast.error('Failed to add category!');
//     }
//   };

//   return (
//     <div className='mt-20'>
//       <Link to='/category' className='absolute top-[84px] left-64 px-4 py-2 bg-cyan-400 rounded-md text-white'>
//         <FaArrowLeftLong />
//       </Link>
//       <h1 className="font-bold text-2xl text-center mb-4">Nhập phân loại</h1>
//       <form onSubmit={handleSubmit} className="px-8 py-3 max-w-[40%] mx-auto flex flex-col gap-3">
//         <div className="flex flex-col gap-1 border border-gray-400 pt-1 pb-2 px-4 rounded-lg">
//           <h2 className="text-xl font-semibold cursor-default">Phân loại</h2>
//           <input
//             className='outline-none py-2 rounded-lg'
//             type="text"
//             value={categoryName}
//             onChange={(e) => setCategoryName(e.target.value)}
//             placeholder="Nhập tên phân loại"
//           />
//         </div>
//         <div className="flex flex-col gap-1 border border-gray-400 pt-1 pb-2 px-4 rounded-lg">
//           <h2 className="text-xl font-semibold cursor-default">Id cấp</h2>
//           <input
//             className='outline-none'
//             type="number"
//             value={parentId}
//             onChange={(e) => setParentId(e.target.value)}
//             required
//           />
//         </div>
//         <div className="flex flex-col gap-2 border border-gray-400 pt-1 pb-2 px-4 rounded-lg">
//           <h2 className="text-xl font-semibold cursor-default">Phân loại con</h2>
//           {subCategories.map((subCategory, index) => (
//             <div key={index} className="flex items-center gap-2">
//               <input
//                 type="text"
//                 className="flex-1 outline-none py-2 px-4 border border-gray-300 rounded-lg"
//                 value={subCategory.name}
//                 onChange={(e) => handleSubCategoryChange(index, e.target.value)}
//                 placeholder="Nhập tên phân loại con"
//               />
//               <button
//                 type="button"
//                 className="p-2 bg-red-500 text-white rounded-full"
//                 onClick={() => handleRemoveSubCategory(index)}
//                 disabled={subCategories.length === 1}
//               >
//                 <FaTrash />
//               </button>
//             </div>
//           ))}
//           <button
//             type="button"
//             className="flex items-center justify-center gap-2 bg-green-500 py-2 px-4 text-white rounded-lg"
//             onClick={handleAddSubCategory}
//           >
//             <FaPlus /> Thêm phân loại con
//           </button>
//         </div>

//         <div className="flex justify-center mt-4">
//           <button type="submit" className="bg-cyan-400 py-2 px-12 text-white rounded-xl">
//             Thêm
//           </button>
//         </div>
//       </form>
//       <ToastContainer />
//     </div>
//   );
// };

// export default AddCategory;





import { useState } from 'react';
import { FaArrowLeftLong, FaPlus, FaTrash } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';

const AddCategory = () => {
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

        try {
            const mainCategoryResponse = await axios.post(
                'http://117.103.207.132:8080/furni-shop/categories/add-new-category',
                { name: categoryName },
                { headers: { Authorization: token } }
            );

            const categoryId = mainCategoryResponse.data.result.categoryId;
            toast.success('Category added successfully!');

            for (let subcategory of subcategories) {
                if (subcategory.name) {
                    await axios.post(
                        'http://117.103.207.132:8080/furni-shop/categories/add-new-category',
                        { name: subcategory.name, parentId: categoryId },
                        { headers: { Authorization: token } }
                    );
                }
            }

            toast.success('Subcategories added successfully!');
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
            <h1 className="font-bold text-2xl text-center mb-4">Nhập phân loại</h1>
            <form
                onSubmit={handleSubmit}
                className="px-8 py-3 max-w-[40%] mx-auto flex flex-col gap-3">
                <div className="flex flex-col gap-1 border border-gray-400 pt-1 pb-2 px-4 rounded-lg">
                    <h2 className="text-xl font-semibold cursor-default">Tên danh mục</h2>
                    <input
                        className='outline-none py-2 rounded-lg'
                        type="text"
                        value={categoryName}
                        onChange={(e) => setCategoryName(e.target.value)}
                        placeholder="Nhập tên danh mục"
                        required
                    />
                </div>

                <div className="flex flex-col gap-3 border border-gray-400 pt-1 pb-2 px-4 rounded-lg">
                    <h2 className="text-xl font-semibold cursor-default">Danh mục con</h2>
                    {subcategories.map((subcategory, index) => (
                        <div key={index} className="flex items-center gap-2">
                            <input
                                type="text"
                                className="flex-1 outline-none py-2 px-4 border border-gray-300 rounded-lg"
                                value={subcategory.name}
                                onChange={(e) => handleSubcategoryChange(index, e.target.value)}
                                placeholder="Nhập tên phân loại con"
                            />
                            <button
                                type="button"
                                className="p-2 bg-red-500 text-white rounded-full"
                                onClick={() => handleRemoveSubcategory(index)}
                                disabled={subcategories.length === 1}
                            >
                                <FaTrash />
                            </button>
                        </div>
                    ))}
                    <button
                        type="button"
                        className="flex items-center justify-center gap-2 bg-green-500 py-2 px-4 text-white rounded-lg"
                        onClick={handleAddSubcategory}
                    >
                        <FaPlus /> Thêm phân loại con
                    </button>
                </div>

                <div className="flex justify-center">
                    <button type='submit' className="bg-cyan-400 py-2 px-12 text-white rounded-xl">
                        Thêm
                    </button>
                </div>
            </form>
            <ToastContainer />
        </div>
    );
}

export default AddCategory;










// import { useState, useEffect } from 'react';
// import { FaArrowLeftLong, FaPlus, FaTrash } from 'react-icons/fa6';
// import { Link } from 'react-router-dom';
// import { toast, ToastContainer } from 'react-toastify';
// import axios from 'axios';

// const AddCategory = ({ categoryId }) => {
//     const [categoryName, setCategoryName] = useState('');
//     const [subCategories, setSubCategories] = useState([{ name: '' }]);

//     useEffect(() => {
//         const fetchCategoryData = async () => {
//             try {
//                 const accessToken = localStorage.getItem("accessToken");
//                 const token = `Bearer ${accessToken}`;

//                 const response = await axios.get(
//                     `http://117.103.207.132:8080/furni-shop/categories/category/${categoryId}`,
//                     {
//                         headers: {
//                             Authorization: token,
//                         },
//                     }
//                 );

//                 const data = response.data.result;
//                 setCategoryName(data.name);
//                 if (data.subCategoriesInfo) {
//                     setSubCategories(data.subCategoriesInfo);
//                 }
//             } catch (error) {
//                 toast.error('Failed to fetch category data!');
//             }
//         };

//         fetchCategoryData();
//     }, [categoryId]);

//     const handleAddSubCategory = () => {
//         setSubCategories([...subCategories, { name: '' }]);
//     };

//     const handleRemoveSubCategory = (index) => {
//         const updatedSubCategories = [...subCategories];
//         updatedSubCategories.splice(index, 1);
//         setSubCategories(updatedSubCategories);
//     };

//     const handleSubCategoryChange = (index, value) => {
//         const updatedSubCategories = [...subCategories];
//         updatedSubCategories[index].name = value;
//         setSubCategories(updatedSubCategories);
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const accessToken = localStorage.getItem("accessToken");
//             const token = `Bearer ${accessToken}`;

//             await axios.post(
//                 'http://117.103.207.132:8080/furni-shop/categories/add-new-category',
//                 {
//                     name: categoryName,
//                     subCategories: subCategories.map(sub => ({
//                         name: sub.name,
//                     })),
//                 },
//                 {
//                     headers: {
//                         Authorization: token,
//                     },
//                 }
//             );

//             toast.success('Category added successfully!');
//             setCategoryName('');
//             setSubCategories([{ name: '' }]);
//         } catch (error) {
//             toast.error('Failed to add category!');
//         }
//     };

//     return (
//         <div className='mt-20 relative'>
//             <Link to='/category' className='absolute top-[84px] left-64 px-4 py-2 bg-cyan-400 rounded-md text-white'>
//                 <FaArrowLeftLong />
//             </Link>
//             <h1 className="font-bold text-2xl text-center mb-4">Thêm phân loại</h1>
//             <form onSubmit={handleSubmit} className="px-8 py-3 max-w-[40%] mx-auto flex flex-col gap-3">
//                 <div className="flex flex-col gap-1 border border-gray-400 pt-1 pb-2 px-4 rounded-lg">
//                     <h2 className="text-xl font-semibold cursor-default">Phân loại</h2>
//                     <input
//                         className='outline-none py-2 px-4 border border-gray-300 rounded-lg'
//                         type="text"
//                         value={categoryName}
//                         onChange={(e) => setCategoryName(e.target.value)}
//                         placeholder="Nhập tên phân loại"
//                     />
//                 </div>

//                 <div className="flex flex-col gap-2 border border-gray-400 pt-1 pb-2 px-4 rounded-lg">
//                     <h2 className="text-xl font-semibold cursor-default">Phân loại con</h2>
//                     {subCategories.map((subCategory, index) => (
//                         <div key={index} className="flex items-center gap-2">
//                             <input
//                                 type="text"
//                                 className="flex-1 outline-none py-2 px-4 border border-gray-300 rounded-lg"
//                                 value={subCategory.name}
//                                 onChange={(e) => handleSubCategoryChange(index, e.target.value)}
//                                 placeholder="Nhập tên phân loại con"
//                             />
//                             <button
//                                 type="button"
//                                 className="p-2 bg-red-500 text-white rounded-full"
//                                 onClick={() => handleRemoveSubCategory(index)}
//                                 disabled={subCategories.length === 1}
//                             >
//                                 <FaTrash />
//                             </button>
//                         </div>
//                     ))}
//                     <button
//                         type="button"
//                         className="flex items-center justify-center gap-2 bg-green-500 py-2 px-4 text-white rounded-lg"
//                         onClick={handleAddSubCategory}
//                     >
//                         <FaPlus /> Thêm phân loại con
//                     </button>
//                 </div>

//                 <div className="flex justify-center mt-4">
//                     <button type="submit" className="bg-cyan-400 py-2 px-12 text-white rounded-xl">
//                         Thêm
//                     </button>
//                 </div>
//             </form>
//             <ToastContainer />
//         </div>
//     );
// };

// export default AddCategory;




