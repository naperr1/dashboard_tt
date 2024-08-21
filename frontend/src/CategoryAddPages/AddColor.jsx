/* eslint-disable no-unused-vars */
// import { useState } from 'react'
// import { ColorPicker } from 'antd'
// import axios from 'axios';

// const AddColor = () => {

//     const accessToken = localStorage.getItem("accessToken");
//     const token = `Bearer ${accessToken}`;

//     const [colorId, setColorId] = useState('');
//     const [name, setName] = useState('');
//     const [colorCode, setColorCode] = useState('#1677ff');

//     const handleSubmit = async (event) => {
//         event.preventDefault();

//         const newColor = {
//             colorId: parseInt(colorId, 10),
//             name,
//             colorCode
//         };

//         try {
//             const response = await axios.post(
//                 'http://117.103.207.132:8080/furni-shop/categories/add-new-color', newColor,
//                 {
//                     headers: {
//                         Authorization: token,
//                     },
//                 });
//             console.log('Color added successfully:', response.data);
//         } catch (error) {
//             console.error('Error adding color:', error);
//         }
//     };

//     return (
//         <div className='mt-20'>
//             <h1 className="font-bold text-2xl text-center">Thêm màu sắc</h1>
//             <form className="px-8 py-3 max-w-[30%] mx-auto flex flex-col gap-3"
//                 onSubmit={handleSubmit}>
//                 <div className="flex flex-col gap-1 border border-gray-400 pt-1 pb-2 px-4 rounded-lg">
//                     <h2 className="text-xl font-semibold cursor-default">ID</h2>
//                     <input className='outline-none'
//                         value={colorId}
//                         onChange={ev => setColorId(ev.target.value)}
//                         type="text" />
//                 </div>

//                 <div className="flex flex-col gap-2 border border-gray-400 pt-1 pb-3 px-4 rounded-lg">
//                     <h2 className="text-xl font-semibold cursor-default">Tên màu</h2>
//                     <input className='outline-none'
//                         value={name}
//                         onChange={ev => setName(ev.target.value)}
//                         type="text" />
//                 </div>
//                 <div className="flex flex-col gap-2 border border-gray-400 pt-2 pb-3 px-4 rounded-lg">
//                     <h2 className="text-xl font-semibold cursor-default">Mã màu</h2>
//                     <ColorPicker size="large" className='w-[50%] mx-auto' showText
//                         value={colorCode}
//                         onChange={(color) => setColorCode(color.hex)}
//                     />
//                 </div>
//                 <div className="flex justify-center mt-2">
//                     <button className="bg-cyan-500 py-2 px-12 text-white rounded-xl"
//                         type="submit">
//                         Thêm
//                     </button>
//                 </div>
//             </form>
//         </div>
//     )
// }

// export default AddColor




// import { useState } from 'react';
// import { ColorPicker } from 'antd';
// import axios from 'axios';

// const AddColor = () => {

//     const accessToken = localStorage.getItem("accessToken");
//     const token = `Bearer ${accessToken}`;

//     const [colorId, setColorId] = useState('');
//     const [name, setName] = useState('');
//     const [colorCode, setColorCode] = useState('#1677ff'); // Default color value

//     const handleSubmit = async (event) => {
//         event.preventDefault();

//         console.log('Submitting colorCode:', colorCode);

//         const newColor = {
//             colorId: parseInt(colorId, 10), // Convert to number
//             name,
//             colorCode
//         };

//         try {
//             const response = await axios.post(
//                 'http://117.103.207.132:8080/furni-shop/categories/add-new-color', newColor,
//                 {
//                     headers: {
//                         Authorization: token,
//                     },
//                 });
//             console.log('Color added successfully:', response.data);
//             // Optionally, you can reset the form or give feedback to the user
//         } catch (error) {
//             console.error('Error adding color:', error);
//             // Handle error (e.g., show error message to user)
//         }
//     };

