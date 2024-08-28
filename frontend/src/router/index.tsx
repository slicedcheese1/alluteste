import { BrowserRouter } from "react-router-dom";
import { Renderer } from "./renderer";
import { AuthProvider } from "@context/AuthProvider";
import Main from "../layouts/Main/Main";

const Router = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Main>
          <Renderer />
        </Main>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default Router;
