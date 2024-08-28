import { Details } from "@pages/Details/Details";
import Home from "@pages/Home/home";
import { ShoppingCart } from "@pages/ShoppingCart/ShoppingCart";
import { IRoute } from "@router/interface";

const routes: readonly IRoute[] = [
  { path: "/test", element: <></> },
  { path: "/", element: <Home /> },
  { path: "/productDetails/:id", element: <Details /> },
  { path: "/shoppingCart", element: <ShoppingCart /> },
];

export default routes;