//     return (
//         <div className='mt-20'>
//             <h1 className="font-bold text-2xl text-center">Thêm màu sắc</h1>
//             <form onSubmit={handleSubmit} className="px-8 py-3 max-w-[30%] mx-auto flex flex-col gap-3">
//                 <div className="flex flex-col gap-1 border border-gray-400 pt-1 pb-2 px-4 rounded-lg">
//                     <h2 className="text-xl font-semibold cursor-default">ID</h2>
//                     <input
//                         className='outline-none'
//                         value={colorId}
//                         onChange={ev => setColorId(ev.target.value)}
//                         type="text"

//                     />
//                 </div>

//                 <div className="flex flex-col gap-2 border border-gray-400 pt-1 pb-3 px-4 rounded-lg">
//                     <h2 className="text-xl font-semibold cursor-default">Tên màu</h2>
//                     <input
//                         className='outline-none'
//                         value={name}
//                         onChange={ev => setName(ev.target.value)}
//                         type="text"
//                         required
//                     />
//                 </div>

//                 <div className="flex flex-col gap-2 border border-gray-400 pt-2 pb-3 px-4 rounded-lg">
//                     <h2 className="text-xl font-semibold cursor-default">Mã màu</h2>
//                     <ColorPicker
//                         size="large"
//                         value={colorCode}
//                         onChange={(color) => {
//                             const hexColor = color?.hex || color?.toHexString?.() || color?.toHex?.();
//                             console.log('Extracted Hex Color:', hexColor);
//                             setColorCode(hexColor);
//                         }}
//                         className='w-[50%] mx-auto'
//                         showText
//                         required
//                     />
//                 </div>

//                 <div className="flex justify-center mt-2">
//                     <button type="submit" className="bg-cyan-500 py-2 px-12 text-white rounded-xl">
//                         Thêm
//                     </button>
//                 </div>
//             </form>
//         </div>
//     );
// };

// export default AddColor;


import { useState } from 'react';
import { ColorPicker } from 'antd';
import axios from 'axios';
import { FaArrowLeftLong } from "react-icons/fa6";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';

const AddColor = () => {

    const accessToken = localStorage.getItem("accessToken");
    const token = `Bearer ${accessToken}`;

    const [name, setName] = useState('');
    const [colorCode, setColorCode] = useState('#0000ff');

    const handleSubmit = async (event) => {
        event.preventDefault();

        const newColor = {
            name,
            colorCode,
        };

        try {
            await axios.post(
                'http://117.103.207.132:8080/furni-shop/categories/add-new-color',
                newColor,
                {
                    headers: {
                        Authorization: token,
                    },
                }
            );
            toast.success('Color added successfully!');

            setName('');
            setColorCode('#1677ff');
        } catch (error) {
            console.error('Error adding color:', error);
            toast.error('Failed to add color.');
        }
    };

    return (
        <div className='mt-20'>
            <Link to='/category'
                className='absolute top-[84px] left-64 px-4 py-2 bg-cyan-400 rounded-md text-white'>
                <FaArrowLeftLong />
            </Link>
            <h1 className="font-bold text-2xl text-center">Chọn màu sắc</h1>
            <form onSubmit={handleSubmit}
                className="px-8 py-3 max-w-[35%] mx-auto flex flex-col gap-3">
                <div className="flex flex-col gap-2 border border-gray-400 pt-1 pb-3 px-4 rounded-lg">
                    <h2 className="text-xl font-semibold cursor-default">Tên màu</h2>
                    <input
                        className='outline-none'
                        value={name}
                        onChange={ev => setName(ev.target.value)}
                        type="text"
                        required
                    />
                </div>

                <div className="flex flex-col gap-2 border border-gray-400 pt-2 pb-3 px-4 rounded-lg">
                    <h2 className="text-xl font-semibold cursor-default">Mã màu</h2>
                    <ColorPicker
                        size="large"
                        value={colorCode}
                        onChange={(color) => {
                            const hexColor = color?.toHexString?.() || '#0000ff';
                            setColorCode(hexColor);
                        }}
                        className='w-[50%] mx-auto'
                        showText
                        required
                    />
                </div>

                <div className="flex justify-center mt-2">
                    <button type="submit" className="bg-cyan-400 py-2 px-12 text-white rounded-xl">
                        Thêm
                    </button>
                </div>
            </form>
            <ToastContainer />
        </div>
    );
};

export default AddColor;

