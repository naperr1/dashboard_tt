import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CategoryTable from "./CategoryTable";

const CategoryCategory = () => {

    const accessToken = localStorage.getItem("accessToken");
    const token = `Bearer ${accessToken}`;

    const [categoryData, setCategoryData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCategoryData = async () => {
            try {
                const response = await axios.get(
                    'http://117.103.207.132:8080/furni-shop/categories/category?page=1&pageSize=55&sortBy=categoryId&direction=asc', {
                    headers: {
                        Authorization: token,
                    },
                });
                const data = response.data.result;
                setCategoryData(data.data.map(category => ({
                    ...category,
                    key: category.categoryId,
                })));
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
                toast.error('Error fetching category data!');
            }
        };

        fetchCategoryData();
    }, []);

    const handleSaveCategory = async (updatedRow) => {
        console.log('Saving category:', updatedRow);
        const { categoryId, ...updatedData } = updatedRow;
        try {
            await axios.put(`http://117.103.207.132:8080/furni-shop/categories/category/${categoryId}`, updatedData, {
                headers: {
                    Authorization: token,
                },
            });
    
            setCategoryData((prevData) =>
                prevData.map((category) =>
                    category.categoryId === categoryId ? { ...category, ...updatedData } : category
                )
            );
            console.log('Category data after update:', categoryData);
            toast.success('Category updated successfully!');
        } catch (error) {
            console.error('Failed to update category:', error);
            toast.error('Failed to update category!');
        }
    };

    const handleDeleteCategory = async (categoryId) => {
        if (!categoryId) {
            console.error('Category ID is undefined');
            return;
        }

        try {
            await axios.delete(`http://117.103.207.132:8080/furni-shop/categories/category/${categoryId}`, {
                headers: {
                    Authorization: token,
                },
            });

            setCategoryData((prevCategoryData) =>
                prevCategoryData.filter((category) => category.categoryId !== categoryId)
            );
            toast.success('Category deleted successfully!');
        } catch (error) {
            console.error('Failed to delete category:', error);
            toast.error('Failed to delete category!');
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error fetching data!</div>;

    const categoryColumns = [
        {
            title: 'ID',
            dataIndex: 'categoryId',
            key: 'categoryId',
            width: '10%',
            editable: false,
            align: 'center',
            sorter: (a, b) => a.categoryId - b.categoryId,
        },
        {
            title: 'Loại',
            dataIndex: 'name',
            key: 'name',
            width: '30%',
            editable: true,
        },
        {
            title: 'Phân loại con',
            dataIndex: 'subCategoriesInfo',
            key: 'subCategoriesInfo',
            width: '30%',
            align: 'center',
            render: subCategories => (
                subCategories.length > 0
                    ? subCategories.map(sub => (
                        <div key={sub.categoryId} className="border border-white border-b-[#d0d0d0] 
                        bg-[#fafafa] rounded-md py-[8px] cursor-default hover:border-indigo-300">
                            {sub.name}
                        </div>
                    ))
                    : <div>N/A</div>
            ),
        },
    ];

    return (
        <>
            <div className="">
                <div className="flex justify-between mb-4 px-3">
                    <div className="text-xl font-bold cursor-default">Phân loại</div>
                    <Link to='/category/add-category'>
                        <button className="bg-blue-600 px-3 py-1 text-white rounded-[6px]">
                            Thêm phân loại
                        </button>
                    </Link>
                </div>
                <div className="">
                    <CategoryTable
                        dataSource={categoryData}
                        columnsConfig={categoryColumns}
                        dropdownOptions={[]}
                        loading={loading}
                        pageSize={1}
                        onEditSave={handleSaveCategory} 
                        onDelete={handleDeleteCategory}
                    />
                </div>
            </div>
        </>
    );
}

export default CategoryCategory;









// import { Link } from "react-router-dom";
// import { useState, useEffect } from "react";
// import axios from 'axios';
// import CategoryTable from "./CategoryTable";

// const CategoryCategory = () => {

//     const accessToken = localStorage.getItem("accessToken");
//     const token = `Bearer ${accessToken}`;

//     const [categoryData, setCategoryData] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const fetchCategoryData = async () => {
//             try {
//                 const response = await axios.get(
//                     'http://117.103.207.132:8080/furni-shop/categories/category?page=1&pageSize=55&sortBy=categoryId&direction=asc', {
//                     headers: {
//                         Authorization: token,
//                     },
//                 });
//                 const data = response.data.result;
//                 setCategoryData(data.data.map(category => ({
//                     ...category,
//                     key: category.categoryId,
//                 })));
//                 setLoading(false);
//             } catch (error) {
//                 setError(error);
//                 setLoading(false);
//             }
//         };

//         fetchCategoryData();
//     }, []);

//     const handleSaveCategory = async (updatedRow) => {
//         const { categoryId, ...updatedData } = updatedRow; 
//         try {
//             await axios.put(`http://117.103.207.132:8080/furni-shop/categories/category/${categoryId}`, updatedData, {
//                 headers: {
//                     Authorization: token,
//                 },
//             });

//             setCategoryData((prevData) =>
//                 prevData.map((category) =>
//                     category.categoryId === categoryId ? { ...category, ...updatedData } : category
//                 )
//             );
//         } catch (error) {
//             console.error('Failed to update category:', error);
//         }
//     };

//     const handleDeleteCategory = async (categoryId) => {
//         if (!categoryId) {
//             console.error('Category ID is undefined');
//             return;
//         }

//         try {
//             await axios.delete(`http://117.103.207.132:8080/furni-shop/categories/category/${categoryId}`, {
//                 headers: {
//                     Authorization: token,
//                 },
//             });

//             setCategoryData((prevCategoryData) =>
//                 prevCategoryData.filter((category) => category.categoryId !== categoryId)
//             );
//         } catch (error) {
//             console.error('Failed to delete category:', error);
//         }
//     };

//     if (loading) return <div>Loading...</div>;
//     if (error) return <div>Error fetching data!</div>;

//     const categoryColumns = [
//         {
//             title: 'ID',
//             dataIndex: 'categoryId',
//             key: 'categoryId',
//             width: '10%',
//             editable: false,
//             align: 'center',
//         },
//         {
//             title: 'Loại',
//             dataIndex: 'name',
//             key: 'name',
//             width: '30%',
//             editable: true,
//         },
//         {
//             title: 'Phân loại con',
//             dataIndex: 'subCategoriesInfo',
//             key: 'subCategoriesInfo',
//             width: '30%',
//             align: 'center',
//             render: subCategories => (
//                 subCategories.length > 0
//                     ? subCategories.map(sub => (
//                         <div key={sub.categoryId} className="border border-white border-b-[#d0d0d0] 
//                         bg-[#fafafa] rounded-md py-[8px] cursor-default hover:border-indigo-300">
//                             {sub.name}
//                         </div>
//                     ))
//                     : <div>N/A</div>
//             ),
//         },
//     ];

//     return (
//         <>
//             <div className="">
//                 <div className="flex justify-between mb-4 px-3">
//                     <div className="text-xl font-bold cursor-default">Phân loại</div>
//                     <Link to='/category/add-category'>
//                         <button className="bg-blue-600 px-3 py-1 text-white rounded-[6px]">
//                             Thêm phân loại
//                         </button>
//                     </Link>
//                 </div>
//                 <div className="">
//                     <CategoryTable
//                         dataSource={categoryData}
//                         columnsConfig={categoryColumns}
//                         dropdownOptions={[]}
//                         loading={loading}
//                         pageSize={1}
//                         onEditSave={handleSaveCategory} 
//                         onDelete={handleDeleteCategory}
//                     />
//                 </div>
//             </div>
//         </>
//     );
// }

// export default CategoryCategory;


