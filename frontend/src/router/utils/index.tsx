import { IRoute } from "@router/interface";

export const createRouteConfig = (routes: readonly IRoute[]) =>
  routes.map(({ path, element }) => ({
    path,
    element: null,
    children: [{ path, element }],
  }));
