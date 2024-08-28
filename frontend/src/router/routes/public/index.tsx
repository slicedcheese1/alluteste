import { Login } from "@pages/Login/Login";
import { Register } from "@pages/Register/Register";
import { IRoute } from "@router/interface";

const routes: readonly IRoute[] = [
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
];

export default routes;
