import { Outlet, Navigate } from "react-router-dom";

export default function GuestMiddlewares() {
  let isLogin;
  const apiKey = localStorage.getItem("apiKey");
  if (apiKey) {
    isLogin = true;
  } else {
    isLogin = false;
  }
  return !isLogin ? <Outlet /> : <Navigate to="/" />;
}
