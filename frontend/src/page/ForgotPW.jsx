import { useState } from 'react';
import login from '../assets/login.jpg';

const ForgotPW = () => {
    const [formStep, setFormStep] = useState(1);

    const handleNextStep = () => {
        setFormStep(prevStep => prevStep + 1);
    };

    return (
        <>
            <div className="bg-cover bg-center min-h-screen flex items-center"
                style={{ backgroundImage: `url(${login})` }}>
                <div className="w-[50%] mx-auto bg-white rounded-lg flex items-center justify-center">

                    {formStep === 1 && (
                        <form className="w-[60%] mx-auto flex flex-col gap-3 py-7">
                            <h1 className="text-3xl font-bold text-center">Quên mật khẩu</h1>
                            <div className="border border-gray-400 px-3 py-1 rounded-lg">
                                <h5 className="uppercase text-gray-700 cursor-default">Địa chỉ email</h5>
                                <input type="email" placeholder="john@example.com" className="outline-none" />
                            </div>
                            <button
                                type="button"
                                className="uppercase text-white bg-black rounded-md px-3 py-2"
                                onClick={handleNextStep}
                            >
                                Tiếp tục
                            </button>
                        </form>
                    )}

                    {formStep === 2 && (
                        <form className="w-[80%] py-6 flex flex-col gap-3">
                            <h1 className="text-3xl font-bold text-center">Quên mật khẩu</h1>
                            <span>Một mã xác nhận đã được gửi tới địa chỉ email của bạn. Vui lòng kiểm tra hộp thư và điền vào ô trống dưới đây: </span>
                            <div className="border border-gray-400 px-3 py-1 rounded-lg">
                                <h5 className="uppercase text-gray-700 cursor-default">Mã xác nhận</h5>
                                <input type="password" className="outline-none" />
                            </div>
                            <button
                                type="button"
                                className="uppercase text-white bg-black rounded-md px-3 py-2"
                                onClick={handleNextStep}
                            >
                                Tiếp tục
                            </button>
                        </form>
                    )}

                    {formStep === 3 && (
                        <form className="max-w-[90%] mx-auto flex flex-col gap-3 py-6 ">
                            <h1 className="text-3xl font-bold text-center">Thiết lập lại mật khẩu</h1>
                            <div className="border border-gray-400 px-3 py-1 rounded-lg">
                                <h5 className="uppercase text-gray-700 cursor-default">Mật khẩu mới</h5>
                                <input type="password" className="outline-none" />
                            </div>
                            <div className="border border-gray-400 px-3 py-1 rounded-lg">
                                <h5 className="uppercase text-gray-700 cursor-default">Nhập lại mật khẩu</h5>
                                <input type="password" className="outline-none" />
                            </div>
                            <button
                                type="button"
                                className="uppercase text-white bg-black rounded-md px-3 py-2"
                                onClick={() => { }}
                            >
                                Xác nhận
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </>
    );
};

export default ForgotPW;
