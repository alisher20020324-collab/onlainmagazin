import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { axiosInstanse } from "../api/axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import { jwtDecode } from "jwt-decode";
import { useStore } from "../store/zustand";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies("token");

  const setRole = useStore((state) => state.setRole);
  const setIsLogin = useStore((state) => state.setIsLogin);

  let navigate = useNavigate();

  const password = watch("password");
  const login = async (data) => {
    try {
      let response = await axiosInstanse.post("/login", data);
      let token = response.data.token;
      toast.success(response.data.message);
      setCookie("token", token, { path: "/", maxAge: 3600 });

      let decode = jwtDecode(token);
      

      setRole(decode.role);
      setIsLogin(true);

      if (decode.role == "user") {
        navigate("/");
      } else if (decode.role == "admin") {
        navigate("/admin");
      }
    } catch (err) {
      console.log(err);
      
      toast.error("Bunaqa email yo'q");
      navigate("/")
    }
  };

  const onSubmit = (data) => {
    login(data);
    
  };

  return (
    <div className="min-h-screen bg-blue-600 flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-md rounded-lg shadow-xl p-8">
        <h2 className="text-3xl font-bold mb-8 relative inline-block">
          Login
          <span className="absolute left-0 -bottom-1 w-16 h-1 bg-blue-600 rounded-full"></span>
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Email */}
          <div>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full border rounded-md px-4 py-3 outline-none focus:border-blue-500"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email",
                },
              })}
            />

            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Create password"
              className="w-full border rounded-md px-4 py-3 pr-12 outline-none focus:border-blue-500"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Minimum 6 characters",
                },
              })}
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>

            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Checkbox */}
          <div>
            <label className="flex items-center gap-2 text-sm text-gray-600">
              <input
                type="checkbox"
                {...register("terms", {
                  required: "Accept terms first",
                })}
              />
              I accept all terms & conditions
            </label>

            {errors.terms && (
              <p className="text-red-500 text-sm mt-1">
                {errors.terms.message}
              </p>
            )}
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md font-semibold duration-300"
          >
            Login
          </button>

          <p className="text-center text-gray-600 text-sm">
            Don't have your account?{" "}
            <Link
              to={"/"}
              className="text-blue-600 cursor-pointer font-semibold hover:underline"
            >
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
