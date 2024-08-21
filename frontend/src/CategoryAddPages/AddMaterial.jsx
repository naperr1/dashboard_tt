import { useState } from 'react';
import { FaArrowLeftLong } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';

const AddMaterial = () => {
    const accessToken = localStorage.getItem("accessToken");
    const token = `Bearer ${accessToken}`;

    const [name, setName] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        const newMaterial = { name };
    
        try {
            const response = await axios.post(
                'http://117.103.207.132:8080/furni-shop/categories/add-new-material',
                newMaterial,
                {
                    headers: {
                        Authorization: token,
                    },
                }
            );
    
            const createdMaterialId = response.data.materialId;
            toast.success(`Material added successfully! Material ID: ${createdMaterialId}`);
    
            setName('');
        } catch (error) {
            console.error('Error adding material:', error);
            toast.error('Failed to add material.');
        }
    };
    
    return (
        <div className='mt-20'>
            <Link to='/category'
                className='absolute top-[84px] left-64 px-4 py-2 bg-cyan-400 rounded-md text-white'>
                <FaArrowLeftLong />
            </Link>
            <h1 className="font-bold text-2xl text-center mb-2">Nhập chất liệu</h1>
            <form
                onSubmit={handleSubmit}
                className="px-8 py-3 max-w-[40%] mx-auto flex flex-col gap-3">
                <div className="flex flex-col gap-1 border border-gray-400 pt-1 pb-2 px-4 rounded-lg">
                    <h2 className="text-xl font-semibold cursor-default">Chất liệu</h2>
                    <input
                        className='outline-none'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        type="text"
                        required
                    />
                </div>
                <div className="flex justify-center mt-2">
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

export default AddMaterial;








// import { } from 'react'
// import { FaArrowLeftLong } from 'react-icons/fa6'
// import { Link } from 'react-router-dom'
// import { toast, ToastContainer } from 'react-toastify';
// import axios from 'axios';

// const AddMaterial = () => {

//     return (
//         <div className='mt-20'>
//             <Link to='/category'
//                 className='absolute top-[84px] left-64 px-4 py-2 bg-cyan-400 rounded-md text-white'>
//                 <FaArrowLeftLong />
//             </Link>
//             <h1 className="font-bold text-2xl text-center mb-2">Thêm chất liệu</h1>
//             <form
//                 onSubmit={}
//                 className="px-8 py-3 max-w-[40%] mx-auto flex flex-col gap-3">
//                 <div className="flex flex-col gap-1 border border-gray-400 pt-1 pb-2 px-4 rounded-lg">
//                     <h2 className="text-xl font-semibold cursor-default">Chất liệu</h2>
//                     <input className='outline-none'
//                         value={name}
//                         type="text" />
//                 </div>
//                 <div className="flex justify-center mt-2">
//                     <button type='submit' className="bg-cyan-400 py-2 px-12 text-white rounded-xl">
//                         Thêm
//                     </button>
//                 </div>
//             </form>
//             <ToastContainer />
//         </div>
//     )
// }

// export default AddMaterial


