import { Link } from "react-router-dom";
import gg from '../assets/google.jpg';
import login from '../assets/login.jpg'

const Login = () => {
    return (
        <>
            <div className="bg-[url('../assets/register.jpg')] bg-cover bg-center min-h-screen flex items-center"
                style={{ backgroundImage: `url(${login})` }}>
                <div className="mx-auto bg-white rounded-lg flex items-center py-8 px-12 ">
                    <form action=""
                        // onSubmit={}
                        className=" flex flex-col gap-3">
                        <h1 className="text-3xl font-bold text-center">Đăng nhập</h1>
                        <div className="border border-gray-400 px-3 py-1 rounded-lg">
                            <h5 className="upercase text-gray-700 cursor-default">Địa chỉ email</h5>
                            <input type="email" placeholder="john@example.com" className="outline-none" />
                        </div>

                        <div className="border border-gray-400 px-3 py-1 rounded-lg">
                            <h5 className="upercase text-gray-700 cursor-default">Mật khẩu</h5>
                            <input type="password" placeholder="012..." className="outline-none" />
                        </div>
                        <div className="flex items-center justify-end">
                            <Link to='/forgotpass' className="">
                                Quên mật khẩu?
                            </Link>
                        </div>
                        <button className="uppercase text-white  bg-black rounded-md p-3">
                            Đăng nhập
                        </button>
                        <h3 className="uppercase text-center cursor-default">Hoặc</h3>
                        <div className="text-center">
                            <button className="size-8  rounded-lg">
                                <img src={gg} alt="" />
                            </button>
                        </div>
                        <div className="text-center">
                            <span className="cursor-default">Quý khách chưa có tài khoản? </span>
                            <span className="underline underline-offset-2">
                                <Link to='/register'>Đăng kí</Link>
                            </span>
                            <span className="cursor-default" > ngay</span>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Login;