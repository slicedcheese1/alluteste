import { useAuth } from "@context/AuthProvider";
import { Button } from "@mui/material";
import api from "@services/api";
import { useNavigate } from "react-router-dom";
import { Container, HeaderFields, HeaderImage, HeaderWrapper, StyledCartIcon } from "./style";
import AlluLogo from "/AlluLogo.png";

export const Header = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const handleLogout = async () => {
    if (api.login.logout()) {
      return navigate("/login");
    }
  };

  return (
    <Container>
      <HeaderWrapper>
        <HeaderImage src={AlluLogo} onClick={() => navigate("/")} />
        {isAuthenticated ? (
          <HeaderFields>
            <StyledCartIcon size={35} onClick={() => navigate("/shoppingCart")} />
            <Button
              variant="text"
              color="error"
              size="large"
              onClick={handleLogout}
              sx={{ fontWeight: "bold", marginRight: "2rem" }}
            >
              Sair
            </Button>
          </HeaderFields>
        ) : (
          <HeaderFields>
            <Button variant="contained" color="success" onClick={() => navigate("/login")}>
              Login
            </Button>
            <Button
              variant="text"
              color="inherit"
              size="large"
              onClick={() => navigate("/register")}
              sx={{ fontWeight: "bold", marginRight: "2rem" }}
            >
              Cadastre-se
            </Button>
          </HeaderFields>
        )}
      </HeaderWrapper>
    </Container>
  );
};
