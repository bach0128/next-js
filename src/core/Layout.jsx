import { publicRoute } from "../routes/publicRoute";
import { Routes, Route } from "react-router-dom";

export default function Layout() {
  const Layout = publicRoute.layout;

  return (
    <div>
      <Routes>{publicRoute}</Routes>
    </div>
  );
}
