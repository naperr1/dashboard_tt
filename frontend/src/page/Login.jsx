import { Link } from "react-router-dom";
import gg from "../assets/google.jpg";
import login from "../assets/login.jpg";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
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
        console.error("Error Logout");
      }
    } catch (error) {
      toast.error("Email or password incorrect");
      console.error("Error login", error);
    }
  };

  const refreshAccessToken = async () => {
    const refreshToken = localStorage.getItem("refreshToken");

    if (!refreshToken) {
      console.error("No refreshToken created token");
      return;
    }

    try {
      const response = await axios.post(
        "http://117.103.207.132:8080/furni-shop/auth/refresh-token",
        {
          refreshToken,
        }
      );

      if (response.data.code === 1000) {
        const { accessToken } = response.data.result;
        localStorage.setItem("accessToken", accessToken);
      } else {
        console.error("Error new access token ");
      }
    } catch (error) {
      console.error("Error new access token", error);
    }
  };

  axios.interceptors.request.use(
    (config) => {
      const accessToken = localStorage.getItem("accessToken");
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  axios.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          await refreshAccessToken();

          const newAccessToken = localStorage.getItem("accessToken");
          axios.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${newAccessToken}`;

          return axios(originalRequest);
        } catch (refreshError) {
          console.error("Error refreshing access token", refreshError);

          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          localStorage.removeItem("avatarUrl");
          localStorage.removeItem("firstName");
          localStorage.removeItem("lastName");

          navigate("/login");
          return Promise.reject(refreshError);
        }
      }

      return Promise.reject(error);
    }
  );

  return (
    <div
      className="bg-[url('../assets/register.jpg')] bg-cover bg-center min-h-screen flex items-center"
      style={{ backgroundImage: `url(${login})` }}
    >
      <div className="mx-auto bg-white rounded-lg flex items-center py-8 px-12 ">
        <form onSubmit={handleLogin} className="flex flex-col gap-3">
          <h1 className="text-3xl font-bold text-center">Đăng nhập</h1>
          <div className="border border-gray-400 px-3 py-1 rounded-lg">
            <h5 className="uppercase text-gray-700 cursor-default">
              Địa chỉ email
            </h5>
            <input
              type="email"
              placeholder="john@example.com"
              className="outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="border border-gray-400 px-3 py-1 rounded-lg">
            <h5 className="uppercase text-gray-700 cursor-default">Mật khẩu</h5>
            <input
              type="password"
              placeholder="012..."
              className="outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-end">
            <Link to="/forgotpass">Quên mật khẩu?</Link>
          </div>
          <button className="uppercase text-white bg-black rounded-md p-3">
            Đăng nhập
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
