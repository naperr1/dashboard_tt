import { Link } from "react-router-dom";
import login from "../assets/login.jpg";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosInstance.post(
        "http://117.103.207.132:8080/furni-shop/auth/login",
        {
          email,
          password,
          recaptchaToken: "test",
        }
      );

      if (response.data.code === 1000) {
        const { accessToken, refreshToken, userResponse } =
          response.data.result;

        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        localStorage.setItem("avatarUrl", userResponse.avatarUrl);
        localStorage.setItem("firstName", userResponse.firstName);
        localStorage.setItem("lastName", userResponse.lastName);

        if (userResponse.role === "ADMIN") {
          toast.success("Login Successfully");
          navigate("/");
        } else {
          toast.error("You are not an admin");
        }
      } else {
        toast.error("Email or password incorrect");
      }
    } catch (error) {
      toast.error("Email or password incorrect");
      console.error("Error login", error);
    }
  };

  return (
    <div
      className="bg-[url('../assets/register.jpg')] bg-cover bg-center min-h-screen flex items-center justify-center"
      style={{ backgroundImage: `url(${login})` }}
    >
      <div className="w-full max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="py-8 px-10">
          <form onSubmit={handleLogin} className="flex flex-col gap-6">
            <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-6">
              Đăng nhập
            </h1>

            <div className="border border-gray-300 px-4 py-3 rounded-lg">
              <h5 className="uppercase text-sm text-gray-600 mb-1">
                Địa chỉ email
              </h5>
              <input
                type="email"
                placeholder="john@example.com"
                className="w-full outline-none text-lg text-gray-800"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="border border-gray-300 px-4 py-3 rounded-lg">
              <h5 className="uppercase text-sm text-gray-600 mb-1">Mật khẩu</h5>
              <input
                type="password"
                placeholder="********"
                className="w-full outline-none text-lg text-gray-800"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="flex items-center justify-between text-sm text-gray-500">
              <Link to="/forgotpass" className="hover:underline">
                Quên mật khẩu?
              </Link>
            </div>
            <div className="flex items-center text-sm text-gray-500">
              Bạn chưa có tài khoản?
              <Link to="/register" className="hover:underline">
                Đăng kí
              </Link>
            </div>

            <button className="uppercase text-lg font-bold text-white bg-black rounded-md py-3 mt-6 hover:bg-gray-800 transition duration-300">
              Đăng nhập
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
