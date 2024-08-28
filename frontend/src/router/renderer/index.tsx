import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@context/AuthProvider";
import { RouteTypeRenderer } from "@router/components/RouteTypeRenderer";
import publicRoutes from "@router/routes/public";
import privateRoutes from "@router/routes/private";
import { createRouteConfig } from "@router/utils";

const isPublicRoute = (pathname: string) => publicRoutes.some(route => route.path === pathname);

export function Renderer() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { isAuthenticated } = useAuth();
  useEffect(() => {
    if (isAuthenticated && isPublicRoute(pathname)) {
      navigate("/");
    }
  }, [isAuthenticated, pathname, navigate]);

  const allowedRoutes = isAuthenticated ? privateRoutes : publicRoutes;
  const allRoutes = createRouteConfig(allowedRoutes).map(route => ({
    ...route,
    errorElement: <h1>404 - Erro ao localizar a página.</h1>,
  }));
  useEffect(() => {
    if (isAuthenticated && isPublicRoute(pathname)) {
      navigate("/");
    }
  }, [isAuthenticated, pathname, navigate]);

  return <RouteTypeRenderer routes={allRoutes} />;
}
