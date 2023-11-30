import { Outlet, Navigate } from "react-router-dom";

export default function AuthMiddlewares() {
  let isLogin = false;
  const apiKey = localStorage.getItem("apiKey");

  if (apiKey) {
    isLogin = true;
  }
  return isLogin ? <Outlet /> : <Navigate to="/login" />;
}
