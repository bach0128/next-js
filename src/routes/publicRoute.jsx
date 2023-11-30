import DefaultLayout from "../layouts/DefaultLayout/DefaultLayout";

import { Route } from "react-router-dom";

import Home from "../pages/Home/Home";
import AuthLayout from "../layouts/AuthLayout/AuthLayout";
import Login from "../pages/Auth/Login";
import GuestMiddlewares from "../middlewares/GuestMiddlewares";
import AuthMiddlewares from "../middlewares/AuthMiddlewares";

export const publicRoute = (
  <>
    <Route element={<DefaultLayout />}>
      <Route element={<AuthMiddlewares />}>
        <Route path="/" element={<Home />} />
      </Route>
    </Route>

    <Route element={<AuthLayout />}>
      <Route element={<GuestMiddlewares />}>
        <Route path="login" element={<Login />} />
      </Route>
    </Route>
  </>
);
