import { Link } from "react-router-dom";
import gg from "../assets/google.jpg";
import register from "../assets/register.jpg";

const Register = () => {
  return (
    <>
      <div
        className="bg-[url('../assets/register.jpg')] bg-cover bg-center min-h-screen flex items-center"
        style={{ backgroundImage: `url(${register})` }}
      >
        <div className="max-w-[90%] mx-auto py-3 px-12 bg-white rounded-lg ">
          <form
            action=""
            // onSubmit={}
            className=" mx-auto flex flex-col gap-3"
          >
            <h1 className="text-3xl font-bold text-center">
              Đăng ký tài khoản
            </h1>
            <div className="flex gap-[10px]">
              <div className="border border-gray-400 px-3 py-1 rounded-lg flex-1">
                <h5 className="upercase text-gray-700 cursor-default">
                  Họ và tên đệm
                </h5>
                <input type="text" className="outline-none" />
              </div>
              <div className="border border-gray-400 px-3 py-1 rounded-lg flex-1">
                <h5 className="upercase text-gray-700 cursor-default">tên</h5>
                <input type="text" className="outline-none" />
              </div>
            </div>
            <div className="border border-gray-400 px-3 py-1 rounded-lg">
              <h5 className="upercase text-gray-700 cursor-default">
                Địa chỉ email
              </h5>
              <input
                type="email"
                placeholder="john@example.com"
                className="outline-none"
              />
            </div>
            <div className="border border-gray-400 px-3 py-1 rounded-lg">
              <h5 className="upercase text-gray-700 cursor-default">
                Số điện thoại
              </h5>
              <input
                type="tel"
                placeholder="0123..."
                className="outline-none"
              />
            </div>
            <div className="border border-gray-400 px-3 py-1 rounded-lg">
              <h5 className="upercase text-gray-700 cursor-default">
                Mật khẩu
              </h5>
              <input type="password" className="outline-none" />
            </div>
            <div className="border border-gray-400 px-3 py-1 rounded-lg">
              <h5 className="upercase text-gray-700 cursor-default">
                Xác nhận lại mật khẩu
              </h5>
              <input type="password" className="outline-none" />
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" className="size-4" />
              <div>
                <span className="cursor-default">Tôi đồng ý với </span>
                <span className="underline underline-offset-2">
                  Điều khoản dịch vụ
                </span>
                <span className="cursor-default"> và </span>
                <span className="underline underline-offset-2">
                  Chính sách bảo mật
                </span>
              </div>
            </div>
            <button className="uppercase text-white  bg-black rounded-md px-3 py-2">
              Tạo tài khoản
            </button>
            <h3 className="uppercase text-center cursor-default">Hoặc</h3>
            <div className="text-center">
              <button className="size-8  rounded-lg">
                <img src={gg} alt="" />
              </button>
            </div>
            <div className="text-center">
              <span className="cursor-default">
                Quý khách đã có tài khoản?{" "}
              </span>
              <span className="underline underline-offset-2">
                <Link to="/login">Đăng nhập</Link>
              </span>
              <span className="cursor-default"> ngay</span>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
