import React from "react";
import { createRoot } from "react-dom/client";
import { QueryClientProvider } from "@tanstack/react-query";
import Router from "./router";
import { queryClient } from "@services/queryClient";
import { ShoppingCartProvider } from "@context/ShoppingCart";
import { SnackbarProvider } from "notistack";

createRoot(document.getElementById("root") as HTMLElement).render(
  <SnackbarProvider maxSnack={1}>
    <ShoppingCartProvider>
      <QueryClientProvider client={queryClient}>
        <Router />
      </QueryClientProvider>
    </ShoppingCartProvider>
  </SnackbarProvider>,
);
