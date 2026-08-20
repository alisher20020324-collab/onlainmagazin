import React, { useEffect } from "react";
import SignUp from "./auth/SignUp";
import { ToastContainer } from "react-toastify";
import { Routes, Route } from "react-router-dom";
import Login from "./auth/Login";
import Admin from "./admin/Admin";
import { useStore } from "./store/zustand";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import { useCookies } from "react-cookie";
import { jwtDecode } from "jwt-decode";
export default function App() {
  const isLogin = useStore((state) => state.isLogin);
  const setIsLogin = useStore((state) => state.setIsLogin);
  const role = useStore((state) => state.role);
  const setRole = useStore((state) => state.setRole);
  const [cookies, setCookie] = useCookies("token");

  useEffect(() => {
    if (!cookies.token) return;
    try {
      let decode = jwtDecode(cookies.token);

      if (decode.role == "user") {
        setIsLogin(true);
        setRole(decode.role);
      } else if (decode.role == "admin") {
        setIsLogin(true);
        setRole(decode.role);
      }
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <React.Fragment>
      <ToastContainer />
      <Routes>
        {!isLogin ? (
          <Route
            path="/*"
            element={
              <Routes>
                <Route path="/" element={<SignUp />} />
                <Route path="/login" element={<Login />} />
              </Routes>
            }
          />
        ) : role == "user" ? (
          <Route
            path="/*"
            element={
              <>
                <Header />
                <Routes>
                  <Route element="/" element={<Home />} />
                </Routes>
                <Footer />
              </>
            }
          />
        ) : (
          <Route path="/*" element={<Admin />} />
        )}
      </Routes>
    </React.Fragment>
  );
}
