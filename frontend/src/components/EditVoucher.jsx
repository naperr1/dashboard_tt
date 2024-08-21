import { } from 'react'
import DatePickerVoucher from './DatePickerVoucher'
import { DatePicker } from 'antd';
import moment from 'moment';

const EditVoucher = () => {

    const today = moment();

    return (
        <div className='mt-14'>
            <h1 className="font-bold text-2xl text-center mb-2">Cập nhập thông tin voucher</h1>
            <form
                // onSubmit={saveVoucher}
                className="px-8 py-3 max-w-[75%] mx-auto">
                <div className='grid grid-cols-2 gap-y-4 gap-x-5'>
                    <div className="flex flex-col gap-1 border border-gray-400 pt-1 pb-2 px-4 rounded-lg">
                        <h2 className="text-xl font-semibold cursor-default">Mã voucher</h2>
                        <input className='outline-none'
                            // value={title}
                            // onChange={ev => setTitle(ev.target.value)}
                            type="text" />
                    </div>
                    <div className="flex flex-col gap-1 border border-gray-400 pt-1 pb-2 px-4 rounded-lg">
                        <h2 className="text-xl font-semibold cursor-default">Tên voucher</h2>
                        <input className='outline-none'
                            // value={address}
                            // onChange={ev => setAddress(ev.target.value)}
                            type="text" />
                    </div>
                    <div className="flex flex-col gap-1 border border-gray-400 pt-1 pb-2 px-4 rounded-lg">
                        <h2 className="text-xl font-semibold cursor-default">Phần trăm giảm giá</h2>
                        <input className='outline-none'
                            // value={address}
                            // onChange={ev => setAddress(ev.target.value)}
                            type="number" />
                    </div>
                    <div className="flex flex-col gap-1 border border-gray-400 pt-1 pb-2 px-4 rounded-lg">
                        <h2 className="text-xl font-semibold cursor-default">Giá trị tối thiểu</h2>
                        <input className='outline-none'
                            // value={address}
                            // onChange={ev => setAddress(ev.target.value)}
                            type="number" />
                    </div>
                    <div className="flex flex-col gap-1 border border-gray-400 pt-1 pb-2 px-4 rounded-lg">
                        <h2 className="text-xl font-semibold cursor-default">Giá trị tối đa</h2>
                        <input className='outline-none'
                            // value={address}
                            // onChange={ev => setAddress(ev.target.value)}
                            type="number" />
                    </div>

                    <div className="flex flex-col gap-1 border border-gray-400 pt-1 pb-2 px-4 rounded-lg">
                        <h2 className="text-xl font-semibold cursor-default">Số lượng</h2>
                        <input className='outline-none'
                            // value={description}
                            // onChange={ev => setDescription(ev.target.value)}
                            type='number'
                        />
                    </div>
                    <div className="flex flex-col gap-1 border border-gray-400 pt-1 pb-2 px-4 rounded-lg">
                        <h2 className="text-xl font-semibold cursor-default">Thông tin</h2>
                        <textarea className='outline-none'
                        // value={extraInfo}
                        // onChange={ev => setExtraInfo(ev.target.value)}
                        >
                        </textarea>
                    </div>

                    <DatePickerVoucher />

                    <div className="flex flex-col gap-2 border border-gray-400 pt-2 pb-3 px-4 rounded-lg">
                        <h2 className="text-xl font-semibold cursor-default">Ngày tạo</h2>
                        <DatePicker  className='w-[77%]' size='large' />
                    </div>
                    <div className="flex flex-col gap-2 border border-gray-400 pt-2 pb-3 px-4 rounded-lg">
                        <h2 className="text-xl font-semibold cursor-default">Ngày cập nhập</h2>
                        <DatePicker defaultValue={today} disabled className='w-[77%]' size='large' />
                    </div>
                </div>
                <div className="flex justify-center mt-6 ">
                    <button className="bg-cyan-500 py-2 px-12 text-white rounded-xl">
                        Cập nhập
                    </button>
                </div>
            </form>
        </div>
    )
}

export default EditVoucher;
